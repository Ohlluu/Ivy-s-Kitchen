# Little Light Website - Setup Instructions

## 🚀 Payment Integration Setup

To enable payments on your Little Light website, follow these steps:

### 1. Configure Stripe Keys

**Create PHP Config:**
1. Copy `config-example.php` to `config.php`
2. Replace the placeholder keys with your actual Stripe keys:
   ```php
   return [
       'stripe_secret_key' => 'YOUR_ACTUAL_SECRET_KEY_HERE',
       'stripe_publishable_key' => 'YOUR_ACTUAL_PUBLISHABLE_KEY_HERE'
   ];
   ```

**Create JavaScript Config:**
1. Copy `stripe-config-example.js` to `stripe-config.js`
2. Replace the placeholder with your publishable key:
   ```javascript
   const STRIPE_PUBLISHABLE_KEY = 'YOUR_ACTUAL_PUBLISHABLE_KEY_HERE';
   ```

### 2. Your Stripe Keys
I'll provide your actual keys via private message for security.

### 3. Test the Integration

1. **Upload files** to your web server (needs PHP support)
2. **Test payments** - use Stripe's test card numbers:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
3. **Check success/cancel pages** work properly

### 4. Payment Flow

**Customer Experience:**
1. Clicks any "Order Now" or "Transform Your Life" button
2. Redirects to secure Stripe checkout page
3. Enters payment information on Stripe's servers
4. Success → Redirects to `success.html` with confirmation
5. Cancel → Redirects to `cancel.html` with retry options

**Your Revenue:**
- **Customer pays:** $62.99
- **Stripe fees:** $2.13 (2.9% + $0.30)
- **You receive:** $60.86

### 5. Security Notes

✅ **Secure:**
- Payment data never touches your servers
- PCI compliant through Stripe
- Secret keys are not in public code

✅ **Private Files (not in GitHub):**
- `config.php` - Contains secret keys
- `stripe-config.js` - Contains publishable key

### 6. Troubleshooting

**Common Issues:**
- "Configuration file not found" → Create `config.php` from example
- "Stripe is not defined" → Create `stripe-config.js` from example
- Payment button not working → Check browser console for errors

**Support:**
- Email: hello@thelittlelightfamily.com
- Stripe Dashboard: https://dashboard.stripe.com

## 🎉 You're Ready to Accept Payments!

Once configured, customers can place real orders for $62.99 and you'll receive ~$60.86 per sale!