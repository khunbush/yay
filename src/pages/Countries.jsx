import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mean } from 'd3-array';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import 'd3-transition';
import { feature } from 'topojson-client';
import { ChevronLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { ALIAS, ATLAS_URL, MAP_FRAME, MICRO, SEED, STORE, TOTAL_WORLD } from '@/components/worldData';
import './Countries.css';

const loadVisited = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORE));
    // An empty array is a real answer — it means we cleared the list on purpose.
    if (Array.isArray(stored)) return stored;
  } catch (e) {
    console.error('Failed to read visited countries', e);
  }
  return SEED;
};

const saveVisited = (set) => {
  try {
    localStorage.setItem(STORE, JSON.stringify([...set]));
  } catch (e) {
    console.error('Failed to save visited countries', e);
  }
};

export default function Countries() {
  const navigate = useNavigate();

  const [visited, setVisited] = useState(() => new Set(loadVisited()));
  const [names, setNames] = useState([]);
  const [current, setCurrent] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState({});
  const [toast, setToast] = useState({ msg: '', on: false });
  const [hintGone, setHintGone] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const [size, setSize] = useState(null);
  const [ready, setReady] = useState(false);

  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const svgSelRef = useRef(null);
  const gLandRef = useRef(null);
  const gPinsRef = useRef(null);
  const projRef = useRef(null);
  const zoomRef = useRef(null);
  const centroidsRef = useRef({});
  const fileRef = useRef(null);
  const photoTargetRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const showToast = useCallback((msg) => {
    setToast({ msg, on: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 1800);
  }, []);

  const openDetail = useCallback((name) => {
    setCurrent(name);
    setSheet('detail');
  }, []);

  const toggleVisited = useCallback((name) => {
    const next = new Set(visited);
    const had = next.has(name);
    if (had) next.delete(name);
    else next.add(name);
    setVisited(next);
    saveVisited(next);
    showToast(had ? `${name} removed` : `${name} added — ${next.size} countries`);
  }, [visited, showToast]);

  /* ---------------- map ---------------- */

  // The map card is flex-sized, so wait until it has actually been laid out.
  useLayoutEffect(() => {
    let raf;
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      if (W > 0 && H > 0) setSize({ W, H });
      else raf = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!size) return undefined;
    const { W, H } = size;
    const svgEl = svgRef.current;
    if (!svgEl) return undefined;

    svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const svg = select(svgEl);
    svg.selectAll('*').remove();
    const g = svg.append('g');
    const gLand = g.append('g');
    const gPins = g.append('g');
    svgSelRef.current = svg;
    gLandRef.current = gLand;
    gPinsRef.current = gPins;

    const proj = geoMercator().fitExtent([[2, 2], [W - 2, H - 2]], MAP_FRAME);
    const path = geoPath(proj);
    projRef.current = proj;

    const zoomBehavior = d3Zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [W, H]])
      .on('zoom', (ev) => { g.attr('transform', ev.transform); });
    zoomRef.current = zoomBehavior;
    svg.call(zoomBehavior);
    svg.call(
      zoomBehavior.transform,
      zoomIdentity.translate(W * 0.5, H * 0.5).scale(1.3).translate(-W * 0.52, -H * 0.5)
    );

    let cancelled = false;
    let hintTimer;

    fetch(ATLAS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`atlas responded ${res.status}`);
        return res.json();
      })
      .then((topo) => {
        if (cancelled) return;
        const features = feature(topo, topo.objects.countries).features
          .filter((f) => f.properties.name !== 'Antarctica');

        features.forEach((f) => { f.__name = ALIAS[f.properties.name] || f.properties.name; });

        // Natural Earth bundles overseas departments into France — keep only
        // the European mainland + Corsica.
        const FR = features.find((f) => f.__name === 'France');
        if (FR && FR.geometry.type === 'MultiPolygon') {
          FR.geometry.coordinates = FR.geometry.coordinates.filter((poly) => {
            const lon = mean(poly[0], (p) => p[0]);
            const lat = mean(poly[0], (p) => p[1]);
            return lon > -10 && lon < 12 && lat > 40 && lat < 54;
          });
        }

        const centroids = {};
        gLand.selectAll('path').data(features).join('path')
          .attr('class', 'country')
          .attr('d', path)
          .each(function each(f) { centroids[f.__name] = path.centroid(f); })
          .on('pointerdown', function down(ev) { this.__p = [ev.clientX, ev.clientY]; })
          .on('pointerup', function up(ev, f) {
            const p = this.__p;
            if (!p) return;
            // Ignore the pointerup that ends a pan.
            if (Math.hypot(ev.clientX - p[0], ev.clientY - p[1]) > 7) return;
            playTapSound();
            openDetail(f.__name);
          });
        centroidsRef.current = centroids;

        setNames(
          [...new Set([...features.map((f) => f.__name), ...Object.keys(MICRO)])]
            .sort((a, b) => a.localeCompare(b))
        );
        setReady(true);
        hintTimer = setTimeout(() => setHintGone(true), 3800);
      })
      .catch((err) => {
        console.error('map load failed', err);
        if (!cancelled) setMapFailed(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(hintTimer);
      svg.on('.zoom', null);
    };
  }, [size, openDetail]);

  const pointFor = useCallback((name) => {
    if (MICRO[name]) return projRef.current ? projRef.current(MICRO[name]) : null;
    return centroidsRef.current[name] || null;
  }, []);

  useEffect(() => {
    if (!ready) return;
    const gLand = gLandRef.current;
    const gPins = gPinsRef.current;
    if (!gLand || !gPins) return;

    gLand.selectAll('path').attr('class', (f) => (
      `country${visited.has(f.__name) ? ' on' : ''}${f.__name === current ? ' sel' : ''}`
    ));

    const pts = [...visited]
      .map((n) => ({ n, p: pointFor(n) }))
      .filter((d) => d.p && Number.isFinite(d.p[0]));

    const pin = gPins.selectAll('g.pin').data(pts, (d) => d.n);
    const enter = pin.enter().append('g').attr('class', 'pin');
    enter.filter((d) => !!MICRO[d.n])
      .append('circle').attr('class', 'halo').attr('r', 0)
      .transition().duration(400)
      .attr('r', 3.4);
    enter.append('line').attr('y1', 0).attr('y2', 0)
      .transition().duration(360)
      .attr('y2', -5);
    enter.append('circle').attr('class', 'head').attr('cy', -5).attr('r', 0)
      .transition().delay(120).duration(320)
      .attr('r', 1.8);
    enter.append('circle').attr('class', 'hit').attr('r', 9)
      .on('click', (ev, d) => { playTapSound(); openDetail(d.n); });
    pin.exit().remove();
    gPins.selectAll('g.pin').attr('transform', (d) => `translate(${d.p[0]},${d.p[1]})`);
  }, [visited, current, ready, pointFor, openDetail]);

  const zoomBy = useCallback((k) => {
    const svg = svgSelRef.current;
    const behavior = zoomRef.current;
    if (!svg || !behavior) return;
    playTapSound();
    svg.transition().duration(320).call(behavior.scaleBy, k);
  }, []);

  /* ---------------- ui ---------------- */

  const count = visited.size;
  const pct = Math.round((count / TOTAL_WORLD) * 1000) / 10;
  const chips = useMemo(() => [...visited].sort(), [visited]);

  const listed = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = names.filter((n) => !q || n.toLowerCase().includes(q));
    const sorted = q
      ? pool
      : [...pool].sort((a, b) => (visited.has(b) ? 1 : 0) - (visited.has(a) ? 1 : 0) || a.localeCompare(b));
    return sorted.slice(0, 240);
  }, [names, query, visited]);

  const isOn = current ? visited.has(current) : false;
  const currentPhotos = (current && photos[current]) || [];

  const closeSheets = useCallback(() => {
    setSheet(null);
    setCurrent(null);
  }, []);

  const openAdd = useCallback(() => {
    playTapSound();
    setQuery('');
    setSheet('add');
  }, []);

  const pickPhoto = useCallback(() => {
    photoTargetRef.current = current;
    fileRef.current?.click();
  }, [current]);

  const onPhotoChosen = useCallback((e) => {
    const file = e.target.files && e.target.files[0];
    const target = photoTargetRef.current;
    e.target.value = '';
    if (!file || !target) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => ({ ...prev, [target]: [reader.result, ...(prev[target] || [])] }));
      showToast(`Photo added to ${target}`);
    };
    reader.readAsDataURL(file);
  }, [showToast]);

  const meta = isOn
    ? `One of our ${count} countries`
    : (current && MICRO[current] ? 'Pinned on the map' : 'Tap the map anytime to change this');

  return (
    <div className="ours">
      <header>
        <button
          type="button"
          className="back"
          onClick={() => { playTapSound(); navigate(createPageUrl('Years')); }}
          aria-label="Back to our years"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="eyebrow">Us, so far</div>
        <h1>Countries we&apos;ve<br />been <em>together</em></h1>
      </header>

      <div className="stats">
        <div className="stat">
          <div className="num">{count}</div>
          <div className="lab">countries visited</div>
        </div>
        <div className="stat">
          <div className="num">{pct}%</div>
          <div className="lab">of the world</div>
          <div className="track"><i style={{ width: `${Math.max(2, pct * 3)}%` }} /></div>
        </div>
      </div>

      <div className="mapwrap" ref={wrapRef}>
        <svg ref={svgRef} />
        <div className={`hint${hintGone ? ' gone' : ''}`}>
          {mapFailed ? 'Map data unavailable offline' : 'Tap a country · pinch to zoom'}
        </div>
        <div className="legend">
          <div><span className="dot" style={{ background: 'var(--coral)' }} />Been there</div>
          <div>
            <span
              className="dot"
              style={{ background: 'var(--land)', outline: '1px solid var(--land-line)', outlineOffset: '-1px' }}
            />
            Not yet
          </div>
          <div>
            <span
              className="dot"
              style={{ background: 'var(--teal-wash)', border: '1px solid var(--teal)', borderRadius: '99px' }}
            />
            Small places
          </div>
        </div>
        <div className="zoomers">
          <button type="button" onClick={() => zoomBy(1.7)} aria-label="Zoom in">+</button>
          <button type="button" onClick={() => zoomBy(1 / 1.7)} aria-label="Zoom out">−</button>
        </div>
        <div className="rail">
          <div className="chipscroll">
            {chips.map((name, i) => (
              <button
                type="button"
                className="chip"
                key={name}
                onClick={() => { playTapSound(); openDetail(name); }}
              >
                {name}
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <button type="button" className="fab" onClick={openAdd} aria-label="Add a country">+</button>
        </div>
      </div>

      <div
        className={`scrim${sheet ? ' show' : ''}`}
        onClick={closeSheets}
        role="presentation"
      />

      {/* country detail */}
      <div className={`sheet${sheet === 'detail' ? ' up' : ''}`}>
        <div className="grab" />
        <div className="sheetbody">
          <div className={`badge ${isOn ? 'yes' : 'no'}`}>
            {isOn ? 'Been there together' : 'Not visited yet'}
          </div>
          <h2 className="cname">{current || 'Country'}</h2>
          <div className="cmeta">{current ? meta : '—'}</div>
          <div className="btnrow">
            <button
              type="button"
              className={`btn${isOn ? '' : ' solid'}`}
              onClick={() => { if (current) { playTapSound(); toggleVisited(current); } }}
            >
              {isOn ? 'Remove from our list' : 'Mark as visited'}
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => { playTapSound(); closeSheets(); }}
            >
              Close
            </button>
          </div>
          <div className="sectitle">
            <span>Photos</span>
            <span>
              {currentPhotos.length ? `${currentPhotos.length} ${currentPhotos.length === 1 ? 'photo' : 'photos'}` : ''}
            </span>
          </div>
          <div className="photos">
            <button type="button" className="addph" onClick={pickPhoto}>
              <b>＋</b>
              <small>add photo</small>
            </button>
            {currentPhotos.map((src, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={`ph${src ? '' : ' stripe'}`} key={`${current}-${i}`}>
                {src ? <img src={src} alt={`${current} memory`} /> : null}
              </div>
            ))}
          </div>
          {currentPhotos.length ? null : (
            <div className="empty">
              {isOn
                ? 'No photos yet. Add one from the trip.'
                : 'Mark it visited, then add photos from the trip.'}
            </div>
          )}
        </div>
      </div>

      {/* add country */}
      <div className={`sheet${sheet === 'add' ? ' up' : ''}`}>
        <div className="grab" />
        <div className="sheetbody">
          <div className="sectitle" style={{ marginTop: 6 }}>
            <span>Add a country</span>
            <span>{count} marked</span>
          </div>
          <div className="search">
            <span style={{ color: 'var(--ink-faint)', fontWeight: 700 }}>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries"
              autoComplete="off"
              aria-label="Search countries"
            />
          </div>
          <div className="list">
            {listed.map((name) => {
              const on = visited.has(name);
              return (
                <button
                  type="button"
                  className={`row${on ? ' on' : ''}`}
                  key={name}
                  onClick={() => { playTapSound(); toggleVisited(name); }}
                >
                  <span className="tick">✓</span>
                  <span>{name}</span>
                  {MICRO[name] && !on ? <span className="flagless">pin</span> : null}
                </button>
              );
            })}
            {listed.length ? null : <div className="empty">No country by that name.</div>}
          </div>
        </div>
      </div>

      <div className={`toast${toast.on ? ' show' : ''}`}>{toast.msg}</div>

      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={onPhotoChosen}
        style={{ display: 'none' }}
      />
    </div>
  );
}
