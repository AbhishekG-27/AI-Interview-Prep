"use client";

import { useConversation } from "@elevenlabs/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function InterviewPrepAgent({
  username,
  interview_agent_id,
}: {
  username: string;
  interview_agent_id: string;
}) {
  const router = useRouter();
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      return router.push("/my-interviews");
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: interview_agent_id,
        connectionType: "websocket",
        dynamicVariables: {
          username: username,
          user_id: username,
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation, username, interview_agent_id]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div
      className="bg-gray-100 relative overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Status Indicator - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-lg">
          <div
            className={`w-2 h-2 rounded-full ${
              conversation.status === "connected"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          ></div>
          <span className="font-medium">
            {conversation.status === "connected" ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Main Interview Layout */}
      <div className="flex flex-col lg:flex-row h-full p-4 sm:p-6 lg:p-8 gap-4 lg:gap-6">
        {/* Agent Section - Left */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col">
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center items-center min-h-[45vh] lg:min-h-0 pb-20 lg:pb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 sm:mb-6">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 ${
                  conversation.isSpeaking
                    ? "bg-gray-600 scale-110"
                    : "bg-gray-400"
                }`}
              ></div>
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">
                AI Interviewer
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                {conversation.isSpeaking ? "Speaking..." : "Listening"}
              </p>
              <p className="text-sm sm:text-base text-gray-600 max-w-md px-4">
                {conversation.status === "connected"
                  ? conversation.isSpeaking
                    ? "I'm asking you questions. Listen carefully and respond when I'm done."
                    : "I'm listening to your response. Take your time to answer."
                  : "Click 'Start Interview' to begin your practice session."}
              </p>
            </div>
          </div>
        </div>

        {/* User Section - Right */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col">
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center items-center min-h-[45vh] lg:min-h-0 pb-20 lg:pb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 sm:mb-6">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 ${
                  conversation.status === "connected" &&
                  !conversation.isSpeaking
                    ? "bg-gray-600 scale-110"
                    : "bg-gray-400"
                }`}
              ></div>
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">
                {username}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                {conversation.status === "connected"
                  ? conversation.isSpeaking
                    ? "Listen to the question"
                    : "Your turn to speak"
                  : "Ready to start"}
              </p>
              <p className="text-sm sm:text-base text-gray-600 max-w-md px-4">
                {conversation.status === "connected"
                  ? conversation.isSpeaking
                    ? "Listen carefully to the interviewer's question."
                    : "Now it's your turn to respond. Speak clearly into your microphone."
                  : "Get ready to answer interview questions and practice your responses."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Control Buttons */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={startConversation}
            disabled={conversation.status === "connected"}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group cursor-pointer"
            title="Start Interview"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button
            onClick={stopConversation}
            disabled={conversation.status !== "connected"}
            className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-300 text-gray-700 bg-white rounded-full hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group cursor-pointer"
            title="End Interview"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
