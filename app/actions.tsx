"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableUI, createStreamableValue } from "ai/rsc";

export const callModel = async (input: string) => {
  const ui = createStreamableUI(
    <div className="bg-orange-100">loading...</div>,
  );
  const state = createStreamableValue({ loading: true });

  (async () => {
    const result = await streamText({ model: openai("gpt-4o"), prompt: input });
    let text = "";
    for await (const delta of result.textStream) {
      text += delta;
      ui.update(<div className="bg-yellow-100">{text}</div>);
    }
    ui.done(<div className="bg-green-100">{result.text}</div>);
    state.done({ loading: false });
  })();

  return { ui: ui.value, state: state.value };
};
