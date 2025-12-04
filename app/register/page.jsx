"use client";
import Register from '../../components/auth/Register';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <main>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="sr-only">Create account</h2>
        <Register onSuccess={() => router.push('/login')} />
      </div>
    </main>
  );
}

