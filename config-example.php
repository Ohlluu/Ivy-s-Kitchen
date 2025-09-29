<?php
// Stripe Configuration Example
//
// INSTRUCTIONS:
// 1. Rename this file to 'config.php'
// 2. Replace the placeholder values with your actual Stripe keys
// 3. Make sure config.php is in your .gitignore file
// 4. Include this file in create-checkout-session.php

return [
    'stripe_secret_key' => 'sk_live_YOUR_SECRET_KEY_HERE',
    'stripe_publishable_key' => 'pk_live_YOUR_PUBLISHABLE_KEY_HERE'
];
?>