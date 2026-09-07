<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
Route::get('/',[StoreController::class,'home'])->name('home');
Route::get('/shop',[StoreController::class,'shop'])->name('shop');
Route::get('/product/{product}',[StoreController::class,'product'])->name('product');
Route::post('/cart/add/{product}',[StoreController::class,'addCart'])->name('cart.add');
Route::get('/cart',[StoreController::class,'cart'])->name('cart');
Route::post('/cart/update',[StoreController::class,'updateCart'])->name('cart.update');
Route::post('/cart/remove/{id}',[StoreController::class,'removeCart'])->name('cart.remove');
Route::get('/checkout',[StoreController::class,'checkout'])->name('checkout');
Route::post('/checkout',[StoreController::class,'placeOrder'])->name('checkout.place');
Route::view('/about','store.about')->name('about');
Route::view('/contact','store.contact')->name('contact');
Route::view('/size-guide','store.size-guide')->name('size-guide');
