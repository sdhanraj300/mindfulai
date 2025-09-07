import React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  MessageCircle,
  User,
  Info,
  LogOut,
  SidebarOpen,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from '../../public/assets/logo.png';
import peopleImage from '../../public/assets/people.png';
import { ThemeToggle } from "./theme-toggle";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	currentUser?: { name?: string; avatar?: string };
}

const navLinks = [
	{ name: "Home", icon: Home, href: "/", description: "Go to homepage" },
	{ name: "Chat", icon: MessageCircle, href: "/chat", description: "Start a conversation" },
	{ name: "Resources", icon: BookOpen, href: "/resources", description: "Mental health resources" },
	{ name: "Profile", icon: User, href: "/profile", description: "Manage your profile" },
	{ name: "About", icon: Info, href: "/about", description: "Learn more about us" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentUser }) => {
	return (
		<>
			{/* Floating open button when sidebar is closed */}
			<AnimatePresence>
				{!isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
					>
						<Button
							onClick={() => setIsOpen(true)}
							className="fixed top-4 left-4 z-50 bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl p-3 flex items-center justify-center transition-all duration-300 group hover:scale-105"
							aria-label="Open sidebar"
						>
							<SidebarOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent 
					side="left" 
					className="p-0 bg-gradient-to-br from-slate-50 font-mono to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 w-80 flex flex-col h-full shadow-2xl border-r border-slate-200 dark:border-slate-700"
				>
					{/* Header */}
					<SheetHeader className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="flex items-center gap-3"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full blur-sm opacity-75"></div>
								<div className="relative rounded-full">
								<Image src={logo} alt="Logo" width={70} height={70} className="rounded-full" />
								</div>
							</div>
							<div>
								<SheetTitle className="text-2xl text-transparent">
									MindfulAI
								</SheetTitle>
								<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your AI Mental Health Companion</p>
							</div>
						</motion.div>
					</SheetHeader>

					{/* Navigation */}
					<nav className="flex-1 flex flex-col gap-2 p-6">
						{navLinks.map((link, index) => (
							<motion.div
								key={link.name}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
							>
								<Link
									href={link.href}
									className={cn(
										"group flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300",
										"hover:bg-sidebar-accent dark:hover:bg-slate-700/80 hover:shadow-md",
										"border border-transparent hover:border-purple-200 dark:hover:border-purple-700",
										"text-foreground dark:text-slate-200 hover:text-purple-600 dark:hover:text-foreground"
									)}
								>
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
										<link.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
									</div>
									<div className="flex-1">
										<div className="font-semibold">{link.name}</div>
										<div className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-foreground dark:group-hover:text-purple-400 transition-colors">
											{link.description}
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</nav>

					{/* Footer */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="p-6 border-t border-slate-200 dark:border-slate-700 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm space-y-3"
					>
						{/* Theme Toggle */}
						<ThemeToggle />
						
						{/* Sign Out Button */}
						<Button 
							variant="outline" 
							className="w-full flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 border-slate-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
						>
							<LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
							<span className="font-medium">Sign Out</span>
						</Button>
						
						<div className="mt-4 text-center">
							<p className="text-xs text-slate-400 dark:text-slate-500">
								Version 1.0.0 • Made with ❤️
							</p>
						</div>
					</motion.div>
				</SheetContent>
			</Sheet>
		</>
	);
};
