<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Machinery;
use App\Models\Quote;
use App\Models\SitePage;
use App\Models\CompanySetting;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Return comprehensive summary metrics for the admin dashboard.
     */
    public function stats(): JsonResponse
    {
        $quotesTotal = Quote::count();
        $quotesPending = Quote::where('status', 'pending')->count();
        $quotesReviewed = Quote::where('status', 'reviewed')->count();
        $quotesContacted = Quote::where('status', 'contacted')->count();

        $projectsTotal = Project::count();
        $projectsOngoing = Project::where('status', 'ongoing')->count();
        $projectsDone = Project::where('status', 'done')->count();

        $machineryTotal = Machinery::count();
        $machineryAvailable = Machinery::where('status', 'available')->count();
        $machineryOnSite = Machinery::where('status', 'on_site')->count();
        $machineryMaintenance = Machinery::where('status', 'maintenance')->count();

        $pagesTotal = SitePage::count();

        $recentQuotes = Quote::orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($q) => $q->toAdminFormat());

        $ongoingProjects = Project::where('status', 'ongoing')
            ->orderBy('progress', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($p) => $p->toAdminFormat());

        $company = CompanySetting::first();

        return response()->json([
            'success' => true,
            'metrics' => [
                'quotes' => [
                    'total' => $quotesTotal,
                    'pending' => $quotesPending,
                    'reviewed' => $quotesReviewed,
                    'contacted' => $quotesContacted,
                ],
                'projects' => [
                    'total' => $projectsTotal,
                    'ongoing' => $projectsOngoing,
                    'done' => $projectsDone,
                ],
                'machinery' => [
                    'total' => $machineryTotal,
                    'available' => $machineryAvailable,
                    'onSite' => $machineryOnSite,
                    'maintenance' => $machineryMaintenance,
                ],
                'pages' => [
                    'total' => $pagesTotal,
                    'online' => $pagesTotal,
                ],
                'company' => [
                    'name' => $company?->company_name ?? 'SLASSI DE TRAVAUX DIVERS',
                    'capital' => $company?->capital ?? '17 000 000 MAD',
                    'city' => $company?->city ?? 'Fès, Maroc',
                ],
            ],
            'recentQuotes' => $recentQuotes,
            'ongoingProjects' => $ongoingProjects,
        ]);
    }
}
