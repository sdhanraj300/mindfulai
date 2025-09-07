"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BookOpen, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

// Import hero images
import mindImage from "../../public/assets/mind.png";
import meditationImage from "../../public/assets/meditation.png";
import supportImage from "../../public/assets/support.png";

// Import feature images
import botImage from "../../public/assets/bot.png";
import helpImage from "../../public/assets/help.png";
import loveImage from "../../public/assets/love.png";

// Import resource images
import anxietyImage from "../../public/assets/anxiety.png";
import depressionImage from "../../public/assets/depression.png";
import stressImage from "../../public/assets/stress.png";
import exerciseImage from "../../public/assets/exercise.png";
import sleepImage from "../../public/assets/sleep.png";
import nutritionImage from "../../public/assets/nutrition.png";
import journalingImage from "../../public/assets/journaling.png";
import gratitudeImage from "../../public/assets/gratitude.png";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentUser={undefined}
      />
      <BackgroundLines className="min-h-screen w-full font-mono flex flex-col items-center text-slate-800 dark:text-slate-100 overflow-x-hidden">
        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full min-h-screen justify-center flex flex-col items-center gap-6"
          >
            {/* Floating hero images */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-10 left-10 md:left-20"
              >
                <Image
                  src={meditationImage}
                  alt="Meditation"
                  width={120}
                  height={120}
                  className="rounded-full shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute top-20 right-10 md:right-20"
              >
                <Image
                  src={supportImage}
                  alt="Support"
                  width={100}
                  height={100}
                  className="rounded-full shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute bottom-20 left-16 md:left-32"
              >
                <Image
                  src={mindImage}
                  alt="Mind wellness"
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-6xl dark:text-primary font-bold relative z-10">
              Your Safe Space for Mental Wellness
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-slate-600 dark:text-slate-300">
              MindfulAI offers a supportive companion for your mental health
              journey. Chat, learn, and grow in a secure and calming
              environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/chat" passHref>
                <Button
                  variant="default"
                  className="hover:cursor-pointer dark:bg-slate-800 border border-2 border-slate-600 dark:border-red-300 dark:text-primary font-semibold rounded-full px-8 py-6 shadow-lg transition-all duration-300 text-lg flex items-center gap-2 hover:shadow-xl hover:scale-105"
                >
                  Start a Conversation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/articles" passHref>
                <Button
                  variant="outline"
                  className="border-2 hover:cursor-pointer font-semibold rounded-full px-8 py-6 shadow-lg text-lg border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-105"
                >
                  Explore Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section className="w-full py-20 font-mono px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-mono mb-4 text-slate-800 dark:text-slate-100">
              Features to Support You
            </h2>
            <p className="text-lg mb-12 text-slate-600 dark:text-slate-300">
              Everything you need to foster a healthier mind.
            </p>
            <div className="grid font-mono md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <Image
                      src={botImage}
                      alt="AI Chat"
                      width={80}
                      height={80}
                      className="rounded-full shadow-lg"
                    />
                  ),
                  title: "AI-Powered Chat",
                  description:
                    "Engage in meaningful conversations with our empathetic AI, available 24/7.",
                },
                {
                  icon: (
                    <Image
                      src={helpImage}
                      alt="Help Resources"
                      width={80}
                      height={80}
                      className="rounded-full shadow-lg"
                    />
                  ),
                  title: "Resourceful Articles",
                  description:
                    "Access a curated library of articles and guides on various mental health topics.",
                },
                {
                  icon: (
                    <Image
                      src={loveImage}
                      alt="Personalized Care"
                      width={80}
                      height={80}
                      className="rounded-full shadow-lg"
                    />
                  ),
                  title: "Personalized Journey",
                  description:
                    "Receive personalized insights and resources tailored to your unique needs.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {feature.icon}
                  <h3 className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mental Health Resources Section */}
        <section className="w-full py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Mental Health Topics We Cover
            </h2>
            <p className="text-lg mb-12 text-slate-600 dark:text-slate-300">
              Explore resources and guidance on various aspects of mental
              wellness
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  image: anxietyImage,
                  title: "Anxiety Support",
                  alt: "Anxiety management",
                },
                {
                  image: depressionImage,
                  title: "Depression Help",
                  alt: "Depression support",
                },
                {
                  image: stressImage,
                  title: "Stress Relief",
                  alt: "Stress management",
                },
                {
                  image: exerciseImage,
                  title: "Physical Wellness",
                  alt: "Exercise and fitness",
                },
                {
                  image: sleepImage,
                  title: "Better Sleep",
                  alt: "Sleep improvement",
                },
                {
                  image: nutritionImage,
                  title: "Nutrition",
                  alt: "Healthy eating",
                },
                {
                  image: journalingImage,
                  title: "Journaling",
                  alt: "Mental health journaling",
                },
                {
                  image: gratitudeImage,
                  title: "Gratitude Practice",
                  alt: "Gratitude exercises",
                },
              ].map((resource, i) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:border-purple-300 dark:group-hover:border-purple-600">
                    <Image
                      src={resource.image}
                      alt={resource.alt}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full shadow-sm group-hover:shadow-md transition-all duration-300"
                    />
                    <h3 className="mt-3 font-semibold text-slate-800 dark:text-slate-100 text-sm">
                      {resource.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg mb-8 text-slate-600 dark:text-slate-300">
              Create an account to get started. It&apos;s free and only takes a
              minute.
            </p>
            <Link href="/sign-up" passHref>
              <Button className="font-semibold rounded-full px-10 py-6 shadow-lg transition-all duration-300 text-xl flex items-center gap-3 hover:cursor-pointer hover:shadow-xl hover:scale-105">
                Sign Up for Free <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </section>
      </BackgroundLines>
    </>
  );
}
