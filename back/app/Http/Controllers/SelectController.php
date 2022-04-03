<?php

namespace App\Http\Controllers;


use App\Models\Select;
use Illuminate\Http\Request;

class SelectController extends Controller
{
    public function index()
    {
        return Select::all();
    }

    public function update(Request $request)
    {
        $s = $request->all();
        foreach ($s as $key => $value) {
            $itemUpdate = Select::where('id', $value['id'])->first();
            $itemUpdate->name = $value['name'];
            $itemUpdate->save();
        }
    }
}
