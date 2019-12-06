<?php
namespace App\Repositories;

use App\Interfaces\IBase;
use App\Interfaces\INotes;
use App\Traits\RESTActions;

class NotesRepository implements IBase, INotes {
    const MODEL = "App\Notes";
    use RESTActions;

}

?>