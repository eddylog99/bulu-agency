"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { getBotReply, getWelcomeReply, type ChatOption } from "@/lib/chatFlow";
import {
  type FlowMode,
  CONTACT_REQUIRED_STEPS,
  CONTACT_OPTIONAL_FIELDS,
  CONTACT_BUDGET_OPTIONS,
  CONTACT_SERVIZIO_OPTIONS,
  CONTACT_DIMENSIONE_OPTIONS,
  CONTACT_COME_CONOSCIUTO_OPTIONS,
  BOOK_REQUIRED_AFTER_SLOT,
  BOOK_OPTIONAL_FIELDS,
  BOOK_AREA_OPTIONS,
  BOOK_BUDGET_OPTIONS,
  BOOK_DIMENSIONE_OPTIONS,
  buildAvailableDates,
  formatDateKey,
  formatDateLabel,
  getSlotsForDate,
} from "@/lib/chatFormFlow";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  options?: ChatOption[];
  link?: { label: string; href: string };
  /** bottoni per slot date/ora o per select (value come payload) */
  choiceButtons?: { label: string; value: string }[];
};

function createAssistantMessage(reply: ReturnType<typeof getBotReply>, extra?: Partial<Message>): Message {
  return {
    id: `bot-${Date.now()}`,
    role: "assistant",
    text: reply.text,
    options: reply.options,
    link: reply.link,
    ...extra,
  };
}

function addBotMessage(
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  text: string,
  choiceButtons?: { label: string; value: string }[]
) {
  setMessages((prev) => [
    ...prev,
    {
      id: `bot-${Date.now()}`,
      role: "assistant",
      text,
      choiceButtons,
    },
  ]);
}

const OPTIONAL_INTRO =
  "Le informazioni facoltative ci aiutano a profilare meglio la tua richiesta e a proporti un'offerta più mirata. Vuoi aggiungerne qualcuna?";

export default function ChatWidget() {
  const welcome = getWelcomeReply();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: welcome.text,
      options: welcome.options,
      link: welcome.link,
    },
  ]);
  const [input, setInput] = useState("");
  const [flowMode, setFlowMode] = useState<FlowMode>(null);
  const [flowStep, setFlowStep] = useState<number | "date" | "time">(0);
  const [flowData, setFlowData] = useState<Record<string, string>>({});
  const [flowOptionalIndex, setFlowOptionalIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages]);

  const appendBotReply = (reply: ReturnType<typeof getBotReply>) => {
    setMessages((prev) => [...prev, createAssistantMessage(reply)]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text },
    ]);
  };

  // --- Contact flow submit ---
  const submitContact = async () => {
    const payload = {
      source: "Chat",
      name: flowData.name,
      email: flowData.email,
      telefono: flowData.telefono,
      progetto: flowData.progetto,
      company: flowData.company,
      budget: flowData.budget,
      servizio: flowData.servizio,
      ruolo: flowData.ruolo,
      sitoWeb: flowData.sitoWeb,
      dimensioneAzienda: flowData.dimensioneAzienda,
      comeConosciuto: flowData.comeConosciuto,
    };
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        addBotMessage(setMessages, "Grazie! La tua richiesta è stata inviata. Ti contatteremo al più presto da info@buluagency.it.");
      } else {
        addBotMessage(setMessages, "Si è verificato un errore nell'invio. Puoi riprovare o scriverci a info@buluagency.it.");
      }
    } catch {
      addBotMessage(setMessages, "Errore di connessione. Riprova o scrivici a info@buluagency.it.");
    }
    setSubmitting(false);
    setFlowMode(null);
    setFlowData({});
    setFlowStep(0);
    setFlowOptionalIndex(0);
  };

  // --- Book flow submit ---
  const submitBookCall = async () => {
    const payload = {
      date: flowData.date,
      time: flowData.time,
      durationMinutes: 30,
      nome: flowData.nome,
      cognome: flowData.cognome,
      azienda: flowData.azienda,
      telefono: flowData.telefono,
      email: flowData.email,
      aspettative: flowData.aspettative,
      ruolo: flowData.ruolo,
      sitoWeb: flowData.sitoWeb,
      dimensioneAzienda: flowData.dimensioneAzienda,
      areaProgetto: flowData.areaProgetto,
      budget: flowData.budget,
    };
    setSubmitting(true);
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        addBotMessage(setMessages, `Perfetto! La call del ${flowData.date} alle ${flowData.time} è stata registrata. Riceverai un riepilogo via email.`);
      } else {
        addBotMessage(setMessages, "Si è verificato un errore. Puoi riprovare o prenotare dalla pagina dedicata.");
      }
    } catch {
      addBotMessage(setMessages, "Errore di connessione. Riprova o prenota dalla pagina Book a call.");
    }
    setSubmitting(false);
    setFlowMode(null);
    setFlowData({});
    setFlowStep(0);
    setFlowOptionalIndex(0);
  };

  // --- Contact flow: next step after user input or choice ---
  const advanceContactFlow = (value: string, isButtonChoice: boolean) => {
    const step = flowStep as number;
    if (step <= 3) {
      const key = CONTACT_REQUIRED_STEPS[step].key;
      setFlowData((prev) => ({ ...prev, [key]: value }));
      if (step === 3) {
        addBotMessage(setMessages, OPTIONAL_INTRO, [
          { label: "Sì, aggiungo dettagli", value: "yes" },
          { label: "No, invia così", value: "no" },
        ]);
        setFlowStep(4);
      } else {
        const next = CONTACT_REQUIRED_STEPS[step + 1];
        addBotMessage(setMessages, next.question);
        setFlowStep(step + 1);
      }
      return;
    }
    if (step === 4) {
      if (value === "no") {
        submitContact();
        return;
      }
      const first = CONTACT_OPTIONAL_FIELDS[0];
      let choiceButtons: { label: string; value: string }[] = [{ label: "Salta", value: "__skip__" }];
      if (first.key === "budget") choiceButtons = [...CONTACT_BUDGET_OPTIONS.map((o) => ({ label: o.label, value: o.value })), choiceButtons[0]];
      if (first.key === "servizio") choiceButtons = [...CONTACT_SERVIZIO_OPTIONS.map((o) => ({ label: o.label, value: o.value })), choiceButtons[0]];
      if (first.key === "dimensioneAzienda") choiceButtons = [...CONTACT_DIMENSIONE_OPTIONS.map((o) => ({ label: o.label, value: o.value })), choiceButtons[0]];
      if (first.key === "comeConosciuto") choiceButtons = [...CONTACT_COME_CONOSCIUTO_OPTIONS.map((o) => ({ label: o.label, value: o.value })), choiceButtons[0]];
      addBotMessage(
        setMessages,
        `${first.label} (opzionale – scrivi, scegli o Salta)`,
        choiceButtons
      );
      setFlowStep(5);
      setFlowOptionalIndex(0);
      return;
    }
    const optIndex = flowOptionalIndex;
    const field = CONTACT_OPTIONAL_FIELDS[optIndex];
    if (field && value !== "__skip__") {
      setFlowData((prev) => ({ ...prev, [field.key]: value }));
    }
    const nextIndex = optIndex + 1;
    if (nextIndex >= CONTACT_OPTIONAL_FIELDS.length) {
      submitContact();
      return;
    }
    const nextField = CONTACT_OPTIONAL_FIELDS[nextIndex];
    let choiceButtons: { label: string; value: string }[] = [{ label: "Salta", value: "__skip__" }];
    if (nextField.key === "budget") choiceButtons = [...CONTACT_BUDGET_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    if (nextField.key === "servizio") choiceButtons = [...CONTACT_SERVIZIO_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    if (nextField.key === "dimensioneAzienda") choiceButtons = [...CONTACT_DIMENSIONE_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    if (nextField.key === "comeConosciuto") choiceButtons = [...CONTACT_COME_CONOSCIUTO_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    addBotMessage(
      setMessages,
      `${nextField.label} (opzionale – scrivi, scegli o Salta)`,
      choiceButtons
    );
    setFlowOptionalIndex(nextIndex);
  };

  // --- Book flow: date -> time -> required -> optional? -> optional fields -> submit ---
  const advanceBookFlow = (value: string, isButtonChoice: boolean) => {
    if (flowStep === "date") {
      setFlowData((prev) => ({ ...prev, date: value }));
      const dateObj = buildAvailableDates(14).find((d) => formatDateKey(d) === value);
      const slots = dateObj ? getSlotsForDate(dateObj) : [];
      addBotMessage(
        setMessages,
        "Scegli un orario (call 30 min):",
        slots.map((t) => ({ label: t, value: t }))
      );
      setFlowStep("time");
      return;
    }
    if (flowStep === "time") {
      setFlowData((prev) => ({ ...prev, time: value }));
      const first = BOOK_REQUIRED_AFTER_SLOT[0];
      addBotMessage(setMessages, first.question);
      setFlowStep(0);
      return;
    }
    const step = flowStep as number;
    if (step < BOOK_REQUIRED_AFTER_SLOT.length) {
      const key = BOOK_REQUIRED_AFTER_SLOT[step].key;
      setFlowData((prev) => ({ ...prev, [key]: value }));
      if (step === BOOK_REQUIRED_AFTER_SLOT.length - 1) {
        addBotMessage(setMessages, "Vuoi aggiungere informazioni facoltative? Ci aiutano a prepararci meglio alla call.", [
          { label: "Sì", value: "yes" },
          { label: "No, conferma la call", value: "no" },
        ]);
        setFlowStep(BOOK_REQUIRED_AFTER_SLOT.length);
        setFlowOptionalIndex(0);
      } else {
        const next = BOOK_REQUIRED_AFTER_SLOT[step + 1];
        addBotMessage(setMessages, next.question);
        setFlowStep(step + 1);
      }
      return;
    }
    if (step === BOOK_REQUIRED_AFTER_SLOT.length) {
      if (value === "no") {
        submitBookCall();
        return;
      }
      const first = BOOK_OPTIONAL_FIELDS[0];
      let choiceButtons: { label: string; value: string }[] = [{ label: "Salta", value: "__skip__" }];
      if (first.key === "dimensioneAzienda") choiceButtons = [...BOOK_DIMENSIONE_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
      if (first.key === "areaProgetto") choiceButtons = [...BOOK_AREA_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
      if (first.key === "budget") choiceButtons = [...BOOK_BUDGET_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
      addBotMessage(setMessages, `${first.label} (opzionale – scegli o Salta)`, choiceButtons);
      setFlowStep(BOOK_REQUIRED_AFTER_SLOT.length + 1);
      setFlowOptionalIndex(0);
      return;
    }
    const optIndex = flowOptionalIndex;
    const field = BOOK_OPTIONAL_FIELDS[optIndex];
    if (field && value !== "__skip__") setFlowData((prev) => ({ ...prev, [field.key]: value }));
    const nextIndex = optIndex + 1;
    if (nextIndex >= BOOK_OPTIONAL_FIELDS.length) {
      submitBookCall();
      return;
    }
    const nextField = BOOK_OPTIONAL_FIELDS[nextIndex];
    let choiceButtons: { label: string; value: string }[] = [{ label: "Salta", value: "__skip__" }];
    if (nextField.key === "dimensioneAzienda") choiceButtons = [...BOOK_DIMENSIONE_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    if (nextField.key === "areaProgetto") choiceButtons = [...BOOK_AREA_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    if (nextField.key === "budget") choiceButtons = [...BOOK_BUDGET_OPTIONS.map((o) => ({ label: o.label, value: o.value })), ...choiceButtons];
    addBotMessage(setMessages, `${nextField.label} (opzionale – scegli o Salta)`, choiceButtons);
    setFlowOptionalIndex(nextIndex);
  };

  const handleFlowInput = (value: string) => {
    if (flowMode === "contact") advanceContactFlow(value, false);
    if (flowMode === "book") advanceBookFlow(value, false);
  };

  const handleFlowChoice = (value: string) => {
    if (flowMode === "contact") advanceContactFlow(value, true);
    if (flowMode === "book") advanceBookFlow(value, true);
  };

  const handleOptionClick = (payload: string, userLabel?: string) => {
    if (payload === "__start_contact_flow__") {
      addUserMessage("Sì, procediamo");
      setFlowMode("contact");
      setFlowStep(0);
      setFlowData({});
      addBotMessage(setMessages, CONTACT_REQUIRED_STEPS[0].question);
      return;
    }
    if (payload === "__start_book_flow__") {
      addUserMessage("Sì, prenoto in chat");
      setFlowMode("book");
      setFlowStep("date");
      setFlowData({});
      const dates = buildAvailableDates(8);
      addBotMessage(
        setMessages,
        "Scegli una data per la call:",
        dates.map((d) => ({ label: formatDateLabel(d), value: formatDateKey(d) }))
      );
      return;
    }
    if (flowMode && (flowStep === 4 || flowStep === BOOK_REQUIRED_AFTER_SLOT.length)) {
      handleFlowInput(payload);
      return;
    }
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", text: userLabel ?? payload }]);
    const reply = getBotReply(payload);
    setTimeout(() => setMessages((prev) => [...prev, createAssistantMessage(reply)]), 300);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    if (flowMode) {
      addUserMessage(text);
      setInput("");
      handleFlowInput(text);
      return;
    }
    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const reply = getBotReply(text);
    setTimeout(() => appendBotReply(reply), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastMessage = [...messages].reverse()[0];
  const showChoiceButtons = lastMessage?.role === "assistant" && lastMessage.choiceButtons && flowMode;
  const placeholder = flowMode
    ? flowStep === "date"
      ? "Scegli una data sopra"
      : flowStep === "time"
        ? "Scegli un orario sopra"
        : "Scrivi la tua risposta..."
    : "Scrivi un messaggio...";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-white shadow-lg transition hover:border-[var(--glow-blue)] hover:shadow-[0_0_20px_var(--glow-violet-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--glow-blue)]"
        aria-label={open ? "Chiudi chat" : "Apri chat assistenza"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 flex w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-xl"
          style={{ height: "520px" }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
            <span className="font-semibold text-white">Assistenza</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-[var(--text-muted)] transition hover:bg-white/10 hover:text-white"
              aria-label="Chiudi"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[85%] flex-col gap-2">
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        m.role === "user"
                          ? "bg-[var(--glow-blue)] text-white"
                          : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      }`}
                    >
                      {m.text}
                      {m.role === "assistant" && m.link && (
                        <div className="mt-2">
                          <Link
                            href={m.link.href}
                            className="inline-block text-sm font-medium text-[var(--glow-blue)] hover:underline"
                            onClick={() => setOpen(false)}
                          >
                            {m.link.label}
                          </Link>
                        </div>
                      )}
                    </div>
                    {m.role === "assistant" && m.options && !m.choiceButtons && m.id === lastMessage?.id && !flowMode && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.options.map((opt) => (
                          <button
                            key={opt.payload}
                            type="button"
                            onClick={() => handleOptionClick(opt.payload, opt.label)}
                            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:border-[var(--glow-blue)] hover:text-white"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {m.role === "assistant" && m.choiceButtons && m.id === lastMessage?.id && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.choiceButtons.map((cb) => (
                          <button
                            key={cb.value}
                            type="button"
                            onClick={() => {
                              addUserMessage(cb.label);
                              handleFlowChoice(cb.value);
                            }}
                            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:border-[var(--glow-blue)] hover:text-white"
                          >
                            {cb.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[var(--border-subtle)] p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:border-[var(--glow-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--glow-blue)]"
                disabled={submitting}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || submitting}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--glow-blue)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Invia"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
