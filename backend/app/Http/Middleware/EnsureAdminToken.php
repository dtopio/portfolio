<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $configured = config('app.admin_token');
        $provided = $request->bearerToken();

        if (! $configured || ! $provided || ! hash_equals($configured, $provided)) {
            abort(401, 'Invalid or missing admin token.');
        }

        return $next($request);
    }
}
