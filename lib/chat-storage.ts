/**
 * Client-only localStorage helpers for chat persistence and per-browser usage limits.
 * Use from browser (e.g. ChatWidget) only; keys are namespaced for this app.
 */

import type { UIMessage } from "ai";

const CHAT_ID_KEY = "portfolio-chat-id";
const CHAT_MESSAGES_KEY = "portfolio-chat-messages";
const CHAT_USAGE_KEY = "portfolio-chat-usage";

export const MAX_MESSAGES_PER_DAY = 30;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getOrCreateChatId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CHAT_ID_KEY);
  if (!id) {
    id = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(CHAT_ID_KEY, id);
  }
  return id;
}

interface StoredChatData {
  messages: UIMessage[];
  savedAt: string; // ISO timestamp of last save
}

export function loadStoredMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    let data: StoredChatData;

    // Backwards compatibility: old format was a plain array of UIMessage.
    if (Array.isArray(parsed)) {
      data = {
        messages: parsed as UIMessage[],
        savedAt: new Date().toISOString(),
      };
    } else if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray((parsed as { messages?: unknown }).messages)
    ) {
      const obj = parsed as { messages: unknown; savedAt?: string };
      data = {
        messages: obj.messages as UIMessage[],
        savedAt: typeof obj.savedAt === "string" ? obj.savedAt : new Date().toISOString(),
      };
    } else {
      return [];
    }

    const now = Date.now();
    const savedAtTime = Date.parse(data.savedAt);

    // Drop everything if last save is older than 24 hours.
    if (!Number.isNaN(savedAtTime) && now - savedAtTime > ONE_DAY_MS) {
      localStorage.removeItem(CHAT_MESSAGES_KEY);
      return [];
    }

    // Clear visible chat if the last activity was more than 4 hours ago,
    // but keep the data in storage to maintain a 24h backlog.
    const lastMessage = data.messages[data.messages.length - 1];
    let lastTimestamp = savedAtTime;
    if (
      lastMessage &&
      typeof lastMessage === "object" &&
      "createdAt" in lastMessage &&
      typeof (lastMessage as { createdAt?: unknown }).createdAt === "string"
    ) {
      const createdAt = Date.parse(
        (lastMessage as { createdAt?: string }).createdAt as string
      );
      if (!Number.isNaN(createdAt)) {
        lastTimestamp = createdAt;
      }
    }

    if (!Number.isNaN(lastTimestamp) && now - lastTimestamp > FOUR_HOURS_MS) {
      // Start the UI fresh after 4 hours of inactivity.
      return [];
    }

    // Prune individual messages older than 24 hours from now to keep backlog bounded.
    const cutoff = now - ONE_DAY_MS;
    const filtered = data.messages.filter((m) => {
      if (
        m &&
        typeof m === "object" &&
        "createdAt" in m &&
        typeof (m as { createdAt?: unknown }).createdAt === "string"
      ) {
        const t = Date.parse((m as { createdAt?: string }).createdAt as string);
        if (!Number.isNaN(t)) {
          return t >= cutoff;
        }
      }
      return true;
    });

    if (filtered.length !== data.messages.length) {
      saveStoredMessages(filtered);
    }

    return filtered;
  } catch {
    return [];
  }
}

export function saveStoredMessages(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredChatData = {
      messages,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota or parse errors
  }
}

export interface UsageState {
  date: string;
  count: number;
}

export function getUsageToday(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(CHAT_USAGE_KEY);
    if (!raw) return 0;
    const { date, count } = JSON.parse(raw) as UsageState;
    return date === getToday() ? count : 0;
  } catch {
    return 0;
  }
}

export function incrementUsageToday(): void {
  if (typeof window === "undefined") return;
  try {
    const today = getToday();
    const raw = localStorage.getItem(CHAT_USAGE_KEY);
    const prev: UsageState = raw ? (JSON.parse(raw) as UsageState) : { date: today, count: 0 };
    const count = prev.date === today ? prev.count + 1 : 1;
    localStorage.setItem(CHAT_USAGE_KEY, JSON.stringify({ date: today, count }));
  } catch {
    // ignore
  }
}
