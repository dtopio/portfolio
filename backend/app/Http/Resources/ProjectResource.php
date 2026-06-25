<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'tech_stack' => $this->tech_stack,
            'tags' => $this->tags,
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,
            'image' => $this->image,
            'featured' => $this->featured,
            'images' => ProjectImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
