<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder; use App\Models\Product; use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder {public function run(){foreach([
['Pink Floral Dress','Party Wear','Girls 2–9',1299,1999],
['Blue Denim Co-ord Set','Co-ord Sets','Girls 2–9',1499,2299],
['Buttercup Baby Romper','Babywear','Baby 0–2',899,1299],
['Mint Party Frock','Party Wear','Girls 2–9',1399,2199],
['Sunny Tee & Shorts','Boys','Boys 2–9',999,1399],
['Festive Kurta Set','Ethnic Wear','Boys 2–9',1599,2199],
['Lavender Dream Dress','Dresses','Girls 2–9',1249,1899],
['Navy Jogger Set','Boys','Boys 2–9',1099,1599],
['Rainbow Summer Set','Co-ord Sets','Girls 2–9',949,1399],
['Little Star Night Suit','Nightwear','Baby 0–9',799,999],
] as $p){Product::create(['name'=>$p[0],'slug'=>Str::slug($p[0]),'category'=>$p[1],'age_group'=>$p[2],'price'=>$p[3],'mrp'=>$p[4],'stock'=>50,'description'=>'Comfortable, playful AURA kidswear designed for everyday movement and special moments.']);}}}