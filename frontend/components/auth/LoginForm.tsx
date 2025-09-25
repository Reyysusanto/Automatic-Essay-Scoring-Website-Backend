'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [role, setRole] = useState<'dosen' | 'mahasiswa'>('dosen');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-1">
        <Button
          variant="ghost"
          onClick={() => setRole('dosen')}
          className={clsx(
            'cursor-pointer rounded-full transition-all ease-in-out duration-500',
            role === 'dosen'
              ? 'bg-primary-color text-white shadow-md hover:bg-primary-color/90'
              : 'bg-transparent text-primary hover:bg-primary-color/10'
          )}
        >
          Dosen
        </Button>
        <Button
          variant="ghost"
          onClick={() => setRole('mahasiswa')}
          className={clsx(
            'cursor-pointer rounded-full transition-all ease-in-out duration-500',
            role === 'mahasiswa'
              ? 'bg-primary-color text-white shadow-md hover:bg-primary-color/90'
              : 'bg-transparent text-primary hover:bg-primary-color/10'
          )}
        >
          Mahasiswa
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          placeholder="Masukkan Email"
          className="rounded-full border-stone-700 h-10 px-4"
        />
        <div className="relative">
          <Input
            placeholder="Masukkan Password"
            className="rounded-full border-stone-700 h-10 px-4 pr-10" // kasih padding kanan biar ga ketiban icon
            type={showPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <Button className="cursor-pointer transition-all ease-in-out duration-600 rounded-full bg-primary-color hover:bg-emerald-600 h-10 px-4">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
