import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 inset-x-0 bottom-0">
                    <div className="md:flex md:items-center md:justify-between py-6 md:py-8 border-t border-slate-200">
                        {/* Copyright */}
                        <div className="text-sm text-slate-500 mr-4">&copy;
                            <Link href="https://wintopy.io">Wintopy SAS</Link>. All rights reserved. <br />
                            <Link href="/legal/terms-use">TOS</Link>&nbsp;-&nbsp;
                            <Link href="/legal/privacy">Privacy</Link>&nbsp;-&nbsp;
                            <Link href="/legal/licences">Licences</Link>&nbsp;-&nbsp;
                            <Link href="/faq">FAQ</Link>&nbsp; -&nbsp;
                            <Link href="/contact">Contact</Link>
                        </div>
                        <br />
                    </div>
                </div>
            </footer >
        </>
    )
}
