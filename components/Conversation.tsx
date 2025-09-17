"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useState } from "react";

export function Conversation({
  questions,
  interview_agent_id,
}: {
  questions: string;
  interview_agent_id: string;
}) {
  const [messages, setMessages] = useState<{ role: string; message: string }[]>(
    []
  );
  const [isConnected, setIsConnected] = useState(false);
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      setIsConnected(true);
    },
    onDisconnect: () => {
      setIsConnected(false);
      console.log("Disconnected");
    },
    onMessage: (message) => {
      setMessages((prev) => [
        ...prev,
        { role: message.source, message: message.message },
      ]);
    },
    onError: (error) => console.error("Error:", error),
  });

  // Log messages when disconnected
  useEffect(() => {
    if (!isConnected && messages.length > 0) {
      console.log(messages);
    }
  }, [isConnected, messages]);

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: interview_agent_id,
        connectionType: "websocket",
        dynamicVariables: {
          questions: questions,
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation, questions]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? "speaking" : "listening"}</p>
      </div>
    </div>
  );
}
