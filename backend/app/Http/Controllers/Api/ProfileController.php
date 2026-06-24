<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UploadCvRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function show()
    {
        return new ProfileResource(Profile::current());
    }

    public function update(UpdateProfileRequest $request)
    {
        $profile = Profile::current();
        $profile->update($request->validated());

        return new ProfileResource($profile);
    }

    public function uploadCv(UploadCvRequest $request)
    {
        $file = $request->file('cv');
        $profile = Profile::current();

        $profile->update([
            'cv' => file_get_contents($file->getRealPath()),
            'cv_filename' => $file->getClientOriginalName(),
            'cv_uploaded_at' => now(),
        ]);

        return new ProfileResource($profile);
    }

    public function downloadCv()
    {
        $profile = Profile::current();

        if (empty($profile->cv)) {
            abort(404, 'No CV uploaded yet.');
        }

        return response($profile->cv, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.($profile->cv_filename ?? 'cv.pdf').'"',
        ]);
    }
}
