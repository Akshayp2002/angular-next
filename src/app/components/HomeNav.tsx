// components/HomeNav.tsx
const links = ["Home", "About", "Tools", "Projects", "Blogs"];

export default function HomeNav() {
    return (
        <nav className="flex items-center justify-between max-w-[1200px] mx-auto p-6 w-full">
            {/* Brand Name */}
            <div className="text-2xl font-black text-blue-950">Akshay</div>

            {/* Menu Links */}
            <ul className="flex items-center gap-1.5 p-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
                {links.map((link, index) => (
                    <li key={link}>
                        <a
                            href="#"
                            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors 
                ${index === 0 ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Flag / Region */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-xl">🇮🇳</span> Indian
            </div>
        </nav>
    );
}