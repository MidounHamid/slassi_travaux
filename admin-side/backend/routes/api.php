<?php

use App\Http\Controllers\Api\CompanySettingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MachineryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\SitePageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes for Slassi Travaux BTP Application
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'Slassi Travaux API',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Dashboard Analytics & Metrics
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Projects API
Route::apiResource('projects', ProjectController::class);

// Machinery & Fleet API
Route::apiResource('machinery', MachineryController::class);

// Quotes & Estimates API
Route::apiResource('quotes', QuoteController::class);
Route::post('/contact', [QuoteController::class, 'store']);
Route::post('/estimate', [QuoteController::class, 'store']);

// Company Profile & Legal Settings API
Route::get('/company-settings', [CompanySettingController::class, 'show']);
Route::put('/company-settings', [CompanySettingController::class, 'update']);
Route::post('/company-settings', [CompanySettingController::class, 'update']);

// Site Pages & CMS Layouts API
Route::apiResource('pages', SitePageController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
