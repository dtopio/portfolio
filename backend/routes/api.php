<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/skills', [SkillController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/experience', [ExperienceController::class, 'index']);
Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/profile/cv', [ProfileController::class, 'downloadCv']);
Route::post('/contact', [ContactController::class, 'store']);

Route::middleware('admin.token')->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::post('/experience', [ExperienceController::class, 'store']);
    Route::put('/experience/{experience}', [ExperienceController::class, 'update']);
    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/cv', [ProfileController::class, 'uploadCv']);
    Route::get('/messages', [MessageController::class, 'index']);
    Route::patch('/messages/{message}/read', [MessageController::class, 'markRead']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
});
