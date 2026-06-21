<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        Message::create([
            ...$request->validated(),
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Thanks for reaching out — I\'ll get back to you soon.',
        ], 201);
    }
}
