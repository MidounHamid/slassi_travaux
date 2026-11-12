<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EstimatorProjectType;
use App\Models\EstimatorFinish;
use App\Models\EstimatorLocation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EstimatorController extends Controller
{
    /**
     * GET /api/estimator/config
     * Public: returns all types, finishes, and locations in one payload.
     */
    public function config(Request $request): JsonResponse
    {
        $lang = $request->query('lang', 'fr');

        $types     = EstimatorProjectType::where('is_active', true)->orderBy('order')->get();
        $finishes  = EstimatorFinish::where('is_active', true)->orderBy('order')->get();
        $locations = EstimatorLocation::where('is_active', true)->orderBy('order')->get();

        $mapType = fn($t) => [
            'key'       => $t->type_key,
            'name'      => $t->{"name_{$lang}"} ?? $t->name_fr,
            'baseRate'  => (float) $t->base_rate,
            'unit'      => $t->unit,
            'icon'      => $t->icon,
            'image'     => $t->image,
        ];

        $mapFinish = fn($f) => [
            'key'         => $f->finish_key,
            'name'        => $f->{"name_{$lang}"} ?? $f->name_fr,
            'multiplier'  => (float) $f->multiplier,
            'description' => $f->{"description_{$lang}"} ?? $f->description_fr,
        ];

        $mapLocation = fn($l) => [
            'key'                 => $l->location_key,
            'name'                => $l->{"name_{$lang}"} ?? $l->name_fr,
            'logisticsMultiplier' => (float) $l->logistics_multiplier,
        ];

        return response()->json([
            'success'   => true,
            'types'     => $types->map($mapType)->values(),
            'finishes'  => $finishes->map($mapFinish)->values(),
            'locations' => $locations->map($mapLocation)->values(),
        ]);
    }
}

