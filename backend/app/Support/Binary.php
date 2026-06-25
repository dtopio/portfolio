<?php

namespace App\Support;

class Binary
{
    /**
     * Encode raw bytes for storage in a binary column.
     *
     * Postgres rejects raw binary strings bound as query parameters (they
     * fail UTF-8 validation), so binary file contents are stored base64-encoded.
     */
    public static function encode(string $raw): string
    {
        return base64_encode($raw);
    }

    /**
     * Decode a value read back from a binary column.
     *
     * PDO's pgsql driver returns bytea columns as PHP stream resources
     * rather than strings, so that needs unwrapping before base64-decoding.
     */
    public static function decode(mixed $value): string
    {
        if (is_resource($value)) {
            $value = stream_get_contents($value);
        }

        return base64_decode((string) $value);
    }
}
