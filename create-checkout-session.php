<?php
// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Stripe configuration
$stripe_secret_key = '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';

// Initialize cURL
$curl = curl_init();

// Get the current domain for success/cancel URLs
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
$domain = $protocol . '://' . $_SERVER['HTTP_HOST'];
$current_dir = dirname($_SERVER['SCRIPT_NAME']);

// Prepare the Stripe API request
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.stripe.com/v1/checkout/sessions',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $stripe_secret_key,
        'Content-Type: application/x-www-form-urlencoded'
    ],
    CURLOPT_POSTFIELDS => http_build_query([
        'payment_method_types[0]' => 'card',
        'line_items[0][price_data][currency]' => 'usd',
        'line_items[0][price_data][product_data][name]' => 'Little Light Bible Projector - Adult Version',
        'line_items[0][price_data][product_data][description]' => '13 theme-based Bible stories, personal affirmations & prayers + FREE gifts (journal, affirmation cards, sticky notes) for first 200 orders',
        'line_items[0][price_data][product_data][images][0]' => $domain . $current_dir . '/38F59C79-196C-42CB-8B31-46401F223947.PNG',
        'line_items[0][price_data][unit_amount]' => 6299, // $62.99 in cents
        'line_items[0][quantity]' => 1,
        'mode' => 'payment',
        'success_url' => $domain . $current_dir . '/success.html?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => $domain . $current_dir . '/cancel.html',
        'customer_creation' => 'always',
        'invoice_creation[enabled]' => 'true',
        'phone_number_collection[enabled]' => 'true',
        'shipping_address_collection[allowed_countries][0]' => 'US',
        'shipping_address_collection[allowed_countries][1]' => 'CA',
        'automatic_tax[enabled]' => 'false',
        'metadata[product]' => 'little_light_adult',
        'metadata[version]' => 'v1.0',
        'metadata[free_gifts]' => 'journal,affirmation_cards,sticky_notes'
    ])
]);

// Execute the request
$response = curl_exec($curl);
$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// Check for errors
if (curl_error($curl)) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . curl_error($curl)]);
    curl_close($curl);
    exit;
}

curl_close($curl);

// Check if request was successful
if ($http_code !== 200) {
    http_response_code($http_code);
    echo $response;
    exit;
}

// Return the session data
echo $response;
?>