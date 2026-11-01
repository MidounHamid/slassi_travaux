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
        Schema::create('machineries', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('category')->default('Terrassement'); // Terrassement, Nivellement, Compactage, Transport
            $table->string('specs')->default('Spécifications standard');
            $table->string('status')->default('available'); // available, on_site, maintenance
            $table->string('current_site')->nullable()->default('Dépôt Central Fès');
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('machineries');
    }
};
