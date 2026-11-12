<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models Team Members & Engineering Leadership (Management, Engineers, Site Conductors).
     */
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g. Hamid Slassi
            $table->string('role_fr'); // e.g. Directeur Général & Fondateur
            $table->string('role_ar')->nullable();
            $table->string('role_en')->nullable();
            $table->string('department_fr')->default('Direction Générale'); // Direction, Génie Civil, Études & Métré, Parc Matériel
            $table->string('department_ar')->nullable();
            $table->string('department_en')->nullable();
            $table->string('image')->nullable(); // pictures: team member portrait
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('experience_years')->nullable()->default('15+ ans');
            $table->text('bio_fr')->nullable();
            $table->text('bio_ar')->nullable();
            $table->text('bio_en')->nullable();
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
        Schema::dropIfExists('team_members');
    }
};

