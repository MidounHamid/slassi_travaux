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
        ];
    }
}
