<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanySettingController extends Controller
{
    /**
     * Get company profile & settings.
     */
    public function show(): JsonResponse
    {
        $settings = CompanySetting::first();
        if (!$settings) {
            $settings = CompanySetting::create([
                'company_name' => 'SLASSI DE TRAVAUX DIVERS',
                'short_name' => 'Slassi Travaux',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $settings,
            'clientProfile' => $settings->toClientFormat(),
        ]);
    }

    /**
     * Update company settings.
     */
    public function update(Request $request): JsonResponse
    {
        $settings = CompanySetting::first();
        if (!$settings) {
            $settings = new CompanySetting();
        }

        $validated = $request->validate([
            'company_name' => 'nullable|string|max:255',
            'companyName' => 'nullable|string|max:255',
            'capital' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:255',
            'address_line1' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'rc' => 'nullable|string|max:100',
            'patente' => 'nullable|string|max:100',
            'ice' => 'nullable|string|max:100',
        ]);

        if (isset($validated['company_name']) || isset($validated['companyName'])) {
            $settings->company_name = $validated['company_name'] ?? $validated['companyName'];
        }
        if (isset($validated['capital'])) {
            $settings->capital = $validated['capital'];
            $settings->capital_formatted = $validated['capital'];
        }
        if (isset($validated['address']) || isset($validated['address_line1'])) {
            $addr = $validated['address'] ?? $validated['address_line1'];
            $settings->address_line1 = $addr;
            $settings->full_address_fr = $addr;
        }
        if (isset($validated['phone'])) {
            $settings->phone = $validated['phone'];
            $settings->phone_display = $validated['phone'];
            $settings->mobile = $validated['phone'];
            $settings->whatsapp = preg_replace('/[^0-9]/', '', $validated['phone']);
        }
        if (isset($validated['email'])) {
            $settings->email = $validated['email'];
        }
        if (isset($validated['rc'])) {
            $settings->rc = $validated['rc'];
        }
        if (isset($validated['patente'])) {
            $settings->patente = $validated['patente'];
        }
        if (isset($validated['ice'])) {
            $settings->ice = $validated['ice'];
        }

        $settings->save();

        return response()->json([
            'success' => true,
            'message' => 'Coordonnées de l\'entreprise enregistrées avec succès.',
            'data' => $settings,
            'clientProfile' => $settings->toClientFormat(),
        ]);
    }
}
