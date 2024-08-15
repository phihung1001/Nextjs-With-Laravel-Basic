<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::get('get-all', [TaskController::class, "index"]);
    Route::post('create', [TaskController::class, "create"]);
    Route::post('update/{id}', [TaskController::class, "update"]);
    Route::post('delete/{id}', [TaskController::class, "delete"]);
    Route::get('gettask/{id}', [TaskController::class, "gettask"]);

});
