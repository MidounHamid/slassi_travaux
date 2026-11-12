<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * GET /api/testimonials
     */
    public function index(Request $request): JsonResponse
    {
        $lang = $request->query('lang', 'fr');
        $testimonials = Testimonial::where('is_published', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'total'   => $testimonials->count(),
            'data'    => $testimonials->map(fn($t) => $t->toClientFormat($lang)),
        ]);
    }

    /**
     * GET /api/testimonials/{id}
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $lang = $request->query('lang', 'fr');
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['success' => false, 'message' => 'Témoignage introuvable.'], 404);
        }
        return response()->json(['success' => true, 'data' => $testimonial->toClientFormat($lang)]);
    }

    // ─── Admin CRUD ────────────────────────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name'    => 'required|string|max:255',
            'role_fr'        => 'required|string|max:255',
            'role_ar'        => 'nullable|string|max:255',
            'role_en'        => 'nullable|string|max:255',
            'company_fr'     => 'nullable|string|max:255',
            'company_ar'     => 'nullable|string|max:255',
            'company_en'     => 'nullable|string|max:255',
            'city_fr'        => 'nullable|string|max:255',
            'city_ar'        => 'nullable|string|max:255',
            'city_en'        => 'nullable|string|max:255',
            'comment_fr'     => 'required|string',
            'comment_ar'     => 'nullable|string',
            'comment_en'     => 'nullable|string',
            'rating'         => 'required|integer|between:1,5',
            'avatar_image'   => 'nullable|string|max:500',
            'project_id'     => 'nullable|exists:projects,id',
            'order'          => 'nullable|integer',
            'is_published'   => 'nullable|boolean',
        ]);

        $testimonial = Testimonial::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Témoignage créé.',
            'data'    => $testimonial->toClientFormat(),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['success' => false, 'message' => 'Témoignage introuvable.'], 404);
        }
        $testimonial->update($request->only([
            'client_name','role_fr','role_ar','role_en','company_fr','company_ar','company_en',
            'city_fr','city_ar','city_en','comment_fr','comment_ar','comment_en','rating',
            'avatar_image','project_id','order','is_published',
        ]));
        return response()->json([
            'success' => true,
            'message' => 'Témoignage mis à jour.',
            'data'    => $testimonial->fresh()->toClientFormat(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['success' => false, 'message' => 'Témoignage introuvable.'], 404);
        }
        $testimonial->delete();
        return response()->json(['success' => true, 'message' => 'Témoignage supprimé.']);
    }
}
