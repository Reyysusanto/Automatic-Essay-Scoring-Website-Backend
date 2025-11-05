'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const ExamCode = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
      setCode(newCode);

      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    alert(`Kode Ujian: ${code.join('')}`);
    router.push(`/students/exams/do/${code.join('')}/1`);
  };

  return (
    <div className="flex flex-col mt-8 justify-center items-center gap-4">
      <h2 className="text-xl font-semibold">Masukkan Kode Ujian Anda</h2>
      <div className="flex space-x-3 mb-6">
        {code.map((char, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputRef.current[i] = el;
            }}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-14 h-16 text-center text-xl lg:!text-2xl font-medium !text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm"
          />
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-primary-color h-9 rounded-md text-white hover:bg-emerald-700 transition-colors px-12 cursor-pointer"
      >
        Mulai Ujian
      </Button>
    </div>
  );
};

export default ExamCode;
