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
import { Heart, Star, Coffee, Film, Utensils, Clock } from "lucide-react";
import confetti from "canvas-confetti";

interface Answers {
  isAvailable: boolean | null;
  date: Date | null;
  time: string;
  food: string[];
  movie: string;
  excitement: number;
}

// Dynamic import of HeartBackground with no SSR
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
    excitement: 50,
  });

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

  const steps = [
    // Step 0: Initial Question
    <motion.div key="step0" className="text-center" {...fadeInUp}>
      <h1 className="text-4xl font-bold mb-6 text-pink-600">
        May I Take You On a Date?
      </h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHVmd2VtOGYzMnJ3MDlhNmo5cDJ1cjFtazMycWF2ZGhueW5qZmVuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XQiJigZpYQ9dKrrEbv/giphy.gif"
        alt="butt cheeks"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />
      <div className="space-x-4">
        <Button
          onClick={() => {
            handleAnswer("isAvailable", true);
            triggerConfetti();
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Freak yes!
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-pink-300 text-pink-500 hover:bg-pink-100 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Freak no!
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-pink-50 border-2 border-pink-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-pink-600">
                Ummmm, what the freak..
              </DialogTitle>
              <DialogDescription className="text-lg text-pink-500">
                I&apos;ll pretend I didn&apos;t see that...
              </DialogDescription>
            </DialogHeader>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTliemtmNmxwNnppOHphNjJiYXBnYTdqdWMyY3ZiZmVlOXp0eHA1MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/atFQviNRdKVxqAYyRK/giphy.gif"
              alt="Sad Cat Gif"
              className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
            />{" "}
            <Button
              onClick={() => {
                handleAnswer("isAvailable", true);
                triggerConfetti();
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Ok I take it back...
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>,

    // Step 1: Date and Time Selection
    <motion.div key="step1" className="text-center" {...fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-pink-600">
        YEEEESSSSSSS FINALLY, WHEN WE FEELING? :3
      </h2>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmgyZWt4enVjMzQxYmUyN3Q0YXJ0cWRjNTRrOTZvZXVyaTZ1b2Z4cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/NMlz9mhcZUI1GDd40H/giphy.gif"
        alt="67"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />
      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          mode="single"
          selected={answers.date || undefined}
          onSelect={(date) => setAnswers({ ...answers, date: date || null })}
          className="mx-auto mb-4"
        />
        <Select onValueChange={(time) => setAnswers({ ...answers, time })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <SelectItem
                key={hour}
                value={`${hour.toString().padStart(2, "0")}:00`}
              >
                {`${hour.toString().padStart(2, "0")}:00`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={!answers.date || !answers.time}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Clock className="mr-2 h-5 w-5" /> Set da date!{" "}
        <Heart className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>,

    // Step 2: Food Selection
    <motion.div key="step2" className="text-center" {...fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-pink-600">
        What food are you feeling? :3
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {[
          { name: "Korean Food", icon: <Utensils /> },
          { name: "Italian Food", icon: <Utensils /> },
          { name: "Japanese Food", icon: <Utensils /> },
          { name: "Thai Food", icon: <Utensils /> },
          { name: "Chinese Food", icon: <Utensils /> },
        ].map(({ name, icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-32 flex flex-col items-center justify-center rounded-lg shadow-md transition-colors duration-300 ${
              answers.food.includes(name)
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-600 hover:bg-pink-100"
            }`}
            onClick={() => {
              const newFood = answers.food.includes(name)
                ? answers.food.filter((f) => f !== name)
                : [...answers.food, name];
              setAnswers({ ...answers, food: newFood });
            }}
          >
            {icon}
            <span className="mt-2 font-semibold">{name}</span>
          </motion.button>
        ))}
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={answers.food.length === 0}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Mmmmm... ngh!
      </Button>
    </motion.div>,

    // Step 3:  Selection
    <motion.div key="step3" className="text-center" {...fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-pink-600">
        What activity calls to you? :3
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {[
          "Ice Skating",
          "Escape Room..",
          "Freaked Out at Top Golf",
          "Stay In",
          "Mastering a Craft",
          "Watch a Movie",
          "Bowling P2",
          "Music Room",
          "Something else",
        ].map((movie) => (
          <motion.button
            key={movie}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 hover:bg-pink-100 font-bold py-4 px-6 rounded-lg shadow-md transition-colors duration-300"
            onClick={() => {
              if (movie === "Something else") {
                const customMovie = prompt("What do you have in mind :P");
                if (customMovie) handleAnswer("movie", customMovie);
              } else {
                handleAnswer("movie", movie);
              }
            }}
          >
            <Film className="mx-auto mb-2" />
            {movie}
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Excitement Rating
    <motion.div key="step4" className="text-center" {...fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-pink-600">
        How are you feeling about the date? :3
      </h2>
      <div className="max-w-md mx-auto mb-6 p-4 bg-white rounded-lg shadow-lg">
        <motion.div className="relative h-6 mb-4">
          {[0, 25, 50, 75, 100].map((value) => (
            <motion.div
              key={value}
              className="absolute top-0 w-6 h-6 rounded-full bg-pink-300"
              style={{ left: `${value}%`, x: "-50%" }}
              animate={{ scale: answers.excitement === value ? 1.2 : 1 }}
            />
          ))}
        </motion.div>
        <Slider
          defaultValue={[50]}
          max={100}
          step={25}
          onValueChange={(value) =>
            setAnswers({ ...answers, excitement: value[0] })
          }
        />
        <div className="flex justify-between mt-2">
          <span>It&apos;s everywhere bro</span>
          <span>I'm gonna pee pee myself</span>
        </div>
      </div>
      <motion.div
        className="text-2xl font-bold text-pink-600 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        Freaked out level: {answers.excitement}%
      </motion.div>
      <Button
        onClick={() => {
          setStep(step + 1);
          setTimeout(triggerConfetti, 500);
        }}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
      >
        Yipee it&apos;s official!
      </Button>
    </motion.div>,

    // Step 5: Final Message
    <motion.div key="step5" className="text-center" {...fadeInUp}>
      <h2 className="text-4xl font-bold mb-6 text-pink-600">
        It&apos;s a date dookie bear!
      </h2>
      <p className="text-xl mb-2 text-pink-500">
        I can&apos;t wait to see you on:
      </p>
      <p className="text-2xl font-bold mb-6 text-pink-600">
        {answers.date?.toDateString()} at {answers.time}
      </p>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZyMW5vanllMG13ajdsbGUybTR6eDA2NGRoeXV2MGNremU2ejJnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c3EItuzhHN9MNZnkuo/giphy.gif"
        alt="Feet"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />{" "}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Star className="text-yellow-400 w-16 h-16 mx-auto mt-6" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-6 text-lg text-pink-500"
      >
        <p>We&apos;ll munch on some {answers.food.join(", ")}.</p>
        <p>Then we&apos;ll dabble in &quot;{answers.movie}&quot; together.</p>
        <p className="mt-4 font-bold">
          Your freaked out level: {answers.excitement}/100
        </p>
      </motion.div>
    </motion.div>,
  ];

  useEffect(() => {
    const saveAnswers = async () => {
      console.log("Saved answers:", answers);

      // Save to localStorage
      localStorage.setItem("dateProposalAnswers", JSON.stringify(answers));

      // Send to your email
      try {
        await fetch("/api/send-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });
      } catch (error) {
        console.error("Failed to send response:", error);
      }
    };

    if (step === steps.length - 1) {
      saveAnswers();
    }
  }, [step, answers, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-pink-100 flex items-center justify-center p-4">
      <Suspense fallback={null}>
        <HeartBackground />
      </Suspense>
      <motion.div
        className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
      </motion.div>
    </div>
  );
}
