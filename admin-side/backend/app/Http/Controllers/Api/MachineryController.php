<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Machinery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MachineryController extends Controller
{
    /**
     * Display a listing of heavy machinery fleet.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Machinery::with('project')->orderBy('id', 'asc');

        // Category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('current_site', 'like', "%{$search}%")
                  ->orWhere('specs', 'like', "%{$search}%");
            });
        }

        $machineries = $query->get();

        // Calculate counts
        $counts = [
            'total' => Machinery::count(),
            'available' => Machinery::where('status', 'available')->count(),
            'on_site' => Machinery::where('status', 'on_site')->count(),
            'maintenance' => Machinery::where('status', 'maintenance')->count(),
        ];

        return response()->json([
            'success' => true,
            'counts' => $counts,
            'data' => $machineries->map(fn($m) => $m->toAdminFormat()),
        ]);
    }

    /**
     * Display the specified machinery.
     */
    public function show(int $id): JsonResponse
    {
        $machine = Machinery::with('project')->find($id);
        if (!$machine) {
            return response()->json([
                'success' => false,
                'message' => 'Engin introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $machine->toAdminFormat(),
        ]);
    }

    /**
     * Store a newly created machine in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'nullable|string|max:50',
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'specs' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:available,on_site,maintenance',
            'currentSite' => 'nullable|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        $code = $validated['code'] ?? null;
        if (!$code) {
            $count = Machinery::count() + 1;
            $code = 'ENG-' . ($count < 10 ? '0' : '') . $count;
        }

        $machine = Machinery::create([
            'code' => $code,
            'name' => $validated['name'],
            'category' => $validated['category'] ?? 'Terrassement',
            'specs' => $validated['specs'] ?? 'Spécifications standard',
            'status' => $validated['status'] ?? 'available',
            'current_site' => $validated['currentSite'] ?? 'Dépôt Central Fès',
            'project_id' => $validated['project_id'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => "Engin {$machine->code} ajouté à la flotte.",
            'data' => $machine->load('project')->toAdminFormat(),
        ], 201);
    }

    /**
     * Update the specified machinery in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $machine = Machinery::find($id);
        if (!$machine) {
            return response()->json([
                'success' => false,
                'message' => 'Engin introuvable.',
            ], 404);
        }

        $validated = $request->validate([
            'code' => 'nullable|string|max:50',
            'name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'specs' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:available,on_site,maintenance',
            'currentSite' => 'nullable|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        if (isset($validated['code'])) {
            $machine->code = $validated['code'];
        }
        if (isset($validated['name'])) {
            $machine->name = $validated['name'];
        }
        if (isset($validated['category'])) {
            $machine->category = $validated['category'];
        }
        if (isset($validated['specs'])) {
            $machine->specs = $validated['specs'];
        }
        if (isset($validated['status'])) {
            $machine->status = $validated['status'];
            // Auto update site based on standard operations
            if (!isset($validated['currentSite'])) {
                if ($machine->status === 'available') {
                    $machine->current_site = 'Dépôt Central Fès';
                } elseif ($machine->status === 'maintenance') {
                    $machine->current_site = 'Atelier Technique Fès';
                }
            }
        }
        if (isset($validated['currentSite'])) {
            $machine->current_site = $validated['currentSite'];
        }
        if (array_key_exists('project_id', $validated)) {
            $machine->project_id = $validated['project_id'];
        }

        $machine->save();

        return response()->json([
            'success' => true,
            'message' => "Engin {$machine->code} mis à jour.",
            'data' => $machine->fresh('project')->toAdminFormat(),
        ]);
    }

    /**
     * Remove the specified machinery from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $machine = Machinery::find($id);
        if (!$machine) {
            return response()->json([
                'success' => false,
                'message' => 'Engin introuvable.',
            ], 404);
        }

        $name = $machine->name;
        $machine->delete();

        return response()->json([
            'success' => true,
            'message' => "L'engin '{$name}' a été retiré de la flotte.",
        ]);
    }
}
