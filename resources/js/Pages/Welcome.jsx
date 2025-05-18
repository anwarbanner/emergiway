import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    // Animation states
    const [showHero, setShowHero] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
    const [showCTA, setShowCTA] = useState(false);
    
    // Trigger animations on component mount
    useEffect(() => {
        setShowHero(true);
        setTimeout(() => setShowAbout(true), 400);
        setTimeout(() => setShowFeatures(true), 800);
        setTimeout(() => setShowCTA(true), 1200);
    }, []);

    return (
        <>
            <Head title="Emergiway - Intelligent Emergency System" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 text-gray-800">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg
                                className="h-10 w-10 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span className="ml-3 text-2xl font-bold text-emerald-600">Emergiway</span>
                        </div>
                        <div className="flex space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-emerald-600 px-4 py-2 text-emerald-600 transition hover:bg-emerald-50"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container mx-auto px-6 py-16 text-center">
                    <div 
                        className={`transition-all duration-1000 ease-out transform ${
                            showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
                            <span className="text-emerald-600">Intelligent</span> Emergency Response System
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                            Streamlining emergency management with smart technology for faster response times and better outcomes.
                        </p>
                        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Link
                                href={route('register')}
                                className="rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
                            >
                                Get Started
                            </Link>
                            <a 
                                href="#about" 
                                className="rounded-lg border-2 border-emerald-600 px-8 py-3 text-lg font-semibold text-emerald-600 transition-all hover:bg-emerald-50"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>

                {/* About Us Section */}
                <div id="about" className="bg-white py-16">
                    <div className="container mx-auto px-6">
                        <div 
                            className={`transition-all duration-1000 ease-out transform ${
                                showAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                                About <span className="text-emerald-600">Emergiway</span>
                            </h2>
                            <div className="mx-auto max-w-4xl text-center">
                                <p className="mb-6 text-lg text-gray-600">
                                    Emergiway is a cutting-edge emergency management system designed to revolutionize how organizations respond to critical situations. Our platform combines advanced technology with intuitive user management to ensure the right people are available at the right time.
                                </p>
                                <p className="mb-6 text-lg text-gray-600">
                                    Founded with a mission to save lives through technology, our team of emergency response experts and software engineers have created a solution that reduces response times and improves coordination during emergencies.
                                </p>
                                <p className="text-lg text-gray-600">
                                    Whether you're managing a hospital, emergency services, or corporate safety team, Emergiway provides the tools you need to organize your personnel efficiently and respond to emergencies with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Features Section */}
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6">
                        <div 
                            className={`transition-all duration-1000 ease-out transform ${
                                showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                                Key <span className="text-emerald-600">Features</span>
                            </h2>
                            
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                                    <div className="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">User Management</h3>
                                    <p className="text-gray-600">Easily manage emergency personnel with our intuitive user interface. Add, update, and organize your team efficiently.</p>
                                </div>
                                
                                {/* Feature 2 */}
                                <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                                    <div className="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">Rapid Response</h3>
                                    <p className="text-gray-600">Our system enables faster emergency response through intelligent routing and real-time personnel tracking.</p>
                                </div>
                                
                                {/* Feature 3 */}
                                <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                                    <div className="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">Secure & Reliable</h3>
                                    <p className="text-gray-600">Built with security in mind, our platform ensures your emergency response system is always available when you need it most.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="bg-emerald-600 py-16 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <div 
                            className={`transition-all duration-1000 ease-out transform ${
                                showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to transform your emergency response?</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-emerald-100">Join organizations worldwide that trust Emergiway to manage their emergency response teams.</p>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                            >
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <footer className="bg-gray-800 py-8 text-center text-sm text-white">
                    <div className="container mx-auto px-6">
                        <p>© {new Date().getFullYear()} Emergiway. All rights reserved.</p>
                        <p className="mt-2">Powered by Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
