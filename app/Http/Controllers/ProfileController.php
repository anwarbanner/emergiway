<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia as InertiaFacade;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Ensure profile photo URL is available
        if ($user->profile_photo_path && !$user->profile_photo_url) {
            $user->profile_photo_url = Storage::disk('public')->url($user->profile_photo_path);
            $user->save();
        }
        
        return InertiaFacade::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        // Handle basic profile information
        $user->fill($request->safe()->except(['photo']));

        // Handle email verification if email changed
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        
        // Handle profile photo upload
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            
            // Delete old photo if exists
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            
            // Store new photo
            $path = $photo->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
            
            // Generate URL for the frontend
            $user->profile_photo_url = Storage::disk('public')->url($path);
        }
        
        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}