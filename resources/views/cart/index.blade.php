@extends('layouts.app', ['title' => 'Cart'])

@section('content')
<main class="wrap">
    <div class="page">
        <h1>Shopping Cart</h1>
        @forelse($products as $p)
            <div class="cartrow">
                <div class="smallphoto">{{ $p->category }}</div>
                <div>
                    <h2>{{ $p->name }}</h2>
                    <p>₹{{ number_format($p->price) }}</p>
                    <form method="post" action="{{ route('cart.update') }}">
                        @csrf
                        <input class="qty" type="number" min="0" name="qty[{{ $p->id }}]" value="{{ $cart[$p->id] }}">
                        <button class="filter">Update</button>
                    </form>
                    <form method="post" action="{{ route('cart.remove', $p->id) }}">
                        @csrf
                        <button class="linkbtn">Remove</button>
                    </form>
                </div>
                <b>₹{{ number_format($p->price * $cart[$p->id]) }}</b>
            </div>
        @empty
            <p>Your cart is empty.</p>
        @endforelse

        @if($products->count())
            <div class="summary">
                <h2>Subtotal: ₹{{ number_format($total) }}</h2>
                <a class="btn" href="{{ route('checkout') }}">Proceed to Checkout</a>
            </div>
        @endif
    </div>
</main>
@endsection