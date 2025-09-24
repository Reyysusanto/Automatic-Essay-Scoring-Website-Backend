# AutoGrade-Automatic-Essay-Scoring

---

## ⚙️ Teknologi dan Perpustakaan yang Digunakan

- **[TypeScript](https://www.typescriptlang.org/docs/)** – Codebase lebih aman, minim bug, dan developer experience lebih nyaman (auto-complete, type checking).
- **[TailwindCSS](https://tailwindcss.com/docs)** – Styling utility-first yang cepat, konsisten, dan gampang di-maintain.
- **[Shadcn](https://ui.shadcn.com/)** – Komponen siap pakai berbasis Tailwind (button, modal, card, dll).
- **[TanStack Query](https://tanstack.com/query/latest/docs/react/overview)** – Dipakai bersamaan dengan Next.js untuk data fetching di client-side. Untuk server-side, tetap bisa pakai fetch bawaan Next.js
- **[Axios](https://axios-http.com/docs/intro)** – HTTP client, berguna kalau butuh fitur tambahan (interceptors, request retry, timeout).
- **[Zod](https://zod.dev/)** – Buat validasi schema, form dengan React Hook Form, input.
- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)** – State management yang simpel, cocok untuk global state yang tidak terkait server. Next.js App Router sudah bawa Context + Server Component, tapi untuk state client yang reaktif, zustand lebih praktis.
- **[React Hook Form](https://react-hook-form.com/get-startedhttps://react-hook-form.com/get-started)** – Form handling yang ringan, performa tinggi, mudah digabung dengan Zod untuk validasi. Cocok buat form kompleks di Next.js (login, register, checkout).
- **[JS Cookie](https://www.npmjs.com/package/js-cookie)** – Library sederhana untuk mengelola cookies di browser (set, get, remove). Berguna untuk menyimpan token/session di client-side.
- **[JWT Decode](https://www.npmjs.com/package/jwt-decode#documentation)** – Utility untuk decode JWT (JSON Web Token) tanpa perlu verify di client, biasanya dipakai untuk membaca payload seperti userId, exp, atau roles.

---

## 🧭 Struktur Project

```
Automatic-Essay-Scoring-Website-Frontend/
│
├── .next/         # Build output Next.js (otomatis, jangan diubah)
├── app/           # App Router (halaman, layout, API routes, dll)
├── components/    # Komponen UI reusable
├── hooks/         # Custom hooks
├── lib/           # Logic umum (axios instance, auth utils, helper server/client)
├── node_modules/  # Dependency dari npm/yarn
├── public/        # File statis (images, favicon, dll)
├── schemas/       # Validasi data pakai Zod (biasanya buat form atau API)
├── store/         # State global yang di-manage pakai Zustand
├── types/         # TypeScript type & interface agar aman dan jelas
├── utils/         # Helper function umum (format tanggal, konversi string, dll)
```

---

## 🔧 Cara Menjalankan Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start local dev server:

   ```bash
   npm run dev
   ```

3. Build buat production:

   ```bash
   npm run build
   ```

---

## 🌱 Setup '.env'

Buat file `.env` dari contoh `.env.example`:

```bash
cp .env.example .env.local
```

Contoh isi:

```env
VITE_API_URL=https://api.umkm-desakare.test
VITE_PUBLIC_KEY=your_key_here
```

> ⚠️ Jangan pernah commit `.env`,

---

## 🧩 Contoh Struktur Modul Kite

Biar tidak bingung dalam menyusun file :

```
components/
  registration/
    RegisterForm.tsx
    MemberCard.tsx

schemas/
  registrationSchema.ts

lib/api/
  registerTeam.ts
  getTeams.ts
```

---

## 🌿 Konvensi Penamaan Branch

Pake format `type/nama-modul-keterangan`, contoh:

| Tujuan                      | Nama Branch                |
| --------------------------- | -------------------------- |
| Tambah form pendaftaran tim | `feature/register-form`    |
| Perbaiki validasi email     | `fix/register-email`       |
| Refactor halaman dashboard  | `chore/dashboard-refactor` |

---

## 🗒️ Catatan :

- Semua API call wajib di `lib/api/`
- Validasi form atau data masukin ke `schemas/` pake Zod
- Pakai global state cuma kalau perlu (misal: user info, session)
- Hindari `any`, buat tipe di `types/`
- Komponen harus reusable sebisa mungkin
- Gunakan Tailwind + Shadcn untuk styling
- Jangan langsung pakai `process.env`, semua taru di `src/utils/env.ts`
- Tulis komentar kalau logic rumit
