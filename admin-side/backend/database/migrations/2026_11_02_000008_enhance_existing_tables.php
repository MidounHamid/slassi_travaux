<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Enhances existing tables (company_settings, machineries, projects) with complete columns.
     */
    public function up(): void
    {
        // 1. Enhance company_settings with visual branding, social networks, and working hours
        Schema::table('company_settings', function (Blueprint $table) {
            $table->string('logo_url')->nullable()->default('/images/logo.png')->after('short_name');
            $table->string('logo_transparent_url')->nullable()->default('/icon.png')->after('logo_url');
            $table->string('favicon_url')->nullable()->default('/favicon.ico')->after('logo_transparent_url');
            $table->string('hero_image_url')->nullable()->default('/images/hero.jpg')->after('favicon_url');
            $table->string('about_image_url')->nullable()->default('/images/machinery-fleet.jpg')->after('hero_image_url');
            
            $table->string('facebook_url')->nullable()->after('whatsapp');
            $table->string('linkedin_url')->nullable()->after('facebook_url');
            $table->string('instagram_url')->nullable()->after('linkedin_url');
            $table->string('youtube_url')->nullable()->after('instagram_url');
            
            $table->string('working_hours_fr')->nullable()->default('Lun - Ven : 08h00 - 18h30 | Sam : 08h00 - 13h00');
            $table->string('working_hours_ar')->nullable()->default('الإثنين - الجمعة : 08:00 - 18:30 | السبت : 08:00 - 13:00');
            $table->string('working_hours_en')->nullable()->default('Mon - Fri: 08:00 - 18:30 | Sat: 08:00 - 13:00');
        });

        // 2. Enhance machineries with multilingual attributes, brand, model and power
        Schema::table('machineries', function (Blueprint $table) {
            $table->string('name_ar')->nullable()->after('name');
            $table->string('name_en')->nullable()->after('name_ar');
            $table->string('category_ar')->nullable()->after('category');
            $table->string('category_en')->nullable()->after('category_ar');
            $table->string('specs_ar')->nullable()->after('specs');
            $table->string('specs_en')->nullable()->after('specs_ar');
            
            $table->string('brand')->nullable()->default('Caterpillar')->after('name_en');
            $table->string('model')->nullable()->after('brand');
            $table->string('year_manufactured')->nullable()->default('2023')->after('model');
            $table->string('tonnage')->nullable()->after('year_manufactured');
            $table->string('power_hp')->nullable()->after('tonnage');
            
            $table->string('current_site_ar')->nullable()->after('current_site');
            $table->string('current_site_en')->nullable()->after('current_site_ar');
        });

        // 3. Enhance projects with architect, delivery details and featured status
        Schema::table('projects', function (Blueprint $table) {
            $table->string('architect')->nullable()->default('Cabinet d\'Architecture & Urbanisme Fès')->after('client_en');
            $table->string('duration')->nullable()->default('18 mois')->after('year');
            $table->string('delivery_date')->nullable()->after('duration');
            $table->boolean('is_featured')->default(true)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['architect', 'duration', 'delivery_date', 'is_featured']);
        });

        Schema::table('machineries', function (Blueprint $table) {
            $table->dropColumn([
                'name_ar', 'name_en', 'category_ar', 'category_en', 'specs_ar', 'specs_en',
                'brand', 'model', 'year_manufactured', 'tonnage', 'power_hp',
                'current_site_ar', 'current_site_en'
            ]);
        });

        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn([
                'logo_url', 'logo_transparent_url', 'favicon_url', 'hero_image_url', 'about_image_url',
                'facebook_url', 'linkedin_url', 'instagram_url', 'youtube_url',
                'working_hours_fr', 'working_hours_ar', 'working_hours_en'
            ]);
        });
    }
};

