"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  Home,
  BookOpen,
  Target,
  Phone,
  Brain,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Navbar = ({ isloggedIn }: { isloggedIn: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/my-interviews", label: "My Interviews", icon: Target },
    { href: "/create-interview", label: "Create an Interview", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/about", label: "Our Story", icon: Target },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = async () => {
    if (isloggedIn) {
      await signOut();
    }
    return router.push("/sign-in");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-[85%] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative flex-shrink-0">
                <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-black transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black rounded-full opacity-10 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block sm:block truncate">
                AI Interview Prep
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-6 flex-1 justify-center mx-2">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center space-x-1 px-3 xl:px-4 py-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 relative overflow-hidden text-sm xl:text-base whitespace-nowrap flex-shrink-0"
                >
                  <IconComponent className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">
                    {link.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Sign In Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              onClick={handleSignIn}
              className="group relative inline-flex items-center space-x-2 px-4 xl:px-6 py-2 hover:bg-black hover:text-white text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none border-2 cursor-pointer text-sm xl:text-base"
            >
              <User className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
              <span className="hidden xl:inline">
                {isloggedIn ? "Log out" : "Sign In"}
              </span>
              <span className="xl:hidden">{isloggedIn ? "Out" : "In"}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 space-y-1 border-t border-gray-100">
            {navigationLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1 whitespace-nowrap`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen
                      ? "slideInLeft 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  <IconComponent className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Sign In Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  handleSignIn();
                  setIsMenuOpen(false);
                }}
                className="group w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white hover:bg-black hover:text-white text-black border-2 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none cursor-pointer"
              >
                <User className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                <span className="truncate">
                  {isloggedIn ? "Log out" : "Sign In"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
