<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            // Frontend
            ['name' => 'Vue 3', 'category' => 'Frontend', 'level' => 'Advanced', 'icon' => 'vuedotjs'],
            ['name' => 'React', 'category' => 'Frontend', 'level' => 'Advanced', 'icon' => 'react'],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'level' => 'Advanced', 'icon' => 'typescript'],
            ['name' => 'JavaScript (ES6+)', 'category' => 'Frontend', 'level' => 'Advanced', 'icon' => 'javascript'],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 'Advanced', 'icon' => 'tailwindcss'],
            ['name' => 'Shadcn', 'category' => 'Frontend', 'level' => 'Intermediate', 'icon' => 'shadcnui'],
            ['name' => 'Figma', 'category' => 'Frontend', 'level' => 'Intermediate', 'icon' => 'figma'],

            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'Advanced', 'icon' => 'laravel'],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 'Advanced', 'icon' => 'php'],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 'Intermediate', 'icon' => 'nodedotjs'],
            ['name' => 'Python', 'category' => 'Backend', 'level' => 'Intermediate', 'icon' => 'python'],

            // Database
            ['name' => 'PostgreSQL', 'category' => 'Database', 'level' => 'Advanced', 'icon' => 'postgresql'],
            ['name' => 'MongoDB', 'category' => 'Database', 'level' => 'Intermediate', 'icon' => 'mongodb'],

            // APIs & Auth
            ['name' => 'REST APIs', 'category' => 'APIs & Auth', 'level' => 'Advanced', 'icon' => null],
            ['name' => 'Axios', 'category' => 'APIs & Auth', 'level' => 'Advanced', 'icon' => 'axios'],
            ['name' => 'TanStack Query', 'category' => 'APIs & Auth', 'level' => 'Intermediate', 'icon' => 'reactquery'],
            ['name' => 'JWT', 'category' => 'APIs & Auth', 'level' => 'Intermediate', 'icon' => 'jsonwebtokens'],
            ['name' => 'Google OAuth 2.0', 'category' => 'APIs & Auth', 'level' => 'Intermediate', 'icon' => 'google'],

            // Tools & Testing
            ['name' => 'Git', 'category' => 'Tools & Testing', 'level' => 'Advanced', 'icon' => 'git'],
            ['name' => 'Webpack', 'category' => 'Tools & Testing', 'level' => 'Intermediate', 'icon' => 'webpack'],
            ['name' => 'Jest', 'category' => 'Tools & Testing', 'level' => 'Intermediate', 'icon' => 'jest'],
            ['name' => 'Linux (Arch)', 'category' => 'Tools & Testing', 'level' => 'Intermediate', 'icon' => 'archlinux'],
        ];

        foreach ($skills as $index => $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill + ['sort_order' => $index]
            );
        }
    }
}
