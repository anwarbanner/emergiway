import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function UtilisateurEdit({ auth = { user: null }, utilisateur = {} }) {
    const [showForm, setShowForm] = useState(false);
    
    const { data, setData, put, processing, errors, reset } = useForm({
        nom: utilisateur.nom || '',
        matricule: utilisateur.matricule || '',
        telephone: utilisateur.telephone || '',
        date_naissance: utilisateur.date_naissance ? new Date(utilisateur.date_naissance).toISOString().split('T')[0] : '',
        travail: utilisateur.travail || '',
        password: '',
        password_confirmation: '',
    });
    
    useEffect(() => {
        // Animate form after component mounts
        setTimeout(() => setShowForm(true), 100);
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('utilisateur.update', utilisateur.id), {
            preserveScroll: true,
        });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    
    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    
    const inputVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-emerald-800">
                    Modifier Utilisateur
                </h2>
            }
        >
            <Head title="Modifier Utilisateur" />

            <div className="py-12 bg-gradient-to-b from-gray-50 to-emerald-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div 
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        initial="hidden"
                        animate={showForm ? "visible" : "hidden"}
                        variants={formVariants}
                    >
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Modifier les informations de {utilisateur.nom}</h3>
                                <Link
                                    href={route('utilisateur.index')}
                                    className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                                >
                                    Retour à la liste
                                </Link>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.1 }}
                                >
                                    <InputLabel htmlFor="nom" value="Nom" className="text-emerald-700" />
                                    <TextInput
                                        id="nom"
                                        name="nom"
                                        value={data.nom}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="name"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.nom} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.2 }}
                                >
                                    <InputLabel htmlFor="matricule" value="Matricule" className="text-emerald-700" />
                                    <TextInput
                                        id="matricule"
                                        name="matricule"
                                        value={data.matricule}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.matricule} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.3 }}
                                >
                                    <InputLabel htmlFor="telephone" value="Téléphone" className="text-emerald-700" />
                                    <TextInput
                                        id="telephone"
                                        name="telephone"
                                        type="tel"
                                        value={data.telephone}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="tel"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.telephone} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.4 }}
                                >
                                    <InputLabel htmlFor="date_naissance" value="Date de Naissance" className="text-emerald-700" />
                                    <TextInput
                                        id="date_naissance"
                                        name="date_naissance"
                                        type="date"
                                        value={data.date_naissance}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.date_naissance} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.5 }}
                                >
                                    <InputLabel htmlFor="travail" value="Travail" className="text-emerald-700" />
                                    <TextInput
                                        id="travail"
                                        name="travail"
                                        value={data.travail}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.travail} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.6 }}
                                    className="border-t border-gray-200 pt-4"
                                >
                                    <p className="mb-4 text-sm text-gray-600">
                                        Laissez les champs de mot de passe vides si vous ne souhaitez pas le modifier.
                                    </p>
                                    
                                    <InputLabel htmlFor="password" value="Nouveau mot de passe" className="text-emerald-700" />
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    variants={inputVariants}
                                    transition={{ delay: 0.7 }}
                                >
                                    <InputLabel htmlFor="password_confirmation" value="Confirmer le nouveau mot de passe" className="text-emerald-700" />
                                    <TextInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </motion.div>
                                
                                <motion.div 
                                    className="flex items-center justify-end gap-4"
                                    variants={inputVariants}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Link
                                        href={route('utilisateur.index')}
                                        className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                                    >
                                        Annuler
                                    </Link>
                                    <PrimaryButton 
                                        className="bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500"
                                        disabled={processing}
                                    >
                                        {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                    </PrimaryButton>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
