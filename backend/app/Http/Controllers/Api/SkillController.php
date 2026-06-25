<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RenameSkillCategoryRequest;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Http\Resources\SkillResource;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(Skill::ordered()->get());
    }

    public function renameCategory(RenameSkillCategoryRequest $request)
    {
        $data = $request->validated();

        $renamed = Skill::where('category', $data['from'])->update(['category' => $data['to']]);

        return response()->json(['renamed' => $renamed]);
    }

    public function store(StoreSkillRequest $request)
    {
        $data = $request->validated();
        $data['featured'] ??= false;
        $data['sort_order'] = (Skill::where('category', $data['category'])->max('sort_order') ?? -1) + 1;

        $skill = Skill::create($data);

        return (new SkillResource($skill))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $data = $request->validated();
        $data['featured'] ??= false;

        $skill->update($data);

        return new SkillResource($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->noContent();
    }
}
