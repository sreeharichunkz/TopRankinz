<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\ArtisanCommandController;
use App\Http\Controllers\ComposerCommandController;
use App\Http\Controllers\ProfileUserMetaController;
use App\Http\Controllers\AwardRecognitionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

});

Route::group(['prefix' => '/profile'], function () {

    Route::get('/', [ProfileController::class, 'index']);
    Route::get('/getfilters', [ProfileController::class, 'showFilters']);
    Route::post('/filter', [ProfileController::class, 'filter']);
    Route::get('/{id}', [ProfileController::class, 'show']);
});

Route::get('/homeslider', [SliderController::class, 'slider']);

Route::middleware('auth:sanctum')->group(function () {

    Route::group(['prefix' => '/profile'], function () {

        Route::group(['prefix' => '/{id}'], function () {

            Route::post('/likestatus', [ProfileUserMetaController::class, 'storeLike']);
            Route::post('/rating', [ProfileUserMetaController::class, 'storeRating']);
            Route::group(['prefix' => '/comment'], function () {
                Route::post('/', [CommentController::class, 'store']);
                Route::post('/{commentid}/reply', [CommentController::class, 'reply']);
                Route::delete('/{commentid}', [CommentController::class, 'destroy']);

            });

        });

    });

    Route::group(['prefix' => '/user'], function () {

        Route::get('/', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'update']);
        Route::get('/activities', [UserController::class, 'userActivities']);

    });

});

Route::group(['prefix' => '/admin'], function () {

    Route::post('/login', [AuthController::class, 'adminLogin']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {

        Route::group(['prefix' => '/user'], function () {
            Route::get('/', [AdminController::class, 'showAllUser']);
            Route::get('/{userid}', [AdminController::class, 'showUser']);
            Route::post('/{userid}', [AdminController::class, 'updateUser']);
            Route::delete('/{userid}', [AdminController::class, 'destroyUser']);

        });
        Route::get('/dashboard',[AdminController::class,'dashboard']);

        Route::group(['prefix' => '/home'], function () {
            Route::group(['prefix' => '/slider'], function () {
                Route::get('/', [SliderController::class, 'index']);
                Route::get('/{id}', [SliderController::class, 'show']);                
                Route::post('/', [SliderController::class, 'store']);
                Route::post('/{id}', [SliderController::class, 'update']);
                Route::delete('/{id}', [SliderController::class, 'destroy']);               
            });                          
        });       
    });
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
   
    Route::group(['prefix' => '/profile'], function () {

        Route::post('/', [ProfileController::class, 'store']);

        Route::group(['prefix' => '/{profileid}'], function () {

            Route::group(['prefix' => '/recognition'], function () {
                Route::get('/', [AwardRecognitionController::class, 'show']);
                Route::post('/', [AwardRecognitionController::class, 'store']);
                Route::post('/{id}', [AwardRecognitionController::class, 'update']);
                Route::delete('/{id}', [AwardRecognitionController::class, 'destroy']);

            });

        });
        Route::post('/{id}', [ProfileController::class, 'update']);
        Route::delete('/{id}', [ProfileController::class, 'destroy']);

    });
    
});

Route::post('/forgot-password',[PasswordController::class,'sendPasswordResetLinkEmail'])->name('password.email');
Route::get('/reset-password',[PasswordController::class,'resetPassword'])->name('password.reset');
Route::post('/reset-password',[PasswordController::class,'resetPassword'])->name('password.update');


// Route::get('password/reset', [PasswordResetController::class, 'showLinkRequestForm'])->name('password.request');
// Route::post('password/email', [PasswordResetController::class, 'sendResetLinkEmail'])->name('password.email');
// Route::get('password/reset/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
// Route::post('password/reset', [PasswordResetController::class, 'reset'])->name('password.update');


Route::get('/send-email', function () {
    Mail::raw('This is a test email.', function ($message) {
        $message->to('user091232@gmail.com')
                ->subject('Test Email');
    });

    return 'Email sent successfully!';
});

Route::group(['prefix'=>'/auth'],function(){
    Route::get('/{provider}/url', [SocialAuthController::class, 'getAuthUrl']);
Route::get('/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);
   
});

Route::get('/artisan-command', [ArtisanCommandController::class, 'runCommand']);
