<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

interface INotes {

    public function getNotesByUserId();

    public function get($id);

    public function post(Request $request);

    public function put(Request $request, $id);

    public function delete($id);

}

?>