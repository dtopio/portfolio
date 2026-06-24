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
            $table->json('stack')->nullable()->after('summary');
        });

        Profile::current()->update([
            'stack' => [
                'Vue 3',
                'React',
                'TypeScript',
                'Laravel',
                'Node.js',
                'Tailwind CSS',
                'PostgreSQL',
                'MongoDB',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profile', function (Blueprint $table) {
            $table->dropColumn('stack');
        });
    }
};
