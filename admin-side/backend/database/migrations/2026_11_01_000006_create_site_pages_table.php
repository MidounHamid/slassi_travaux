<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_pages', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique(); // e.g. page-1
            $table->string('slug')->nullable();
            $table->string('title');
            $table->integer('depth')->default(0);
            $table->string('icon_type')->default('page');
            $table->string('actual_layout')->default('Default');
            $table->string('layout_this_page')->default('Default');
            $table->string('layout_subpages')->default('None (Inherit)');
            $table->string('status')->default('published');
            $table->boolean('has_children')->default(false);
            $table->boolean('expanded')->default(false);
            $table->string('last_modified')->nullable();
            $table->string('author')->default('Hamid Slassi');
            $table->string('parent_page_key')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_pages');
    }
};
