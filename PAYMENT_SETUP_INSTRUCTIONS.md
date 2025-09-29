# Payment Setup Instructions - URGENT FIX NEEDED

## The Problem
Your "Order Now" buttons say "redirecting" but don't work because we need to create a **Price ID** in your Stripe Dashboard first.

## IMMEDIATE ACTION REQUIRED

### Step 1: Create Price in Stripe Dashboard
1. Go to **https://dashboard.stripe.com**
2. Log in with your account
3. Click **Products** in the left sidebar
4. Click **+ Add product** button
5. Fill out the product:
   - **Name**: `Little Light Bible Projector - Adult Version`
   - **Description**: `13 theme-based Bible stories, personal affirmations & prayers + FREE gifts (journal, affirmation cards, sticky notes) for first 200 orders`
   - **Image**: Upload your product image
   - **Pricing model**: One-time
   - **Price**: `$62.99 USD`
   - **Tax code**: Leave default or select appropriate
6. Click **Save product**

### Step 2: Copy the Price ID
1. After saving, you'll see your product in the Products list
2. Click on your product to open it
3. In the **Pricing** section, you'll see something like: `price_1AbC2dE3fG4hI5jK6lM7nO8p`
4. **COPY THIS ENTIRE PRICE ID** - you need it for the next step

### Step 3: Update Your Website Code
Once you have your Price ID, I need to update the script.js file with your real Price ID.

**Send me your Price ID and I'll update the code immediately.**

## Alternative Solution: Payment Links
If you prefer an even simpler approach:

1. In Stripe Dashboard, go to **Payment Links**
2. Click **+ Create payment link**
3. Select your product (created above)
4. Configure success/cancel URLs:
   - Success URL: `https://ohlluu.github.io/Ivy-s-Kitchen/success.html`
   - Cancel URL: `https://ohlluu.github.io/Ivy-s-Kitchen/cancel.html`
5. Copy the Payment Link URL
6. I'll update the buttons to use direct redirects to this link

## Current Status
❌ **Order buttons not working** - Need Price ID or Payment Link
✅ **Stripe keys properly configured**
✅ **Success/cancel pages ready**
✅ **Code structure correct**

## Next Steps
1. **YOU**: Create Price ID in Stripe Dashboard (5 minutes)
2. **YOU**: Send me the Price ID
3. **ME**: Update code with your Price ID (30 seconds)
4. **ME**: Push fix to GitHub
5. **DONE**: Order buttons work perfectly

**This is a 5-minute fix once you get your Price ID!**