export default function Footer() {
    return (
        <footer className="w-full border-t border-t-amber-600 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
                <p>© {new Date().getFullYear()} Online EduTech</p>
                <div className="flex gap-4">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Help</a>
                </div>
            </div>
        </footer>
    )
}