"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Students from "./students/Students";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tab, setTab] = useState("students");
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setTab(tab);
    router.push(`/${tab}`);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          {/* A light blue-violet gradient background */}
          <div className="bg-blue-30 h-screen">
            {/* Main div area for showing students, courses and registrations */}
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="py-5 px-2">
                <h1 className="text-4xl font-bold">Registration System</h1>
                {/* Description of the registration system */}
                <p className="text-lg mt-2">
                  This is a registration system for students to register for
                  courses and for admin to manage students and courses.
                </p>
              </div>
              {/* Tabs for students, courses and registrations in a row */}
              <div className="mt-5">
                <Tabs defaultValue={tab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="students"
                      onClick={() => handleTabChange("students")}
                    >
                      Students
                    </TabsTrigger>
                    <TabsTrigger
                      value="courses"
                      onClick={() => handleTabChange("courses")}
                    >
                      Courses
                    </TabsTrigger>
                    <TabsTrigger
                      value="registrations"
                      onClick={() => handleTabChange("registrations")}
                    >
                      Registrations
                    </TabsTrigger>
                  </TabsList>
                  {/* Tab Content will come from routes  */}
                  <TabsContent value={tab}>{children}</TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
