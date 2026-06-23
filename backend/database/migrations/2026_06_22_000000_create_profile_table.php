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
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->text('bio');
            $table->string('location')->nullable();
            $table->timestamps();
        });

        Profile::create([
            'bio' => "I'm a dual-degree Computer Science (Fort Hays State University, Kansas) and Information Technology Management (American University of Phnom Penh) graduate. As a Software Developer and Teaching Assistant at AUPP, I shipped end-to-end features on two large-scale platforms — Request Engine and a High School Student Information System — spanning UI/UX, REST API integration, database operations, and performance optimisation.\n\nOutside of work, I'm into gaming, open-source, content creation on YouTube, and tinkering with my Arch Linux + Hyprland setup. I enjoy owning features end-to-end and applying best practices across the full development lifecycle.",
            'location' => 'Phnom Penh, Cambodia',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile');
    }
};
