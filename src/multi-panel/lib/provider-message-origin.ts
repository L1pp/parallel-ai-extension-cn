import { getProviderById, type ProviderId } from "@/shared/lib/providers";

const PROVIDER_ORIGIN_ALIASES: Partial<Record<ProviderId, readonly string[]>> = {
  chatgpt: ["https://chat.openai.com"],
  kimi: ["https://kimi.com"],
  meta: ["https://meta.ai"],
};

function toHttpsOrigin(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.origin : null;
  } catch {
    return null;
  }
}

export function getProviderMessageOrigin(
  providerId: ProviderId,
  frame?: HTMLIFrameElement | null,
) {
  const defaultOrigin = toHttpsOrigin(getProviderById(providerId)?.url);
  const frameOrigin = toHttpsOrigin(frame?.src);
  const allowedOrigins = [
    defaultOrigin,
    ...(PROVIDER_ORIGIN_ALIASES[providerId] ?? []),
  ].filter(Boolean);

  return frameOrigin && allowedOrigins.includes(frameOrigin)
    ? frameOrigin
    : defaultOrigin;
}
