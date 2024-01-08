'use client'

import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const [isDarkMode, setDarkMode] = useState(false);
	const pathname = usePathname();
	
	const toggleDarkMode = () => {
		setDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark') // Puts dark class in <html> tag
	};

	return (
		<nav className="w-full z-20 top-0 left-0 fixed bg-white/50 border-b border-gray-200 dark:border-black backdrop-filter backdrop-blur-lg dark:bg-coldHeights-900 transition-all duration-300">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<header className="flex items-center">
					<Link href="/"><img src="https://www.htx.gov.sg/images/default-source/htx-image-library/who-we-are_why-we-exist_logoe20dfc9c67824b68ba78e31fb41f5c9f.png?sfvrsn=c4524eb2_0" className="mr-3 h-16"></img></Link>
					<Link href="/" className="font-semibold text-lg dark:text-white">Audio Deepfake Detector</Link>
				</header>
				<div className="flex justify-between max-sm:hidden">
					<ul className="font-medium flex p-0 flex-row mt-0 border-0">
						<li><Link href="/about" className={`block hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-transparent ${pathname == '/about' ? 'active' : ''}`}>About</Link></li>
						<li><Link href="/detect" className={`block ml-[40px] hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-transparent ${pathname == '/detect' ? 'active' : ''}`}>Detect</Link></li>
						<li><Link href="/login" className={`block ml-[40px] hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-transparent ${pathname == '/login' ? 'active' : ''}`}>Login</Link></li>
						<li>
							<DarkModeSwitch
								style={{ marginLeft: '40px' }}
								checked={isDarkMode}
								onChange={toggleDarkMode}
								size={30}
							/>
						</li>
					</ul>
				</div>
				<div className="dropdown dropdown-bottom dropdown-end min-sm:hidden ml-auto">
					<label tabIndex={0} className="btn btn-ghost">
						<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
							<polygon className="dark:stroke-white" fill="#ffffff" points="19.9 18 11.1 18 11.1 18 19.9 18 19.9 18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							<polygon className="dark:stroke-white" fill="#ffffff" points="20 14 4 14 4 14 20 14 20 14" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							<polygon className="dark:stroke-white" fill="#ffffff" points="19.9 10 11.1 10 11.1 10 19.9 10 19.9 10" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							<polygon className="dark:stroke-white" fill="#ffffff" points="20 6 4 6 4 6 20 6 20 6" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><Link href="/about">About</Link></li>
						<li><Link href="/detect">Detect</Link></li>
						<li><Link href="/login">Login</Link></li>
						<li onClick={toggleDarkMode}><a>{isDarkMode ? "Light Mode" : "Dark Mode"}</a></li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
