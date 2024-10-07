"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Coffee, Pizza, Popcorn, Frown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";

const FloatingEmoji = ({ emoji }: { emoji: string }) => (
  <motion.div
    className="absolute text-4xl"
    initial={{ opacity: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0],
      y: [0, -50, -100],
      x: Math.random() * 200 - 100,
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    }}
  >
    {emoji}
  </motion.div>
);

export default function Component() {
  const [step, setStep] = useState<
    "initial" | "dateOptions" | "confirmed" | "rejected"
  >("initial");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const dateOptions = [
    { emoji: "☕", text: "Coffee Date", icon: Coffee },
    { emoji: "🍕", text: "Pizza Night", icon: Pizza },
    { emoji: "🎬", text: "Movie Time", icon: Popcorn },
  ];

  const handleYes = () => {
    setStep("dateOptions");
    setBgColor("#ffffff");
  };

  const handleNo = () => {
    setBgColor("#ffcccb");
    setShowConfirmDialog(true);
  };

  const handleConfirmNo = () => {
    setShowConfirmDialog(false);
    setStep("rejected");
    setBgColor("#ffffff");
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setStep("confirmed");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setInterval(() => {
      setBgColor(`hsl(${Math.random() * 360}, 100%, 95%)`);
    }, 2000);
  };

  const getHeaderContent = () => {
    switch (step) {
      case "initial":
        return {
          title: "Hey there, Cutie! 💖",
          description:
            "I've been gathering up some courage to ask you something...",
        };
      case "dateOptions":
        return {
          title: "Yay! You said yes! 🎉",
          description: "Now, let's pick the perfect date idea...",
        };
      case "confirmed":
        return {
          title: "It's a date! 😍",
          description: "I can't wait to spend time with you!",
        };
      case "rejected":
        return {
          title: "Aw, maybe next time? 😊",
          description: "No worries, I still think you're awesome!",
        };
      default:
        return {
          title: "Hey there, Cutie! 💖",
          description:
            "I've been gathering up some courage to ask you something...",
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <Card
      className="w-full max-w-md mx-auto relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      {showConfetti && <Confetti width={400} height={400} recycle={false} />}
      {(step === "confirmed" || step === "rejected") && (
        <>
          <FloatingEmoji emoji={step === "confirmed" ? "💖" : "😢"} />
          <FloatingEmoji emoji={step === "confirmed" ? "😍" : "💔"} />
          <FloatingEmoji emoji={step === "confirmed" ? "🎉" : "😿"} />
        </>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {headerContent.title}
        </CardTitle>
        <CardDescription className="text-center">
          {headerContent.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === "initial" && (
            <motion.div
              key="initial"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-2" />
              <p className="text-lg font-semibold mb-4">Wanna go on a date?</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleYes}>Yes</Button>
                <Button variant="outline" onClick={handleNo}>
                  No
                </Button>
              </div>
            </motion.div>
          )}
          {step === "dateOptions" && (
            <motion.div
              key="dateOptions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-3 gap-4">
                {dateOptions.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outline"
                      className="w-full h-full flex flex-col items-center justify-center py-4"
                      onClick={() => handleDateSelection(option.text)}
                    >
                      <option.icon className="w-8 h-8 mb-2" />
                      <span className="text-sm">{option.text}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {step === "confirmed" && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-2xl font-bold mb-4">🎉 It&apos;s a date! 🎉</p>
              <p className="text-lg">
                Get ready for our amazing{" "}
                <span className="font-semibold">{selectedDate}</span>!
              </p>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-6xl mt-4"
              >
                {
                  dateOptions.find((option) => option.text === selectedDate)
                    ?.emoji
                }
              </motion.div>
            </motion.div>
          )}
          {step === "rejected" && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Frown className="w-16 h-16 text-gray-500 mx-auto mb-2" />
              <p className="text-xl font-semibold mb-4">Aww, that&apos;s okay!</p>
              <p className="text-lg mb-4">
                Maybe we can hang out as friends sometime?
              </p>
              <Button onClick={() => setStep("initial")}>Ask me again?</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-center">
        {step === "dateOptions" && (
          <p className="text-sm text-muted-foreground">
            Choose a date option above!
          </p>
        )}
      </CardFooter>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You&apos;re about to say no to an amazing date! Are you absolutely
              certain?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={() => setShowConfirmDialog(false)}>
              <Check className="mr-2 h-4 w-4" /> I changed my mind
            </Button>
            <Button variant="outline" onClick={handleConfirmNo}>
              <X className="mr-2 h-4 w-4" /> Yes, I&apos;m sure
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
