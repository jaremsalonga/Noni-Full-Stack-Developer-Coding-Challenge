<?php

namespace App\Providers;

use App\Repositories\NotesRepository;
use App\Interfaces\IBase;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            IBase::class, 
            NotesRepository::class
        );
    }
}