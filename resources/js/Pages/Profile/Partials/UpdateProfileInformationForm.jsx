import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const [animate, setAnimate] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
            phone: user.phone || '',
            address: user.address || '',
        });

    useEffect(() => {
        setAnimate(true);
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setError('photo', 'Please select a valid image file (JPEG, PNG, GIF)');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('photo', 'Image size should not exceed 2MB');
            return;
        }

        clearErrors('photo');
        setData('photo', file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const submit = (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        patch(route('profile.update'), formData, {
            forceFormData: true,
        });
    };

    return (
        <section className={`${className} ${animate ? 'animate-fade-in' : 'opacity-0'}`}>
            <header>
                <h2 className="text-lg font-medium text-emerald-800">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-emerald-600">
                    Update your account's profile information and contact details.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                {/* Profile Photo */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative">
                        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-emerald-200 bg-emerald-50 shadow-md transition-all duration-300 hover:border-emerald-300">
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : user.profile_photo_url ? (
                                <img
                                    src={user.profile_photo_url}
                                    alt="Current Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-800">
                                    <span className="text-xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="photo"
                            className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition-all duration-300 hover:bg-emerald-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            className="hidden"
                            onChange={handlePhotoChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-md font-medium text-emerald-800">Profile Photo</h3>
                        <p className="text-sm text-emerald-600">Upload a new profile photo (max 2MB)</p>
                        <InputError className="mt-2" message={errors.photo} />
                    </div>
                </div>

                <div className="transition-all duration-300 hover:translate-x-1">
                    <InputLabel htmlFor="name" value="Name" className="text-emerald-700" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="transition-all duration-300 hover:translate-x-1">
                    <InputLabel htmlFor="email" value="Email" className="text-emerald-700" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                
                <div className="transition-all duration-300 hover:translate-x-1">
                    <InputLabel htmlFor="phone" value="Phone Number" className="text-emerald-700" />

                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>
                
                <div className="transition-all duration-300 hover:translate-x-1">
                    <InputLabel htmlFor="address" value="Address" className="text-emerald-700" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full border-emerald-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="street-address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                    >
                        <p className="text-sm text-emerald-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Profile updated successfully!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
