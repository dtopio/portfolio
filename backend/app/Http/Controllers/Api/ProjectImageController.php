<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadProjectImagesRequest;
use App\Http\Resources\ProjectImageResource;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Support\Binary;

class ProjectImageController extends Controller
{
    public function store(UploadProjectImagesRequest $request, Project $project)
    {
        $nextSortOrder = ($project->images()->max('sort_order') ?? -1) + 1;

        $images = collect($request->file('images'))->map(function ($file, $index) use ($project, $nextSortOrder) {
            return $project->images()->create([
                'image' => Binary::encode(file_get_contents($file->getRealPath())),
                'content_type' => $file->getMimeType(),
                'sort_order' => $nextSortOrder + $index,
            ]);
        });

        return ProjectImageResource::collection($images)
            ->response()
            ->setStatusCode(201);
    }

    public function show(ProjectImage $projectImage)
    {
        return response(Binary::decode($projectImage->image), 200, [
            'Content-Type' => $projectImage->content_type,
        ]);
    }

    public function destroy(ProjectImage $projectImage)
    {
        $projectImage->delete();

        return response()->noContent();
    }
}
