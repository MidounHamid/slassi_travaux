<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'role',
        'job_title',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Role relation.
     */
    public function roleModel(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    /**
     * Check if user has a specific role (by name slug).
     *
     * @param string|array<string> $roles
     */
    public function hasRole(string|array $roles): bool
    {
        $roleName = $this->roleModel ? $this->roleModel->name : $this->role;
        if (is_array($roles)) {
            return in_array($roleName, $roles, true);
        }
        return $roleName === $roles;
    }

    /**
     * Check if user has a specific permission.
     */
    public function hasPermission(string $permissionName): bool
    {
        // Super Admin has all permissions automatically
        if ($this->hasRole('super_admin')) {
            return true;
        }

        if ($this->roleModel) {
            return $this->roleModel->hasPermission($permissionName);
        }

        return false;
    }

    /**
     * Get all permission names for this user.
     *
     * @return list<string>
     */
    public function getAllPermissions(): array
    {
        if ($this->hasRole('super_admin')) {
            return Permission::pluck('name')->all();
        }

        if ($this->roleModel) {
            return $this->roleModel->permissions()->pluck('name')->all();
        }

        return [];
    }
}
