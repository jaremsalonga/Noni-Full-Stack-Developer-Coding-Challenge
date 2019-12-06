<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

interface IBase {

    public function all();

    public function get($id);

    public function post(Request $request);

    public function put(Request $request, $id);

    public function delete($id);

}

?>