"use client";

import { useChat } from "ai/react";
import { useState } from "react";

const apis = [
  {
    title: "hugging face",
    href: "/api/huggingface",
  },
  {
    title: "open ai",
    href: "/api/chat",
  },
];

export default function Chat() {
  const [model, setModel] = useState(apis.at(0)!);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: model.href,
  });

  return (
    <main className="mx-auto w-full h-screen max-w-lg p-24 flex flex-col">
      <ul className="flex-center gap-4">
        {apis.map((api) => {
          const selected =
            model.title === api.title ? "border-blue-500" : "border-gray-300";
          return (
            <li
              key={api.href}
              onClick={() => setModel(api)}
              className={`${selected} bg-blue-100 border-2 rounded-lg w-fit px-4 py-2`}
            >
              <button className="pragraph-lg">{api.title}</button>
            </li>
          );
        })}
      </ul>

      <section className="mb-auto">
        {messages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </section>

      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black border-black border"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <button
          className="border-solid border-2 bg-blue-200 p-2 rounded-md"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
