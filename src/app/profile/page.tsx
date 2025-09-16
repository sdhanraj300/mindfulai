import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ProfileClient from "@/components/profile/ProfileClient";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/sign-in?callbackUrl=%2Fprofile");
    }
    return <ProfileClient />;
}
