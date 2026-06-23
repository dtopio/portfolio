<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/skills', [SkillController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/experience', [ExperienceController::class, 'index']);
Route::get('/profile', [ProfileController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);

Route::middleware('admin.token')->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::post('/experience', [ExperienceController::class, 'store']);
    Route::put('/experience/{experience}', [ExperienceController::class, 'update']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::put('/profile', [ProfileController::class, 'update']);
});
