"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="w-full py-20 px-6 relative z-10 dark:from-slate-900 font-mono! dark:to-purple-900/20">
            <div className="max-w-4xl mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                            🌟 Join Now To Find Peace of Mind
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight">
                        Ready to Begin Your{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Healing Journey?
                        </span>
                    </h2>

                    <p className="text-xl mb-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Take the first step towards better mental health. Join our
                        supportive community and start your personalized wellness journey
                        today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link href="/sign-up" passHref>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="border-2 hover:cursor-pointer border-purple-300 font-semibold rounded-full px-12 py-6 shadow-xl transition-all duration-300 text-xl flex items-center gap-3 hover:shadow-2xl">
                                    Start Free Today <ArrowRight className="w-6 h-6" />
                                </Button>
                            </motion.div>
                        </Link>

                        <Link href="/chat" passHref>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    className="border-2 hover:cursor-pointer border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold rounded-full px-10 py-6 shadow-lg text-lg transition-all duration-300"
                                >
                                    Try AI Chat
                                </Button>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                                100% Private
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Your conversations are completely confidential
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                                24/7 Available
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Support whenever you need it most
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                                <span className="text-2xl">💝</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                                Always Free
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                No hidden costs, no subscriptions required
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
                        ✨ No credit card required • Takes less than 60 seconds
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
