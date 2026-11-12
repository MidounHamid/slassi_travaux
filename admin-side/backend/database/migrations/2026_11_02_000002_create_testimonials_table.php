<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models the Client Testimonials & Partner References displayed in TestimonialsSection.
     */
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name'); // e.g. Hassan Berrada
            $table->string('role_fr'); // e.g. Directeur Technique
            $table->string('role_ar')->nullable();
            $table->string('role_en')->nullable();
            $table->string('company_fr'); // e.g. Groupe Saïss Immobilier
            $table->string('company_ar')->nullable();
            $table->string('company_en')->nullable();
            $table->string('city_fr')->default('Fès');
            $table->string('city_ar')->nullable()->default('فاس');
            $table->string('city_en')->nullable()->default('Fez');
            $table->text('comment_fr');
            $table->text('comment_ar');
            $table->text('comment_en')->nullable();
            $table->unsignedTinyInteger('rating')->default(5); // 1-5 stars
            $table->string('avatar_image')->nullable(); // pictures: client photo or logo
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};

