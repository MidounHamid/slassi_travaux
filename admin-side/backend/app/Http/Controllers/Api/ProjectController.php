<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectHighlight;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     * Supports filtering by category, search term, and format (admin vs client).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::with(['highlights', 'machineries'])->orderBy('created_at', 'desc');

        // Category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $cat = $request->category;
            $query->where(function ($q) use ($cat) {
                $q->where('category', $cat)
                  ->orWhere('category_label_fr', 'like', "%{$cat}%");
            });
        }

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title_fr', 'like', "%{$search}%")
                  ->orWhere('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('client_fr', 'like', "%{$search}%")
                  ->orWhere('location_fr', 'like', "%{$search}%");
            });
        }

        $projects = $query->get();

        // Format depending on consumer
        $format = $request->query('format', 'both');

        if ($format === 'admin') {
            $data = $projects->map(fn($p) => $p->toAdminFormat());
        } elseif ($format === 'client') {
            $data = $projects->map(fn($p) => $p->toClientFormat());
        } else {
            $data = [
                'raw' => $projects,
                'admin' => $projects->map(fn($p) => $p->toAdminFormat()),
                'client' => $projects->map(fn($p) => $p->toClientFormat()),
            ];
        }

        return response()->json([
            'success' => true,
            'total' => $projects->count(),
            'data' => $data,
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(string $idOrSlug): JsonResponse
    {
        $project = Project::with(['highlights', 'machineries'])
            ->where('id', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Chantier introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'project' => $project,
                'clientFormat' => $project->toClientFormat(),
                'adminFormat' => $project->toAdminFormat(),
            ],
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'client' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:100',
            'progress' => 'nullable|integer|min:0|max:100',
            'status' => 'nullable|string|in:ongoing,done,review',
            'image' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'highlights' => 'nullable|array',
        ]);

        $title = $validated['title'];
        $baseSlug = Str::slug($title);
        $slug = $baseSlug ?: 'projet-' . time();
        $counter = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $progress = $validated['progress'] ?? 50;
        $status = $validated['status'] ?? ($progress >= 100 ? 'done' : 'ongoing');

        $budget = $validated['budget'] ?? 'Non spécifié';
        if ($budget !== 'Non spécifié' && !str_ends_with(strtoupper($budget), 'MAD') && !str_ends_with(strtoupper($budget), 'DH')) {
            $budget .= ' MAD';
        }

        $project = Project::create([
            'slug' => $slug,
            'title_fr' => $title,
            'title_ar' => $request->input('title_ar', $title),
            'title_en' => $request->input('title_en', $title),
            'category' => $validated['category'] ?? 'Gros Œuvre',
            'category_label_fr' => $validated['category'] ?? 'Gros Œuvre',
            'location_fr' => $validated['location'] ?? 'Fès - Maroc',
            'client_fr' => $validated['client'] ?? 'Client Privé',
            'budget' => $budget,
            'progress' => $progress,
            'status' => $status,
            'image' => $validated['image'] ?? '/images/project-residential.jpg',
            'description_fr' => $validated['description'] ?? '',
            'year' => date('Y'),
        ]);

        if (!empty($validated['highlights'])) {
            foreach ($validated['highlights'] as $idx => $h) {
                $text = is_array($h) ? ($h['fr'] ?? reset($h)) : (string)$h;
                ProjectHighlight::create([
                    'project_id' => $project->id,
                    'text_fr' => $text,
                    'text_ar' => is_array($h) && isset($h['ar']) ? $h['ar'] : $text,
                    'text_en' => is_array($h) && isset($h['en']) ? $h['en'] : $text,
                    'order' => $idx,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Chantier créé avec succès.',
            'data' => $project->load('highlights')->toAdminFormat(),
        ], 201);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Chantier introuvable.',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'client' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:100',
            'progress' => 'nullable|integer|min:0|max:100',
            'status' => 'nullable|string|in:ongoing,done,review',
            'image' => 'nullable|string|max:500',
            'description' => 'nullable|string',
        ]);

        if (isset($validated['title'])) {
            $project->title_fr = $validated['title'];
        }
        if (isset($validated['category'])) {
            $project->category = $validated['category'];
            $project->category_label_fr = $validated['category'];
        }
        if (isset($validated['client'])) {
            $project->client_fr = $validated['client'];
        }
        if (isset($validated['location'])) {
            $project->location_fr = $validated['location'];
        }
        if (isset($validated['budget'])) {
            $project->budget = $validated['budget'];
        }
        if (isset($validated['progress'])) {
            $project->progress = $validated['progress'];
            if ($project->progress >= 100 && !isset($validated['status'])) {
                $project->status = 'done';
            }
        }
        if (isset($validated['status'])) {
            $project->status = $validated['status'];
            if ($validated['status'] === 'done' && !isset($validated['progress'])) {
                $project->progress = 100;
            }
        }
        if (isset($validated['image'])) {
            $project->image = $validated['image'];
        }
        if (isset($validated['description'])) {
            $project->description_fr = $validated['description'];
        }

        $project->save();

        return response()->json([
            'success' => true,
            'message' => 'Chantier mis à jour.',
            'data' => $project->fresh(['highlights', 'machineries'])->toAdminFormat(),
        ]);
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Chantier introuvable.',
            ], 404);
        }

        $title = $project->title_fr;
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => "Le chantier '{$title}' a été supprimé.",
        ]);
    }
}
