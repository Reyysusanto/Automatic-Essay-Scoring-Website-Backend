"use client";

import React from "react";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ujian {
  id: string;
  judul: string;
  tanggalDibuat: string;
}

interface UjianCardProps {
  ujian: Ujian;
  onCardClick: (id: string) => void;
  onMenuClick: (id: string) => void;
}

export const UjianCard: React.FC<UjianCardProps> = ({
  ujian,
  onCardClick,
  onMenuClick,
}) => {
  const handleCardClick = () => {
    onCardClick(ujian.id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMenuClick(ujian.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 rounded-lg border border-input cursor-pointer hover:shadow-md transition-all group min-h-[80px] flex items-center"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">
            {ujian.judul}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuClick}
            className="opacity-0 group-hover:opacity-100 w-8 h-8"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};
