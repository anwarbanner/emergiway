import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    
    // Animation states
    const [showForm, setShowForm] = useState(false);
    
    // Trigger animations on component mount
    useEffect(() => {
        setTimeout(() => setShowForm(true), 300);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className={`transition-all duration-700 ease-out transform ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <form onSubmit={submit}>
                    <div className="transition-all duration-500 ease-out delay-100">
                        <InputLabel htmlFor="email" value="Email" className="text-emerald-800" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 transition-all duration-500 ease-out delay-200">
                        <InputLabel htmlFor="password" value="Password" className="text-emerald-800" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 block transition-all duration-500 ease-out delay-300">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="ms-2 text-sm text-emerald-700">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-6 flex items-center justify-end transition-all duration-500 ease-out delay-400">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-emerald-600 underline hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
