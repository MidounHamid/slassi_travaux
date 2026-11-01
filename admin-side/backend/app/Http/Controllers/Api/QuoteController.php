<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Display a listing of quotes and inquiries.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Quote::orderBy('created_at', 'desc');

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('client_name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('project_title', 'like', "%{$search}%")
                  ->orWhere('project_type', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('reference', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $quotes = $query->get();

        $counts = [
            'total' => Quote::count(),
            'pending' => Quote::where('status', 'pending')->count(),
            'reviewed' => Quote::where('status', 'reviewed')->count(),
            'contacted' => Quote::where('status', 'contacted')->count(),
        ];

        return response()->json([
            'success' => true,
            'counts' => $counts,
            'total' => $quotes->count(),
            'data' => $quotes->map(fn($q) => $q->toAdminFormat()),
        ]);
    }

    /**
     * Display the specified quote.
     */
    public function show(int $id): JsonResponse
    {
        $quote = Quote::find($id);
        if (!$quote) {
            return response()->json([
                'success' => false,
                'message' => 'Demande de devis introuvable.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $quote->toAdminFormat(),
        ]);
    }

    /**
     * Store a newly created quote (from frontend contact form or estimator).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required_without:client_name|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'projectType' => 'nullable|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'surface' => 'nullable|numeric',
            'finish' => 'nullable|string|max:100',
            'budget' => 'nullable|string|max:100',
            'estimatedAmount' => 'nullable|string|max:100',
            'message' => 'nullable|string',
        ]);

        $clientName = $validated['name'] ?? ($validated['client_name'] ?? 'Client Web');
        $projectType = $validated['projectType'] ?? ($validated['project_type'] ?? 'Travaux BTP');
        $phone = $validated['phone'];
        $cleanPhone = preg_replace('/[^0-9]/', '', $phone);

        // Generate unique reference
        $year = date('Y');
        $count = Quote::count() + 1;
        $refNumber = str_pad($count, 3, '0', STR_PAD_LEFT);
        $reference = "DEV-{$year}-{$refNumber}";
        while (Quote::where('reference', $reference)->exists()) {
            $count++;
            $refNumber = str_pad($count, 3, '0', STR_PAD_LEFT);
            $reference = "DEV-{$year}-{$refNumber}";
        }

        $estimatedAmount = $validated['estimatedAmount'] ?? ($validated['budget'] ?? null);

        $quote = Quote::create([
            'reference' => $reference,
            'client_name' => $clientName,
            'company' => $validated['company'] ?? null,
            'phone' => $phone,
            'whatsapp' => $cleanPhone,
            'email' => $validated['email'] ?? null,
            'project_type' => $projectType,
            'project_title' => $projectType . (!empty($validated['city']) ? ' à ' . $validated['city'] : ''),
            'location' => $validated['city'] ?? 'Fès, Maroc',
            'city' => $validated['city'] ?? 'Fès',
            'surface' => $validated['surface'] ?? null,
            'finish_level' => $validated['finish'] ?? null,
            'estimated_amount' => $estimatedAmount,
            'budget_range' => $validated['budget'] ?? null,
            'message' => $validated['message'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre demande de devis a été enregistrée avec succès. Nos ingénieurs vous contacteront sous 24h.',
            'reference' => $quote->reference,
            'data' => $quote->toAdminFormat(),
        ], 201);
    }

    /**
     * Update the quote status or details.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $quote = Quote::find($id);
        if (!$quote) {
            return response()->json([
                'success' => false,
                'message' => 'Demande de devis introuvable.',
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'nullable|string|in:pending,reviewed,contacted,accepted,rejected',
            'notes' => 'nullable|string',
            'estimated_amount' => 'nullable|string|max:100',
        ]);

        if (isset($validated['status'])) {
            $quote->status = $validated['status'];
        }
        if (isset($validated['notes'])) {
            $quote->notes = $validated['notes'];
        }
        if (isset($validated['estimated_amount'])) {
            $quote->estimated_amount = $validated['estimated_amount'];
        }

        $quote->save();

        return response()->json([
            'success' => true,
            'message' => "Statut de la demande {$quote->reference} mis à jour.",
            'data' => $quote->toAdminFormat(),
        ]);
    }

    /**
     * Remove the specified quote from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $quote = Quote::find($id);
        if (!$quote) {
            return response()->json([
                'success' => false,
                'message' => 'Demande de devis introuvable.',
            ], 404);
        }

        $ref = $quote->reference;
        $quote->delete();

        return response()->json([
            'success' => true,
            'message' => "La demande {$ref} a été supprimée.",
        ]);
    }
}
