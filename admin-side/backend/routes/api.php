<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanySettingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MachineryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\RoleController;
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
