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
     * Format user data with roles and permissions.
     */
    protected function formatUserData(User $user): array
    {
        $roleName = $user->roleModel ? $user->roleModel->name : ($user->role ?: 'viewer');
        $roleLabel = $user->roleModel ? $user->roleModel->label_fr : 'Collaborateur';
        $permissions = $user->getAllPermissions();

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $roleName,
            'role_label' => $roleLabel,
            'job_title' => $user->job_title ?: $roleLabel,
            'status' => $user->status ?: 'active',
            'permissions' => $permissions,
            'created_at' => $user->created_at,
        ];
    }

    /**
     * Authenticate user and issue JWT token with roles and permissions.
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

        $user = User::with('roleModel.permissions')
            ->where('email', strtolower(trim($request->email)))
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Identifiants invalides. Vérifiez votre email et mot de passe.',
            ], 401);
        }

        if ($user->status === 'inactive') {
            return response()->json([
                'success' => false,
                'message' => 'Votre compte est suspendu. Veuillez contacter la direction.',
            ], 403);
        }

        $formattedUser = $this->formatUserData($user);

        $payload = [
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $formattedUser['role'],
            'role_label' => $formattedUser['role_label'],
        ];

        $token = $this->jwtService->generateToken($payload, 604800); // 7 days

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie.',
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => 604800,
            'user' => $formattedUser,
        ]);
    }

    /**
     * Get the authenticated user from JWT with role and permissions.
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

        $user = User::with('roleModel.permissions')->find($payload['sub']);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'user' => $this->formatUserData($user),
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
