<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project + ['sort_order' => $index]
            );
        }
    }
}
