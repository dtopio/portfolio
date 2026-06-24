<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        return MessageResource::collection(Message::orderByDesc('created_at')->get());
    }

    public function markRead(Message $message)
    {
        $message->update(['read_at' => now()]);

        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->noContent();
    }
}
