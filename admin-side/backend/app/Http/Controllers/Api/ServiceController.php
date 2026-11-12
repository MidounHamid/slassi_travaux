<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * GET /api/services
     * Public: list all active services with scopes, in the requested language.
     */
    public function index(Request $request): JsonResponse
    {
        $lang = $request->query('lang', 'fr');

        $services = Service::with('scopes')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'total'   => $services->count(),
            'data'    => $services->map(fn($s) => $s->toClientFormat($lang)),
        ]);
    }

    /**
     * GET /api/services/{slug}
     * Public: single service by slug.
     */
    public function show(Request $request, string $slug): JsonResponse
    {
        $lang    = $request->query('lang', 'fr');
        $service = Service::with('scopes')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $service->toClientFormat($lang),
        ]);
    }

    // ─── Admin CRUD ───────────────────────────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug'          => 'required|string|max:100|unique:services,slug',
            'title_fr'      => 'required|string|max:255',
            'title_ar'      => 'nullable|string|max:255',
            'title_en'      => 'nullable|string|max:255',
            'short_desc_fr' => 'nullable|string',
            'short_desc_ar' => 'nullable|string',
            'short_desc_en' => 'nullable|string',
            'icon'          => 'nullable|string|max:100',
            'image'         => 'nullable|string|max:500',
            'order'         => 'nullable|integer',
            'is_active'     => 'nullable|boolean',
        ]);

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service créé avec succès.',
            'data'    => $service->toClientFormat(),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Service introuvable.'], 404);
        }

        $service->update($request->only([
            'title_fr', 'title_ar', 'title_en',
            'short_desc_fr', 'short_desc_ar', 'short_desc_en',
            'icon', 'image', 'order', 'is_active',
            'advantage_title_fr', 'advantage_title_ar', 'advantage_title_en',
            'advantage_desc_fr',  'advantage_desc_ar',  'advantage_desc_en',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Service mis à jour.',
            'data'    => $service->fresh('scopes')->toClientFormat(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Service introuvable.'], 404);
        }
        $title = $service->title_fr;
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => "Le service '{$title}' a été supprimé.",
        ]);
    }
}

