export default function Features() {
    const cards = [
        {
            title: 'Real-time tracking',
            desc: 'Follow your course roadmap and see live progress as you learn.',
            image: '/real time tracking.png'
        },
        {
        title: 'Secure payments',
        desc: 'Purchase premium courses safely with trusted providers.',
        image: '/secure tracking.png',
        },
        {
        title: 'Fast matching',
        desc: 'Quickly find the right course with smart search and filters.',
        image: '/fast matching.png',
        },
        {
        title: 'Reliable support',
        desc: 'In-app help and quick resolutions for a smooth experience.',
        image: '/reliable support.png',
        },
        {
        title: 'Learner safety',
        desc: 'Verified instructors, reviews, and transparent guidelines.',
        image: '/learner safety.png',
        },
        {
        title: 'Low wait times',
        desc: 'Optimized delivery—access content instantly and resume anytime.',
        image: '/low wait times.png',
        },
    ];


    return (
        <section className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-semibold text-gray-900">Why choose Online EduTech</h2>
                <p className="text-gray-600 mt-2">Modern, safe, and fast - everything you need to learn with confidence.</p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((c,idx) => (
                        <div key={c.title} className="rounded-2xl border border-amber-600 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="h-48 w-full mb-4 relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                                <img 
                                    src={c.image} alt={c.title} 
                                    className="max-h-full max-w-full object-contain rounded-xl"
                                />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-xl md:text-2xl">{c.title}</h3>
                            <p className="mt-2 text-base text-gray-600 leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}