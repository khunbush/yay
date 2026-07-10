import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, HelpCircle, ChevronDown } from "lucide-react";

export default function SecretFAQ() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    playTapSound();
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="min-h-screen bg-blue-50 pb-12 font-sans">
      <style>{`
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <header className="bg-blue-50/90 backdrop-blur-xl sticky top-0 z-20 pt-12 pb-6 px-6 flex items-center gap-4">
        <Link to={createPageUrl('Overview')} onClick={playTapSound}>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-slate-700">Meme's FAQ</h1>
      </header>

      {/* Content */}
      <div className="p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* FAQ Item 4 - Collapsible */}
          <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] shadow-sm border border-white/50 overflow-hidden">
            <button 
              onClick={toggleExpand}
              className="w-full p-8 flex items-center justify-between gap-4 text-left hover:bg-white/30 transition-all"
            >
              <h3 className="font-bold text-slate-700 text-lg">tm i teung ruk u</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 pt-2 space-y-3">
                    {[
                      "you nr t sood nai loke loey",
                      "you pen kon jit jaiy d chorb chuay luer kong eun songsarn kon eun",
                      "you are beautiful, eventhough i doo personality pen lhuk but you suay gern t mun tong pen one of the reason",
                      "your face is perfect and aeb huen nhoi but your body is perfect as well",
                      "you pen kon t pooyhai ruk lae endoo",
                      "my family endoo you and approves you",
                      "you pen kon t ruk family and por mae",
                      "you pen kon t loyal lae pen kon t jing jai which is the most importnat thing",
                      "you support my hobbies and my likings",
                      "you and me have similar interest and likes which mun sumkun makk",
                      "you ruk I mak tae i gor ruk you mak gwar nun eek yurr",
                      "you pen kon t mai nar buea and mee arai hai i discover talord",
                      "teung u ja pen kon buea ngaiy tae u gor pyy mai buea i which i really apreciate",
                      "our family gor mai dai mee punhar arai gun which is perfect",
                      "you make effort to do this and that for our relaationship",
                      "you are very open which is good",
                      "i feel the most comfortable when im with you :)",
                      "there is so much more but to end it off, you are beautiful and kindhearted krai ja mai ruk"
                    ].map((text, idx) => {
                      const colors = [
                        { bg: 'bg-pink-50/80', badge: 'bg-pink-200/70' },
                        { bg: 'bg-purple-50/80', badge: 'bg-purple-200/70' },
                        { bg: 'bg-blue-50/80', badge: 'bg-blue-200/70' },
                        { bg: 'bg-emerald-50/80', badge: 'bg-emerald-200/70' }
                      ];
                      const colorSet = colors[idx % 4];
                      
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: idx * 0.06, 
                            duration: 0.4,
                            ease: "easeOut"
                          }}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`${colorSet.bg} rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group cursor-default`}
                        >
                          <motion.div 
                            className={`${colorSet.badge} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-slate-700 font-bold text-sm">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </motion.div>
                          <p className="text-slate-700 leading-relaxed text-[15px]">
                            {text}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
