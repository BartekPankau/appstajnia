'use client';
import { Inter } from "next/font/google";
import "@/globals.css";
import Link from "next/link";
import { UserProvider } from "@/UserContext";
import ProtectedSectionMenu from "@/ProtectedSectionMenu";
import { useUser } from "@/UserContext";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Ominięcie layoutu na ścieżce /workers
    if (pathname === "/workers") {
        return <>{children}</>;
    }

    return (
        <html lang="en" className="h-full">
        <head>
            <title>Stable Assistant</title>
        </head>
        <body className="h-full bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <UserProvider>
            {/* Nagłówek */}
            <header className="w-full p-4 shadow-lg font-semibold text-lg bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 flex flex-row justify-between items-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                    <Link href="/home">Stable Assistant ♘</Link>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <ThemeToggle />
                    <Link href="/workers">
                        <img
                            src="/images/login.png"
                            className="w-12 px-2 py-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            alt="Login Icon"
                        />
                    </Link>
                </div>
            </header>

            {/* Menu poziome */}
            <nav className="w-full bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-200 shadow-md sticky top-0 z-50">
                <ProtectedSectionMenu requiredRole="wlasciciel_stajni">
                    <div className="flex flex-row justify-center gap-4 py-2">
                        <Link href="/dashboard" className="hover:underline">
                            Stajnia
                        </Link>
                        <Link href="/dashboard/boxes" className="hover:underline">
                            Boksy
                        </Link>
                        <Link href="/dashboard/padoki" className="hover:underline">
                            Padoki
                        </Link>
                        <Link href="/dashboard/trening" className="hover:underline">
                            Treningi
                        </Link>
                        <Link href="/dashboard/harmonogram" className="hover:underline">
                            Zarządzanie pracownikami
                        </Link>
                        <Link href="/zarzadzanie" className="hover:underline">
                            Zarządzanie stajnią
                        </Link>
                        <Link href="/dashboard/notes" className="hover:underline">
                            Wiadomości
                        </Link>
                        <Link href="/moj_profil" className="hover:underline">
                            Mój profil
                        </Link>
                    </div>
                </ProtectedSectionMenu>
            </nav>

            {/* Sekcja główna */}
            <main className="flex-grow mt-10 p-6 bg-gray-200 dark:bg-gray-900">{children}</main>

            {/* Stopka */}
            <footer className="w-full h-fit p-4 text-center bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 text-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-gray-400">
                <div>© All rights reserved</div>
            </footer>
        </UserProvider>
        </body>
        </html>
    );
}
