// components/ujian/tambah-ujian-dropdown.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TambahUjianDropdownProps {
  onSubmit: (judul: string) => void;
}

export const TambahUjianDropdown: React.FC<TambahUjianDropdownProps> = ({
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [judulUjian, setJudulUjian] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (judulUjian.trim()) {
      onSubmit(judulUjian.trim());
      setJudulUjian("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setJudulUjian("");
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-4 rounded-lg"
      >
        <span>Tambahkan Ujian</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-10" onClick={handleCancel} />

          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-input rounded-lg shadow-lg z-20">
            <form onSubmit={handleSubmit} className="p-4">
              <Input
                type="text"
                value={judulUjian}
                onChange={(e) => setJudulUjian(e.target.value)}
                placeholder="Masukkan judul ujian..."
                autoFocus
                className="mb-3"
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  size="sm"
                  className="flex-1 bg-primary-color hover:bg-emerald-700 h-9 rounded-md text-white"
                >
                  Tambah
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
