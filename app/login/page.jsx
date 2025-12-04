"use client";
import Login from '../../components/auth/Login';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <main>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="sr-only">Login</h2>
        <Login onSuccess={() => router.push('/dashboard')} />
      </div>
    </main>
  );
}