// components/HomeNav.tsx

const links = ["Home", "About", "Tools", "Projects", "Blogs"];

export default function HomeNav() {
    return (
        <nav className="flex items-center justify-between max-w-[1200px] mx-auto py-10 px-8 w-full">

            {/* Brand Name - Solid dark text as per Akshay brand */}
            <div className="text-[2rem] font-black text-[#1a1a1a] select-none tracking-tight">
                Akshay
            </div>

            {/* Centered Menu Links - Professional Pill Style */}
            <ul className="flex items-center gap-2 p-1.5 bg-[#f3f3f3] rounded-full border border-[#e5e5e5] mx-auto shadow-sm">
                {links.map((link, index) => (
                    <li key={link}>
                        <a
                            href="#"
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-200 
                                ${index === 0
                                    ? "bg-white text-[#1a1a1a] shadow-sm scale-105"
                                    : "text-[#666666] hover:text-[#1a1a1a] hover:bg-white/50"
                                }`}
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Right Side Placeholder for alignment - Empty as requested */}
            <div className="w-[110px] hidden lg:block"></div>
        </nav>
    );
}