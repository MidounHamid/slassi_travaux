<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'client_name',
        'company',
        'phone',
        'whatsapp',
        'email',
        'project_type',
        'project_title',
        'location',
        'city',
        'surface',
        'finish_level',
        'estimated_amount',
        'budget_range',
        'message',
        'status',
        'notes',
    ];

    protected $casts = [
        'surface' => 'decimal:2',
    ];

    // Format for admin frontend
    public function toAdminFormat(): array
    {
        return [
            'id' => $this->reference,
            'db_id' => $this->id,
            'client' => $this->client_name,
            'company' => $this->company,
            'project' => $this->project_title ?: $this->project_type,
            'location' => $this->location ?: ($this->city ?: 'Fès, Maroc'),
            'amount' => $this->estimated_amount ?: ($this->budget_range ?: 'Sur devis'),
            'date' => $this->created_at->format('d M Y - H:i'),
            'status' => $this->status,
            'phone' => $this->phone,
            'whatsapp' => $this->whatsapp ?: preg_replace('/[^0-9]/', '', $this->phone),
            'email' => $this->email,
            'message' => $this->message,
        ];
    }
}
