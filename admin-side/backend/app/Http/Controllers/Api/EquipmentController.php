<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EquipmentCategory;
use App\Models\EquipmentStat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * GET /api/equipment/stats
     * Public: fleet summary statistics.
     */
    public function stats(Request $request): JsonResponse
    {
        $lang  = $request->query('lang', 'fr');
        $stats = EquipmentStat::orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data'    => $stats->map(fn($s) => [
                'count' => $s->count,
                'label' => $s->{"label_{$lang}"} ?? $s->label_fr,
                'order' => $s->order,
            ]),
        ]);
    }

    /**
     * GET /api/equipment/categories
     * Public: equipment categories with their items.
     */
    public function categories(Request $request): JsonResponse
    {
        $lang       = $request->query('lang', 'fr');
        $categories = EquipmentCategory::with('items')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'total'   => $categories->count(),
            'data'    => $categories->map(fn($c) => $c->toClientFormat($lang)),
        ]);
    }

    /**
     * GET /api/equipment
     * Public: combined stats + categories in one call.
     */
    public function index(Request $request): JsonResponse
    {
        $lang = $request->query('lang', 'fr');

        $stats = EquipmentStat::orderBy('order')->get()->map(fn($s) => [
            'count' => $s->count,
            'label' => $s->{"label_{$lang}"} ?? $s->label_fr,
        ]);

        $categories = EquipmentCategory::with('items')
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(fn($c) => $c->toClientFormat($lang));

        return response()->json([
            'success'    => true,
            'stats'      => $stats,
            'categories' => $categories,
        ]);
    }
}

