import Image from 'next/image';
import PhotoLogin from '@/public/Images/photo-login.png';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center w-full lg:w-4/5 h-screen py-[8rem] px-[5rem] gap-[1rem] bg-background mx-auto md:space-x-20">
      <div className="flex flex-col md:w-1/2">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-2xl lg:text-5xl font-bold text-primary-text-color">
            Selamat Datang <span className="text-primary-color">Auto</span>
            Grade!
          </h1>
          <p className="text-secondary-text-color lg:text-xl">
            Platform penilaian esai otomatis berbasis AI untuk dosen dan
            mahasiswa
          </p>
        </div>
        <LoginForm />
      </div>
      <Image
        height={300}
        width={300}
        src={PhotoLogin}
        alt="Photo Login"
        className="hidden md:inline-block lg:h-4/5 xl:h-full w-auto max-w-1/2 rounded-4xl"
      />
    </section>
  );
};

export default LoginPage;
