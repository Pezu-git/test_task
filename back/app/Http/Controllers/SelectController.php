<?php

namespace App\Http\Controllers;


use App\Models\Select;
use App\Models\Basket;
use Illuminate\Http\Request;

class SelectController extends Controller
{
    public function index()
    {
        $selectAll = Select::all();
        $basketAll = Basket::all();
       
        foreach($selectAll as $key => $value) {
            for($i = 0; $i < count($basketAll); $i++) {
                if($value['name'] === $basketAll[$i]['name']) {
                    $value['checked'] = 'cheked';
                }
            }
        }
        return $selectAll;
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
