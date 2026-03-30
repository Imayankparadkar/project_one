"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

interface DropdownFilterProps {
  options: string[];
  defaultSelected?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export default function DropdownFilter({ options, defaultSelected, value, onChange }: DropdownFilterProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected || options[0]);
  const selected = value !== undefined ? value : internalSelected;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
        rounded-full border border-orange-300 px-4 py-2 text-sm text-foreground hover:bg-orange-500/10
        flex items-center gap-1.5 px-4 py-2 
        
        "
      >
        <span className="truncate max-w-[90px] text-left">{selected}</span>
        <ChevronDown className="w-4 h-4 text-text-muted" strokeWidth={2} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 min-w-[210px] bg-page-surface border border-page-border shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[12px] z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (onChange) {
                  onChange(option);
                } else {
                  setInternalSelected(option);
                }
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[14px] text-left hover:bg-page-surface-alt text-text-primary transition-colors outline-none"
            >
              <div className="w-4 flex items-center justify-center flex-shrink-0 text-text-primary">
                {selected === option && <Check className="w-4 h-4" strokeWidth={2.5} />}
              </div>
              <span className="flex-1 truncate">{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
