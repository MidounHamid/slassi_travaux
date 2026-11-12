<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models the dynamic pricing & formula coefficients for the ProjectEstimator component.
     */
    public function up(): void
    {
        // Project Types (Bâtiment R+4, Villa de Luxe, Hangar Industriel, Voirie & VRD, Rénovation)
        Schema::create('estimator_types', function (Blueprint $table) {
            $table->string('type_key')->primary(); // e.g. building, villa, industrial, vrd, renovation
            $table->string('name_fr');
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->decimal('base_rate', 10, 2); // MAD / m²
            $table->string('unit')->default('m²');
            $table->string('icon')->nullable()->default('Building2');
            $table->string('image')->nullable(); // pictures: illustration photo
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Finish Levels (Gros Œuvre Seul, Standard Fini, Haut Standing, Prestige)
        Schema::create('estimator_finishes', function (Blueprint $table) {
            $table->string('finish_key')->primary(); // e.g. gros_oeuvre, standard, haut_standing, prestige
            $table->string('name_fr');
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->decimal('multiplier', 5, 2)->default(1.00); // 0.65, 1.00, 1.35, 1.80
            $table->text('description_fr')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Locations (Fès, Meknès, Casablanca, Rabat, Autres Régions)
        Schema::create('estimator_locations', function (Blueprint $table) {
            $table->string('location_key')->primary(); // e.g. fes, meknes, casa, rabat, autre
            $table->string('name_fr');
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->decimal('logistics_multiplier', 5, 2)->default(1.00);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimator_locations');
        Schema::dropIfExists('estimator_finishes');
        Schema::dropIfExists('estimator_types');
    }
};

