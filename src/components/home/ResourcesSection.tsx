"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import anxietyImage from "../../../public/assets/anxiety.png";
import depressionImage from "../../../public/assets/depression.png";
import stressImage from "../../../public/assets/stress.png";
import exerciseImage from "../../../public/assets/exercise.png";
import sleepImage from "../../../public/assets/sleep.png";
import nutritionImage from "../../../public/assets/nutrition.png";
import journalingImage from "../../../public/assets/journaling.png";
import gratitudeImage from "../../../public/assets/gratitude.png";

export default function ResourcesSection() {
    const resources = [
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
    ];

    return (
        <section className="w-full py-20 px-6 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    Mental Health Topics We Cover
                </h2>
                <p className="text-lg mb-12 text-slate-600 dark:text-slate-300">
                    Explore resources and guidance on various aspects of mental wellness
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {resources.map((resource, i) => (
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
                                    className="mx-auto rounded-full shadow-sm group-hover:shadow-md dark:shadow-lg dark:group-hover:shadow-xl transition-all duration-300"
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
    );
}
