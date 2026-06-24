<?php

use App\Models\Profile;
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
        Schema::table('profile', function (Blueprint $table) {
            $table->string('tagline')->nullable()->after('location');
            $table->text('summary')->nullable()->after('tagline');
        });

        Profile::current()->update([
            'tagline' => 'Front-End Developer · Full-Stack Experience',
            'summary' => 'I specialise in **Vue**, **React** and **TypeScript**, with hands-on full-stack experience using **Laravel** and **Node.js** backends — from UI/UX and REST API integration to database design and performance tuning.',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profile', function (Blueprint $table) {
            $table->dropColumn(['tagline', 'summary']);
        });
    }
};
