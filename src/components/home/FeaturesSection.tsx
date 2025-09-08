"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import mindImage from "../../../public/assets/mind.png";
import supportImage from "../../../public/assets/support.png";
import loveImage from "../../../public/assets/love.png";

const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: custom * 0.2,
        },
    }),
};

export default function FeaturesSection() {
    const features = [
        {
            icon: (
                <Image
                    src={mindImage}
                    alt="AI-Powered Chat"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg dark:shadow-xl dark:shadow-purple-500/30"
                />
            ),
            title: "AI-Powered Chat",
            description:
                "Engage in meaningful conversations with our empathetic AI companion trained in mental health support.",
        },
        {
            icon: (
                <Image
                    src={supportImage}
                    alt="Resourceful Articles"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg dark:shadow-xl dark:shadow-blue-500/30"
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
                    className="rounded-full shadow-lg dark:shadow-xl dark:shadow-pink-500/30"
                />
            ),
            title: "Personalized Journey",
            description:
                "Receive personalized insights and resources tailored to your unique needs.",
        },
    ];

    return (
        <section className="w-full py-20 px-6 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    How MindfulAI Supports You
                </h2>
                <p className="text-lg mb-12 text-slate-600 dark:text-slate-300">
                    Discover the powerful features designed to support your mental
                    wellness journey
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
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
    );
}
