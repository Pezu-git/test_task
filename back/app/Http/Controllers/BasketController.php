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
        $s = $request->all();
        foreach ($s as $key => $value) {

            Basket::create([
                'name' => $value
            ]);
        }
    }
}
