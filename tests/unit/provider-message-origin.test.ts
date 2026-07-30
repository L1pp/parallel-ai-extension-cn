import { describe, expect, it } from "vitest";

import { getProviderMessageOrigin } from "@/multi-panel/lib/provider-message-origin";

function frame(src: string) {
  return { src } as HTMLIFrameElement;
}

describe("getProviderMessageOrigin", () => {
  it("returns the registered provider origin when the frame has no src", () => {
    expect(getProviderMessageOrigin("qwen", frame(""))).toBe(
      "https://chat.qwen.ai",
    );
  });

  it("allows a registered legacy origin for a provider", () => {
    expect(
      getProviderMessageOrigin("chatgpt", frame("https://chat.openai.com/c/example")),
    ).toBe("https://chat.openai.com");
  });

  it("never trusts an unrelated iframe origin", () => {
    expect(
      getProviderMessageOrigin("qwen", frame("https://evil.example/")),
    ).toBe("https://chat.qwen.ai");
  });
});
