import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import peopleImage from "../../../public/assets/people.png"
import ChatClient from "@/components/chat/ChatClient"

export default async function ChatPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=%2Fchat")
  }

  // Fetch the latest profile data from database
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      image: true,
    },
  })

  const currentUser = {
    name: user?.name || session.user?.name || "User",
    avatar: user?.image || session.user?.image || peopleImage.src,
  }

  return <ChatClient currentUser={currentUser} />
}
