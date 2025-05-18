import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth = { user: null }, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-emerald-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 bg-gradient-to-b from-blue-50 to-emerald-50">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:rounded-lg sm:p-8 border border-emerald-100">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:rounded-lg sm:p-8 border border-emerald-100">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:rounded-lg sm:p-8 border border-emerald-100">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
