<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SelectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('selects')->insert([
            'name' => 'Nike React'
        ]);
        DB::table('selects')->insert([
            'name' => 'Salomon Xa'
        ]);
        DB::table('selects')->insert([
            'name' => 'Adidas Skychaser'
        ]);
        DB::table('selects')->insert([
            'name' => 'On Cloudstratus'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Clifton'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Bondi'
        ]);
        DB::table('selects')->insert([
            'name' => 'Asics Kayano'
        ]);
        DB::table('selects')->insert([
            'name' => 'Asics Nimbus'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Rincon 3'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Torrent 2'
        ]);
        DB::table('selects')->insert([
            'name' => 'Asics Metropolis'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Torrent 3'
        ]);
        DB::table('selects')->insert([
            'name' => 'New Balance Hierro'
        ]);
        DB::table('selects')->insert([
            'name' => 'Adidas Terrex Swift'
        ]);
        DB::table('selects')->insert([
            'name' => 'Asics Culumnus'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Speedgoat Mid'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Speedgoat'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Zinal'
        ]);
        DB::table('selects')->insert([
            'name' => 'Icebug Arcus'
        ]);
        DB::table('selects')->insert([
            'name' => 'On Cloud 5'
        ]);
        DB::table('selects')->insert([
            'name' => 'La Sportiva Bushido 2'
        ]);
        DB::table('selects')->insert([
            'name' => 'Adidas Solar Boost'
        ]);
        DB::table('selects')->insert([
            'name' => 'On Cloudflyer'
        ]);
        DB::table('selects')->insert([
            'name' => 'Nike Pegasus 38'
        ]);
        DB::table('selects')->insert([
            'name' => 'Saucony Guide'
        ]);
        DB::table('selects')->insert([
            'name' => 'Mizuno Wave Sky'
        ]);
        DB::table('selects')->insert([
            'name' => 'Saucony Peregrine'
        ]);
        DB::table('selects')->insert([
            'name' => 'Hoka Arahi'
        ]);
        DB::table('selects')->insert([
            'name' => 'Nike Pegasus Trail'
        ]);
    }
}
