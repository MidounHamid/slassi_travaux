<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SitePage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SitePageController extends Controller
{
    /**
     * Display a listing of site pages (pagetree).
     */
    public function index(): JsonResponse
    {
        $pages = SitePage::orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'total' => $pages->count(),
            'data' => $pages->map(fn($p) => $p->toAdminFormat()),
        ]);
    }

    /**
     * Store a newly created page.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'actualLayout' => 'nullable|string|max:100',
            'layoutThisPage' => 'nullable|string|max:100',
            'layoutSubpages' => 'nullable|string|max:100',
            'parentId' => 'nullable|string|max:100',
        ]);

        $pageKey = 'page-' . time();
        $slug = $validated['slug'] ?? \Illuminate\Support\Str::slug($validated['title']);

        $page = SitePage::create([
            'page_key' => $pageKey,
            'title' => $validated['title'],
            'slug' => $slug,
            'depth' => 1,
            'icon_type' => 'page',
            'actual_layout' => $validated['actualLayout'] ?? ($validated['layoutThisPage'] ?? 'Default'),
            'layout_this_page' => $validated['layoutThisPage'] ?? 'Default',
            'layout_subpages' => $validated['layoutSubpages'] ?? 'None (Inherit)',
            'status' => 'published',
            'has_children' => false,
            'expanded' => false,
            'last_modified' => 'À l\'instant',
            'author' => 'Hamid Slassi',
            'parent_page_key' => $validated['parentId'] ?? 'page-1',
        ]);

        return response()->json([
            'success' => true,
            'message' => "Page '{$page->title}' créée avec succès.",
            'data' => $page->toAdminFormat(),
        ], 201);
    }

    /**
     * Update the specified page (e.g. layout change).
     */
    public function update(Request $request, string $pageKey): JsonResponse
    {
        $page = SitePage::where('page_key', $pageKey)->orWhere('id', $pageKey)->first();
        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page introuvable.',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'actualLayout' => 'nullable|string|max:100',
            'layoutThisPage' => 'nullable|string|max:100',
            'layoutSubpages' => 'nullable|string|max:100',
            'status' => 'nullable|string|max:50',
            'expanded' => 'nullable|boolean',
        ]);

        if (isset($validated['title'])) $page->title = $validated['title'];
        if (isset($validated['slug'])) $page->slug = $validated['slug'];
        if (isset($validated['actualLayout'])) $page->actual_layout = $validated['actualLayout'];
        if (isset($validated['layoutThisPage'])) $page->layout_this_page = $validated['layoutThisPage'];
        if (isset($validated['layoutSubpages'])) $page->layout_subpages = $validated['layoutSubpages'];
        if (isset($validated['status'])) $page->status = $validated['status'];
        if (isset($validated['expanded'])) $page->expanded = $validated['expanded'];

        $page->last_modified = 'Aujourd\'hui à ' . date('H:i');
        $page->save();

        return response()->json([
            'success' => true,
            'message' => "Page '{$page->title}' mise à jour.",
            'data' => $page->toAdminFormat(),
        ]);
    }

    /**
     * Remove the specified page.
     */
    public function destroy(string $pageKey): JsonResponse
    {
        $page = SitePage::where('page_key', $pageKey)->orWhere('id', $pageKey)->first();
        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page introuvable.',
            ], 404);
        }

        $title = $page->title;
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => "Page '{$title}' supprimée.",
        ]);
    }
}
