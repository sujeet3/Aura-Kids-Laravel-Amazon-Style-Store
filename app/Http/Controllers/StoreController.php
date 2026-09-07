<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StoreController extends Controller {
 public function home(){return view('store.home',['products'=>Product::latest()->take(10)->get()]);}
 public function shop(Request $r){
  $q=Product::query();
  if($r->filled('q')) $q->where('name','like','%'.$r->q.'%');
  if($r->filled('category')) $q->where('category',$r->category);
  $products=$q->paginate(20)->withQueryString();
  return view('store.shop',compact('products'));
 }
 public function product(Product $product){return view('products.show',compact('product'));}
 public function addCart(Product $product,Request $r){
  $cart=session('cart',[]);
  $cart[$product->id]=($cart[$product->id]??0)+1;
  session(['cart'=>$cart]);
  return back()->with('success','Added to cart');
 }
 public function cart(){
  $ids=array_keys(session('cart',[]));
  $products=Product::whereIn('id',$ids)->get()->keyBy('id');
  $cart=session('cart',[]);
  $total=0;
  foreach($cart as $id=>$qty) if(isset($products[$id])) $total += $products[$id]->price*$qty;
  return view('cart.index',compact('products','cart','total'));
 }
 public function updateCart(Request $r){
  $cart=$r->input('qty',[]);
  foreach($cart as $id=>$qty) $cart[$id]=max(0,(int)$qty);
  session(['cart'=>array_filter($cart)]);
  return redirect()->route('cart');
 }
 public function removeCart($id){
  $cart=session('cart',[]); unset($cart[$id]); session(['cart'=>$cart]); return redirect()->route('cart');
 }
 public function checkout(){return view('checkout.index');}
 public function placeOrder(Request $r){
  $data=$r->validate(['customer_name'=>'required','mobile'=>'required','address'=>'required','payment_method'=>'required']);
  $ids=array_keys(session('cart',[])); $products=Product::whereIn('id',$ids)->get()->keyBy('id'); $cart=session('cart',[]); $total=0;
  foreach($cart as $id=>$qty) if(isset($products[$id])) $total += $products[$id]->price*$qty;
  $order=Order::create($data+['status'=>'Placed','total'=>$total]);
  foreach($cart as $id=>$qty) if(isset($products[$id])) $order->items()->create(['product_id'=>$id,'quantity'=>$qty,'price'=>$products[$id]->price]);
  session()->forget('cart');
  return view('checkout.success',compact('order'));
 }
}