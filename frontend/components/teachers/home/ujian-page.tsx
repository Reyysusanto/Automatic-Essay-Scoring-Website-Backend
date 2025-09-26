"use client";

import React, { useState } from "react";
import { TambahUjianDropdown } from "./tambah-ujian-dropdown";
import { UjianCard } from "./ujian-card";
import { EmptyState } from "./empty-state";
import { useRouter } from "next/navigation";

interface Ujian {
  id: string;
  judul: string;
  tanggalDibuat: string;
}

// Dummy data awal
const initialUjianData: Ujian[] = [
  {
    id: "1",
    judul: "Pembangunan Perangkat Lunak",
    tanggalDibuat: "2025-09-15",
  },
  {
    id: "2",
    judul: "Desain Interaksi",
    tanggalDibuat: "2025-09-10",
  },
  {
    id: "3",
    judul: "Analisis dan Visualisasi",
    tanggalDibuat: "2025-09-08",
  },
];

const UjianPage: React.FC = () => {
  const router = useRouter();
  const [ujianList, setUjianList] = useState<Ujian[]>(initialUjianData);

  // Handle tambah ujian
  const handleTambahUjian = (judul: string) => {
    const ujianBaru: Ujian = {
      id: Date.now().toString(),
      judul,
      tanggalDibuat: new Date().toISOString().split("T")[0],
    };

    setUjianList((prev) => [ujianBaru, ...prev]);
  };

  // Handle click card ujian
  const handleCardClick = (id: string) => {
    router.push(`/teachers/exams/${id}`);
    console.log("Navigate to ujian detail:", id);
    // TODO: Navigate ke halaman detail/edit ujian
    // router.push(`/teachers/ujian/${id}`);
  };

  // Handle menu click
  const handleMenuClick = (id: string) => {
    console.log("Show menu for ujian:", id);
    // TODO: Show context menu (edit, delete, duplicate, etc.)
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Ujian</h1>
          {/* Tambah Ujian Dropdown */}
          <TambahUjianDropdown onSubmit={handleTambahUjian} />
        </div>

        {/* Content */}
        {ujianList.length === 0 ? (
          <EmptyState />
        ) : (
          // List ujian dalam bentuk card
          <div className="space-y-3">
            {ujianList.map((ujian) => (
              <UjianCard
                key={ujian.id}
                ujian={ujian}
                onCardClick={handleCardClick}
                onMenuClick={handleMenuClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UjianPage;
