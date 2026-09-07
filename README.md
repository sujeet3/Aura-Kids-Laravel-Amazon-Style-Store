# AURA Kids Wear — Laravel Amazon-style Store

Modern marketplace-style Laravel starter for Aura Kids Wear India Private Limited.

## Launch
1. Install PHP 8.2+ and Composer.
2. Extract the project.
3. `composer install`
4. Copy `.env.example` to `.env`
5. `php artisan key:generate`
6. `mkdir -p database && touch database/database.sqlite` (Windows: create an empty `database/database.sqlite`)
7. `php artisan migrate --seed`
8. `php artisan serve`

Open http://127.0.0.1:8000

## Included
- Marketplace-style responsive UI
- Product catalog and search
- Category filtering
- Product detail
- Session cart
- Checkout and order creation
- COD / online-payment placeholder
- SQLite database + demo products
- About, Contact, Size Guide

## Production integration still required
Razorpay/Cashfree payment gateway, customer authentication, admin dashboard, inventory locking, shipping API, GST invoices, email/SMS notifications, returns/refunds, rate limiting, HTTPS, backups and production database.
