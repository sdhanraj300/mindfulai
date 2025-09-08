"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Import hero images
import mindImage from "../../../public/assets/mind.png";
import meditationImage from "../../../public/assets/meditation.png";
import supportImage from "../../../public/assets/support.png";
import loveImage from "../../../public/assets/love.png";

export const HeroSection = () => {
    return (
        <main className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-20 relative">
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
                            className="rounded-full shadow-lg dark:shadow-xl dark:shadow-purple-500/20"
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
                            className="rounded-full shadow-lg dark:shadow-xl dark:shadow-blue-500/20"
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
                            className="rounded-full shadow-lg dark:shadow-xl dark:shadow-green-500/20"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="absolute bottom-20 right-16 md:right-32"
                    >
                        <Image
                            src={loveImage}
                            alt="Love and Compassion"
                            width={80}
                            height={80}
                            className="rounded-full shadow-lg dark:shadow-xl dark:shadow-pink-500/20"
                        />
                    </motion.div>
                </div>

                {/* Hero content */}
                <i>
                    <h1 className="text-5xl md:text-6xl dark:text-primary text-pink-500 font-mono font-bold relative z-10">
                        MindfulAI
                    </h1>
                </i>
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
                            className="hover:cursor-pointer dark:bg-slate-800 border-2 border-slate-600 dark:border-red-300 dark:text-primary font-semibold rounded-full px-8 py-6 shadow-lg transition-all duration-300 text-lg flex items-center gap-2 hover:shadow-xl hover:scale-105"
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
    );
};
