<?php

namespace App\Services;

class JwtService
{
    /**
     * Get the signing secret key from Laravel configuration.
     */
    protected function getSecret(): string
    {
        $key = config('app.key');
        if (empty($key)) {
            $key = 'slassi-travaux-super-secure-jwt-secret-key-2026';
        }

        if (str_starts_with($key, 'base64:')) {
            $decoded = base64_decode(substr($key, 7), true);
            if ($decoded !== false) {
                return $decoded;
            }
        }

        return $key;
    }

    /**
     * URL-safe base64 encoding without padding.
     */
    protected function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * URL-safe base64 decoding.
     */
    protected function base64UrlDecode(string $data): ?string
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padLen = 4 - $remainder;
            $data .= str_repeat('=', $padLen);
        }
        $decoded = base64_decode(strtr($data, '-_', '+/'), true);
        return $decoded !== false ? $decoded : null;
    }

    /**
     * Generate a signed JWT token.
     *
     * @param array<string, mixed> $payload Custom claims to include.
     * @param int $ttlSeconds Time to live in seconds (default 7 days).
     * @return string
     */
    public function generateToken(array $payload, int $ttlSeconds = 604800): string
    {
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT',
        ];

        $now = time();
        $claims = array_merge([
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + $ttlSeconds,
            'iss' => config('app.url', 'http://127.0.0.1:8000'),
        ], $payload);

        $encodedHeader = $this->base64UrlEncode(json_encode($header, JSON_UNESCAPED_SLASHES));
        $encodedPayload = $this->base64UrlEncode(json_encode($claims, JSON_UNESCAPED_SLASHES));

        $signature = hash_hmac(
            'sha256',
            "{$encodedHeader}.{$encodedPayload}",
            $this->getSecret(),
            true
        );
        $encodedSignature = $this->base64UrlEncode($signature);

        return "{$encodedHeader}.{$encodedPayload}.{$encodedSignature}";
    }

    /**
     * Validate and decode a JWT token.
     *
     * @param string $token
     * @return array<string, mixed>|null Returns the payload if valid and not expired, null otherwise.
     */
    public function validateToken(string $token): ?array
    {
        $parts = explode('.', trim($token));
        if (count($parts) !== 3) {
            return null;
        }

        [$encodedHeader, $encodedPayload, $encodedSignature] = $parts;

        // Verify header
        $headerJson = $this->base64UrlDecode($encodedHeader);
        if (!$headerJson) {
            return null;
        }
        $header = json_decode($headerJson, true);
        if (!is_array($header) || ($header['alg'] ?? null) !== 'HS256') {
            return null;
        }

        // Verify signature
        $expectedSignature = hash_hmac(
            'sha256',
            "{$encodedHeader}.{$encodedPayload}",
            $this->getSecret(),
            true
        );
        $expectedEncodedSignature = $this->base64UrlEncode($expectedSignature);

        if (!hash_equals($expectedEncodedSignature, $encodedSignature)) {
            return null;
        }

        // Decode payload
        $payloadJson = $this->base64UrlDecode($encodedPayload);
        if (!$payloadJson) {
            return null;
        }
        $payload = json_decode($payloadJson, true);
        if (!is_array($payload)) {
            return null;
        }

        // Check expiration
        $now = time();
        if (isset($payload['exp']) && $payload['exp'] < $now) {
            return null;
        }

        // Check not-before
        if (isset($payload['nbf']) && $payload['nbf'] > $now) {
            return null;
        }

        return $payload;
    }
}
