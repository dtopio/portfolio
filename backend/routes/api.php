<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/skills', [SkillController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/experience', [ExperienceController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);
