<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
}
