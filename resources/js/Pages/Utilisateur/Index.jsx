import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UtilisateurIndex({ auth = { user: null }, utilisateurs = [], flash = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUtilisateurs, setFilteredUtilisateurs] = useState(utilisateurs || []);
    const [showContent, setShowContent] = useState(false);
    const [showAlert, setShowAlert] = useState(!!flash?.success);
    
    useEffect(() => {
        // Animate content after component mounts
        setTimeout(() => setShowContent(true), 100);
        
        // Auto-hide success alert after 5 seconds
        if (flash?.success) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);
    
    useEffect(() => {
        // Filter utilisateurs based on search term
        if (utilisateurs) {
            const filtered = utilisateurs.filter(user => 
                user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.telephone.toString().includes(searchTerm)
            );
            setFilteredUtilisateurs(filtered);
        }
    }, [searchTerm, utilisateurs]);
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const { delete: destroy } = useForm();
    
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            destroy(route('utilisateur.destroy', { id: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // Show success message
                    setShowAlert(true);
                    // Update the filtered list
                    setFilteredUtilisateurs(prev => prev.filter(user => user.id !== id));
                    // Auto-hide success alert after 5 seconds
                    setTimeout(() => setShowAlert(false), 5000);
                },
            });
        }
    };
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };
    
    const alertVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-emerald-800">
                    Gestion des Utilisateurs
                </h2>
            }
        >
            <Head title="Gestion des Utilisateurs" />

            <div className="py-12 bg-gradient-to-b from-gray-50 to-emerald-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Success Alert */}
                    <AnimatePresence>
                        {showAlert && flash?.success && (
                            <motion.div 
                                className="mb-6 rounded-lg bg-emerald-100 p-4 text-emerald-700 shadow-md"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={alertVariants}
                            >
                                <div className="flex items-center">
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{flash.success}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <motion.div 
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: showContent ? 1 : 0, 
                            y: showContent ? 0 : 20 
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-6">
                            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Rechercher par nom, matricule ou téléphone..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        href={route('utilisateur.create')}
                                        className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-white transition-all duration-300 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                                    >
                                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Nouvel Utilisateur
                                    </Link>
                                </div>
                            </div>
                            
                            {filteredUtilisateurs.length > 0 ? (
                                <motion.div 
                                    className="overflow-x-auto"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={showContent ? "visible" : "hidden"}
                                >
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nom</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Matricule</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Téléphone</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date de Naissance</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Travail</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {filteredUtilisateurs.map((utilisateur) => (
                                                <motion.tr 
                                                    key={utilisateur.id}
                                                    variants={itemVariants}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{utilisateur.nom}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{utilisateur.matricule}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{utilisateur.telephone}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {new Date(utilisateur.date_naissance).toLocaleDateString('fr-FR')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{utilisateur.travail || '-'}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('utilisateur.edit', utilisateur.id)}
                                                                className="rounded-md bg-blue-100 px-3 py-1 text-blue-700 transition-colors hover:bg-blue-200"
                                                            >
                                                                Modifier
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(utilisateur.id)}
                                                                className="rounded-md bg-red-100 px-3 py-1 text-red-700 transition-colors hover:bg-red-200"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="mt-10 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: showContent ? 1 : 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun utilisateur trouvé</h3>
                                    <p className="mt-1 text-gray-500">
                                        {searchTerm ? 'Aucun résultat ne correspond à votre recherche.' : 'Il n\'y a pas encore d\'utilisateurs enregistrés.'}
                                    </p>
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="mt-4 text-emerald-600 hover:text-emerald-800"
                                        >
                                            Effacer la recherche
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
