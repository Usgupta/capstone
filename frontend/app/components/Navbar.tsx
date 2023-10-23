import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
			<div className="navbar bg-gradient-to-l from-purple-900 to-whitec border-2 border-gray-200">
				<div className="flex-1">
						<a className="normal-case text-m font-bold text-purple-900">Audio Deepfake Detector</a>
				</div>
				<div className="flex-none">
						<ul className="menu menu-horizontal px-1"> 
							<li>
								<Link className="font-bold text-white" href='/'>Home</Link>
							</li>
							<li>
								<Link className="font-bold text-white" href='/about'>About</Link>
							</li>
						</ul>
				</div>
			</div>
    </nav>
  )
}