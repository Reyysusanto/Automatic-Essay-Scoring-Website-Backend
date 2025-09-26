import React from "react";
import { ChevronDown } from "lucide-react";

export const EmptyState: React.FC = () => (
  <div className="text-center py-16">
    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
      <ChevronDown className="w-6 h-6 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-medium text-foreground mb-2">
      Belum ada ujian
    </h3>
    <p className="text-muted-foreground">Tambahkan ujian pertama Anda</p>
  </div>
);
