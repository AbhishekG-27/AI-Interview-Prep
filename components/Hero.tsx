"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Play, Users, Trophy, Brain, Target } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageChanging, setIsImageChanging] = useState(false);

  // Mock showcase images - you can replace with actual platform screenshots
  const showcaseImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Users Prepared" },
    { icon: Trophy, value: "85%", label: "Success Rate" },
    { icon: Brain, value: "500+", label: "AI Questions" },
    { icon: Target, value: "24/7", label: "Available" },
  ];

  // Function to change image with animation
  const changeImage = (newIndex: number) => {
    if (newIndex === currentImageIndex) return;
    
    setIsImageChanging(true);
    
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setTimeout(() => {
        setIsImageChanging(false);
      }, 100);
    }, 300);
  };

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate showcase images
    const interval = setInterval(() => {
      setIsImageChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length);
        setTimeout(() => {
          setIsImageChanging(false);
        }, 100);
      }, 300);
    }, 4000); // Increased from 3000ms to account for animation

    return () => clearInterval(interval);
  }, [showcaseImages.length]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-black/5 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-40 right-20 w-12 h-12 bg-black/3 rounded-full animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-16 h-16 bg-black/4 rounded-full animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "3.5s" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI-Powered Interview Prep
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
                Master Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  Next Interview
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Practice with AI-powered mock interviews, get instant feedback,
                and land your dream job with confidence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                Start Practicing
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-black text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all duration-300">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200 + 600}ms` }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-black">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Main Showcase Image */}
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
                <div 
                  className={`relative w-full h-full transition-all duration-700 ease-in-out ${
                    isImageChanging 
                      ? 'opacity-0 scale-110 blur-sm' 
                      : 'opacity-100 scale-100 blur-0'
                  }`}
                >
                  <Image
                    src={showcaseImages[currentImageIndex]}
                    alt="AI Interview Platform Showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {showcaseImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentImageIndex 
                          ? "bg-white shadow-lg" 
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-800">
                    AI Analysis Ready
                  </span>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-2xl font-bold text-black">94%</div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-black/10 rounded-2xl" />
            </div>

            {/* Secondary Images Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {showcaseImages.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className={`relative h-24 rounded-lg overflow-hidden border border-gray-200 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                    index === currentImageIndex 
                      ? "ring-2 ring-black shadow-lg scale-105" 
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                  onClick={() => changeImage(index)}
                >
                  <div 
                    className={`relative w-full h-full transition-all duration-300 ${
                      index === currentImageIndex && isImageChanging 
                        ? 'opacity-70 scale-95' 
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Showcase ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={`absolute inset-0 transition-colors duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-black/10' 
                      : 'bg-black/20 hover:bg-black/10'
                  }`} />
                  
                  {/* Active indicator */}
                  {index === currentImageIndex && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
