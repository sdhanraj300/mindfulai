import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Heart,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    MessageCircle,
    BookOpen,
    Shield,
    HelpCircle
} from 'lucide-react';
import logo from '../../public/assets/logo.png';

export const Footer: React.FC = () => {
    return (
        <footer className="text-foreground font-mono bg-sidebar-accent-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full blur-sm opacity-75"></div>
                                <div className="relative rounded-full">
                                    <Image src={logo} alt="MindfulAI Logo" width={50} height={50} className="rounded-full" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    MindfulAI
                                </h3>
                                <p className="text-sm text-slate-300">Your AI Mental Health Companion</p>
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            Empowering minds, supporting hearts. We&apos;re here to help you navigate your mental health journey with AI-powered guidance and compassionate care.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                <Instagram className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/chat" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    Chat with AI
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Mental Health Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mental Health Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/resources" className="text-slate-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                                    Anxiety Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-slate-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                                    Depression Help
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-slate-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                                    Stress Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-slate-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                                    Mindfulness & Meditation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-purple-400" />
                                <a href="mailto:dhanraj02025@gmail.com" className="text-slate-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                                    dhanraj02025@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span className="text-slate-300 text-sm">
                                    Available 24/7 Worldwide
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crisis Support Banner */}
                <Separator className="my-8 bg-slate-700" />

                <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-center gap-2 text-center">
                            <Heart className="w-5 h-5 text-red-400 hover:text-red-600 hover:fill-red-500 hover:scale-110 transition-all duration-300" />
                            <p className="text-sm text-slate-200">
                                <strong>In Crisis?</strong> Talk to someone you trust like your friends and family or reach out to a crisis hotline for immediate support.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Separator className="my-8 bg-slate-700" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-400 text-sm">
                        ©  MindfulAI {new Date().getFullYear()}. All rights reserved. Made with ❤️ by Dhanraj  for mental wellness.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Terms
                        </Link>
                        <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
