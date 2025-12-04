export default function Notifications({ items = [] }) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Notifications</h2>
        <p className="text-lg text-gray-600 mt-2">Stay updated with your learning</p>
      </div>
      <div className="space-y-4">
        {items.map((n) => (
          <div key={n.id} className="group rounded-2xl bg-white p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-500 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔔</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-gray-900">{n.title}</div>
                  <div className="text-xs font-medium text-gray-500">{new Date(n.date).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">{n.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}