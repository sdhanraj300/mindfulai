"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfileMutation } from "@/lib/query";
import { UploadButton } from "@/utils/uploadthing";
import { X } from "lucide-react";
import { useEffect } from "react";

const ProfileFormSchema = ProfileSchema.extend({
    skills: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export default function ProfileForm({
    initialValues,
    isSaving,
}: {
    initialValues: ProfileFormValues;
    isSaving?: boolean;
}) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: initialValues,
    });

    const mutation = useUpdateProfileMutation();

    // Reset form when initialValues change (e.g., when data loads)
    useEffect(() => {
        form.reset(initialValues);
    }, [form, initialValues]);

    const avatarUrl = form.watch("image");
    const nameValue = form.watch("name");

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Avatar className="size-20 md:size-24">
                        <AvatarImage src={avatarUrl || undefined} alt={nameValue || "User"} />
                        <AvatarFallback className="text-lg">{nameValue?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-3">
                        <UploadButton
                            endpoint="profileImage"
                            onClientUploadComplete={(res: Array<{ url: string }>) => {
                                const url = res?.[0]?.url;
                                if (url) form.setValue("image", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                            }}
                            onUploadError={(e: Error) => {
                                console.error(e);
                            }}
                            appearance={{
                                button: "text-xs font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                                allowedContent: "text-xs text-muted-foreground mt-1",
                            }}
                        />
                        {avatarUrl && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => form.setValue("image", "", { shouldDirty: true })}
                            >
                                <X className="w-4 h-4 mr-1" /> Remove
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-semibold">{nameValue || "Your Profile"}</h1>
                    <p className="text-muted-foreground mt-2">
                        Update your details. These may be used to personalize your AI conversations.
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) =>
                        mutation.mutate({
                            ...values,
                            skills:
                                values.skills
                                    ?.split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean) ?? [],
                        })
                    )}
                    className="space-y-6"
                >
                    {/* Personal Information */}
                    <div className="bg-card rounded-lg border p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City, Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interests & Skills</FormLabel>
                                        <FormControl>
                                            <Input placeholder="reading, programming, music, sports" {...field} />
                                        </FormControl>
                                        <FormDescription>Your interests, hobbies, and skills</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* About You */}
                    <div className="bg-card rounded-lg border p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">About You</h2>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="Tell us about yourself..." {...field} />
                                        </FormControl>
                                        <FormDescription>A brief description about yourself</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="education"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Academic Background</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="Your school, university, course of study..." {...field} />
                                        </FormControl>
                                        <FormDescription>Current school/university, degree program, or academic pursuits</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Goals & Aspirations</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="What are your academic goals, career aspirations, or personal growth objectives..." {...field} />
                                        </FormControl>
                                        <FormDescription>Your academic goals, future plans, or areas you&apos;d like to grow in</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => form.reset(initialValues)}>
                            Reset Changes
                        </Button>
                        <Button type="submit" disabled={mutation.isPending || isSaving}>
                            {mutation.isPending ? "Saving..." : "Save Profile"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
