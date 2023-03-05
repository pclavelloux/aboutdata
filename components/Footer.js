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
                           Made with <span className='text-red-400'>♥</span> by <Link href="https://twitter.com/Pauline_Cx"  target="_blank">Pauline </Link>
                            
                        </div>
                        <br />
                    </div>
                </div>
            </footer >
        </>
    )
}
