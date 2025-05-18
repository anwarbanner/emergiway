import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Home({ auth }) {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        // Animate welcome text after component mounts
        setTimeout(() => setShowWelcome(true), 300);
        // Animate cards after welcome text
        setTimeout(() => setShowCards(true), 800);
    }, []);

    // Dashboard cards data
    const dashboardCards = [
        {
            title: 'Gestion des Utilisateurs',
            description: 'Créer, modifier et supprimer des comptes utilisateurs',
            icon: (
                <svg className="h-8 w-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            route: route('utilisateur.index'),
            color: 'from-emerald-400 to-emerald-600',
            hoverColor: 'from-emerald-500 to-emerald-700'
        },
        {
            title: 'Mon Profil',
            description: 'Mettre à jour vos informations personnelles',
            icon: (
                <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            route: route('profile.edit'),
            color: 'from-blue-400 to-blue-600',
            hoverColor: 'from-blue-500 to-blue-700'
        },
        {
            title: 'Rapports d\'Urgence',
            description: 'Consulter et gérer les rapports d\'urgence',
            icon: (
                <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            route: route('dashboard'), // Using dashboard as fallback until specific routes are available
            color: 'from-red-400 to-red-600',
            hoverColor: 'from-red-500 to-red-700'
        },
        {
            title: 'Statistiques',
            description: 'Visualiser les données et statistiques',
            icon: (
                <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            route: route('dashboard'), // Using dashboard as fallback until specific routes are available
            color: 'from-purple-400 to-purple-600',
            hoverColor: 'from-purple-500 to-purple-700'
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-emerald-800">
                    Tableau de Bord
                </h2>
            }
        >
            <Head title="Tableau de Bord" />

            <div className="py-12 bg-gradient-to-b from-gray-50 to-emerald-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div 
                        className={`mb-10 text-center transition-all duration-1000 ease-in-out transform ${
                            showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}
                    >
                        <h1 className="mb-3 text-4xl font-bold text-gray-800">
                            Bienvenue, <span className="text-emerald-600">{auth.user.name}</span> !
                        </h1>
                        <p className="text-xl text-gray-600">
                            Votre tableau de bord Emergiway pour gérer les situations d'urgence
                        </p>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {dashboardCards.map((card, index) => (
                            <div 
                                key={index}
                                className={`transition-all duration-700 ease-in-out transform ${
                                    showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <Link
                                    href={card.route}
                                    className="block h-full"
                                >
                                    <div className="h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                                        <div className={`bg-gradient-to-r ${card.color} p-4 transition-all duration-300 hover:${card.hoverColor}`}>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                                                {card.icon}
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <p className="text-gray-600">{card.description}</p>
                                            <div className="mt-4 flex items-center text-emerald-600">
                                                <span className="font-medium">Accéder</span>
                                                <svg 
                                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Quick Access Section */}
                    <div 
                        className={`mt-12 overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-1000 ease-in-out transform ${
                            showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <h2 className="mb-4 text-2xl font-bold text-emerald-800">Accès Rapide</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('utilisateur.create')}
                                className="flex items-center rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition-all duration-300 hover:bg-emerald-200"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Nouvel Utilisateur
                            </Link>
                            <Link
                                href={route('dashboard')} // Using dashboard as fallback until specific routes are available
                                className="flex items-center rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition-all duration-300 hover:bg-blue-200"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Nouveau Rapport
                            </Link>
                            <Link
                                href={route('dashboard')} // Using dashboard as fallback until specific routes are available
                                className="flex items-center rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition-all duration-300 hover:bg-purple-200"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Paramètres
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
