<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model {
 protected $fillable=['name','slug','category','age_group','price','mrp','image','description','stock'];
 protected $casts=['price'=>'decimal:2','mrp'=>'decimal:2'];
}