# AES Project (Automated Essay Scoring)

Sistem Automated Essay Scoring (AES) berbasis web yang melakukan penilaian otomatis terhadap esai menggunakan pendekatan **Natural Language Processing (NLP)**. Proyek ini mengimplementasikan arsitektur **microservices** dengan dua layanan utama yang terpisah untuk memastikan skalabilitas dan maintainability.

## Fitur Utama

- **Manajemen Pengguna & Soal** - CRUD operations untuk pengelolaan user dan bank soal
- **Submission Esai** - Upload dan penyimpanan jawaban esai dari pengguna
- **Automated Scoring** - Penilaian otomatis menggunakan multiple ML models:
  - **indoBERT (fine-tuned)** - Model transformer canggih untuk pemahaman konteks bahasa Indonesia
  - **Baseline Model** - Linear Regression + Cosine Similarity untuk perbandingan
- **Data Persistence** - Penyimpanan terpusat di PostgreSQL dengan struktur data ternormalisasi
- **RESTful APIs** - API endpoints yang terstruktur dan terdokumentasi

**Alur Data:**
1. Frontend berkomunikasi hanya dengan **go-backend**
2. **go-backend** meneruskan request scoring ke **ml-api**
3. **ml-api** memproses teks dan mengembalikan hasil scoring
4. **go-backend** menyimpan hasil ke database
5. Data tersedia untuk retrieval melalui API endpoints

## 📁 Struktur Repository

```
aes-project/
├── go-backend/                 # Golang CRUD Service
│   ├── cmd/
│   │   └── server/            # Entry point aplikasi
│   ├── internal/
│   │   ├── handlers/          # HTTP request handlers
│   │   ├── models/            # Data models (GORM)
│   │   ├── repositories/      # Database operations
│   │   ├── services/          # Business logic
│   │   └── utils/             # Utility functions
│   ├── pkg/
│   │   └── database/          # Database connection setup
│   ├── config/                # Configuration files
│   └── go.mod                 # Go dependencies
│
├── ml-api/                    # Python ML Service
│   ├── app/
│   │   ├── models/            # ML model implementations
│   │   ├── schemas/           # Pydantic models
│   │   └── utils/             # NLP processing utilities
│   ├── weights/               # Model weights
│   ├── main.py               # FastAPI application entry
│   └── requirements.txt      # Python dependencies
│
├── .env.example              # Environment variables template
├── LICENSE                   # MIT License
└── README.md                 # This file
```

## 🛠️ Teknologi yang Digunakan

### Backend Services
- **Golang** dengan framework **Gin/Gorm** - High-performance API service
- **Python** dengan **FastAPI** - High-performance ML API dengan async support
- **PostgreSQL** - Relational database dengan fitur full-text search

### Machine Learning
- **Transformers** (Hugging Face) - Untuk model indoBERT
- **PyTorch** - Deep learning framework
- **Scikit-learn** - Untuk baseline model (Linear Regression)
- **SentenceTransformers** - Untuk cosine similarity embeddings
- **NLTK/Spacy** - Text preprocessing

## ⚙️ Setup dan Instalasi

### 1. Prasyarat Sistem
- **Go** versi 1.19+
- **Python** versi 3.9+
- **PostgreSQL** versi 13+
- **Git** dengan **Git LFS** (untuk download model weights)

### 2. Clone Repository
```bash
# Clone repository
git clone https://github.com/username/aes-project.git
cd aes-project
```

### 3. Setup Database PostgreSQL
```bash
# Buat database
psql -c "CREATE DATABASE aes_database;"
```

### 4. Setup Environment Variables
```bash
# Copy environment template
cp .env.example .env
```

Isi file `.env` dengan konfigurasi yang sesuai:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aes_database
DB_USER=aes_user
DB_PASSWORD=your_password

# Go Backend Configuration
GO_PORT=8080
JWT_SECRET=your_jwt_secret_here

# ML API Configuration
ML_API_HOST=localhost
ML_API_PORT=8000
MODEL_PATH=./ml-api/weights/indobert-model
```

### 5. Setup Go Backend
```bash
cd go-backend

# Install dependencies
go mod download

# Run application
go run main.go
```

### 6. Setup ML API
```bash
cd ml-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run application
uvicorn main:app --reload 
```


## 🌿 Konvensi Penamaan Branch

Gunakan format **type/nama-modul-keterangan**:

| Tujuan                      | Nama Branch                |
| --------------------------- | -------------------------- |
| Tambah form pendaftaran tim | feature/register-form    |
| Perbaiki validasi email     | fix/register-email       |
| Refactor halaman dashboard  | chore/dashboard-refactor |
| Tambah endpoint users       | feature/users-api        |
| Perbaiki bug scoring        | fix/scoring-logic        |
| Update documentation        | chore/readme-update      |

### Penjelasan Type:
- **feature/** - Untuk fitur baru
- **fix/** - Untuk perbaikan bug
- **chore/** - Untuk tugas maintenance (refactor, docs, etc.)
- **hotfix/** - Untuk perbaikan critical production bugs


## 🤝 Kontribusi

Untuk kontribusi ikuti langkah-langkah berikut:

1. clone repository ini
2. Buat feature branch menggunakan konvensi penamaan di atas
3. Commit perubahan dengan message yang deskriptif
4. Push ke branch
5. Buka Pull Request

### Guidelines untuk Kontribusi:
- Ikuti konvensi penamaan branch yang sudah ditetapkan
- Update documentation sesuai kebutuhan
- Pastikan semua tests pass sebelum submit PR


## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co) untuk pretrained models
- [IndoBERT](https://huggingface.co/indobenchmark/indobert-base-p1) team untuk model bahasa Indonesia
- Komunitas open source untuk berbagai libraries dan tools

---

**Note**: Project ini masih dalam pengembangan aktif. Beberapa fitur mungkin berubah atau belum sepenuhnya diimplementasikan.
