<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        return ProjectResource::collection(Project::ordered()->get());
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        $slug = $data['slug'] ?? Str::slug($data['title']);
        if (Project::where('slug', $slug)->exists()) {
            $slug .= '-'.Str::lower(Str::random(4));
        }
        $data['slug'] = $slug;

        $data['featured'] ??= false;
        $data['sort_order'] = (Project::max('sort_order') ?? -1) + 1;

        $project = Project::create($data);

        return (new ProjectResource($project))
            ->response()
            ->setStatusCode(201);
    }
}
