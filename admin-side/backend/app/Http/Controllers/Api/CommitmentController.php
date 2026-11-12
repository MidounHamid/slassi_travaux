<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commitment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommitmentController extends Controller
{
    /**
     * GET /api/commitments
     */
    public function index(Request $request): JsonResponse
    {
        $lang = $request->query('lang', 'fr');
        $commitments = Commitment::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'total'   => $commitments->count(),
            'data'    => $commitments->map(fn($c) => $c->toClientFormat($lang)),
        ]);
    }

    /**
     * GET /api/commitments/{id}
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $lang = $request->query('lang', 'fr');
        $commitment = Commitment::find($id);
        if (!$commitment) {
            return response()->json(['success' => false, 'message' => 'Engagement introuvable.'], 404);
        }
        return response()->json(['success' => true, 'data' => $commitment->toClientFormat($lang)]);
    }

    // ─── Admin CRUD ────────────────────────────────────────────────────────
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_fr'    => 'required|string|max:255',
            'title_ar'    => 'nullable|string|max:255',
            'title_en'    => 'nullable|string|max:255',
            'desc_fr'     => 'required|string',
            'desc_ar'     => 'nullable|string',
            'desc_en'     => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
            'image'       => 'nullable|string|max:500',
            'badge_fr'    => 'nullable|string|max:255',
            'badge_ar'    => 'nullable|string|max:255',
            'badge_en'    => 'nullable|string|max:255',
            'standard_code'=> 'nullable|string|max:50',
            'order'       => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);
        $commitment = Commitment::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Engagement créé.',
            'data'    => $commitment->toClientFormat(),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $commitment = Commitment::find($id);
        if (!$commitment) {
            return response()->json(['success' => false, 'message' => 'Engagement introuvable.'], 404);
        }
        $commitment->update($request->only([
            'title_fr','title_ar','title_en','desc_fr','desc_ar','desc_en','icon','image','badge_fr','badge_ar','badge_en','standard_code','order','is_active',
        ]));
        return response()->json([
            'success' => true,
            'message' => 'Engagement mis à jour.',
            'data'    => $commitment->fresh()->toClientFormat(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $commitment = Commitment::find($id);
        if (!$commitment) {
            return response()->json(['success' => false, 'message' => 'Engagement introuvable.'], 404);
        }
        $commitment->delete();
        return response()->json(['success' => true, 'message' => 'Engagement supprimé.']);
    }
}
