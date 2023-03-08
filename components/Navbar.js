import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const trigger = useRef(null);
    const mobileNav = useRef(null);

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!mobileNav.current || !trigger.current) return;
            if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!mobileNavOpen || keyCode !== 27) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <>
            <header className="absolute relative w-full z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-20">

                        {/* Site branding */}
                        <div className="shrink-0 mr-4">
                            {/* Logo */}
                            <Link href="/">
                                <Image
                                    alt="Best data ressources logo"
                                    height={60}
                                    width={70}
                                    src="/images/AboutData-logo.png"
                                    sizes="15vw"
                                    priority
                                    className="flex relative items-left justify-items-start"
                                />
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <nav className="hidden md:flex md:grow">

                            {/* Desktop links */}
                            <ul className="flex grow justify-end flex-wrap items-center">
                                
                                <li>
                                    <Link href="/promote-resource" className=" px-4 py-3 flex items-center hover:text-orange-300 transition duration-150 ease-in-out">Promote a resource</Link>
                                </li>

                                <li>
                                    <Link href="/submit-resource" className="bg-teal-600 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded">Submit a resource</Link>
                                </li>

                            </ul>

                        </nav>

                        {/* Mobile menu */}
                        <div className="md:hidden">

                            {/* Hamburger button */}
                            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                                <span className="sr-only">Menu</span>
                                <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="4" width="24" height="2" rx="1" />
                                    <rect y="11" width="24" height="2" rx="1" />
                                    <rect y="18" width="24" height="2" rx="1" />
                                </svg>
                            </button>

                            {/*Mobile navigation */}
                            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 }}>
                                <ul className="bg-gray-800 px-4 py-2">
                                    <li>
                                        <Link href="/" className="flex text-gray-300 hover:text-gray-200 py-2">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/submit-resource" className="flex text-gray-300 hover:text-gray-200 py-2">Submit a resource</Link>
                                    </li>

                                    <li>
                                        <Link href="/promote-resource" className="flex text-gray-300 hover:text-gray-200 py-2">Promote a resource</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
