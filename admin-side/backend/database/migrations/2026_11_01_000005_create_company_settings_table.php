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
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->default('SLASSI DE TRAVAUX DIVERS');
            $table->string('short_name')->default('Slassi Travaux');
            $table->string('legal_form')->default('SARL AU');
            $table->string('capital')->default('17 000 000 MAD');
            $table->string('capital_formatted')->default('17.000.000,00 DH');
            $table->string('founding_year')->default('2010');
            $table->string('experience_years')->default('15+');
            $table->string('city')->default('Fès');
            $table->string('country')->default('Maroc');
            $table->string('address_line1')->default('Bureau N°21, 4ème étage, Résidence Bureau Jawahir');
            $table->string('address_line2')->nullable()->default('Avenue Mohamed Slaoui');
            $table->string('postal_code')->default('30000');
            $table->text('full_address_fr')->nullable();
            $table->text('full_address_ar')->nullable();
            $table->text('full_address_en')->nullable();
            $table->decimal('lat', 10, 7)->default(34.0331);
            $table->decimal('lng', 10, 7)->default(-5.0003);
            $table->string('phone')->default('+212 5 35 62 14 80');
            $table->string('phone_display')->default('+212 535 62 14 80');
            $table->string('mobile')->default('+212 6 61 48 92 10');
            $table->string('whatsapp')->default('212661489210');
            $table->string('email')->default('contact@slassi-travaux.ma');
            $table->string('commercial_email')->nullable()->default('devis@slassi-travaux.ma');
            $table->string('recruitment_email')->nullable()->default('recrutement@slassi-travaux.ma');
            $table->string('ice')->default('002341982000045');
            $table->string('rc')->default('58492 (Tribunal de Commerce de Fès)');
            $table->string('identifiant_fiscal')->default('45892147');
            $table->string('patente')->default('14209841');
            $table->string('cnss')->default('9283411');
            $table->integer('projects_count')->default(120);
            $table->string('capital_mad')->default('17M+ MAD');
            $table->integer('active_sites')->default(14);
            $table->integer('engineers_staff')->default(85);
            $table->integer('heavy_machines')->default(40);
            $table->string('zero_accident_score')->default('99.8%');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_settings');
    }
};
