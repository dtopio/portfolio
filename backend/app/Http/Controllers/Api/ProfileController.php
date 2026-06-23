<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
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
}
