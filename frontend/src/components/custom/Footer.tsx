export default function Footer() {
    const links = [
        {
            href: "negik0609@gmail.com",
            label: "Mail",
        },
        {
            href: "https://github.com/momo-shogun",
            label: "Github",
        },
        {
            href: "https://x.com/shogunkrishna",
            label: "Twitter",
        },
        {
            href: "https:/www.linkedin.com/in/shogunkrishna/",
            label: "Linkedin",
        },
    ];

    return (
        <footer className="mb-3 mx-auto">
            <div className="flex flex-col items-center gap-4 mx-auto my-auto text-black max-w-7xl dark:text-white">
                <div className="flex flex-wrap justify-center gap-4">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xl tracking-tight transition-all duration-300 translate-x-2 hover:translate-x-0 group"
                            href={link.href}
                        >
                            {link.label}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="transition-all duration-300 -translate-x-2 opacity-0 size-4 group-hover:opacity-100 group-hover:translate-x-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}