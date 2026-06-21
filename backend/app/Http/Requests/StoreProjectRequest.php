<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', 'alpha_dash', 'unique:projects,slug'],
            'description' => ['required', 'string'],
            'tech_stack' => ['required', 'array', 'min:1'],
            'tech_stack.*' => ['string', 'max:60'],
            'tags' => ['required', 'array', 'min:1'],
            'tags.*' => ['string', 'max:60'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'featured' => ['boolean'],
        ];
    }
}
