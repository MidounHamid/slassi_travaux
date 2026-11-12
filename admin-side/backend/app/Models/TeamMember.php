<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role_fr',
        'role_ar',
        'role_en',
        'department_fr',
        'department_ar',
        'department_en',
        'image',
        'email',
        'phone',
        'experience_years',
        'bio_fr',
        'bio_ar',
        'bio_en',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => match ($lang) {
                'ar' => $this->role_ar ?: $this->role_fr,
                'en' => $this->role_en ?: $this->role_fr,
                default => $this->role_fr,
            },
            'department' => match ($lang) {
                'ar' => $this->department_ar ?: $this->department_fr,
                'en' => $this->department_en ?: $this->department_fr,
                default => $this->department_fr,
            },
            'image' => $this->image,
            'experience' => $this->experience_years,
            'bio' => match ($lang) {
                'ar' => $this->bio_ar ?: $this->bio_fr,
                'en' => $this->bio_en ?: $this->bio_fr,
                default => $this->bio_fr,
            },
        ];
    }
}

