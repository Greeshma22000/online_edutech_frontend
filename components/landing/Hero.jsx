import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className='relative overflow-hidden '>
        <div className='absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50' />
            <div className='relative max-w-6xl mx-auto px-4 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
                    <div>
                        <span className='inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-4 py-1.5 text-sm font-medium'>Trusted learning, made simple</span>
                        <h1 className='mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight'>Learn anything. Build real skills.</h1>
                        <p className='mt-5 text-lg md:text-xl text-gray-600 max-w-2xl'>Courses designed by experts. Progress tracking, quizzes, certificates, and more — all in one place.</p>
                        <div className='mt-8 flex items-center gap-3'>
                            <a href="/courses" className='inline-flex items-center justify-centerrounded-lg px-7 py-3.5 text-base md:text-lg font-medium text-white shadow shadow-brand-500/30 hover:shado-glow transition rounded' style={{backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%'}}>Browse Courses</a>
                            <a href="/register" className='inline-flex items-center justify-center rounded-lg border border-brand-200 px-7 py-3.5 text-base md:text-lg font-medium text-brand-700 bg-white hover:bg-brand-50 transition'>Get Started</a>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='rounded-3xl border border-amber-600 bg-white p-4 shadow-sm'>
                            <div className='relative w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center' style={{minHeight: '400px'}}>
                                <Image 
                                    src="/main.png"
                                    alt= "Online Edutech learning platform"
                                    width={600}
                                    height={400}
                                    className='object-contain rounded-2xl'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default Hero