<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'short_name',
        'legal_form',
        'capital',
        'capital_formatted',
        'founding_year',
        'experience_years',
        'city',
        'country',
        'address_line1',
        'address_line2',
        'postal_code',
        'full_address_fr',
        'full_address_ar',
        'full_address_en',
        'lat',
        'lng',
        'phone',
        'phone_display',
        'mobile',
        'whatsapp',
        'email',
        'commercial_email',
        'recruitment_email',
        'logo_url',
        'logo_transparent_url',
        'favicon_url',
        'hero_image_url',
        'about_image_url',
        'facebook_url',
        'linkedin_url',
        'instagram_url',
        'youtube_url',
        'working_hours_fr',
        'working_hours_ar',
        'working_hours_en',
        'ice',
        'rc',
        'identifiant_fiscal',
        'patente',
        'cnss',
        'projects_count',
        'capital_mad',
        'active_sites',
        'engineers_staff',
        'heavy_machines',
        'zero_accident_score',
    ];

    protected $casts = [
        'lat' => 'float',
        'lng' => 'float',
        'projects_count' => 'integer',
        'active_sites' => 'integer',
        'engineers_staff' => 'integer',
        'heavy_machines' => 'integer',
    ];

    // Format matching client-side CompanyProfile interface
    public function toClientFormat(): array
    {
        return [
            'name' => $this->company_name,
            'shortName' => $this->short_name,
            'legalForm' => $this->legal_form,
            'capital' => $this->capital,
            'capitalFormatted' => $this->capital_formatted,
            'foundingYear' => $this->founding_year,
            'experienceYears' => $this->experience_years,
            'headquarters' => [
                'city' => $this->city,
                'country' => $this->country,
                'addressLine1' => $this->address_line1,
                'addressLine2' => $this->address_line2,
                'postalCode' => $this->postal_code,
                'fullAddressFr' => $this->full_address_fr,
                'fullAddressAr' => $this->full_address_ar,
                'fullAddressEn' => $this->full_address_en,
                'coordinates' => [
                    'lat' => $this->lat,
                    'lng' => $this->lng,
                ],
            ],
            'contact' => [
                'phone' => $this->phone,
                'phoneDisplay' => $this->phone_display,
                'mobile' => $this->mobile,
                'whatsapp' => $this->whatsapp,
                'email' => $this->email,
                'commercialEmail' => $this->commercial_email,
                'recruitmentEmail' => $this->recruitment_email,
            ],
            'legal' => [
                'ice' => $this->ice,
                'rc' => $this->rc,
                'if' => $this->identifiant_fiscal,
                'patente' => $this->patente,
                'cnss' => $this->cnss,
            ],
            'keyMetrics' => [
                'projectsCount' => $this->projects_count,
                'capitalMAD' => $this->capital_mad,
                'activeSites' => $this->active_sites,
                'engineersAndStaff' => $this->engineers_staff,
                'heavyMachines' => $this->heavy_machines,
                'zeroAccidentScore' => $this->zero_accident_score,
            ],
            'branding' => [
                'logo' => $this->logo_url ?: '/images/logo.png',
                'logoTransparent' => $this->logo_transparent_url ?: '/icon.png',
                'favicon' => $this->favicon_url ?: '/favicon.ico',
                'heroImage' => $this->hero_image_url ?: '/images/hero.jpg',
                'aboutImage' => $this->about_image_url ?: '/images/machinery-fleet.jpg',
            ],
            'socials' => [
                'facebook' => $this->facebook_url,
                'linkedin' => $this->linkedin_url,
                'instagram' => $this->instagram_url,
                'youtube' => $this->youtube_url,
            ],
            'workingHours' => [
                'fr' => $this->working_hours_fr,
                'ar' => $this->working_hours_ar,
                'en' => $this->working_hours_en,
            ],
        ];
    }
}
