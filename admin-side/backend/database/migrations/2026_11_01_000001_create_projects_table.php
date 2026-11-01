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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_fr');
            $table->string('title_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->string('category')->default('Gros Œuvre');
            $table->string('category_label_fr')->nullable();
            $table->string('category_label_ar')->nullable();
            $table->string('category_label_en')->nullable();
            $table->string('location_fr')->default('Fès - Maroc');
            $table->string('location_ar')->nullable();
            $table->string('location_en')->nullable();
            $table->string('client_fr')->default('Client Privé');
            $table->string('client_ar')->nullable();
            $table->string('client_en')->nullable();
            $table->string('year')->default('2026');
            $table->string('area')->nullable();
            $table->string('budget')->default('Non spécifié');
            $table->integer('progress')->default(0);
            $table->string('status')->default('ongoing'); // ongoing, done, review
            $table->string('image')->nullable();
            $table->text('description_fr')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
