<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommitmentController;
use App\Http\Controllers\Api\CompanySettingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\EstimatorController;
use App\Http\Controllers\Api\MachineryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SitePageController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TestimonialController;
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

// Authentication API (JWT)
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
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

// ─── Public Content API (used by client-side portal) ─────────────────────────

// Services BTP
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

// Testimonials
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::post('/testimonials', [TestimonialController::class, 'store']);
Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

// Quality Commitments
Route::get('/commitments', [CommitmentController::class, 'index']);
Route::post('/commitments', [CommitmentController::class, 'store']);
Route::put('/commitments/{id}', [CommitmentController::class, 'update']);
Route::delete('/commitments/{id}', [CommitmentController::class, 'destroy']);

// Equipment & Fleet (public portal)
Route::get('/equipment', [EquipmentController::class, 'index']);
Route::get('/equipment/stats', [EquipmentController::class, 'stats']);
Route::get('/equipment/categories', [EquipmentController::class, 'categories']);

// Project Estimator Configuration
Route::get('/estimator/config', [EstimatorController::class, 'config']);

// Team Members
Route::get('/team', [TeamController::class, 'index']);
Route::post('/team', [TeamController::class, 'store']);
Route::put('/team/{id}', [TeamController::class, 'update']);
Route::delete('/team/{id}', [TeamController::class, 'destroy']);

// ─── Roles, Permissions & Team Access API ────────────────────────────────────

// Roles, Permissions & Team Access API
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'storeRole']);
Route::put('/roles/{id}', [RoleController::class, 'updateRole']);
Route::delete('/roles/{id}', [RoleController::class, 'destroyRole']);

Route::get('/permissions', [RoleController::class, 'permissions']);
Route::post('/permissions', [RoleController::class, 'storePermission']);
Route::put('/permissions/{id}', [RoleController::class, 'updatePermission']);
Route::delete('/permissions/{id}', [RoleController::class, 'destroyPermission']);

Route::get('/users', [RoleController::class, 'users']);
Route::put('/users/{id}/role', [RoleController::class, 'updateUserRole']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
