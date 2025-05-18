import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function GuestLayout({ children }) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => setShowContent(true), 100);
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-emerald-50 pt-6 sm:justify-center sm:pt-0">
            <div className={`transition-all duration-500 ease-out transform ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
                <Link href={route('dashboard')}>
                    <ApplicationLogo className="h-20 w-20 fill-current text-emerald-600" />
                </Link>
            </div>

            <div className={`mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-lg sm:max-w-md sm:rounded-lg transition-all duration-700 ease-out transform ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {children}
            </div>
        </div>
    );
}
