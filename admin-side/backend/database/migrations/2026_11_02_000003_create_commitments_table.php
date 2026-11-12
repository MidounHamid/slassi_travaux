<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Models Quality Commitments, Insurance, Safety and Moroccan Norms (RPS 2011, NM, CCTG).
     */
    public function up(): void
    {
        Schema::create('commitments', function (Blueprint $table) {
            $table->id();
            $table->string('title_fr');
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->text('desc_fr');
            $table->text('desc_ar');
            $table->text('desc_en')->nullable();
            $table->string('icon')->default('ShieldCheck'); // ShieldCheck, FileCheck, Microscope, Clock, Award, Scale
            $table->string('image')->nullable(); // pictures: certificate or technical inspection photo
            $table->string('badge_fr')->nullable()->default('Engagement Contractuel Garanti');
            $table->string('badge_ar')->nullable()->default('مضمون وموثق بالشهادات الرسمية');
            $table->string('badge_en')->nullable()->default('Contractual Guarantee');
            $table->string('standard_code')->nullable(); // RPS 2011, NM BTP, CCTG, LPEE
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
        Schema::dropIfExists('commitments');
    }
};

