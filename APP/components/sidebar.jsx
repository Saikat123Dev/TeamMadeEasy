"use client";

import { UserButton } from "@/components/auth/user-button";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleItemClick = (itemKey) => {
        setActiveItem(itemKey);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <>
            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed  inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed  left-4 top-2 z-50 p-2.5 rounded-xl bg-blue-500/10 backdrop-blur-xl shadow-lg border border-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Toggle Menu"
            >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            <aside
                className={`fixed md:sticky left-0 top-0 h-screen z-40
                    transform transition-all duration-300 ease-out
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    ${expanded ? "md:w-64" : "md:w-20"}
                    w-64 bg-gradient-to-b from-[#010917] to-[#011224] backdrop-blur-xl
                    border-r border-blue-500/10 shadow-2xl`}
            >
                <div className="h-full flex flex-col rounded-r-2xl bg-blue-950/20 backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center border-b border-blue-400/10 bg-blue-950/30">
                        <div className={`flex items-center space-x-3 transition-all duration-300 ${expanded ? "opacity-100" : "opacity-0 md:opacity-0"}`}>
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">S</span>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                                Slide
                            </span>
                        </div>
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-200 hover:scale-105 active:scale-95 group border border-blue-500/20"
                        >
                            {expanded ? (
                                <ChevronFirst size={16} className="text-blue-400 group-hover:text-blue-300"/>
                            ) : (
                                <ChevronLast size={16} className="text-blue-400 group-hover:text-blue-300"/>
                            )}
                        </button>
                    </div>

                    {/* Navigation */}
                    <SidebarContext.Provider value={{ expanded, activeItem, handleItemClick }}>
                        <nav className="flex-1 overflow-y-auto scrollbar-none">
                            <ul className="p-3 text-lg space-y-2">
                                {children}
                            </ul>
                        </nav>
                    </SidebarContext.Provider>

                    {/* Footer */}
                    <div className="border-t border-blue-400/10 p-4 bg-blue-950/30">
                        <div className="flex items-center space-x-3">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-200" />
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-blue-500/20">
                                    <UserButton/>
                                </div>
                            </div>
                            <div
                                className={`flex-1 transition-all duration-300 ${
                                    expanded ? "opacity-100 visible" : "opacity-0 invisible md:invisible"
                                }`}
                            >
                                <p className="text-sm font-medium text-white">User Profile</p>
                                <p className="text-xs text-blue-400">Settings</p>
                            </div>
                            {expanded && (
                                <button className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors duration-200 border border-blue-500/20">
                                    <MoreVertical size={16} className="text-blue-400"/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export function SidebarItem({ icon, text, alert, href, itemKey }) {
    const { expanded, activeItem, handleItemClick } = useContext(SidebarContext);
    const isActive = activeItem === itemKey;

    const content = (
        <div className="flex items-center w-full">
            <span className={`transition-colors duration-200 ${
                isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
            }`}>
                {icon}
            </span>
            <span
                className={`ml-3 text-sm transition-all duration-200 ${
                    expanded ? "opacity-100 visible" : "opacity-0 invisible md:invisible"
                } whitespace-nowrap font-medium ${
                    isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
                }`}
            >
                {text}
            </span>
            {alert && (
                <span className={`absolute right-3 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-400/20 ${
                    expanded ? "" : "top-2"
                }`} />
            )}
        </div>
    );

    return (
        <li
            onClick={() => handleItemClick(itemKey)}
            className={`relative group transition-all duration-200 rounded-lg ${
                isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20"
                    : "hover:bg-blue-500/5 border border-transparent hover:border-blue-500/10"
            }`}
        >
            {/* Highlight border */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full transition-all duration-200 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            }`} />

            {href ? (
                <Link
                    href={href}
                    className="flex items-center py-2 px-3 cursor-pointer"
                >
                    {content}
                </Link>
            ) : (
                <div className="flex items-center py-2 px-3 cursor-pointer">
                    {content}
                </div>
            )}
        </li>
    );
}
