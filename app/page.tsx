"use client";
import { RealtimeAgent, RealtimeSession, tool } from "@openai/agents/realtime";
import { useRef, useState } from "react";

export default function Home() {
  const session = useRef<RealtimeSession | null>(null);
  const [connected, setConnected] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>(
    []
  );

  // const disconnectSession = tool({
  //   name: "disconnect_session",
  //   description: "Disconnect the current session.",
  //   parameters: {},
  //   execute: () => {
  //     if (session.current) {
  //       console.log(session.current?.history);

  //       session.current?.once("audio_stopped", () => {
  //         setTimeout(() => {
  //           session.current?.close();
  //           session.current = null;
  //           setConnected(false);
  //           console.log("Session disconnected.");
  //         }, 1000); // Small delay to ensure everything is complete
  //       });
  //     }
  //   },
  // });

  const agent = new RealtimeAgent({
    name: "Assistant",
    instructions:
      "You are a helpful assistant. Ask the user their name, greet them and then say goodbye and end the session.",
    // tools: [disconnectSession],
  });

  const onConnect = async () => {
    if (connected) {
      session.current?.close();
      setConnected(false);
    } else {
      if (session.current) return;
      const response = await fetch("/api/token", {
        method: "GET",
      });
      const { token } = await response.json();
      session.current = new RealtimeSession(agent, {
        model: "gpt-realtime",
      });
      try {
        await session.current.connect({
          apiKey: token,
        });
        console.log("You are connected!");
        setConnected(true);
        session.current.on("history_updated", (history) => {
          setHistory(
            history
              .filter((item) => item.type === "message")
              .map((item) => ({
                role: item.role,
                content:
                  item.content?.[0] &&
                  (item.content[0].type === "input_audio" ||
                    item.content[0].type === "output_audio")
                    ? item.content[0].transcript || ""
                    : "",
              }))
          );
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        className="bg-blue-500 text-white p-2 rounded max-w-40"
        onClick={onConnect}
      >
        {connected ? "Disconnect" : "Connect"}
      </button>
      <ul>
        {history.length > 0 &&
          history.map((item, index) => (
            <li key={index} className="mb-2">
              <strong>{item.role}:</strong> {item.content}
            </li>
          ))}
      </ul>
    </div>
  );
}
