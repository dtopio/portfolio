<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index()
    {
        return ExperienceResource::collection(Experience::ordered()->get());
    }

    public function store(StoreExperienceRequest $request)
    {
        $data = $request->validated();
        $data['sort_order'] = (Experience::max('sort_order') ?? -1) + 1;

        $experience = Experience::create($data);

        return (new ExperienceResource($experience))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $experience->update($request->validated());

        return new ExperienceResource($experience);
    }
}
