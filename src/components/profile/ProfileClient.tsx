"use client";
import React from "react";
import { useProfileQuery } from "@/lib/query";
import ProfileForm, { type ProfileFormValues } from "@/components/profile/ProfileForm";
import { Sidebar } from "@/components/Sidebar";

export default function ProfileClient() {
    const { data, isLoading } = useProfileQuery();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const initialValues: ProfileFormValues = {
        name: data?.name ?? "",
        image: data?.image ?? "",
        phone: data?.phone ?? "",
        location: data?.location ?? "",
        bio: data?.bio ?? "",
        profession: data?.profession ?? "",
        experience: data?.experience ?? "",
        education: data?.education ?? "",
        skills: (data?.skills ?? []).join(", "),
    };

    return (
        <div className="relative min-h-screen">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-muted-foreground">Loading your profile...</div>
                    </div>
                ) : (
                    <ProfileForm initialValues={initialValues} isSaving={isLoading} />
                )}
            </div>
        </div>
    );
}
