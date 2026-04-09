"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

type ChatMessage = { role: Role; content: string };

const WA_LINK =
  process.env.NEXT_PUBLIC_WA_LINK ||
  "https://wa.me/6281380332374?text=Halo%2C%20saya%20datang%20dari%20website%20Ajar%20Expert.%20%5BSRC%3AAJAREXPERT%5D%20Saya%20ingin%20konsultasi.";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Terima kasih sudah mengunjungi Ajar Expert! Saya asisten virtual di sini. Kebutuhan Anda lebih dekat ke Airline Systems, AI Automation, atau Website/MVP?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: text };
    const nextThread = [...messages, userMsg];
    setMessages(nextThread);
    setLoading(true);

    // Gemini chat history must start with a user turn; UI welcome is assistant-only.
    const apiThread =
      nextThread.length > 0 && nextThread[0].role === "assistant"
        ? nextThread.slice(1)
        : nextThread;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiThread.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(
          data.error ||
            "Maaf, terjadi kendala. Silakan coba lagi atau hubungi tim kami."
        );
        return;
      }

      if (!data.reply?.trim()) {
        setError("Tidak ada balasan dari server.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply!.trim() },
      ]);
    } catch {
      setError(
        "Koneksi bermasalah. Periksa jaringan Anda lalu coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="ajar-chat-panel"
        aria-label={open ? "Tutup chat" : "Buka chat Ajar Expert"}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10000,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          background:
            "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(14, 165, 233, 0.45)",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow =
            "0 6px 28px rgba(14, 165, 233, 0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 24px rgba(14, 165, 233, 0.45)";
        }}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="ajar-chat-panel"
          role="dialog"
          aria-label="Chat Ajar Expert"
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            zIndex: 10000,
            width: "min(100vw - 32px, 380px)",
            maxHeight: "min(72vh, 520px)",
            display: "flex",
            flexDirection: "column",
            background: "rgba(15, 23, 42, 0.97)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            borderRadius: 16,
            boxShadow:
              "0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
            fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
              background: "linear-gradient(90deg, rgba(14,165,233,0.15), transparent)",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#f8fafc",
                letterSpacing: "-0.02em",
              }}
            >
              Ajar Expert
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
              Asisten virtual · Bahasa Indonesia
            </div>
          </div>

          <div
            ref={listRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 200,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}-${m.content.slice(0, 20)}`}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: m.role === "user" ? "#0f172a" : "#e2e8f0",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, #7dd3fc, #38bdf8)"
                      : "rgba(51, 65, 85, 0.65)",
                  border:
                    m.role === "assistant"
                      ? "1px solid rgba(148, 163, 184, 0.15)"
                      : "none",
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: 13,
                  color: "#94a3b8",
                  paddingLeft: 4,
                }}
              >
                Mengetik…
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                padding: "8px 14px",
                fontSize: 13,
                color: "#fecaca",
                background: "rgba(127, 29, 29, 0.35)",
                borderTop: "1px solid rgba(248, 113, 113, 0.25)",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              padding: "10px 12px 12px",
              borderTop: "1px solid rgba(148, 163, 184, 0.15)",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Tulis pertanyaan…"
              disabled={loading}
              style={{
                flex: 1,
                resize: "none",
                borderRadius: 10,
                border: "1px solid rgba(148, 163, 184, 0.3)",
                background: "rgba(15, 23, 42, 0.8)",
                color: "#f1f5f9",
                padding: "10px 12px",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                fontWeight: 600,
                fontSize: 14,
                cursor:
                  loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                color: "#fff",
                fontFamily: "inherit",
              }}
            >
              Kirim
            </button>
          </div>

          <div
            style={{
              padding: "8px 14px 12px",
              fontSize: 12,
              color: "#64748b",
              textAlign: "center",
              borderTop: "1px solid rgba(148, 163, 184, 0.1)",
            }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#38bdf8", textDecoration: "none" }}
            >
              Lanjutkan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
