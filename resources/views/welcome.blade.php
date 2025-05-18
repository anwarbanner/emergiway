<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emergiway - Intelligent Emergency Response System</title>
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
    </style>
</head>
<body class="bg-gradient-to-b from-blue-50 to-emerald-50 text-gray-800 min-h-screen">
    <!-- Navigation -->
    <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <svg
                    class="h-12 w-12 text-emerald-600"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                >
                    <!-- Circle background -->
                    <circle cx="100" cy="100" r="90" fill="currentColor" opacity="0.1" />
                    
                    <!-- Lightning bolt - representing emergency/quick response -->
                    <path d="M100 20 L100 80 L130 80 L90 180 L90 100 L60 100 Z" 
                          stroke-width="4" 
                          stroke-linejoin="round" 
                          stroke-linecap="round" 
                          fill="currentColor" />
                    
                    <!-- Circular path - representing the "way" or path -->
                    <path d="M100 10 A90 90 0 1 0 100 190 A90 90 0 1 0 100 10" 
                          fill="none" 
                          stroke="currentColor" 
                          stroke-width="6" 
                          stroke-dasharray="15,10" />
                    
                    <!-- Pulse effect circles -->
                    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" stroke-width="3" opacity="0.7" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4" />
                </svg>
                <span class="ml-3 text-2xl font-bold text-emerald-600">Emergiway</span>
            </div>
            <div class="flex space-x-4">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ route('dashboard') }}" class="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="rounded-md border border-emerald-600 px-4 py-2 text-emerald-600 transition hover:bg-emerald-50">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700">Register</a>
                        @endif
                    @endauth
                @endif
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16 text-center">
        <div class="opacity-0 animate-fadeInUp">
            <h1 class="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
                <span class="text-emerald-600">Intelligent</span> Emergency Response System
            </h1>
            <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                Streamlining emergency management with smart technology for faster response times and better outcomes.
            </p>
            <div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl">
                        Get Started
                    </a>
                @endif
                <a href="#about" class="rounded-lg border-2 border-emerald-600 px-8 py-3 text-lg font-semibold text-emerald-600 transition-all hover:bg-emerald-50">
                    Learn More
                </a>
            </div>
        </div>
    </div>

    <!-- About Us Section -->
    <div id="about" class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="opacity-0 animate-fadeInUp delay-300">
                <h2 class="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                    About <span class="text-emerald-600">Emergiway</span>
                </h2>
                <div class="mx-auto max-w-4xl text-center">
                    <p class="mb-6 text-lg text-gray-600">
                        Emergiway is a cutting-edge emergency management system designed to revolutionize how organizations respond to critical situations. Our platform combines advanced technology with intuitive user management to ensure the right people are available at the right time.
                    </p>
                    <p class="mb-6 text-lg text-gray-600">
                        Founded with a mission to save lives through technology, our team of emergency response experts and software engineers have created a solution that reduces response times and improves coordination during emergencies.
                    </p>
                    <p class="text-lg text-gray-600">
                        Whether you're managing a hospital, emergency services, or corporate safety team, Emergiway provides the tools you need to organize your personnel efficiently and respond to emergencies with confidence.
                    </p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Features Section -->
    <div class="bg-gray-50 py-16">
        <div class="container mx-auto px-6">
            <div class="opacity-0 animate-fadeInUp delay-500">
                <h2 class="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                    Key <span class="text-emerald-600">Features</span>
                </h2>
                
                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <!-- Feature 1 -->
                    <div class="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                        <div class="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                            <svg class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold">User Management</h3>
                        <p class="text-gray-600">Easily manage emergency personnel with our intuitive user interface. Add, update, and organize your team efficiently.</p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                        <div class="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                            <svg class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold">Rapid Response</h3>
                        <p class="text-gray-600">Our system enables faster emergency response through intelligent routing and real-time personnel tracking.</p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                        <div class="mb-4 inline-block rounded-full bg-emerald-100 p-3">
                            <svg class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold">Secure & Reliable</h3>
                        <p class="text-gray-600">Built with security in mind, our platform ensures your emergency response system is always available when you need it most.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Call to Action -->
    <div class="bg-emerald-600 py-16 text-white">
        <div class="container mx-auto px-6 text-center">
            <div class="opacity-0 animate-fadeInUp delay-700">
                <h2 class="mb-6 text-3xl font-bold md:text-4xl">Ready to transform your emergency response?</h2>
                <p class="mx-auto mb-8 max-w-2xl text-lg text-emerald-100">Join organizations worldwide that trust Emergiway to manage their emergency response teams.</p>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl">
                        Get Started Today
                    </a>
                @endif
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-800 py-8 text-center text-sm text-white">
        <div class="container mx-auto px-6">
            <p>© {{ date('Y') }} Emergiway. All rights reserved.</p>
            <p class="mt-2">Powered by Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})</p>
        </div>
    </footer>

    <script>
        // Intersection Observer to trigger animations when elements come into view
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.opacity-0').forEach(el => {
                observer.observe(el);
            });
        });
    </script>
</body>
</html>
