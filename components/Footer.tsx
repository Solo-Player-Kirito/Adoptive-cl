import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            <footer className="py-6 w-full shrink-0 bg-white border-t border-pink-200">
                <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-xs text-pink-600 text-center sm:text-left">© 2024 ADOPTIVE. All rights reserved.</p>
                    <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                        <Link className="text-xs hover:underline underline-offset-4 text-pink-600 hover:text-pink-700" href="/privacy">
                            Terms of Service
                        </Link>
                        <Link className="text-xs hover:underline underline-offset-4 text-pink-600 hover:text-pink-700" href="/privacy">
                            Privacy
                        </Link>
                        <Link className="text-xs hover:underline underline-offset-4 text-pink-600 hover:text-pink-700" href="/admin/login">
                            Admin Dashboard
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}