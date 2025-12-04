"use client"
import { apiFetch, getAuthToken, setAuthToken } from '@/lib/supabaseClient';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getAuthToken();
        if(!token) return;
        apiFetch('/auth/profile').then((res) => setUser(res.user)).catch(() => setUser(null));
    }, []);
  return (
    <header className="w-full border-b border-b-amber-600 bg-white/80 backdrop-blur">
        <div className='max-w-6xl mx-auto flex items-center justify-between px-4 py-4'>
            <Link href="/" className='font-semibold text-xl md:text-2xl flex items-center gap-2'>
                <span className='inline-flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md' style={{backgroundImage: 'linear-gradient(135deg, #240046 0%, #f7b267 100%'}}>O</span>
                <span className='text-gray-900'><span className='text-brand-600'>Online Edu</span>Tech</span>
            </Link>
            <nav className='flex items-center gap-5'>
                <Link href="/courses" className='text-base text-gray-700 hover:text-amber-900'>Courses</Link>
                {user ? (
                    <button className='text-base text-gray-700 hover:text-amber-900' onClick={() => { setAuthToken(null); setUser(null); }}>Logout</button>
                ) : (
                    <>
                        <Link href="/login" className='text-base text-gray-700 hover:text-amber-900'>Login</Link>
                        <Link href="/register" className='text-base inline-flex items-center rounded-md text-white px-4 py-2 hover:opacity-90' style={{backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%'}}>Sign up</Link>
                    </>
                )}
            </nav>
        </div>
    </header>
  )
}

export default Header