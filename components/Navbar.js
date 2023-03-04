
import { useRouter } from 'next/router';
import NextLink from 'next/link';


function NavItem({ href, text }) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <NextLink
            href={href}
            className= 'font-semibold text-gray-800 dark:text-gray-200 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
        >
            <span className="capsize">{text}</span>
        </NextLink>
    );
}

export default function Navbar() {
    return (
        <>
            <div className="flex flex-col justify-center px-8">
                <nav className="flex items-right justify-end w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                    <div className="">
                        <NavItem href="/" text="Home" />
                        <NavItem href="/#project" text="Menu1" />
                        <NavItem href="https://aboutstartup.io/" text="Menu2" />
                        <NavItem href="/#tweets" text="Menu3" />
                    </div>
                </nav>
            </div>
        </>
    )
}
