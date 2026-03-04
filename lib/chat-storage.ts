/**
 * Client-only localStorage helpers for chat persistence and per-browser usage limits.
 * Use from browser (e.g. ChatWidget) only; keys are namespaced for this app.
 */

import type { UIMessage } from "ai";

const CHAT_ID_KEY = "portfolio-chat-id";
const CHAT_MESSAGES_KEY = "portfolio-chat-messages";
const CHAT_USAGE_KEY = "portfolio-chat-usage";

export const MAX_MESSAGES_PER_DAY = 30;

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

export function loadStoredMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredMessages(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
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
