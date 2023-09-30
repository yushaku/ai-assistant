"use client";

import { useChat } from "ai/react";
import { UserButton } from "@clerk/nextjs";
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
    <main className="mx-auto flex h-screen w-full max-w-lg flex-col p-24">
      <div>
        <UserButton afterSignOutUrl="/"/>
      </div>
      <ul className="flex-center gap-4">
        {apis.map((api) => {
          const selected =
            model.title === api.title ? "border-blue-500" : "border-gray-300";
          return (
            <li
              key={api.href}
              onClick={() => setModel(api)}
              className={`${selected} w-fit rounded-lg border-2 bg-blue-100 px-4 py-2`}
            >
              <button className="paragraph-lg">{api.title}</button>
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
          className="rounded-md border border-black p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <button
          className="rounded-md border-2 border-solid bg-blue-200 p-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
