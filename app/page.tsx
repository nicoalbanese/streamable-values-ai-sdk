"use client";
import { useState } from "react";
import { callModel } from "./actions";
import { readStreamableValue } from "ai/rsc";

export default function Home() {
  const [ui, setUI] = useState<React.ReactNode>();
  const [st, setSt] = useState();
  return (
    <main>
      <h1>Hello</h1>
      <button
        onClick={async () => {
          const result = await callModel(
            "Tell me a short story. Two paragraphs about Next.js.",
          );
          setUI(result.ui);
          for await (const state of readStreamableValue(result.state)) {
            // @ts-ignore
            setSt(state);
          }
        }}
      >
        Prompt
      </button>
      <pre>{JSON.stringify(st)}</pre>
      {ui}
    </main>
  );
}
