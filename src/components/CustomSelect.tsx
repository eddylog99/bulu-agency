"use client";

import React, { useEffect, useRef, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25";

export type SelectOption = { value: string; label: string };

type CustomSelectProps = {
  name: string;
  id: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

export function CustomSelect({
  name,
  id,
  options,
  placeholder = "Seleziona...",
  defaultValue = "",
  className = "",
  required,
  disabled,
}: CustomSelectProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} readOnly />
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        className={`${inputClass} flex w-full items-center justify-between text-left transition ${
          !selectedOption ? "text-[var(--text-muted)]" : ""
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
      >
        <span>{displayLabel}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-1 shadow-xl"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                setValue(opt.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-4 py-2.5 text-sm hover:bg-white/5 ${
                value === opt.value
                  ? "bg-[#5CA9E9]/10 text-[#5CA9E9]"
                  : "text-[var(--text-primary)]"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
