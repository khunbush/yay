export const memories2025 = Array.from({ length: 12 }, (_, i) => {
  /*
   * 🔒 LOCKED MEMORY SYSTEM — 2025
   * 
   * CORE RULE:
   * Existing months and their memories must NEVER be modified, overwritten, 
   * regenerated, reordered, or removed when adding new months.
   * Adding a new month must be ADDITIVE ONLY.
   *
   * MONTH IMMUTABILITY:
   * - Once a month is created, it is immutable.
   * - No auto-generation, restoration, or template replacement.
   * - No month content may be inferred or recreated.
   * - Only explicit developer override commands allow modification.
   *
   * APPEND-ONLY BEHAVIOR:
   * - Create new months as new 'if' blocks.
   * - DO NOT touch or reference previous months' content blocks.
   * - DO NOT rebuild the year structure.
   *
   * NAVIGATION & DATA INTEGRITY:
   * - Month order is fixed: Jan -> Feb -> Mar -> ...
   * - Never auto-fill missing months.
   * - Never create placeholder memories.
   * - Never infer or summarize developer content.
   */

  const date = new Date(2025, i, 1);
  const monthName = date.toLocaleString('default', { month: 'long' });
  
  let monthData = {
    monthIndex: i,
    monthName: monthName,
    memories: [
      {
        text: `(Paste ${monthName} story here...)`,
        photos: [
          `https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60`, 
          `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60`
        ]
      }
    ]
  };

  // Custom Content for January
  if (i === 0) {
    monthData.memories = [
      {
        text: `new year dai pap diew gor glub england eek laew but this time yark glub MAKKK,
yark pai norn gord ter tookkeun loeyy.
Bonchon was amazing!`,
        photos: [
          "/photos/8571eb70c_jan1.jpg",
          "/photos/eeae4e445_jan2.jpg"
        ]
      },
      {
        text: `glub mar england and Turkey here we go hahahhaha,
another trip in our books (i think our 5th country together already)
and this trip was amazing tar aow cat idolization ork pai.
i yark pai trip bab nee with terr tua loke loey
but macau is the dream.`,
        photos: [
          "/photos/d58c7bb40_jan3.jpg",
          "/photos/ee0abc497_jan4.jpg",
          "/photos/7f7a94cba_jan5.jpg"
        ]
      }
    ];
  }

  // Custom Content for February
  if (i === 1) {
    monthData.memories = [
      {
        text: `our first time in this rathbone gym, yuu mar gern 1 yr laew yung mai koey longe mar loey. our journey to slim is starting hehhehe.`,
        photos: [
          "/photos/b84d8bf40_feb1.jpg"
        ]
      },
      {
        text: `HAPPY VALENTINES, our 3rd valentine together and defo not our last. lets aim for atleast 70 valentines together.
eventhough my present wasnt too good, atleast we got to have matching bracelet that will be with us until our 70th valentines.
Ruk ter makmak loey naaa kon juay korng i.`,
        photos: [
          "/photos/d2ee61f36_feb2.jpg",
          "/photos/f05ae2ee7_feb3.jpg"
        ]
      },
      {
        text: `wont be in england without a liverpool trip. I am so grateful t mee fan tung suay tung doo ball gub i. thank the lord.
Newcastle this time is moo2, easy 2-0 we winning the league.`,
        photos: [
          "/photos/57b5628c7_feb4.jpg",
          "/photos/6ce94fffa_feb5.jpg",
          "/photos/03cda3a0f_feb6.jpg"
        ]
      }
    ];
  }

  // Custom Content for March
  if (i === 2) {
    monthData.memories = [
      {
        text: `after turkey gor mai lor char, copen torr and this shit was so hard. visa app gor yark and booking gor went so WRONG. what could go worst.
  update: yes it could go worst, we missed our flight and tong pai manchester to catch another one. rip 500 pound. hahahahha
  regardless copen was very nice with you and thank you u and ur friend for getting me a cake and celebrating my birthday in denmark AHHHAHA. copen hotdog was so damn delicious`,
        photos: [
          "/photos/18639a7fe_mar1.jpg"
        ]
      },
      {
        text: `even though my birthday was so fcking messed up cuz we went to copen and stuff, u still got me my FAV thing at the moment, vinyllllllllylylylly.
  tarm jai i makkkk sugar mummy korng i. thank you so muchhh i luvvv ittttt.
  21 now so im as old as you kid.`,
        photos: [
          "/photos/16cecc8c3_mar2.jpg",
          "/photos/f9fffbcc3_mar3.jpg"
        ]
      },
      {
        text: `anoother month another liverpool trip, this time we going to psg and lost in pens. wtf was nunez doing ffs.
  but i am so appreciative of u, i wanna go watch liverpool yes but i also want to go on trips with u and liverpool is the best excuse for us to go hehehheheh, i wanna spend time with u and have trips with u yurrrrrr2.
  next goal is to go to clayton kitchen`,
        photos: [
          "/photos/d97b183b8_mar4.jpg",
          "/photos/39205a184_mar5.jpg",
          "/photos/1761d5da9_mar6.jpg"
        ]
      }
    ];
  }

  // Custom Content for April
  if (i === 3) {
    monthData.memories = [
      {
        text: `starting off the month with a very depressing flight. i tong glub pai thai gorn u cuz i have to go yud military ffs.
  miss u so muchh and mai yark hai u yuuu kon dieww. ter rorng yur loeyy :(.
  will miss u so much but u will have a fun trip with ur friend in Nice.`,
        photos: [
          "/photos/652a1a82a_apr2.jpg"
        ]
      },
      {
        text: `ur cute ass nails`,
        photos: [
          "/photos/46d74d283_apr3.jpg"
        ]
      },
      {
        text: `miss u sh, please come back from nice alreadyyyyyy.
  roop hia makk 555555`,
        photos: [
          "/photos/311519649_apr4.jpg"
        ]
      },
      {
        text: `u finally came back. miss ter ja taiy yuu laewwwwww. ngao makk.
  glun mar krung nee rao fit makk, on the treadmill everyday hahaha and my foot is fcked as well.
  u also gave me a lesson on durian and it ended so badly. it was so shitt`,
        photos: [
          "/photos/a1a8a1ef3_apr6.jpg",
          "/photos/429ff68c6_apr7.jpg",
          "/photos/fb9de812f_apr8.jpg",
          "/photos/ec3cc8ee0_apr5.jpg"
        ]
      }
    ];
  }

  // Custom Content for May
  if (i === 4) {
    monthData.memories = [
      {
        text: `another stressful month, i tong tiw yur makkkkk and tong pai sorb kon diew in rathboneeee. hopefully first class`,
        photos: [
          "/photos/458ec7320_may1.jpg"
        ]
      },
      {
        text: `noted, meme's ring got to be atleast 5 Karat. ATLEAST, preferably 7 or more 55555.
  IF tao nunn and song feel neee.`,
        photos: [
          "/photos/dbdeb4af1_may2.jpg"
        ]
      },
      {
        text: `another lonely flight to the UK and fcking exams went alright.
  miss u makkkkk ur face ur belly and cute niang hehehe. yark gord terrrrrrr.
  torn pai england nee i ork tookwun loey cuz our goal is maldives in JAN!`,
        photos: [
          "/photos/74fc66cb6_may3.jpg",
          "/photos/8a1383150_may4.jpg",
          "/photos/4ee29c3d3_may5.jpg",
          "/photos/c349b95a6_may6.jpg"
        ]
      },
      {
        text: `during my fcking bullshit exam, ur brother got married!, but whats more shocking is how beautiful u were.
  wish i was there to see it in person :(.
  unnee tue war disrespectful cuz pokati guest ja mai suay gwar jao saow kanard nee.
  ....ur niece also rerm toh laew 555555`,
        photos: [
          "/photos/731664419_may7.jpg",
          "/photos/675acaa47_may8.jpg"
        ]
      }
    ];
  }

  // Custom Content for June
  if (i === 5) {
    monthData.memories = [
      {
        text: `another phukalini magnet bed trip, but this time my parent pai duay.
  was a good trip except my bro car not being able to go to the goat farm.
  atleast my girlfriend decided to be the prettiest and sexiest women in huahin that day.`,
        photos: [
          "/photos/7a0de7678_june1.jpg"
        ]
      },
      {
        text: `this month mai dai tum arai mak but prolly the month of kanori addiction.
  pai gin boi mak and sung mar boi makk22.
  bomb sauce is the goat.`,
        photos: [
          "/photos/b86f42991_june2.jpg",
          "/photos/fb89ac46c_june3.jpg"
        ]
      },
      {
        text: `this one at ur grandma birthday at hongpao 555555.
  what are the chances, prolly 1in100,000.
  fate is real.`,
        photos: [
          "/photos/6b5a4180e_june4.jpg"
        ]
      }
    ];
  }

  // Custom Content for July
  if (i === 6) {
    monthData.memories = [
      {
        text: `diew rao ja mee grad and italy trip soon so u par i pai shopping chood yhai 555555.
  ruek tae la un i mai chin loey tae doo d makk222 geng mak my fav stylist.
  we also both got honours!!!.
  gorn pai europe ofc gotta go macau 555555.
  unnee lion air 6am flight 5555 but it was very fun.
  the first day alone was worth it for the 30k i lost 555555.`,
        photos: [
          "/photos/56597c9f3_july1.jpg",
          "/photos/eacc9dd10_july2.jpg",
          "/photos/af9074e50_july3.jpg"
        ]
      },
      {
        text: `i tong bin pai gorn u cuz i tong pai france gornn,
  reeb tarm mar hai tun grad i 555555.
  MISS youuu`,
        photos: [
          "/photos/ddef47756_july4.jpg",
          "/photos/d14d47721_july5.jpg"
        ]
      },
      {
        text: `finally my GRRADUATIONN,
  tae rao gor yung mai job yuu d 555555.
  thank you u and ur mum for the present,
  chorb makkkmakamkamakmk loro suay mak lv perfect`,
        photos: [
          "/photos/f97657a7b_july6.jpg",
          "/photos/ceb62f6c0_july7.jpg"
        ]
      },
      {
        text: `europe trip with OUR FAMILY, wtf. wtf how did it happen 5555555.
  the trip was so fucking fun and nice.
  u suay tookwun loeyyyyyyyyyyyyyyyyyy.
  good first step, lets hope for moreee.
  roop mee pieb but the app will crash hahahahah`,
        photos: [
          "/photos/d5db776ec_july8.jpg",
          "/photos/2d4c8ea69_july9.jpg",
          "/photos/68509d05c_july10.jpg"
        ]
      },
      {
        text: `glub mar jark italy gor grad korng u loeyyyyyyy.
  congratulationss khon geng korng iiiiiiiii.
  upper 2nd is very good and shouldbe very proud of ittt.
  lets hope master will not be as hard 55555`,
        photos: [
          "/photos/5fadc88a3_july11.jpg",
          "/photos/b3bc2922a_july12.jpg"
        ]
      }
    ];
  }

  // Custom Content for August
  if (i === 7) {
    monthData.memories = [
      {
        text: `after a long fckin trip, this month chuey makk2 just relaxing.
  cute photo of my future fiance.`,
        photos: [
          "/photos/8e4dbf0c5_aug2.jpg",
          "/photos/89ed7753f_aug1.jpg"
        ]
      },
      {
        text: `this month, we had 2 addiction, first u introduced me to matcha.
  update: now im addicted as fuck and cant go a morning without it 55555555.
  trial matcha is the goat.
  ps. my first matcha in my life`,
        photos: [
          "/photos/c28cb8a57_aug3.jpg"
        ]
      },
      {
        text: `another addiction was massaging.
  rao pai bab twice a week dai 555555.
  healthland is the bestttttt`,
        photos: [
          "/photos/1fdbe37df_aug4.jpg"
        ]
      }
    ];
  }

  // Custom Content for September
  if (i === 8) {
    monthData.memories = [
      {
        text: `made this month so late because its such a stressful and downhill month even though we did so much :(.
  rerm ton sep duay japan trip double date with harru and pearl eventhough they broke up like 2 weeks ago 55555.
  first meal was amazing and this trip food was fckin good good good.
  only thing bad was the matcha and that rice bowl resto.`,
        photos: [
          "/photos/f70096650_sep1.jpg",
          "/photos/bebc0f90b_sep2.jpg",
          "/photos/7f072ff8b_sep3.jpg"
        ]
      },
      {
        text: `overall trip was very good, but one event fcked it all up.
  i am so sorry that this had to happen to you.
  it must be very fcking hard for you.
  i am so sorry but hopefully it all works out which i am sure it will`,
        photos: [
          "/photos/bba6e83ee_sep4.jpg",
          "/photos/e65e27b57_sep5.jpg",
          "/photos/803842916_sep6.jpg"
        ]
      },
      {
        text: `glub mar thai gor pai tum boon suk nhoiii.
  ur first ploi vua and kwaiyy.
  u wereso nrrrr.
  satu`,
        photos: [
          "/photos/6ece06c31_sep7.jpg"
        ]
      },
      {
        text: `my early anniversary gift from youuu.
  OMG I kode chorbbbbbbbb.
  so nostalgic and brings back my childhood memoryyy.
  ja mee krai choke d muen i maiii t dai u mar pen fan fr`,
        photos: [
          "/photos/6b2edf9e8_sep8.jpg",
          "/photos/b0d15116e_sep9.jpg"
        ]
      },
      {
        text: `our summer is over ffs, tae krung nee gor yark glub pai engladn yuu
  ja dai norn gord ter tung wun loeyyy and also our first class together (teun ten makkkkkk).
  hopefully our room is not that messy when we come back and our matcha ja por maiiiiiiii!!!`,
        photos: [
          "/photos/23e4939c2_sep10.jpg",
          "/photos/00025d514_sep11.jpg",
          "/photos/5cfff709a_sep12.jpg"
        ]
      }
    ];
  }

  // Custom Content for October
  if (i === 9) {
    monthData.memories = [
      {
        text: `master went off to a good start, we are actually going to classes ahhahhahha.
  im so happy loey and that was always the plan for me.
  i yark rien with terr because we didnt get to in school hahahaha,
  this way ja dai dern pai duay gun and chuay ngarn gun ngaiy keun duayyy.
  goitom so damn funny`,
        photos: [
          "/photos/935db8501_oct1.jpg"
        ]
      },
      {
        text: `omg meme is working hahaahha,
  fuck this is kinda hard master.
  ngarn rerm yur laew.
  i am so proud of u t u tum ngarnn SUSUU`,
        photos: [
          "/photos/7279cf41a_oct2.jpg",
          "/photos/1c01bc516_oct3.jpg"
        ]
      },
      {
        text: `Happy Anniversary babebbebbebbeyyy ,
  3 years already which is almost 15% of our lifetime,
  i am so glad that i go to spend my time with you during this stage of my life
  and i hope that you will stay and mai buer i in the next 60 years.
  i love you so much and i hope you like the dior and ganni heheheh`,
        photos: [
          "/photos/2ac1bebce_oct4.jpg"
        ]
      }
    ];
  }

  // Custom Content for November
  if (i === 10) {
    monthData.memories = [
      {
        text: `only one month in, we are bakers now and not just an amateur, but we are so fcking good.
  the cookie taste amazing but crepe kodeeee aroiiiii wtf,
  this might be a natural talent t tum hai i leum olino pai loey 555555.
  make this for me talord pai na kubb chef`,
        photos: [
          "/photos/78384383b_nov1.jpg",
          "/photos/9f472b778_nov2.jpg",
          "/photos/151e8f0ad_nov3.jpg"
        ]
      },
      {
        text: `our first football trip for the season and jur real madrid but omfg,
  liverpool played like a god and we won easily 5555555.
  the hotel was aight as well but the overall trip started very badly (my bad sorry 555)
  but ended very gooddddd .
  thank you t yung mar gub i yuuu :)`,
        photos: [
          "/photos/c030b7d33_nov4.jpg",
          "/photos/c7810a88f_nov5.jpg"
        ]
      },
      {
        text: `our field trip t uni 555555,
  lets hope for more of these and less of the presentations`,
        photos: [
          "/photos/167fbbc69_nov6.jpg",
          "/photos/a2612f72b_nov7.jpg"
        ]
      }
    ];
  }

  // Custom Content for December
  if (i === 11) {
    monthData.memories = [
      {
        text: `happy birthday na kaaaaa babeeeeeeeee,
  22 laew so one year closer to our marriage.
  kor hai you mks makk22 mee tae kon ruk
  (i ruk yuu laeww t sood nai loke)
  mee tae kon endoo
  (i gor endoo u sood yuu laew)
  and all your wishes and manifestation come true.
  i ruk you makk so lets stay healthy and rich until old.
  your birthday is a bit ruined cuz of me but i hope it turned out well
  pror its your special day.
  i mai koey yark tum hai u jeb on purpose yuu laew
  so im so dissapointed that i fcked it up
  tae next year will be a lot better`,
        photos: [
          "/photos/baca1be96_dec2.jpg",
          "/photos/ade4ad3d0_dec1.jpg"
        ]
      },
      {
        text: `this app gonna explode soon as too many photo,
  HAPPY NEW YEAR MEME,
  our next year resolution should be to lose 10kg and we will do it for sure.
  kwarm ruk rao gor ja mak keun pai took2wun.
  YAR BUER I PLEASEEEEEEE,
  i mai buer u loey tae i glua u buea i mak gwa :(
  on to 2026 which will be a very weird year
  pror rao ja rerm kao su adulthood and wai tum ngarn.
  hopefully that turns our well as well.
  will miss rathbone and london which is where we met :)`,
        photos: []
      }
    ];
  }

  return monthData;
});
