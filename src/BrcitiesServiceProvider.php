<?php

namespace Ruwer\BRcities;

use Illuminate\Support\ServiceProvider;

class BrcitiesServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //Publish files to user
        $this->publishes([
            //Database
            __DIR__ . '/migrations' => base_path('database/migrations'),
            __DIR__ . '/seeds' => base_path('database/seeds'),
            //JS
            __DIR__ . '/js' => base_path('resources/assets/js'),
            __DIR__ . '/js' => base_path('public/js'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        include __DIR__ . '/routes.php';
        $this->app->make('Ruwer\BRcities\BrcitiesController');
    }
}
