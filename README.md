# AutoGrade – Automatic Essay Scoring

---

## FRONTEND

### ⚙️ Teknologi dan Perpustakaan yang Digunakan

* **[TypeScript](https://www.typescriptlang.org/docs/)** – Codebase lebih aman, minim bug, dan developer experience lebih nyaman (auto-complete, type checking).
* **[TailwindCSS](https://tailwindcss.com/docs)** – Styling utility-first yang cepat, konsisten, dan gampang di-maintain.
* **[Shadcn](https://ui.shadcn.com/)** – Komponen siap pakai berbasis Tailwind (button, modal, card, dll).
* **[TanStack Query](https://tanstack.com/query/latest/docs/react/overview)** – Data fetching di client-side. Untuk server-side, tetap bisa pakai fetch bawaan Next.js.
* **[Axios](https://axios-http.com/docs/intro)** – HTTP client dengan fitur tambahan (interceptors, request retry, timeout).
* **[Zod](https://zod.dev/)** – Validasi schema (terintegrasi dengan React Hook Form).
* **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)** – State management ringan, cocok untuk global state di client-side.
* **[React Hook Form](https://react-hook-form.com/get-started)** – Form handling ringan, performa tinggi, mudah digabung dengan Zod.
* **[JS Cookie](https://www.npmjs.com/package/js-cookie)** – Manajemen cookies di browser.
* **[JWT Decode](https://www.npmjs.com/package/jwt-decode#documentation)** – Utility untuk decode JWT di client.

---

### 🧭 Struktur Project

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
├── schemas/       # Validasi data pakai Zod
├── store/         # State global (Zustand)
├── types/         # TypeScript type & interface
├── utils/         # Helper function umum (format tanggal, konversi string, dll)
```

---

### 🔧 Cara Menjalankan Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start local dev server:

   ```bash
   npm run dev
   ```

3. Build untuk production:

   ```bash
   npm run build
   ```

---

### 🌱 Setup `.env`

Buat file `.env.local` dari contoh `.env.example`:

```bash
cp .env.example .env.local
```

Contoh isi:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_KEY=your_key_here
```

> ⚠️ Jangan pernah commit file `.env`.

---

### 🧩 Contoh Struktur Modul Kecil

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

### 🌿 Konvensi Penamaan Branch

| Tujuan                      | Nama Branch                |
| --------------------------- | -------------------------- |
| Tambah form pendaftaran tim | `feature/register-form`    |
| Perbaiki validasi email     | `fix/register-email`       |
| Refactor halaman dashboard  | `chore/dashboard-refactor` |

---

### 🗒️ Catatan

* Semua API call → `lib/api/`
* Validasi form/data → `schemas/` (pakai Zod)
* Global state → `store/` (pakai Zustand, jika perlu)
* Hindari `any`, gunakan tipe di `types/`
* Komponen harus reusable
* Gunakan Tailwind + Shadcn untuk styling
* Jangan langsung pakai `process.env`, buat wrapper di `utils/env.ts`
* Tulis komentar untuk logic yang rumit

---

## BACKEND

### ⚙️ Teknologi dan Perpustakaan yang Digunakan

* **[FastAPI](https://fastapi.tiangolo.com/)** – Framework web modern berbasis Python.
* **[Uvicorn](https://www.uvicorn.org/)** – ASGI server untuk menjalankan FastAPI.
* **[Transformers (Hugging Face)](https://huggingface.co/transformers/)** – Model NLP untuk Automatic Essay Scoring.
* **[scikit-learn](https://scikit-learn.org/)**, **[NumPy](https://numpy.org/)**, **[Pandas](https://pandas.pydata.org/)** – Preprocessing & evaluasi model.
* **Database (opsional: PostgreSQL / MongoDB)** – Menyimpan user, essay, dsb.
* **Google Drive API (opsional)** – Simpan model hasil training.

---

### 🧭 Struktur Project

```
Automatic-Essay-Scoring/
│
├── frontend/      # Next.js (Website)
├── backend/       # FastAPI (API + Model)
```

---

### 🔧 Cara Menjalankan Project

1. Masuk ke folder backend:

   ```bash
   cd backend/ml-nlp
   ```

2. Buat virtual environment:

   ```bash
   python -m venv venv
   ```

3. Aktifkan venv:

   * **Windows**:

     ```bash
     venv\Scripts\activate
     ```
   * **Linux/Mac**:

     ```bash
     source venv/bin/activate
     ```
4. requirements:

   ```bash
   fastapi
   uvicorn[standard]
   torch
   torchvision
   torchaudio
   transformers
   datasets
   evaluate
   scikit-learn
   matplotlib
   pydantic
   python-dotenv
   ```
   
5. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

6. Jalankan server:

   ```bash
   uvicorn main:app --reload
   ```

   Server berjalan di:

   * API root → [http://localhost:8000](http://localhost:8000)
   * Swagger UI → [http://localhost:8000/docs](http://localhost:8000/docs)
