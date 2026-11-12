<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * GET /api/team
     * Public: list all active team members.
     */
    public function index(Request $request): JsonResponse
    {
        $lang    = $request->query('lang', 'fr');
        $members = TeamMember::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'total'   => $members->count(),
            'data'    => $members->map(fn($m) => $m->toClientFormat($lang)),
        ]);
    }

    // ─── Admin CRUD ───────────────────────────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'role_fr'          => 'required|string|max:255',
            'department_fr'    => 'nullable|string|max:255',
            'image'            => 'nullable|string|max:500',
            'email'            => 'nullable|email|max:255',
            'phone'            => 'nullable|string|max:50',
            'experience_years' => 'nullable|integer|min:0',
            'bio_fr'           => 'nullable|string',
            'order'            => 'nullable|integer',
            'is_active'        => 'nullable|boolean',
        ]);

        $member = TeamMember::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Membre de l\'équipe ajouté.',
            'data'    => $member->toClientFormat(),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $member = TeamMember::find($id);
        if (!$member) {
            return response()->json(['success' => false, 'message' => 'Membre introuvable.'], 404);
        }

        $member->update($request->only([
            'name', 'role_fr', 'role_ar', 'role_en',
            'department_fr', 'department_ar', 'department_en',
            'image', 'email', 'phone', 'experience_years',
            'bio_fr', 'bio_ar', 'bio_en',
            'order', 'is_active',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Membre mis à jour.',
            'data'    => $member->toClientFormat(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $member = TeamMember::find($id);
        if (!$member) {
            return response()->json(['success' => false, 'message' => 'Membre introuvable.'], 404);
        }
        $name = $member->name;
        $member->delete();

        return response()->json(['success' => true, 'message' => "'{$name}' retiré de l'équipe."]);
    }
}

