<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimatorLocation extends Model
{
    use HasFactory;

    protected $table = 'estimator_locations';
    protected $primaryKey = 'location_key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'location_key',
        'name_fr',
        'name_ar',
        'name_en',
        'logistics_multiplier',
        'order',
        'is_active',
    ];

    protected $casts = [
        'logistics_multiplier' => 'float',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->location_key,
            'name' => match ($lang) {
                'ar' => $this->name_ar ?: $this->name_fr,
                'en' => $this->name_en ?: $this->name_fr,
                default => $this->name_fr,
            },
            'multiplier' => (float) $this->logistics_multiplier,
        ];
    }
}

