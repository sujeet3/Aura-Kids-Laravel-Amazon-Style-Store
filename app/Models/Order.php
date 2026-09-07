<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Order extends Model {
 protected $fillable=['customer_name','mobile','address','payment_method','status','total'];
 protected $casts=['total'=>'decimal:2'];
 public function items(){return $this->hasMany(OrderItem::class);}
}