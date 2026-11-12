<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceScope extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'text_fr',
        'text_ar',
        'text_en',
        'order',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}

