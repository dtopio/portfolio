<?php

use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
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
            Skill::create($skill + ['sort_order' => $index]);
        }

        $projects = [
            [
                'title' => 'Request Engine',
                'slug' => 'request-engine',
                'description' => 'An internal workflow tool built at AUPP that digitised staff requests for 200+ university employees, replacing paper-based processes with a structured, role-based approval system. Features a dynamic drag-and-drop form builder, role-based approval routing (department heads, admins, HR), Word/Excel parsing for bulk data input, and performance-optimised data fetching with TanStack Query caching. Internal AUPP tool — not publicly available.',
                'tech_stack' => ['Vue 3', 'Vite', 'TypeScript', 'Tailwind CSS', 'Laravel', 'Axios', 'TanStack Query'],
                'tags' => ['Full-stack', 'Internal Tool'],
                'github_url' => null,
                'demo_url' => null,
                'featured' => true,
            ],
            [
                'title' => 'High School Student Information System (SIS)',
                'slug' => 'high-school-sis',
                'description' => 'A full-stack student information system built at AUPP, managing the complete student lifecycle — from parent application through enrolment — for 600+ records. Includes an online admissions pipeline (apply → exam invite → approve/reject), student records, a parent portal, academic progress tracking, document management, and end-to-end finance management (fees, line items, refunds). Internal AUPP tool — not publicly available.',
                'tech_stack' => ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL'],
                'tags' => ['Full-stack', 'Education'],
                'github_url' => null,
                'demo_url' => null,
                'featured' => true,
            ],
            [
                'title' => 'MealSync',
                'slug' => 'mealsync',
                'description' => 'A full-stack meal planning application with AI-powered nutritional analysis, deployed on Render. Features JWT authentication and Google OAuth 2.0, USDA Nutrition API integration with AI-driven meal analysis against personal health goals, household sharing, a weekly meal planner with recipe import, and auto-generated shopping lists with pantry inventory tracking.',
                'tech_stack' => ['Vue 3', 'TypeScript', 'Express.js', 'PostgreSQL', 'JWT', 'Google OAuth 2.0'],
                'tags' => ['Full-stack', 'Personal Project'],
                'github_url' => 'https://github.com/dtopio/recipe-meal-planner',
                'demo_url' => null,
                'featured' => true,
            ],
        ];

        foreach ($projects as $index => $project) {
            Project::create($project + ['sort_order' => $index]);
        }

        $experiences = [
            [
                'title' => 'Software Developer',
                'organization' => 'American University of Phnom Penh (AUPP)',
                'location' => 'Phnom Penh, Cambodia',
                'type' => 'work',
                'start_date' => '2024-02-01',
                'end_date' => '2026-05-31',
                'description' => 'Delivered end-to-end features on two large-scale platforms — Request Engine and the High School SIS — using Vue 3, TypeScript, Tailwind CSS, and Laravel REST APIs. Owned front-end API integration via Axios across multiple modules, implementing full CRUD flows and reusable UI component architecture. Modernised legacy system interfaces and established UI/UX guidelines adopted across multiple projects. Optimised the user profile system with client-side caching, cutting API calls by roughly 70% and significantly improving page load performance. Also produced video demonstrations of newly shipped features to guide staff adoption across departments.',
            ],
            [
                'title' => 'Teaching Assistant, Computer Science',
                'organization' => 'American University of Phnom Penh (AUPP)',
                'location' => 'Phnom Penh, Cambodia',
                'type' => 'teaching',
                'start_date' => '2024-01-01',
                'end_date' => '2024-12-31',
                'description' => 'Graded assignments, held support sessions, and guided students through coursework for Computer Science courses.',
            ],
            [
                'title' => 'Bachelor of Computer Science',
                'organization' => 'Fort Hays State University (FHSU)',
                'location' => 'Kansas, USA',
                'type' => 'education',
                'start_date' => '2022-01-01',
                'end_date' => '2026-05-31',
                'description' => 'Dual-degree program completed alongside a B.A. in Information Technology Management at AUPP.',
            ],
            [
                'title' => 'Bachelor of Information Technology Management',
                'organization' => 'American University of Phnom Penh (AUPP)',
                'location' => 'Phnom Penh, Cambodia',
                'type' => 'education',
                'start_date' => '2022-01-01',
                'end_date' => '2026-05-31',
                'description' => 'Dual-degree program completed alongside a B.Sc. in Computer Science at Fort Hays State University.',
            ],
        ];

        foreach ($experiences as $index => $experience) {
            Experience::create($experience + ['sort_order' => $index]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Skill::whereIn('name', [
            'Vue 3', 'React', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Shadcn', 'Figma',
            'Laravel', 'PHP', 'Node.js', 'Python',
            'PostgreSQL', 'MongoDB',
            'REST APIs', 'Axios', 'TanStack Query', 'JWT', 'Google OAuth 2.0',
            'Git', 'Webpack', 'Jest', 'Linux (Arch)',
        ])->delete();

        Project::whereIn('slug', ['request-engine', 'high-school-sis', 'mealsync'])->delete();

        Experience::whereIn('title', [
            'Software Developer',
            'Teaching Assistant, Computer Science',
            'Bachelor of Computer Science',
            'Bachelor of Information Technology Management',
        ])->delete();
    }
};
