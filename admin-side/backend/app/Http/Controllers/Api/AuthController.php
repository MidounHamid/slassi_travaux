<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected JwtService $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    /**
     * Authenticate user and issue JWT token.
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:4',
        ], [
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email est invalide.',
            'password.required' => 'Le mot de passe est obligatoire.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', strtolower(trim($request->email)))->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Identifiants invalides. Vérifiez votre email et mot de passe.',
            ], 401);
        }

        $payload = [
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
        ];

        $token = $this->jwtService->generateToken($payload, 604800); // 7 days

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie.',
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => 604800,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    /**
     * Get the authenticated user from JWT.
     */
    public function me(Request $request): JsonResponse
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'success' => false,
                'message' => 'Jeton d\'authentification manquant.',
            ], 401);
        }

        $token = substr($authHeader, 7);
        $payload = $this->jwtService->validateToken($token);

        if (!$payload || !isset($payload['sub'])) {
            return response()->json([
                'success' => false,
                'message' => 'Jeton invalide ou session expirée. Veuillez vous reconnecter.',
            ], 401);
        }

        $user = User::find($payload['sub']);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
            ],
            'token_expires_at' => isset($payload['exp']) ? date('c', $payload['exp']) : null,
        ]);
    }

    /**
     * Logout user (stateless JWT acknowledgment).
     */
    public function logout(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Déconnexion effectuée avec succès.',
        ]);
    }
}
