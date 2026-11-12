<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'count',
        'label_fr',
        'label_ar',
        'label_en',
        'order',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'count' => $this->count,
            'label' => match ($lang) {
                'ar' => $this->label_ar ?: $this->label_fr,
                'en' => $this->label_en ?: $this->label_fr,
                default => $this->label_fr,
            },
        ];
    }
}

