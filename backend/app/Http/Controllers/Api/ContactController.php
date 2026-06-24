<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\NewContactMessage;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        $message = Message::create([
            ...$request->validated(),
            'ip' => $request->ip(),
        ]);

        $notifyAddress = config('app.admin_notification_email');
        if ($notifyAddress) {
            try {
                Mail::to($notifyAddress)->send(new NewContactMessage($message));
            } catch (\Throwable $e) {
                Log::error('Failed to send contact notification email.', ['exception' => $e]);
            }
        }

        return response()->json([
            'message' => 'Thanks for reaching out — I\'ll get back to you soon.',
        ], 201);
    }
}
