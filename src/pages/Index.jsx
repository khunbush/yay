import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Lock, Unlock, HelpCircle } from "lucide-react";
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSuperHint, setShowSuperHint] = useState(false);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = () => {
    const cleanedAnswer = answer.trim().toLowerCase();
    
    if (cleanedAnswer === "avatar") {
      sessionStorage.setItem('bushy_meme_unlocked', 'true');
      setIsUnlocking(true);
      setTimeout(() => {
        navigate(createPageUrl('Years'));
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-center relative overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      {/* Background decoration with breathing animation */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] rounded-full blur-[100px] opacity-40 pointer-events-none"
        animate={{ 
          background: [
            "radial-gradient(circle, rgb(219, 234, 254) 0%, rgb(251, 207, 232) 100%)",
            "radial-gradient(circle, rgb(237, 233, 254) 0%, rgb(219, 234, 254) 100%)",
            "radial-gradient(circle, rgb(254, 242, 242) 0%, rgb(219, 234, 254) 100%)",
            "radial-gradient(circle, rgb(219, 234, 254) 0%, rgb(251, 207, 232) 100%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[30%] rounded-full blur-[100px] opacity-40 pointer-events-none"
        animate={{ 
          background: [
            "radial-gradient(circle, rgb(251, 207, 232) 0%, rgb(237, 233, 254) 100%)",
            "radial-gradient(circle, rgb(219, 234, 254) 0%, rgb(254, 242, 242) 100%)",
            "radial-gradient(circle, rgb(237, 233, 254) 0%, rgb(219, 234, 254) 100%)",
            "radial-gradient(circle, rgb(251, 207, 232) 0%, rgb(237, 233, 254) 100%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
      />

      <AnimatePresence>
        {!isUnlocking ? (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full max-w-xs space-y-8 z-10"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.06, 1],
                  opacity: 1
                }}
                whileTap={{ 
                  scale: [1, 0.9, 1.08],
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                }}
                transition={{ 
                  scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.4, delay: 0.2 }
                }}
              >
                <Heart className="w-12 h-12 mx-auto text-rose-300 mb-4 fill-rose-100" />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold tracking-tight text-slate-700"
                initial={{ opacity: 0, y: 8, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "-0.025em" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                Bushy & Meme 2025
              </motion.h1>
              <motion.p 
                className="text-slate-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                What movie did we first watch together?
              </motion.p>
            </div>

            <motion.div 
              animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Input 
                  type="text" 
                  placeholder="Type answer..." 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-center h-14 text-lg rounded-2xl border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-200/50 bg-white/60 backdrop-blur-sm shadow-sm transition-all placeholder:text-slate-400 text-slate-700"
                  style={{
                    boxShadow: error ? '0 0 0 2px rgba(251, 207, 232, 0.3)' : undefined
                  }}
                />
              </motion.div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium"
                  style={{ color: 'rgb(251, 207, 232)' }}
                >
                  Not quite—try again 💙
                </motion.p>
              )}
            </motion.div>

            <div className="space-y-4 pt-2">
              <motion.div 
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 20px 25px -5px rgb(221, 214, 254, 0.4), 0 10px 10px -5px rgb(221, 214, 254, 0.2)"
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.div
                  className="w-full h-14 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 shadow-lg shadow-purple-100 overflow-hidden relative cursor-pointer"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                  onClick={() => { playTapSound(); handleUnlock(); }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg relative z-10">
                      Unlock
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 2, opacity: [0.3, 0] }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>

              <div className="flex flex-col items-center gap-3">
                <div className="h-8 flex items-center justify-center">
                  {!showHint ? (
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => { playTapSound(); setShowHint(true); }}
                        className="text-slate-400 hover:text-blue-500 hover:bg-transparent transition-colors text-xs"
                      >
                        Show hint
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", damping: 15, duration: 0.25 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full relative">
                        <HelpCircle className="w-3 h-3 text-blue-500" />
                        <motion.span 
                          className="text-sm font-medium text-blue-500 relative"
                          animate={{
                            textShadow: [
                              "0 0 8px rgba(59, 130, 246, 0.3)",
                              "0 0 12px rgba(59, 130, 246, 0.5)",
                              "0 0 8px rgba(59, 130, 246, 0.3)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          think blue
                          <motion.span
                            className="absolute bottom-0 left-0 h-[1px] bg-blue-400"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          />
                        </motion.span>
                      </div>

                      {!showSuperHint && (
                        <motion.button
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.2 }}
                          whileTap={{ scale: 0.97 }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 4px 12px rgba(148, 163, 184, 0.2)"
                          }}
                          onClick={() => { playTapSound(); setShowSuperHint(true); }}
                          className="text-xs text-slate-500 hover:text-blue-500 transition-all font-medium flex items-center gap-1 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50 shadow-sm"
                        >
                          Super hint 🤫
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {showSuperHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-gradient-to-br from-blue-100 to-cyan-50 px-4 py-3 rounded-2xl shadow-lg border border-blue-200/50 relative overflow-hidden"
                      style={{
                        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.15)"
                      }}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl" />
                      <div className="relative z-10 flex items-start gap-2">
                        <motion.span
                          animate={{ 
                            rotate: [0, 14, -8, 14, 0]
                          }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className="text-lg"
                        >
                          👋
                        </motion.span>
                        <div>
                          <p className="text-sm font-medium text-blue-700 leading-relaxed">
                            It's a movie with tall blue aliens...
                          </p>
                          <p className="text-xs text-blue-500/70 mt-1">
                            You know this one! 💙
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1,
              scale: 1.05,
              background: [
                "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(254, 242, 242) 100%)",
                "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(255, 255, 255) 100%)"
              ]
            }}
            transition={{ 
              opacity: { duration: 0.4 },
              scale: { duration: 1.2, ease: "easeOut" },
              background: { duration: 1.2 }
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 15], 
                opacity: [1, 1, 0] 
              }}
              transition={{ 
                duration: 1.2, 
                times: [0, 0.4, 1],
                ease: [0.2, 0.8, 0.2, 1]
              }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 bg-rose-400 rounded-full blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.3, 0]
                }}
                transition={{ duration: 1.2 }}
              />
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500 relative z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
