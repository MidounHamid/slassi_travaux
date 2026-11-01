<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Machinery extends Model
{
    use HasFactory;

    protected $table = 'machineries';

    protected $fillable = [
        'code',
        'name',
        'category',
        'specs',
        'status',
        'current_site',
        'project_id',
        'image',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    // Format for admin frontend
    public function toAdminFormat(): array
    {
        return [
            'id' => 'mach-' . $this->id,
            'db_id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'category' => $this->category,
            'specs' => $this->specs,
            'status' => $this->status,
            'currentSite' => $this->current_site,
            'project_id' => $this->project_id,
            'project_title' => $this->project ? $this->project->title_fr : null,
        ];
    }
}
