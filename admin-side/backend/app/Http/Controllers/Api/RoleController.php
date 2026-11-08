<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * List all roles with their permissions and members.
     */
    public function index(): JsonResponse
    {
        $roles = Role::with(['permissions', 'users' => function ($q) {
            $q->select('id', 'name', 'email', 'role_id', 'job_title', 'status');
        }])->get();

        return response()->json([
            'success' => true,
            'data' => $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'label_fr' => $role->label_fr,
                    'label_ar' => $role->label_ar,
                    'description' => $role->description,
                    'is_system' => (bool)$role->is_system,
                    'users_count' => $role->users->count(),
                    'permissions' => $role->permissions->map(function ($p) {
                        return [
                            'id' => $p->id,
                            'name' => $p->name,
                            'label_fr' => $p->label_fr,
                            'label_ar' => $p->label_ar,
                            'module' => $p->module,
                        ];
                    }),
                    'users' => $role->users,
                ];
            }),
        ]);
    }

    /**
     * Create a new custom role.
     */
    public function storeRole(Request $request): JsonResponse
    {
        $request->validate([
            'label_fr' => 'required|string|max:100',
            'name' => 'nullable|string|max:50|unique:roles,name',
            'label_ar' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        $slug = $request->filled('name')
            ? Str::slug($request->name, '_')
            : Str::slug($request->label_fr, '_');

        // Ensure unique slug
        $count = Role::where('name', $slug)->count();
        if ($count > 0) {
            $slug .= '_' . time();
        }

        $role = Role::create([
            'name' => $slug,
            'label_fr' => $request->label_fr,
            'label_ar' => $request->label_ar,
            'description' => $request->description,
            'is_system' => false,
        ]);

        if ($request->has('permissions')) {
            $role->permissions()->sync($request->permissions);
        }

        return response()->json([
            'success' => true,
            'message' => "Le rôle '{$role->label_fr}' a été créé avec succès.",
            'data' => $role->load('permissions'),
        ], 201);
    }

    /**
     * Update an existing role and its permissions.
     */
    public function updateRole(Request $request, int $id): JsonResponse
    {
        $role = Role::findOrFail($id);

        $request->validate([
            'label_fr' => 'required|string|max:100',
            'label_ar' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        $role->label_fr = $request->label_fr;
        if ($request->has('label_ar')) {
            $role->label_ar = $request->label_ar;
        }
        if ($request->has('description')) {
            $role->description = $request->description;
        }
        $role->save();

        if ($request->has('permissions')) {
            $role->permissions()->sync($request->permissions);
        }

        return response()->json([
            'success' => true,
            'message' => "Le rôle '{$role->label_fr}' et ses permissions ont été mis à jour avec succès.",
            'data' => $role->load('permissions'),
        ]);
    }

    /**
     * Delete a custom role.
     */
    public function destroyRole(int $id): JsonResponse
    {
        $role = Role::findOrFail($id);

        if ($role->name === 'super_admin') {
            return response()->json([
                'success' => false,
                'message' => "Le rôle Super Administrateur est protégé et ne peut pas être supprimé.",
            ], 403);
        }

        $usersCount = $role->users()->count();
        if ($usersCount > 0) {
            return response()->json([
                'success' => false,
                'message' => "Impossible de supprimer ce rôle : {$usersCount} utilisateur(s) y sont actuellement assignés. Veuillez d'abord réassigner leurs rôles.",
            ], 422);
        }

        $role->permissions()->detach();
        $role->delete();

        return response()->json([
            'success' => true,
            'message' => "Le rôle '{$role->label_fr}' a été supprimé définitivement.",
        ]);
    }

    /**
     * List all available permissions grouped by module.
     */
    public function permissions(): JsonResponse
    {
        $permissions = Permission::all();

        return response()->json([
            'success' => true,
            'data' => $permissions->groupBy('module'),
            'list' => $permissions,
        ]);
    }

    /**
     * Create a new permission.
     */
    public function storePermission(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:permissions,name',
            'label_fr' => 'required|string|max:100',
            'label_ar' => 'nullable|string|max:100',
            'module' => 'required|string|max:50',
        ]);

        $permission = Permission::create([
            'name' => strtolower(trim($request->name)),
            'label_fr' => $request->label_fr,
            'label_ar' => $request->label_ar,
            'module' => strtolower(trim($request->module)),
        ]);

        // Auto assign to super_admin
        $superAdmin = Role::where('name', 'super_admin')->first();
        if ($superAdmin) {
            $superAdmin->permissions()->syncWithoutDetaching([$permission->id]);
        }

        return response()->json([
            'success' => true,
            'message' => "Permission '{$permission->name}' ajoutée avec succès.",
            'data' => $permission,
        ], 201);
    }

    /**
     * Update an existing permission.
     */
    public function updatePermission(Request $request, int $id): JsonResponse
    {
        $permission = Permission::findOrFail($id);

        $request->validate([
            'label_fr' => 'required|string|max:100',
            'label_ar' => 'nullable|string|max:100',
            'module' => 'required|string|max:50',
        ]);

        $permission->update([
            'label_fr' => $request->label_fr,
            'label_ar' => $request->label_ar,
            'module' => strtolower(trim($request->module)),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Permission mise à jour avec succès.",
            'data' => $permission,
        ]);
    }

    /**
     * Delete a permission.
     */
    public function destroyPermission(int $id): JsonResponse
    {
        $permission = Permission::findOrFail($id);
        $permission->roles()->detach();
        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => "Permission supprimée avec succès.",
        ]);
    }

    /**
     * List all team members with their role and permissions.
     */
    public function users(): JsonResponse
    {
        $users = User::with('roleModel.permissions')->get();

        return response()->json([
            'success' => true,
            'data' => $users->map(function ($u) {
                $roleName = $u->roleModel ? $u->roleModel->name : ($u->role ?: 'viewer');
                $roleLabel = $u->roleModel ? $u->roleModel->label_fr : 'Collaborateur';

                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'role' => $roleName,
                    'role_label' => $roleLabel,
                    'role_id' => $u->role_id,
                    'job_title' => $u->job_title ?: $roleLabel,
                    'status' => $u->status ?: 'active',
                    'permissions_count' => count($u->getAllPermissions()),
                    'created_at' => $u->created_at ? $u->created_at->format('Y-m-d') : null,
                ];
            }),
        ]);
    }

    /**
     * Update user role.
     */
    public function updateUserRole(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'job_title' => 'nullable|string|max:100',
        ]);

        $user = User::findOrFail($id);
        $role = Role::findOrFail($request->role_id);

        $user->role_id = $role->id;
        $user->role = $role->name;
        if ($request->has('job_title')) {
            $user->job_title = $request->job_title;
        }
        $user->save();

        return response()->json([
            'success' => true,
            'message' => "Le rôle de l'utilisateur {$user->name} a été mis à jour avec succès.",
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $role->name,
                'role_label' => $role->label_fr,
                'job_title' => $user->job_title,
            ],
        ]);
    }
}
