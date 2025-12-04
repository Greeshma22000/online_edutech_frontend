"use client";
import { useState } from 'react';
import CertificateView from '../certificate/CertificateView';

export default function Certificates({ items = [], user }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Certificates</h2>
        <p className="text-lg text-gray-600 mt-2">Your earned achievements</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-12 rounded-2xl border bg-white">
            <div className="text-5xl mb-4">🎓</div>
            <p className="text-gray-600">No certificates earned yet. Complete courses to earn certificates!</p>
          </div>
        ) : (
          items.map((c) => (
            <div key={c.id} className="group relative rounded-2xl bg-white p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-10 blur-xl" />
              <div className="relative">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-100 grid place-items-center mb-3">
                  <div className="text-4xl">🎓</div>
                </div>
                <div className="text-sm font-bold text-gray-900 mb-3 truncate" title={c.title}>{c.title}</div>
                <button
                  onClick={() => setSelectedCertificate(c)}
                  className="w-full inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-white shadow-md hover:shadow-lg transition"
                  style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
                >
                  View & Download ↓
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedCertificate && (
        <CertificateView
          certificate={selectedCertificate}
          user={user}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </section>
  );
}