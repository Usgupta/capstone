import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="w-full z-20 top-0 left-0">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex items-center">
					<img src="https://www.htx.gov.sg/images/default-source/htx-image-library/who-we-are_why-we-exist_logoe20dfc9c67824b68ba78e31fb41f5c9f.png?sfvrsn=c4524eb2_0" className="h-16 mr-3"></img>
					<Link href="/" className="font-semibold text-lg">Audio Deepfake Detector</Link>
				</div>
				<div className="flex justify-between max-xs:hidden">
					<ul className="font-medium flex p-0 flex-row mt-0 border-0">
						<li><Link href="/" className="block hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:hover:text-blue-500 dark:hover:bg-transparent">Home</Link></li>	
						<li><Link href="/about" className="block ml-[40px] hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:hover:text-blue-500 dark:hover:bg-transparent">About</Link></li>
						<li><Link href="/whoarewe" className="block ml-[40px] hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:hover:text-blue-500 dark:hover:bg-transparent">Who are we</Link></li>
					</ul>
				</div>
				<div className="dropdown dropdown-bottom dropdown-end min-xs:hidden">
					<label tabIndex={0} className="btn btn-ghost">
						<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
							<polygon fill="#ffffff" points="19.9 18 11.1 18 11.1 18 19.9 18 19.9 18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
							<polygon fill="#ffffff" points="20 14 4 14 4 14 20 14 20 14" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
							<polygon fill="#ffffff" points="19.9 10 11.1 10 11.1 10 19.9 10 19.9 10" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
							<polygon fill="#ffffff" points="20 6 4 6 4 6 20 6 20 6" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><Link href="/">Home</Link></li>	
						<li><Link href="/about">About</Link></li>
						<li><Link href="/whoarewe">Who are we</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
