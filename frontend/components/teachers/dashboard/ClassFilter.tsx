"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassFilterProps {
  selectedClass: string;
  onClassChange: (value: string) => void;
}

const classes = [
  { value: "class-a", label: "Kelas A" },
  { value: "class-b", label: "Kelas B" },
  { value: "class-c", label: "Kelas C" },
];

const ClassFilter = ({ selectedClass, onClassChange }: ClassFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
      <div className="w-full max-w-md">
        <Select
          value={selectedClass || undefined}
          onValueChange={onClassChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {classes.map((cls) => (
                <SelectItem key={cls.value} value={cls.value}>
                  {cls.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClassFilter;
