<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimatorFinish extends Model
{
    use HasFactory;

    protected $table = 'estimator_finishes';
    protected $primaryKey = 'finish_key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'finish_key',
        'name_fr',
        'name_ar',
        'name_en',
        'multiplier',
        'description_fr',
        'description_ar',
        'description_en',
        'order',
        'is_active',
    ];

    protected $casts = [
        'multiplier' => 'float',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->finish_key,
            'name' => match ($lang) {
                'ar' => $this->name_ar ?: $this->name_fr,
                'en' => $this->name_en ?: $this->name_fr,
                default => $this->name_fr,
            },
            'mult' => (float) $this->multiplier,
            'description' => match ($lang) {
                'ar' => $this->description_ar ?: $this->description_fr,
                'en' => $this->description_en ?: $this->description_fr,
                default => $this->description_fr,
            },
        ];
    }
}

