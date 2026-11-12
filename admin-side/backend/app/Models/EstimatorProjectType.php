<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimatorProjectType extends Model
{
    use HasFactory;

    protected $table = 'estimator_types';
    protected $primaryKey = 'type_key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'type_key',
        'name_fr',
        'name_ar',
        'name_en',
        'base_rate',
        'unit',
        'icon',
        'image',
        'order',
        'is_active',
    ];

    protected $casts = [
        'base_rate' => 'float',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->type_key,
            'name' => match ($lang) {
                'ar' => $this->name_ar ?: $this->name_fr,
                'en' => $this->name_en ?: $this->name_fr,
                default => $this->name_fr,
            },
            'baseRate' => (float) $this->base_rate,
            'unit' => $this->unit,
            'icon' => $this->icon,
            'image' => $this->image,
        ];
    }
}

