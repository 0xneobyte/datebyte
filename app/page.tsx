"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Coffee, Film, Utensils, Clock, HelpCircle, Gamepad2, ShoppingBag, PlusCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import ThemedCard from "@/components/ThemedCard";
import Sparkles from "@/components/Sparkles";
import FloatingOrbs from "@/components/FloatingOrbs";
import FairyFooter from "@/components/FairyFooter";
import StepCard from "@/components/StepCard";
import SelectButton from "@/components/SelectButton";

interface Answers {
  isAvailable: boolean | null;
  date: Date | null;
  time: string;
  food: string[];
  movie: string;
  activity: string;
  excitement: number;
}


const HeartBackground = dynamic(() => import("@/components/HeartBackground"), {
  ssr: false,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

export default function EnchantingDateProposalApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    isAvailable: null,
    date: null,
    time: "",
    food: [],
    movie: "",
    activity: "",
    excitement: 50,
  });

  const [hour, setHour] = useState<string>("7");
  const [minute, setMinute] = useState<string>("00");
  const [ampm, setAmpm] = useState<string>("PM");
  const [showInput, setShowInput] = useState(false);
  const [customInput, setCustomInput] = useState("");

  useEffect(() => {
    setAnswers((prev) => ({ ...prev, time: `${hour}:${minute} ${ampm}` }));
  }, [hour, minute, ampm]);

  const handleAnswer = (key: keyof Answers, value: Answers[keyof Answers]) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    try {
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return d.toDateString();
    }
  };

  const steps = [
    
    <motion.div key="step0" className="text-center" {...fadeInUp}>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">
        My dearest, purple enthusiast
        <span className="block mt-4 text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-600">
              Would you go see Spider-Man: Brand New Day with me?
        </span>
      </h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media1.tenor.com/m/nzwXJrBLS4gAAAAd/andrew-garfield.gif"
        alt="Andrew Garfield flower gif"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />
      <div className="space-x-4">
        <Button
          onClick={() => {
            handleAnswer("isAvailable", true);
            triggerConfetti();
          }}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
        >
          Yes!!!
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-500 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              'yoko nga
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-purple-50 border-2 border-purple-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-600">
                Please
              </DialogTitle>
              <DialogDescription className="text-lg text-purple-500">
                please, please, please 
              </DialogDescription>
            </DialogHeader>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://media1.tenor.com/m/fRSVfm6M0ncAAAAd/gwen-amazing-spiderman.gif"
              alt="Gwen Stacy gif"
              className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
            />{" "}
            <Button
              onClick={() => {
                handleAnswer("isAvailable", true);
                triggerConfetti();
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Okay, fine...
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>,

    
    <motion.div key="step1" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={1} totalSteps={5}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-600">
        Yay! When tayo
      </h2>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media.tenor.com/WiQQRwR2QFAAAAAi/cute-panda.gif"
        alt="Excited bear gif"
        className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-2xl shadow-purple-300/30"
      />
      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          mode="single"
          selected={answers.date || undefined}
          onSelect={(date) => setAnswers({ ...answers, date: date || null })}
          className="mx-auto mb-4 w-full max-w-md"
        />
        <div className="flex gap-3 justify-center mt-4">
          <Select onValueChange={(val) => setHour(val)}>
            <SelectTrigger className="w-24 bg-purple-50 border-purple-200 text-purple-700">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <SelectItem key={h} value={`${h}`}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setMinute(val)}>
            <SelectTrigger className="w-20 bg-purple-50 border-purple-200 text-purple-700">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {['00', '15', '30', '45'].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setAmpm(val)}>
            <SelectTrigger className="w-20 bg-purple-50 border-purple-200 text-purple-700">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              {['AM', 'PM'].map((ap) => (
                <SelectItem key={ap} value={ap}>
                  {ap}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={!answers.date || !answers.time}
        className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
      >
        <Clock className="mr-2 h-5 w-5" /> Set our date!{" "}
        <Heart className="ml-2 h-5 w-5" />
      </Button>
      </StepCard>
    </motion.div>,

  
    <motion.div key="step2" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={2} totalSteps={5}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-600">
        Whatchu wanna eat
      </h2>
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {[
          { name: "Coffee or Tea, Kapit bisig!", icon: <Coffee className="w-6 h-6" /> },
          { name: "Burger", icon: <Utensils className="w-6 h-6" /> },
          { name: "Wings", icon: <Utensils className="w-6 h-6" /> },
          { name: "Fries", icon: <Utensils className="w-6 h-6" /> },
          { name: "''Kahit ano''", icon: <Utensils className="w-6 h-6" /> },
        ].map(({ name, icon }) => (
          <SelectButton
            key={name}
            icon={icon}
            label={name}
            isSelected={answers.food.includes(name)}
            onClick={() => {
              const newFood = answers.food.includes(name)
                ? answers.food.filter((f) => f !== name)
                : [...answers.food, name];
              setAnswers({ ...answers, food: newFood });
            }}
          />
        ))}
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={answers.food.length === 0}
        className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
      >
        Looks delicious! 🍽️
      </Button>
      </StepCard>
    </motion.div>,

     
    <motion.div key="step3" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={3} totalSteps={5}></StepCard>
    <h2 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-fuchsia-600">
      What do you wanna do after?
    </h2>

  {!showInput ? (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {[
        { name: "Bowling", icon: <HelpCircle className="mx-auto mb-2 w-6 h-6" /> }, // Or use a custom SVG / icon of choice
        { name: "Arcade", icon: <Gamepad2 className="mx-auto mb-2 w-6 h-6" /> },
        { name: "Something else", icon: <PlusCircle className="mx-auto mb-2 w-6 h-6" /> },
      ].map((activity) => (
        <motion.button
          key={activity.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 hover:bg-purple-100 font-bold py-4 px-6 rounded-lg shadow-md transition-colors duration-300 flex flex-col items-center justify-center border border-purple-100"
          onClick={() => {
            if (activity.name === "Something else") {
              setShowInput(true);
            } else {
              handleAnswer("activity", activity.name);
            }
          }}
        >
          {activity.icon}
          {activity.name}
        </motion.button>
      ))}
    </div>
  ) : (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-purple-100 mb-6"
    >
      <label className="block text-purple-600 font-bold mb-3 text-lg">
        What do you have in mind? 💭
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-700 bg-purple-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && customInput.trim()) {
              handleAnswer("activity", customInput);
            }
          }}
        />
        <button
          onClick={() => {
            if (customInput.trim()) {
              handleAnswer("activity", customInput);
            }
          }}
          disabled={!customInput.trim()}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white p-2 rounded-full transition-all duration-300"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <button 
        onClick={() => setShowInput(false)}
        className="text-xs text-purple-400 hover:text-purple-600 mt-4 underline block mx-auto"
      >
        Go back to options
      </button>
    </motion.div>
  )}
</motion.div>,

    
    <motion.div key="step4" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={4} totalSteps={5}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-600">
        How excited are you for our date?
      </h2>
      <div className="max-w-lg mx-auto mb-8 p-8 bg-gradient-to-b from-white/80 to-purple-50/60 rounded-2xl shadow-lg border border-purple-100">
        <Slider
          defaultValue={[50]}
          max={100}
          step={25}
          onValueChange={(value) =>
            setAnswers({ ...answers, excitement: value[0] })
          }
        />
        <div className="flex justify-between mt-6 text-sm text-purple-600 font-semibold">
          <span>😐 Saks lang</span>
          <span>🤩 Super duper excited!</span>
        </div>
      </div>
      <motion.div
        className="text-4xl font-playfair font-bold text-purple-600 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        Excitement level: <span className="text-purple-500">{answers.excitement}%</span>
      </motion.div>
      <Button
        onClick={() => {
          setStep(step + 1);
          setTimeout(triggerConfetti, 500);
        }}
        className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
      >
        Real eyes realize!
      </Button>
      </StepCard>
    </motion.div>,

     
    <motion.div key="step5" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={5} totalSteps={5}>
      <h2 className="text-5xl sm:text-6xl font-playfair font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">
        Legit ba'to o legit bato?
      </h2>
      <p className="text-lg text-rose-500 mb-3 font-poppins">
        I can&apos;t wait to see you on:
      </p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="inline-block bg-gradient-to-r from-purple-100 to-red-100 px-6 py-4 rounded-2xl border border-purple-200 mb-8"
      >
        <p className="text-3xl font-playfair font-bold text-purple-700">
          {formatDate(answers.date)} at {answers.time}
        </p>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media1.tenor.com/m/qyOPpMVREs8AAAAC/running-man-bato-dela-rosa.gif"
        alt="legit bato"
        className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-2xl shadow-purple-300/30"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Heart className="text-red-500 w-16 h-16 mx-auto mt-6 animate-pulse" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 space-y-3 text-lg text-purple-600 font-poppins"
      >
        <p className="text-base">We&apos;ll enjoy some delicious <span className="font-semibold">{answers.food.join(", ")}</span>.</p>
        <p className="text-base">Then we&apos;ll do <span className="font-semibold italic">&quot;{answers.activity}&quot;</span> together.</p>
        <p className="text-xl font-playfair font-bold mt-6">
          Your excitement level: <span className="text-purple-600">{answers.excitement}/100</span>
        </p>
      </motion.div>
      </StepCard>
    </motion.div>,
  ];

  useEffect(() => {
    const saveAnswers = async () => {
      console.log('Saved answers:', answers);
      
      // Save to localStorage
      localStorage.setItem('dateProposalAnswers', JSON.stringify(answers));

      // Send to your email
      try {
        await fetch('/api/send-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers)
        });
      } catch (error) {
        console.error('Failed to send response:', error);
      }
    };

    if (step === steps.length - 1) {
      saveAnswers();
    }
  }, [step, answers, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-red-50 to-purple-100 flex items-center justify-center p-6">
      <Suspense fallback={null}>
        <HeartBackground />
      </Suspense>
      <div className="relative w-full max-w-3xl">
        <FloatingOrbs />
        <ThemedCard>
          <Sparkles count={18} />
          <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
        </ThemedCard>
        <FairyFooter />
      </div>
    </div>
  );
}
