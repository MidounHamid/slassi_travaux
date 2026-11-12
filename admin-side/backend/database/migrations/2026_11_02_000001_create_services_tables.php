<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models the Services displayed in ServicesSection, ServiceModal, and ServicesPage.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // e.g. gros-oeuvre, vrd-voirie, genie-civil
            $table->string('title_fr');
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->text('short_desc_fr');
            $table->text('short_desc_ar');
            $table->text('short_desc_en')->nullable();
            $table->string('icon')->default('Building2'); // Building2, Construction, PaintBucket, Layers, ClipboardCheck, Truck
            $table->string('image')->nullable(); // pictures: e.g. /images/project-residential.jpg
            $table->string('advantage_title_fr')->nullable();
            $table->string('advantage_title_ar')->nullable();
            $table->string('advantage_title_en')->nullable();
            $table->text('advantage_desc_fr')->nullable();
            $table->text('advantage_desc_ar')->nullable();
            $table->text('advantage_desc_en')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_scopes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->string('text_fr');
            $table->string('text_ar');
            $table->string('text_en')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_scopes');
        Schema::dropIfExists('services');
    }
};

