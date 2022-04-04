<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Basket;

class BasketController extends Controller
{
    public function index()
    {
        return Basket::all();
    }

    public function store(Request $request)
    {
        $a = $request->all();
        $s = $a[0];
        $d = $a[1];
        foreach ($s as $key => $value) {
            Basket::create([
                'name' => $value
            ]);
        }

        foreach ($d as $key => $value) {
            Basket::where('name', $value)->delete();
        }
    }
}
