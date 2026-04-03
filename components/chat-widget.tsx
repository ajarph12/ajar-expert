"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";

const quickPrompts = [
  "Layanan apa yang paling cocok untuk bisnis saya?",
  "Saya butuh chatbot custom untuk website Next.js.",
  "Bagaimana cara chatbot ini mengumpulkan lead?",
];

type ToolPart = {
  type: string;
  state?: string;
  output?: {
    message?: string;
  };
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, status, error } = useChat();

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [messages, status]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();

    if (!text || isBusy) {
      return;
    }

    void sendMessage({ text });
    setInput("");
    setOpen(true);
  };

  const sendPrompt = (prompt: string) => {
    if (isBusy) {
      return;
    }

    void sendMessage({ text: prompt });
    setOpen(true);
  };

  return (
    <div className="chat-shell">
      {open ? (
        <section className="chat-panel" aria-label="AI chatbot widget">
          <div className="chat-header">
            <div>
              <h2>Custom AI Assistant</h2>
              <p>
                Tanyakan soal layanan, website, chatbot, atau tinggalkan kontak
                jika ingin demo atau proposal.
              </p>
            </div>
            <button
              aria-label="Tutup chatbot"
              onClick={() => setOpen(false)}
              type="button"
            >
              ×
            </button>
          </div>

          <div className="chat-log">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-copy">
                  <h3>Halo, saya siap membantu.</h3>
                  <p>
                    Saya bisa jelaskan layanan, bantu memilih scope project,
                    dan menyiapkan follow-up jika Anda ingin konsultasi.
                  </p>
                </div>

                <div className="chat-suggestions">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      disabled={isBusy}
                      onClick={() => sendPrompt(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message) => {
              const textParts = (message.parts ?? []).filter(
                (part) => part.type === "text",
              );
              const toolParts = (message.parts ?? []).filter((part) =>
                part.type.startsWith("tool-"),
              ) as ToolPart[];

              return (
                <div
                  key={message.id}
                  className={`chat-message ${
                    message.role === "user"
                      ? "chat-message-user"
                      : "chat-message-assistant"
                  }`}
                >
                  <div className="chat-bubble">
                    <span className="chat-meta">
                      {message.role === "user" ? "Pengunjung" : "Assistant"}
                    </span>

                    {textParts.map((part, index) => (
                      <p key={`${message.id}-text-${index}`} className="chat-copy">
                        {"text" in part ? part.text : ""}
                      </p>
                    ))}

                    {toolParts.map((part, index) => {
                      if (part.type === "tool-captureLead") {
                        if (part.state === "output-available") {
                          return (
                            <div
                              key={`${message.id}-tool-${index}`}
                              className="tool-note"
                            >
                              {part.output?.message ??
                                "Lead berhasil dicatat."}
                            </div>
                          );
                        }

                        if (part.state === "output-error") {
                          return (
                            <div
                              key={`${message.id}-tool-${index}`}
                              className="tool-note tool-note-error"
                            >
                              Lead belum berhasil dicatat. Coba kirim ulang
                              detail kontak Anda.
                            </div>
                          );
                        }

                        return (
                          <div
                            key={`${message.id}-tool-${index}`}
                            className="tool-note"
                          >
                            Mencatat detail lead dan follow-up Anda.
                          </div>
                        );
                      }

                      return null;
                    })}

                    {message.role === "assistant" &&
                    textParts.length === 0 &&
                    status === "streaming" ? (
                      <div className="typing-indicator" aria-label="Assistant typing">
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          {error ? (
            <div className="chat-error">
              Terjadi kendala saat menghubungi model AI. Pastikan environment
              variable provider sudah terisi dengan benar.
            </div>
          ) : null}

          <div className="chat-composer">
            <form onSubmit={onSubmit}>
              <textarea
                disabled={isBusy}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Contoh: Saya ingin chatbot untuk menangani FAQ dan mengumpulkan lead demo."
                value={input}
              />

              <div className="composer-row">
                <div className="composer-hint">
                  Hint: nama + email atau WhatsApp akan dipakai untuk follow-up.
                </div>
                <button disabled={isBusy || input.trim().length === 0} type="submit">
                  {isBusy ? "Mengirim..." : "Kirim"}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      <button
        aria-expanded={open}
        aria-label="Buka chatbot"
        className="chat-launcher"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="launcher-ping">AI</span>
        {open ? "Tutup Chat" : "Tes AI Chat"}
      </button>
    </div>
  );
}
