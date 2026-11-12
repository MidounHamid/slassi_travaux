<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentCategoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_category_id',
        'name_fr',
        'name_ar',
        'name_en',
        'image',
        'order',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EquipmentCategory::class, 'equipment_category_id');
    }
}

