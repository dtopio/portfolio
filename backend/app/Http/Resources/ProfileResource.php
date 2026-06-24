<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'bio' => $this->bio,
            'location' => $this->location,
            'tagline' => $this->tagline,
            'summary' => $this->summary,
            'stack' => $this->stack ?? [],
            'has_cv' => ! empty($this->cv),
            'cv_filename' => $this->cv_filename,
            'cv_uploaded_at' => $this->cv_uploaded_at?->toIso8601String(),
        ];
    }
}
