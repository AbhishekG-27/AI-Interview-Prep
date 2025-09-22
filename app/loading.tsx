export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {/* Modern pulse loader */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 mx-auto"></div>
          {/* Spinning ring */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-transparent border-t-black animate-spin"></div>
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full animate-pulse"></div>
        </div>

        {/* Loading text with fade animation */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-black animate-pulse">
            Loading
          </h2>
          <p className="text-gray-600 text-sm animate-pulse">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
