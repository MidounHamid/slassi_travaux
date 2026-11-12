<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models Equipment Categories, Fleet Item Lists & Key Fleet Statistics.
     */
    public function up(): void
    {
        // Fleet Overview Statistics (e.g. "40+ Engins lourds", "100% Flotte Propriétaire", "24/7 Disponibilité", "0 Retards")
        Schema::create('equipment_stats', function (Blueprint $table) {
            $table->id();
            $table->string('count'); // e.g. "40+", "100%", "24/7", "0"
            $table->string('label_fr');
            $table->string('label_ar');
            $table->string('label_en')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 4 Equipment Categories (Terrassement, Transport, Nivellement, Béton)
        Schema::create('equipment_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // e.g. terrassement, transport, nivellement, beton
            $table->string('title_fr');
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->string('icon')->nullable()->default('Truck');
            $table->string('banner_image')->nullable(); // pictures: fleet photo
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Concrete Equipment Items inside each category
        Schema::create('equipment_category_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_category_id')->constrained('equipment_categories')->cascadeOnDelete();
            $table->string('name_fr'); // e.g. "Pelles sur chenilles 20T - 35T (CAT, Komatsu)"
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->string('image')->nullable(); // pictures: individual machine photo
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_category_items');
        Schema::dropIfExists('equipment_categories');
        Schema::dropIfExists('equipment_stats');
    }
};

