<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SitePage extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_key',
        'slug',
        'title',
        'depth',
        'icon_type',
        'actual_layout',
        'layout_this_page',
        'layout_subpages',
        'status',
        'has_children',
        'expanded',
        'last_modified',
        'author',
        'parent_page_key',
    ];

    protected $casts = [
        'depth' => 'integer',
        'has_children' => 'boolean',
        'expanded' => 'boolean',
    ];

    public function toAdminFormat(): array
    {
        return [
            'id' => $this->page_key,
            'db_id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug ?: '',
            'depth' => $this->depth,
            'iconType' => $this->icon_type,
            'actualLayout' => $this->actual_layout,
            'layoutThisPage' => $this->layout_this_page,
            'layoutSubpages' => $this->layout_subpages,
            'status' => $this->status,
            'hasChildren' => $this->has_children,
            'expanded' => $this->expanded,
            'lastModified' => $this->last_modified ?: $this->updated_at->diffForHumans(),
            'author' => $this->author,
            'parentId' => $this->parent_page_key,
        ];
    }
}
