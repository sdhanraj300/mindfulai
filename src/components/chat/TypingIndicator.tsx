import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import logo from '../../../public/assets/logo.png'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-3 justify-start"
    >
    <Avatar className="h-9 w-9">
      <AvatarFallback className="bg-primary/10 text-primary">
        <Image src={logo} alt="Logo" />
      </AvatarFallback>
    </Avatar>
    <div className="px-4 py-3 rounded-2xl bg-muted text-muted-foreground flex items-center space-x-1.5">
      <motion.span
        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        className="h-2 w-2 bg-muted-foreground/50 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="h-2 w-2 bg-muted-foreground/50 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="h-2 w-2 bg-muted-foreground/50 rounded-full"
      />
    </div>
  </motion.div>
);
}