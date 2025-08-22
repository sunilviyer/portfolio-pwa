
Financial WellBeing /
Phase 1 Handoff_ Core Portfolio Foundation.pdf
pdf

PORTFOLIO PWA - PHASE 1 IMPLEMENTATION I need to implement Phase 1 (Core Portfolio Foundation) of my Portfolio PWA project. I have a comprehensive handoff document that contains all requirements, technical specifications, and acceptance criteria. PROJECT CONTEXT: - Building a portfolio tracking PWA for multi-brokerage investment management - Current portfolio: ~$159,732, +39% return, 16 stocks across 4 brokerages - Phase 1 Goal: Eliminate manual update pain, create modern UI, automated price updates IMPLEMENTATION APPROACH: - Follow the Phase 1 handoff document as the definitive requirements source - Build incrementally with weekly milestones (Week 1-10 timeline) - Monarch app-inspired card-based design with PWA architecture - Focus on Phase 1 acceptance criteria completion HANDOFF DOCUMENT: Refer Attached PDF REQUEST: Please review the handoff document and confirm your understanding of the requirements. Then provide a detailed development plan for Week 1-2 implementation, starting with the PWA foundation and authentication system. What questions do you have about the requirements, and what's your recommended approach for beginning development?


Strategized PWA portfolio app development with comprehensive roadmap.
14s










I've thoroughly reviewed the Phase 1 handoff document. This is a comprehensive portfolio tracking PWA with ambitious goals and clear success metrics. Let me confirm my understanding and provide a detailed Week 1-2 development plan.

REQUIREMENTS UNDERSTANDING CONFIRMED ✅
Key Numbers I'm Tracking:

Portfolio Value: $159,732
Total Return: +39%
Holdings: 16 stocks across 4 brokerages
Top Performers: PLTR (+590%), NVDA (+59.6%), QQC (+19.4%)
Dividend Income: $2,554
Target: Reduce manual updates from 100% to 5%
Performance Goals: <2sec load, 99.9% uptime, 95% real-time pricing
CRITICAL CLARIFYING QUESTIONS
Before I create the detailed plan, I need clarification on several key points:

Brokerage Data Integration: Do you have API access/credentials for Wealthsimple, Desjardins, CIBC, and RBC? Or will this be manual CSV imports initially?
Financial Data API: Which financial data provider do you prefer? (Yahoo Finance, Alpha Vantage, etc.) Do you have API keys?
Current Holdings Data: Can you provide the actual current holdings data structure/format for the 16 stocks to ensure accurate calculations?
Development Environment: What's your preferred tech stack? (React, Vue, vanilla JS, etc.) Any hosting preferences?
Authentication: For the PWA, Face ID/Touch ID will need to be implemented via WebAuthn API. Is fallback to browser-based biometrics acceptable?
WEEK 1-2 DETAILED DEVELOPMENT PLAN
Week 1: PWA Foundation & Core Architecture
Days 1-2: Project Setup & PWA Shell

✅ Initialize project structure
✅ Create manifest.json with all PWA properties
✅ Set up HTTPS development environment
✅ Implement basic service worker with caching strategy
✅ Create app shell (minimal HTML/CSS/JS)
✅ Test "Add to Home Screen" functionality
Days 3-4: Authentication Framework

✅ Implement WebAuthn API for biometric authentication
✅ Create PIN backup system with secure storage
✅ Add session management (immediate lock on background)
✅ Implement failed attempt lockout (after 3 attempts)
✅ Add AES-256 encryption for local data storage
Days 5-7: Navigation Structure & UI Foundation

✅ Build side menu component (primary workflow)
✅ Create bottom tab navigation system
✅ Implement Monarch-inspired card component system
✅ Set up responsive grid layout
✅ Create basic routing between sections
✅ Add loading states and transitions
Week 2: Data Layer & Component Architecture
Days 8-9: Data Models & Storage

✅ Design portfolio data structure for 4 brokerages
✅ Implement IndexedDB storage layer
✅ Create account types (RRSP, TFSA, LIRA, RESP, Taxable)
✅ Build data validation and sanitization
✅ Add encrypted storage for sensitive data
Days 10-11: Core Components

✅ Build Dashboard hero card (Daily Performance Change)
✅ Create Top 3 Gainers card component
✅ Implement Total Portfolio Value card
✅ Build Bottom 3 Performers card
✅ Add green/red color coding system
Days 12-14: API Integration Prep & Testing

✅ Set up financial data API integration framework
✅ Implement rate limiting and error handling
✅ Create mock data for testing (using your 16 stocks)
✅ Build update scheduling system (3x daily)
✅ Add comprehensive error logging
✅ Performance testing (target <2sec load time)
RECOMMENDED TECH STACK
Frontend: React + TypeScript (for type safety with financial calculations) PWA: Workbox for service worker management Storage: IndexedDB with Dexie.js wrapper Authentication: WebAuthn API + Web Crypto API for encryption UI: Tailwind CSS (matches Monarch-style cards) API: Axios with retry logic State: Zustand (lightweight, good for financial data)

CRITICAL SUCCESS METRICS FOR WEEK 1-2
PWA Installation: App successfully installs on iOS/Android
Authentication: Face ID/Touch ID + PIN working securely
Navigation: Side menu + bottom tabs fully functional
Performance: Basic shell loads in <1 second
Security: Data encryption + session management working
Components: All 4 dashboard cards rendering with mock data
IMMEDIATE NEXT STEPS
Confirm the clarifying questions above
Provide actual portfolio data structure/sample
Choose financial data API provider
Set up development environment
Begin Week 1 implementation
Would you like me to proceed with any specific part of this plan, or do you need me to clarify any technical decisions? Also, please provide answers to the clarifying questions so I can ensure the implementation perfectly matches your requirements.





# Portfolio PWA Enhancement Handoff - Phase 1 (Data Features) ## 🔄 **TOKEN USAGE TRACKING REQUIREMENT** **CRITICAL: New chat assistant must display token usage percentage at the start of each response:** ``` **Token Usage: ~XX%** 📊 ``` Continue this visual tracking throughout the conversation. -

pasted

Look at the attached handoff. Here is the progress I have made so far. I do not want to integrate with the brokers, just use the manual updates for the portfolio items. I need to track them by brokerage though


Strategized manual portfolio tracking with brokerage-specific details
12s









Token Usage: ~15% 📊

Perfect! I understand the updated direction. You have a fully functional PWA and want to focus on manual portfolio management with brokerage tracking rather than automated price feeds. This is actually a much cleaner approach for Phase 1.

UPDATED REQUIREMENTS UNDERSTANDING ✅
What You Have Working:

✅ PWA deployed: https://portfolio-dn6rw36lt-sunil-iyers-projects.vercel.app
✅ iPhone app installed and working
✅ All 5 tabs functional
✅ $159,732 portfolio with 16 stocks
✅ Account types framework (RRSP ready)
What You Need Added:

🎯 Brokerage tracking for each holding (Wealthsimple, Desjardins, CIBC, RBC)
🎯 Manual update interface for portfolio items
🎯 Filter/group by brokerage functionality
🎯 Data persistence (localStorage or better)
REVISED DATA STRUCTURE NEEDED
Your current structure needs one key addition:

javascript
// Current structure:
{
  symbol: "PLTR",
  quantity: 50,
  currentPrice: 75.44,
  purchasePrice: 10.93,
  accountType: "RRSP",
  value: 3772.00,
  gainLoss: 3226.50,
  gainLossPercent: 590.1
}

// Enhanced structure needed:
{
  symbol: "PLTR",
  quantity: 50,
  currentPrice: 75.44,
  purchasePrice: 10.93,
  accountType: "RRSP",        // Keep existing
  brokerage: "Wealthsimple",  // NEW FIELD ⭐
  value: 3772.00,
  gainLoss: 3226.50,
  gainLossPercent: 590.1,
  lastUpdated: "2025-08-20"   // Track manual updates
}
PHASE 1 DEVELOPMENT PLAN: BROKERAGE TRACKING
Week 1: Data Structure & Brokerage Support
Day 1-2: Update Data Model

javascript
// Add brokerage field to all holdings
const BROKERAGES = [
  "Wealthsimple",
  "Desjardins", 
  "CIBC",
  "RBC"
];

// Update your existing portfolio array
const portfolioData = [
  {
    symbol: "PLTR",
    quantity: 50,
    currentPrice: 75.44,
    purchasePrice: 10.93,
    accountType: "RRSP",
    brokerage: "Wealthsimple", // Add this
    // ... rest of fields
  },
  // ... other holdings
];
Day 3-4: Manual Update Interface

javascript
// Create update form component
const UpdatePortfolioForm = () => {
  // Form to edit:
  // - Current price
  // - Quantity 
  // - Brokerage
  // - Account type
};
Day 5-7: Filtering & Grouping

javascript
// Add brokerage filters to Overview tab
const brokerageFilter = ["All", "Wealthsimple", "Desjardins", "CIBC", "RBC"];
const accountFilter = ["All", "RRSP", "TFSA", "Non-Registered"];

// Group holdings by brokerage for display
const holdingsByBrokerage = groupBy(portfolio, 'brokerage');
Week 2: Enhanced UI & Data Persistence
Day 8-10: Brokerage-Aware UI Components

Update Overview tab with brokerage grouping
Add brokerage breakdown cards to Dashboard
Show brokerage totals (value per brokerage)
Filter buttons for each brokerage
Day 11-14: Data Persistence & Polish

Add localStorage to save portfolio data
Manual update form with validation
Last updated timestamps
Error handling for manual updates
CRITICAL QUESTIONS FOR YOUR 16 STOCKS
To implement this properly, I need to know:

Current Brokerage Distribution: Which of your 16 stocks are in which brokerage?
Example:
PLTR → Wealthsimple
NVDA → CIBC  
QQC → Desjardins
etc.
Account Type Distribution: Are they all really RRSP, or do you have TFSA/Non-Registered too?
Cash Positions: You mentioned cash positions - which brokerages hold cash?
Update Frequency: How often do you want to manually update prices? Daily? Weekly?
IMMEDIATE IMPLEMENTATION STEPS
Step 1: Update Your Current Portfolio Data
I can help you modify your existing portfolio array to add brokerage fields:

javascript
// In your App.js, update the portfolioData array
const portfolioData = [
  {
    symbol: "PLTR",
    quantity: 50,
    currentPrice: 75.44,
    purchasePrice: 10.93,
    accountType: "RRSP",
    brokerage: "Wealthsimple", // You tell me which one
    value: 3772.00,
    gainLoss: 3226.50,
    gainLossPercent: 590.1
  },
  // ... rest of your 16 stocks with brokerage assignments
];
Step 2: Add Brokerage Filter UI
javascript
// Add to Overview tab
const BrokerageFilter = () => {
  const [selectedBrokerage, setSelectedBrokerage] = useState("All");
  
  return (
    <div className="flex gap-2 mb-4">
      {["All", "Wealthsimple", "Desjardins", "CIBC", "RBC"].map(brokerage => (
        <button 
          key={brokerage}
          className={`px-3 py-1 rounded ${selectedBrokerage === brokerage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedBrokerage(brokerage)}
        >
          {brokerage}
        </button>
      ))}
    </div>
  );
};
Step 3: Manual Update Form
javascript
const UpdateForm = ({ stock, onUpdate }) => {
  const [price, setPrice] = useState(stock.currentPrice);
  const [brokerage, setBrokerage] = useState(stock.brokerage);
  
  const handleSubmit = () => {
    onUpdate({
      ...stock,
      currentPrice: parseFloat(price),
      brokerage: brokerage,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };
  
  // Form UI here
};
SUCCESS METRICS FOR THIS APPROACH
✅ Each holding shows which brokerage it's in
✅ Filter holdings by brokerage (see only Wealthsimple holdings)
✅ Dashboard shows total value per brokerage
✅ Manual update form works for price changes
✅ Data persists between app refreshes
✅ Overview tab groups by brokerage
NEXT IMMEDIATE ACTION
Please provide your 16 stocks with their brokerage assignments, like:

PLTR (50 shares) → Wealthsimple
NVDA (25 shares) → CIBC
QQC (100 shares) → Desjardins
[etc for all 16]
Once I have this, I can create the updated data structure and begin implementing the brokerage tracking functionality. Should we start with updating your portfolio data structure?




All 16 are with WealthSimple and in RRSP for now. I will provide the rest of the details incrementally. But please ask each question 1 by 1.


Strategized portfolio tracking approach with incremental information gathering.




Token Usage: ~25% 📊

Perfect! All 16 stocks with Wealthsimple and RRSP - that makes the initial implementation much cleaner.

QUESTION 1: Current Portfolio Structure
To implement the brokerage tracking and manual update system properly, I need to see your current portfolio data structure.

Can you share the current 16 stock holdings from your working PWA?

Specifically, I need to see:

The exact symbols (PLTR, NVDA, QQC, etc.)
Current quantities
Current prices you have hardcoded
Purchase prices
This could be:

Copy/paste from your App.js file (the portfolioData array), OR
Screenshot of your Overview tab, OR
List them out symbol by symbol
I need this to update your data structure to add the brokerage: "Wealthsimple" field to each holding and ensure the manual update interface works with your real data.

Which way would be easiest for you to share this information?





import React, { useState } from 'react'; import { BarChart3, TrendingUp, List, PieChart, DollarSign, RefreshCw, ArrowLeft } from 'lucide-react'; import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts'; const PortfolioApp = () => { // Initial portfolio data

pasted


Mapped portfolio details and added Wealthsimple brokerage field.






Token Usage: ~35% 📊

Perfect! I can see your complete current portfolio structure. You have 16 stocks with a detailed data model, and I can see the exact symbols and values.

CURRENT PORTFOLIO ANALYSIS ✅
Your 16 Holdings:

USD Stocks (10): PLTR, NVDA, GOOGL, XLV, PM, TLT, CMG, TNXP, IEF, XLU
CAD Stocks (6): XDIV, XID, ENB, QQC, XEG, RS
Cash: $23,432.13 USD + $48.02 CAD
Total Portfolio: ~$159,732 USD
Biggest Holdings:

GOOGL: $20,479.73 USD
NVDA: $18,227.00 USD
PLTR: $17,197.00 USD
QUESTION 2: Data Structure Update
I need to add the brokerage field to your existing data structure. Since all 16 are with Wealthsimple, I'll update your portfolio data to include:

javascript
// Current structure (what you have):
{
  symbol: 'PLTR',
  currency: 'USD',
  originalShares: 100.00,
  currentShares: 100.00,
  // ... all existing fields
  accountType: 'RRSP',
  purchaseDate: '2025-01-01'
}

// Enhanced structure (what we need):
{
  symbol: 'PLTR',
  currency: 'USD',
  originalShares: 100.00,
  currentShares: 100.00,
  // ... all existing fields
  accountType: 'RRSP',
  brokerage: 'Wealthsimple',  // NEW FIELD ⭐
  purchaseDate: '2025-01-01'
}
Should I proceed to update your portfolioData array to add brokerage: 'Wealthsimple' to all 16 stocks?

This will be a simple addition that won't break any existing functionality, but will enable the brokerage tracking features we need to build next.

Is this the right approach, or do you want me to ask about something else first?




also add the last update date. For e.g. I updated the prices for all of these today. Not sure where it is sitting my the updated prices show up in UI.


Strategized adding brokerage field and tracking update timestamp.




Token Usage: ~40% 📊

Excellent idea! Adding lastUpdated is crucial for tracking data freshness and building user confidence in the portfolio accuracy.

ENHANCED DATA STRUCTURE
I'll add both fields to your portfolio data:

javascript
// Enhanced structure with both new fields:
{
  symbol: 'PLTR',
  currency: 'USD',
  originalShares: 100.00,
  currentShares: 100.00,
  originalPrice: 24.92,
  currentPrice: 171.97,        // You updated this today
  // ... all existing fields
  accountType: 'RRSP',
  brokerage: 'Wealthsimple',   // NEW FIELD 1 ⭐
  lastUpdated: '2025-08-20',   // NEW FIELD 2 ⭐
  purchaseDate: '2025-01-01'
}
QUESTION 2: Last Update Date
Since you mentioned you updated all the prices today, what date should I use for the lastUpdated field?

Options:

Today (August 20, 2025) - if you updated them today
Different date - if you actually updated them on a different day
Mixed dates - if some stocks were updated on different days
What date should I set as the lastUpdated value for all 16 stocks?

Once you confirm the date, I'll:

Update your entire portfolioData array with both new fields
Show you exactly what the updated structure looks like
Then we can move to implementing the UI features to display this information
This will enable us to show "Last updated: Aug 20, 2025" in the interface and track update history properly.




today


Strategized updating stock portfolio with current date.



Token Usage: ~45% 📊

Perfect! I'll update your portfolio data structure to add both fields with today's date (2025-08-20) for all 16 stocks.


Updated Portfolio Data with Brokerage & Last Updated
Code 

Engineered portfolio data structure with brokerage tracking.


DATA STRUCTURE UPDATED ✅
Perfect! I've updated your portfolio data structure with both new fields:

Added to ALL 16 stocks:

✅ brokerage: 'Wealthsimple'
✅ lastUpdated: '2025-08-20' (today)
QUESTION 3: UI Display Priority
Now that we have the enhanced data structure, which UI feature should we implement first to show this information?

Option 1: Last Updated Indicator

Add "Last updated: Aug 20, 2025" to the header or overview cards
Show individual stock update timestamps
Visual indicator for data freshness
Option 2: Brokerage Display & Filtering

Show "Wealthsimple" in the stock cards
Add brokerage filter buttons in Overview tab
Group holdings by brokerage (useful when you add more brokerages later)
Option 3: Enhanced Update Form

Update the existing "Update Price" functionality to automatically set lastUpdated
Show when each stock was last updated in the update form
Track update history
Which of these would give you the most immediate value when you deploy the update to your PWA?

Or would you prefer a different approach to start with?




Option 2


Strategized brokerage display and filtering for stock tracking.




Token Usage: ~50% 📊

Excellent choice! Brokerage Display & Filtering will provide immediate visual value and prepare your system for future multi-brokerage support.

IMPLEMENTATION PLAN: BROKERAGE FEATURES
I'll enhance your Overview tab with:

✅ Brokerage display in each stock card
✅ Filter buttons to filter by brokerage
✅ Group by brokerage option
✅ Brokerage summary stats

Enhanced Overview Tab with Brokerage Features
Code 

Engineered enhanced overview tab with comprehensive brokerage features.



BROKERAGE FEATURES IMPLEMENTED ✅
I've created an enhanced Overview tab with comprehensive brokerage functionality:

🎯 NEW FEATURES ADDED:
1. Brokerage Display

✅ Each stock card shows "📱 Wealthsimple"
✅ Last updated date visible on each card
✅ Purchase date for reference
2. Smart Filtering System

✅ Brokerage filters: "All (16)" and "📱 Wealthsimple (16)"
✅ Account filters: All, RRSP, TFSA, Non-Registered
✅ Combined filtering: Filter by both brokerage AND account simultaneously
3. Flexible Display Options

✅ Sort by: Symbol, Value, Performance, Brokerage
✅ Group toggle: List view vs. Grouped by brokerage
✅ Filter summary: "Showing X of Y holdings"
4. Grouped Brokerage View

✅ Brokerage headers with total value and gain/loss
✅ Stock count per brokerage
✅ Visual grouping with colored sections
QUESTION 4: Integration
To implement this in your working PWA, I need to replace your existing OverviewTab function with this enhanced version.

Should I provide:

Option A: Complete replacement instructions - Step-by-step guide to update your App.js file

Option B: Updated full App.js file - Your entire component with the enhanced Overview tab integrated

Option C: Test it first - You copy the enhanced Overview component and test it locally before we proceed

Which approach would you prefer to get this brokerage functionality into your live PWA?




B


Strategized seamless integration of enhanced OverviewTab component.


Token Usage: ~55% 📊

Perfect! I'll provide your complete updated App.js file with the enhanced Overview tab and updated portfolio data structure.


Complete Updated App.js with Brokerage Features
Code 

Engineered comprehensive brokerage features for stock management app.


COMPLETE UPDATED APP.JS FILE ✅
Perfect! I've created your complete updated App.js file with all the brokerage features integrated.

🎯 WHAT'S NEW IN THIS VERSION:
✅ Data Structure Enhanced:

All 16 stocks now have brokerage: 'Wealthsimple'
All 16 stocks now have lastUpdated: '2025-08-20'
✅ Enhanced Overview Tab:

Brokerage filters: "All (16)" and "📱 Wealthsimple (16)"
Account filters: All, RRSP, TFSA, Non-Registered
Smart sorting: Symbol, Value, Performance, Brokerage
Group toggle: List view vs. Grouped by brokerage
Visual enhancements: Brokerage icons, last updated dates
Filter summary: Shows filtered count
✅ Update Form Enhanced:

Price updates now automatically set lastUpdated to today
New stocks automatically get assigned to Wealthsimple
✅ All Other Features Preserved:

Performance, Sector, Dividend tabs unchanged
All existing functionality intact
Mobile-first design maintained
DEPLOYMENT INSTRUCTIONS
Replace your current App.js with this complete updated version
Save the file (Vercel will auto-deploy)
Test on your PWA: https://portfolio-dn6rw36lt-sunil-iyers-projects.vercel.app
Refresh your iPhone app to see the new features
QUESTION 5: Next Steps
The brokerage features are now ready!

Should we:

Option A: Test the deployment - You update the file and we verify everything works correctly

Option B: Add more brokerages - Start adding some holdings to other brokerages (Desjardins, CIBC, RBC) to test the filtering

Option C: Focus on UI polish - Enhance the visual design or add more features to the brokerage interface

Which direction would you like to go next?




Vercel does not auto deploy what am I doing wrong?


Investigated Vercel deployment issues and potential workflow problems.



Token Usage: ~65% 📊

Great question! The auto-deploy issue suggests your workflow might be set up differently. Let me help you troubleshoot.

VERCEL DEPLOYMENT TROUBLESHOOTING
QUESTION: What's Your Current Workflow?
Option 1: GitHub Auto-Deploy (Recommended)

Code saved to GitHub → Vercel automatically deploys
This requires GitHub integration to be set up
Option 2: Manual Deploy (What you mentioned earlier)

You run npx vercel --prod manually each time
This is what you used before: "Vercel CLI: Deployed successfully with npx vercel --prod"
CURRENT ISSUE DIAGNOSIS
Since you mentioned auto-deploy isn't working, you're likely using manual deployment. Here's how to fix both approaches:

IMMEDIATE SOLUTION (Manual Deploy)
If you want to deploy the updated code right now:

Save your updated App.js file with the new brokerage features
Open terminal in your portfolio project folder
Run the manual deploy command:
bash
npx vercel --prod
Vercel will give you the URL - should be the same one you've been using
BETTER SOLUTION (Set Up Auto-Deploy)
To get automatic deployments working:

Step 1: Check GitHub Connection
Go to Vercel Dashboard
Look for your portfolio project
Check if it shows "Connected to GitHub" or just shows manual deployments
Step 2A: If Connected to GitHub
Save your App.js file locally
Push to GitHub:
bash
git add .
git commit -m "Add brokerage features"
git push origin main
Vercel should auto-deploy within 1-2 minutes
Step 2B: If NOT Connected to GitHub
In Vercel dashboard, click your project
Go to Settings → Git Integration
Connect to your GitHub repository
Future saves + pushes will auto-deploy
QUESTION 6: Your Current Setup
Which scenario matches your current setup?

A) "I have this connected to GitHub" → We'll set up auto-deploy B) "I've been using npx vercel --prod each time" → We'll do manual deploy now C) "I don't have this in GitHub yet" → We'll set up the full workflow

Please let me know which option describes your situation, and I'll provide the exact steps to get your brokerage features deployed!




I will let you know but meanwhile the values are hardcoded in the app.js, this causes and issue when I update the data on my phone and everytime I redeploy the data gets overwritten with initial value. Is there a way I can avoid that?


Devised localStorage strategy to preserve portfolio data persistently





Token Usage: ~70% 📊

EXCELLENT CATCH! 🎯 You've identified a critical flaw in the current architecture. Yes, hardcoded values will always overwrite your real data on every deployment. This is a major problem for a portfolio tracking app.

THE PROBLEM EXPLAINED
javascript
// Current code (PROBLEMATIC):
const [portfolioData, setPortfolioData] = useState([
  { symbol: 'PLTR', currentPrice: 171.97, ... }, // Hardcoded values
  // ... more hardcoded data
]);

// What happens:
// 1. You update PLTR price to $180 on your phone ✅
// 2. You redeploy the app ❌
// 3. App reloads with hardcoded $171.97 - your update is LOST!
SOLUTION: LOCAL STORAGE PERSISTENCE
We need to save your data to localStorage so it survives deployments and app refreshes.


Portfolio Data with localStorage Persistence
Code 

Devised comprehensive localStorage solution for persistent app data.



WHAT THIS SOLUTION PROVIDES ✅
✅ Persistent Data: Your updates survive deployments and app refreshes ✅ Automatic Saving: Every price update, new stock, dividend gets saved instantly
✅ Backup/Restore: Export your data as JSON file for safety ✅ Reset Option: Can restore initial data if needed ✅ Error Handling: Won't crash if localStorage fails

HOW IT WORKS:
First Time: Uses your hardcoded initial data
After Updates: Saves all changes to localStorage
After Deployment: Loads your real data from localStorage (not hardcoded!)
Manual Backup: Export JSON file to save externally
IMPLEMENTATION OPTIONS
Option A: Full Integration - I provide your complete App.js with localStorage integrated

Option B: Step-by-Step - I guide you through updating specific functions one by one

Option C: Test First - You try the localStorage pattern on just one function (like price updates) to verify it works

QUESTION 7: Implementation Preference
Which approach would you prefer?

Also, are you comfortable with localStorage, or would you prefer I explain how it works first?

localStorage keeps data in your browser/PWA even when you close and reopen the app, and survives deployments - but each device stores its own data (so your phone and computer would have separate portfolios).




Yes, let us do that. I will deploy it on my phone once its fully tested on the mac so you can use the mac's local storage


Strategized localStorage integration for comprehensive app persistence




Token Usage: ~75% 📊

Perfect strategy! Test on Mac → Deploy to phone is the smart approach. Let me provide the complete App.js with full localStorage integration.


Complete App.js with localStorage Persistence
Code 

Engineered persistent localStorage solution for portfolio tracking app.



COMPLETE LOCALSTORAGE SOLUTION ✅
Perfect! I've created your complete App.js with full localStorage persistence. Here's what's been implemented:

🎯 PERSISTENCE FEATURES ADDED:
✅ Automatic Data Persistence

Every price update, new stock, dividend gets saved instantly
Data survives deployments, app refreshes, and browser restarts
First time loads hardcoded data, then uses your real data
✅ Smart Data Management

updatePortfolioData() - saves portfolio changes to localStorage
updateCashPositions() - saves cash changes to localStorage
Console logging shows save/load activity for debugging
✅ Backup & Restore System

Export Backup: Downloads JSON file with all your data
Import Backup: Upload JSON file to restore data
Reset to Initial: Restore original hardcoded values
Clear All Data: Nuclear option to delete everything
✅ Enhanced Update Tab

New "💾 Data Management" radio option
Shows current storage stats (16 stocks, 2 cash positions, etc.)
Explains how persistence works
🔧 HOW TO TEST ON MAC:
Replace your App.js with this complete version
Open in browser (not deployed yet)
Test localStorage:
Update a stock price (e.g., PLTR to $180)
Refresh the page - should show $180, not $171.97
Check browser console for "✅ Saved portfolioData" messages
🧪 VERIFICATION STEPS:
bash
# 1. Test localStorage persistence
# - Update PLTR price to $180
# - Refresh browser
# - Should still show $180 (not hardcoded $171.97)

# 2. Test backup system  
# - Go to Update tab → Data Management
# - Click "📤 Export Backup" 
# - Should download JSON file

# 3. Test console logging
# - Open browser Developer Tools → Console
# - Should see "✅ Loaded portfolioData from localStorage: 16"
QUESTION 8: Testing Approach
What would you like to test first on your Mac?

Option A: Quick Test - Just update one stock price and refresh to verify persistence works

Option B: Full Test - Test all the features (add stock, dividend, export backup, etc.)

Option C: Deploy Ready - Skip testing and deploy directly to your live URL for phone testing

Which approach would you prefer? I recommend Option A first to verify the core localStorage functionality works before deploying to your phone.




No I want to keep testing in Mac until all the functionality is developed.


Acknowledging user's preference for Mac testing approach



Token Usage: ~80% 📊

**EXCELL





import React, { useState } from 'react';
import { BarChart3, TrendingUp, List, PieChart, DollarSign, RefreshCw, ArrowLeft } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';

const PortfolioApp = () => {
  // Initial hardcoded data (used ONLY if no localStorage data exists)
  const INITIAL_PORTFOLIO_DATA = [
    {
      symbol: 'PLTR',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 24.92,
      currentPrice: 171.97,
      originalInvestment: 2492.00,
      currentValue: 17197.00,
      gainLoss: 14705.00,
      dividendReceived: 0.00,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'NVDA',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 114.17,
      currentPrice: 182.27,
      originalInvestment: 11417.00,
      currentValue: 18227.00,
      gainLoss: 6810.00,
      dividendReceived: 0.00,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'GOOGL',
      currency: 'USD',
      originalShares: 99.86,
      currentShares: 100.46,
      originalPrice: 185.89,
      currentPrice: 203.82,
      originalInvestment: 18556.33,
      currentValue: 20479.73,
      gainLoss: 1787.30,
      dividendReceived: 136.10,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XLV',
      currency: 'USD',
      originalShares: 85.00,
      currentShares: 85.00,
      originalPrice: 136.40,
      currentPrice: 136.80,
      originalInvestment: 11594.00,
      currentValue: 11628.00,
      gainLoss: 34.00,
      dividendReceived: 0.00,
      sector: 'Healthcare',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'PM',
      currency: 'USD',
      originalShares: 18.00,
      currentShares: 18.00,
      originalPrice: 166.25,
      currentPrice: 166.45,
      originalInvestment: 2992.50,
      currentValue: 2996.10,
      gainLoss: 3.60,
      dividendReceived: 0.00,
      sector: 'Consumer Staples',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'TLT',
      currency: 'USD',
      originalShares: 120.00,
      currentShares: 120.00,
      originalPrice: 86.40,
      currentPrice: 86.48,
      originalInvestment: 10368.00,
      currentValue: 10377.60,
      gainLoss: 9.60,
      dividendReceived: 0.00,
      sector: 'Bonds',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'CMG',
      currency: 'USD',
      originalShares: 120.00,
      currentShares: 120.00,
      originalPrice: 62.48,
      currentPrice: 43.66,
      originalInvestment: 7497.60,
      currentValue: 5239.20,
      gainLoss: -2258.40,
      dividendReceived: 0.00,
      sector: 'Consumer Discretionary',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'TNXP',
      currency: 'USD',
      originalShares: 16.00,
      currentShares: 16.00,
      originalPrice: 53.51,
      currentPrice: 44.40,
      originalInvestment: 856.16,
      currentValue: 710.40,
      gainLoss: -145.76,
      dividendReceived: 0.00,
      sector: 'Healthcare',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'IEF',
      currency: 'USD',
      originalShares: 121.00,
      currentShares: 121.00,
      originalPrice: 95.20,
      currentPrice: 95.20,
      originalInvestment: 11519.20,
      currentValue: 11519.20,
      gainLoss: 0.00,
      dividendReceived: 0.00,
      sector: 'Bonds',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XLU',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 85.50,
      currentPrice: 85.50,
      originalInvestment: 8550.00,
      currentValue: 8550.00,
      gainLoss: 0.00,
      dividendReceived: 0.00,
      sector: 'Utilities',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XDIV',
      currency: 'CAD',
      originalShares: 76.31,
      currentShares: 82.48,
      originalPrice: 26.72,
      currentPrice: 32.69,
      originalInvestment: 2039.05,
      currentValue: 2696.30,
      gainLoss: 455.70,
      dividendReceived: 201.55,
      sector: 'Diversified',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XID',
      currency: 'CAD',
      originalShares: 23.93,
      currentShares: 25.94,
      originalPrice: 56.60,
      currentPrice: 54.93,
      originalInvestment: 1354.45,
      currentValue: 1424.89,
      gainLoss: -40.60,
      dividendReceived: 111.04,
      sector: 'International',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'ENB',
      currency: 'CAD',
      originalShares: 164.00,
      currentShares: 164.00,
      originalPrice: 64.87,
      currentPrice: 64.65,
      originalInvestment: 10638.68,
      currentValue: 10602.60,
      gainLoss: -36.08,
      dividendReceived: 0.00,
      sector: 'Energy',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'QQC',
      currency: 'CAD',
      originalShares: 307.32,
      currentShares: 256.09,
      originalPrice: 32.57,
      currentPrice: 38.84,
      originalInvestment: 10013.42,
      currentValue: 9946.42,
      gainLoss: 1944.70,
      dividendReceived: 1900.30,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XEG',
      currency: 'CAD',
      originalShares: 550.06,
      currentShares: 580.77,
      originalPrice: 18.55,
      currentPrice: 17.00,
      originalInvestment: 10203.20,
      currentValue: 9873.09,
      gainLoss: -934.62,
      dividendReceived: 603.51,
      sector: 'Energy',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'RS',
      currency: 'CAD',
      originalShares: 468.76,
      currentShares: 514.14,
      originalPrice: 10.68,
      currentPrice: 9.93,
      originalInvestment: 5005.60,
      currentValue: 5105.53,
      gainLoss: -351.33,
      dividendReceived: 451.26,
      sector: 'Real Estate',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    }
  ];

  const INITIAL_CASH_POSITIONS = [
    { currency: 'USD', amount: 23432.13, dateAdded: '2025-01-01' },
    { currency: 'CAD', amount: 48.02, dateAdded: '2025-01-01' }
  ];

  // Helper functions for localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`✅ Saved ${key} to localStorage:`, data.length || Object.keys(data).length);
    } catch (error) {
      console.error(`❌ Failed to save ${key}:`, error);
    }
  };

  const loadFromLocalStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        console.log(`✅ Loaded ${key} from localStorage:`, parsed.length || Object.keys(parsed).length);
        return parsed;
      }
    } catch (error) {
      console.error(`❌ Failed to load ${key}:`, error);
    }
    console.log(`📁 Using initial ${key} data`);
    return fallback;
  };

  // Load data from localStorage or use initial data
  const [portfolioData, setPortfolioData] = useState(() => 
    loadFromLocalStorage('portfolioData', INITIAL_PORTFOLIO_DATA)
  );
  
  const [cashPositions, setCashPositions] = useState(() => 
    loadFromLocalStorage('cashPositions', INITIAL_CASH_POSITIONS)
  );

  const [activeTab, setActiveTab] = useState('performance');
  const [selectedSector, setSelectedSector] = useState(null);

  // Form states for adding new investments
  const [newStockForm, setNewStockForm] = useState({
    symbol: '',
    currency: 'USD',
    shares: '',
    price: '',
    sector: '',
    accountType: 'RRSP',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const [newCashForm, setNewCashForm] = useState({
    currency: 'USD',
    amount: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Conversion rate for display purposes (approximate)
  const CAD_TO_USD_RATE = 0.74;

  // Available sectors for dropdown
  const SECTORS = [
    'Technology', 'Healthcare', 'Energy', 'Financials', 'Consumer Discretionary',
    'Consumer Staples', 'Real Estate', 'Utilities', 'Bonds', 'International', 'Diversified'
  ];

  // Available account types for dropdown
  const ACCOUNT_TYPES = [
    'RRSP', 'TFSA', 'Non-Registered'
  ];

  // Updated data management functions that save to localStorage
  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    saveToLocalStorage('portfolioData', newData);
  };

  const updateCashPositions = (newCash) => {
    setCashPositions(newCash);
    saveToLocalStorage('cashPositions', newCash);
  };

  // Data management functions
  const exportPortfolioData = () => {
    const exportData = {
      portfolioData,
      cashPositions,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Portfolio backup downloaded!');
  };

  const importPortfolioData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (importData.portfolioData && importData.cashPositions) {
          updatePortfolioData(importData.portfolioData);
          updateCashPositions(importData.cashPositions);
          alert('✅ Portfolio data imported successfully!');
        } else {
          alert('❌ Invalid backup file format');
        }
      } catch (error) {
        alert('❌ Failed to import data: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  const resetToInitialData = () => {
    if (confirm('⚠️ This will reset all your portfolio data to initial values. Are you sure?')) {
      updatePortfolioData(INITIAL_PORTFOLIO_DATA);
      updateCashPositions(INITIAL_CASH_POSITIONS);
      alert('🔄 Portfolio reset to initial data');
    }
  };

  const clearAllData = () => {
    if (confirm('⚠️ This will delete ALL portfolio data permanently. Are you sure?')) {
      if (confirm('🚨 FINAL WARNING: This cannot be undone. Continue?')) {
        localStorage.removeItem('portfolioData');
        localStorage.removeItem('cashPositions');
        updatePortfolioData([]);
        updateCashPositions([]);
        alert('🗑️ All data cleared');
      }
    }
  };

  // Calculate total portfolio metrics
  const calculatePortfolioMetrics = () => {
    let totalOriginalUSD = 0;
    let totalCurrentUSD = 0;
    let totalDividendsUSD = 0;

    portfolioData.forEach(stock => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      totalOriginalUSD += stock.originalInvestment * conversionRate;
      totalCurrentUSD += stock.currentValue * conversionRate;
      totalDividendsUSD += stock.dividendReceived * conversionRate;
    });

    // Add cash positions
    cashPositions.forEach(cash => {
      const conversionRate = cash.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      totalCurrentUSD += cash.amount * conversionRate;
    });

    const totalReturn = totalCurrentUSD - totalOriginalUSD;
    const returnPercentage = (totalReturn / totalOriginalUSD) * 100;

    return {
      totalOriginalUSD,
      totalCurrentUSD,
      totalDividendsUSD,
      totalReturn,
      returnPercentage
    };
  };

  const metrics = calculatePortfolioMetrics();

  // Performance Tab Component
  const PerformanceTab = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Portfolio Performance</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Original Investment</h3>
          <p className="text-2xl font-bold text-blue-900">
            ${metrics.totalOriginalUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Current Value</h3>
          <p className="text-2xl font-bold text-green-900">
            ${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${metrics.totalReturn >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className={`font-semibold ${metrics.totalReturn >= 0 ? 'text-green-800' : 'text-red-800'}`}>
            Total Return
          </h3>
          <p className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-900' : 'text-red-900'}`}>
            ${metrics.totalReturn.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
          <p className={`text-sm ${metrics.totalReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ({metrics.returnPercentage.toFixed(1)}%)
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Dividends Received</h3>
          <p className="text-2xl font-bold text-purple-900">
            ${metrics.totalDividendsUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Top Performers</h3>
        {portfolioData
          .sort((a, b) => b.gainLoss - a.gainLoss)
          .slice(0, 3)
          .map((stock, index) => {
            const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
            const gainLossUSD = stock.gainLoss * conversionRate;
            const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;
            
            return (
              <div key={stock.symbol} className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">{stock.symbol}</span>
                <div className="text-right">
                  <span className={`font-bold ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                  </span>
                  <div className={`text-sm ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ({returnPct.toFixed(1)}%)
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );

  // ENHANCED OVERVIEW TAB WITH BROKERAGE FEATURES
  const OverviewTab = () => {
    const [brokerageFilter, setBrokerageFilter] = useState('All');
    const [accountFilter, setAccountFilter] = useState('All');
    const [groupByBrokerage, setGroupByBrokerage] = useState(false);
    const [sortBy, setSortBy] = useState('symbol'); // 'symbol', 'value', 'performance', 'brokerage'

    // Get unique brokerages and account types from portfolio data
    const uniqueBrokerages = [...new Set(portfolioData.map(stock => stock.brokerage))];
    const uniqueAccountTypes = [...new Set(portfolioData.map(stock => stock.accountType))];

    // Filter portfolio data based on selected filters
    const filteredData = portfolioData.filter(stock => {
      const brokerageMatch = brokerageFilter === 'All' || stock.brokerage === brokerageFilter;
      const accountMatch = accountFilter === 'All' || stock.accountType === accountFilter;
      return brokerageMatch && accountMatch;
    });

    // Sort filtered data
    const sortedData = [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol);
        case 'value':
          const aValueUSD = a.currentValue * (a.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          const bValueUSD = b.currentValue * (b.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          return bValueUSD - aValueUSD; // Highest to lowest
        case 'performance':
          const aReturn = (a.gainLoss / a.originalInvestment) * 100;
          const bReturn = (b.gainLoss / b.originalInvestment) * 100;
          return bReturn - aReturn; // Best to worst
        case 'brokerage':
          return a.brokerage.localeCompare(b.brokerage);
        default:
          return 0;
      }
    });

    // Group data by brokerage if enabled
    const groupedData = groupByBrokerage 
      ? sortedData.reduce((acc, stock) => {
          if (!acc[stock.brokerage]) {
            acc[stock.brokerage] = [];
          }
          acc[stock.brokerage].push(stock);
          return acc;
        }, {})
      : null;

    // Calculate brokerage statistics
    const calculateBrokerageStats = (stocks) => {
      const totalValueUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.currentValue * conversionRate);
      }, 0);

      const totalGainLossUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.gainLoss * conversionRate);
      }, 0);

      return {
        totalValueUSD,
        totalGainLossUSD,
        stockCount: stocks.length
      };
    };

    // Individual Stock Card Component
    const StockCard = ({ stock }) => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      const currentValueUSD = stock.currentValue * conversionRate;
      const gainLossUSD = stock.gainLoss * conversionRate;
      const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;

      return (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{stock.symbol}</h3>
              <p className="text-sm text-gray-600">
                {stock.sector} • {stock.accountType}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                📱 {stock.brokerage}
              </p>
              <p className="text-sm">
                {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${currentValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
              <p className={`text-sm font-medium ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gainLossUSD >= 0 ? '+' : ''}${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
              </p>
              <p className={`text-xs ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({returnPct.toFixed(1)}%)
              </p>
            </div>
          </div>
          
          {/* Last Updated Info */}
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span>Updated: {stock.lastUpdated}</span>
            <span>Purchased: {stock.purchaseDate}</span>
          </div>
        </div>
      );
    };

    // Brokerage Group Component
    const BrokerageGroup = ({ brokerage, stocks }) => {
      const stats = calculateBrokerageStats(stocks);
      
      return (
        <div className="mb-6">
          {/* Brokerage Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-t-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-blue-800">📱 {brokerage}</h3>
                <p className="text-sm text-blue-600">{stats.stockCount} holdings</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-blue-800">
                  ${stats.totalValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                </p>
                <p className={`text-sm font-medium ${stats.totalGainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.totalGainLossUSD >= 0 ? '+' : ''}${stats.totalGainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                </p>
              </div>
            </div>
          </div>
          
          {/* Stocks in this brokerage */}
          <div className="space-y-3 border-l border-r border-b border-blue-200 rounded-b-lg p-4 bg-white">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Investment Overview</h2>
        
        {/* Filter and Control Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          {/* Brokerage Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Brokerage:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBrokerageFilter('All')}
                className={`px-3 py-1 rounded text-sm ${
                  brokerageFilter === 'All' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                All ({portfolioData.length})
              </button>
              {uniqueBrokerages.map(brokerage => {
                const count = portfolioData.filter(stock => stock.brokerage === brokerage).length;
                return (
                  <button
                    key={brokerage}
                    onClick={() => setBrokerageFilter(brokerage)}
                    className={`px-3 py-1 rounded text-sm ${
                      brokerageFilter === brokerage 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-700 border'
                    }`}
                  >
                    📱 {brokerage} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Account:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAccountFilter('All')}
                className={`px-3 py-1 rounded text-sm ${
                  accountFilter === 'All' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                All
              </button>
              {uniqueAccountTypes.map(accountType => (
                <button
                  key={accountType}
                  onClick={() => setAccountFilter(accountType)}
                  className={`px-3 py-1 rounded text-sm ${
                    accountFilter === accountType 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-700 border'
                  }`}
                >
                  {accountType}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Group Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="symbol">Symbol (A-Z)</option>
                <option value="value">Value (High-Low)</option>
                <option value="performance">Performance (Best-Worst)</option>
                <option value="brokerage">Brokerage (A-Z)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Display:</label>
              <button
                onClick={() => setGroupByBrokerage(!groupByBrokerage)}
                className={`w-full p-2 rounded text-sm ${
                  groupByBrokerage 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                {groupByBrokerage ? '📱 Grouped' : '📋 List View'}
              </button>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredData.length} of {portfolioData.length} holdings
            {brokerageFilter !== 'All' && ` • ${brokerageFilter}`}
            {accountFilter !== 'All' && ` • ${accountFilter}`}
          </div>
        </div>

        {/* Holdings Display */}
        <div className="space-y-3">
          {groupByBrokerage ? (
            // Grouped by Brokerage View
            Object.entries(groupedData).map(([brokerage, stocks]) => (
              <BrokerageGroup 
                key={brokerage} 
                brokerage={brokerage} 
                stocks={stocks} 
              />
            ))
          ) : (
            // Standard List View
            sortedData.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))
          )}
          
          {/* Cash Positions (always show at bottom) */}
          {cashPositions.length > 0 && (
            <div className="bg-gray-100 border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">💰 Cash Positions</h3>
              {cashPositions.map((cash) => (
                <div key={cash.currency} className="flex justify-between">
                  <span>{cash.currency} Cash</span>
                  <span className="font-medium">{cash.currency} ${cash.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Sector Breakdown Tab Component with Interactive Pie Chart
  const SectorBreakdownTab = () => {
    const sectorData = portfolioData.reduce((acc, stock) => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      const valueUSD = stock.currentValue * conversionRate;
      
      if (!acc[stock.sector]) {
        acc[stock.sector] = {
          value: 0,
          stocks: [],
          count: 0
        };
      }
      
      acc[stock.sector].value += valueUSD;
      acc[stock.sector].stocks.push(stock);
      acc[stock.sector].count += 1;
      
      return acc;
    }, {});

    const totalPortfolioValue = Object.values(sectorData).reduce((sum, sector) => sum + sector.value, 0);

    // Prepare data for pie chart
    const pieChartData = Object.entries(sectorData).map(([sector, data], index) => ({
      name: sector,
      value: data.value,
      percentage: (data.value / totalPortfolioValue) * 100,
      count: data.count,
      stocks: data.stocks
    })).sort((a, b) => b.value - a.value);

    // Color palette for sectors
    const SECTOR_COLORS = [
      '#2563eb', // Blue
      '#dc2626', // Red  
      '#16a34a', // Green
      '#ca8a04', // Yellow
      '#9333ea', // Purple
      '#ea580c', // Orange
      '#0891b2', // Cyan
      '#be185d', // Pink
      '#65a30d', // Lime
      '#7c3aed'  // Violet
    ];

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-white p-3 border rounded-lg shadow-lg">
            <p className="font-semibold">{data.name}</p>
            <p className="text-sm">Value: ${data.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            <p className="text-sm">Percentage: {data.percentage.toFixed(1)}%</p>
            <p className="text-sm">Holdings: {data.count}</p>
          </div>
        );
      }
      return null;
    };

    // Handle sector click for drill-down
    const handleSectorClick = (sector) => {
      setSelectedSector(sector);
    };

    // Reset to main view
    const handleBackToMain = () => {
      setSelectedSector(null);
    };

    // Main pie chart view
    if (!selectedSector) {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center mb-6">Sector Breakdown</h2>
          
          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  onClick={(data) => handleSectorClick(data)}
                  className="cursor-pointer"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={SECTOR_COLORS[index % SECTOR_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <p className="text-center text-sm text-gray-600 mt-2">
              Tap any sector to see individual holdings
            </p>
          </div>

          {/* Sector Summary List */}
          <div className="space-y-3">
            {pieChartData.map((sector, index) => (
              <div 
                key={sector.name} 
                className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSectorClick(sector)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: SECTOR_COLORS[index % SECTOR_COLORS.length] }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-lg">{sector.name}</h3>
                      <p className="text-sm text-gray-600">{sector.count} holdings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${sector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
                    <p className="text-sm text-gray-600">({sector.percentage.toFixed(1)}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Drill-down view for selected sector
    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToMain}
            className="mr-3 p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold">{selectedSector.name}</h2>
            <p className="text-sm text-gray-600">
              ${selectedSector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD 
              ({selectedSector.percentage.toFixed(1)}% of portfolio)
            </p>
          </div>
        </div>

        {/* Individual Holdings in Selected Sector */}
        <div className="space-y-3">
          {selectedSector.stocks
            .sort((a, b) => {
              const aValue = a.currentValue * (a.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
              const bValue = b.currentValue * (b.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
              return bValue - aValue;
            })
            .map((stock) => {
              const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
              const currentValueUSD = stock.currentValue * conversionRate;
              const gainLossUSD = stock.gainLoss * conversionRate;
              const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;
              const sectorAllocation = (currentValueUSD / selectedSector.value) * 100;
              
              return (
                <div key={stock.symbol} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">
                        {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {sectorAllocation.toFixed(1)}% of {selectedSector.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${currentValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
                      <p className={`text-sm font-medium ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gainLossUSD >= 0 ? '+' : ''}${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                      </p>
                      <p className={`text-xs ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ({returnPct.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  
                  {/* Individual stock allocation bar within sector */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${sectorAllocation}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Sector Summary at Bottom */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold mb-2">Sector Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-bold">${selectedSector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            </div>
            <div>
              <p className="text-gray-600">Portfolio Weight</p>
              <p className="font-bold">{selectedSector.percentage.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-600">Number of Holdings</p>
              <p className="font-bold">{selectedSector.count}</p>
            </div>
            <div>
              <p className="text-gray-600">Average Holding</p>
              <p className="font-bold">${(selectedSector.value / selectedSector.count).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dividend Tab Component
  const DividendTab = () => {
    const [dividendForm, setDividendForm] = useState({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      currency: 'USD'
    });

    const handleAddDividend = () => {
      if (!dividendForm.symbol || !dividendForm.dividendAmount) return;
      
      const updatedData = portfolioData.map(stock => {
        if (stock.symbol === dividendForm.symbol) {
          const newDividendAmount = parseFloat(dividendForm.dividendAmount) || 0;
          const newShares = parseFloat(dividendForm.sharesReceived) || 0;
          
          return {
            ...stock,
            dividendReceived: stock.dividendReceived + newDividendAmount,
            currentShares: stock.currentShares + newShares,
            currentValue: (stock.currentShares + newShares) * stock.currentPrice
          };
        }
        return stock;
      });
      
      updatePortfolioData(updatedData);
      setDividendForm({ symbol: '', dividendAmount: '', sharesReceived: '', currency: 'USD' });
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Dividend Management</h2>
        
        {/* Add Dividend Form */}
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="font-bold mb-4">Add Dividend</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock Symbol</label>
              <select
                value={dividendForm.symbol}
                onChange={(e) => setDividendForm(prev => ({ ...prev, symbol: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Stock</option>
                {portfolioData.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dividend Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={dividendForm.dividendAmount}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, dividendAmount: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Shares Received (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dividendForm.sharesReceived}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, sharesReceived: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddDividend}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Add Dividend
            </button>
          </div>
        </div>
        
        {/* Dividend History */}
        <div className="space-y-3">
          <h3 className="font-bold">Dividend History</h3>
          {portfolioData
            .filter(stock => stock.dividendReceived > 0)
            .map(stock => {
              const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
              const dividendUSD = stock.dividendReceived * conversionRate;
              
              return (
                <div key={stock.symbol} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{stock.symbol}</h4>
                      <p className="text-sm text-gray-600">{stock.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ${dividendUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                      </p>
                      <p className="text-sm text-gray-600">
                        {stock.currency} ${stock.dividendReceived.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  // Update Price Tab Component with Radio Button Options
  const UpdatePriceTab = () => {
    const [updateMode, setUpdateMode] = useState('price'); // 'price', 'stock', 'cash', 'dividend'
    
    const [priceForm, setPriceForm] = useState({
      symbol: '',
      newPrice: ''
    });

    const handleUpdatePrice = () => {
      if (!priceForm.symbol || !priceForm.newPrice) return;
      
      const updatedData = portfolioData.map(stock => {
        if (stock.symbol === priceForm.symbol) {
          const newPrice = parseFloat(priceForm.newPrice);
          const newCurrentValue = stock.currentShares * newPrice;
          const newGainLoss = newCurrentValue - stock.originalInvestment;
          
          return {
            ...stock,
            currentPrice: newPrice,
            currentValue: newCurrentValue,
            gainLoss: newGainLoss,
            lastUpdated: new Date().toISOString().split('T')[0] // Update timestamp
          };
        }
        return stock;
      });
      
      updatePortfolioData(updatedData);
      setPriceForm({ symbol: '', newPrice: '' });
    };

    const handleAddStock = () => {
      if (!newStockForm.symbol || !newStockForm.shares || !newStockForm.price || !newStockForm.sector) return;
      
      const shares = parseFloat(newStockForm.shares);
      const price = parseFloat(newStockForm.price);
      const investment = shares * price;
      
      const newStock = {
        symbol: newStockForm.symbol.toUpperCase(),
        currency: newStockForm.currency,
        originalShares: shares,
        currentShares: shares,
        originalPrice: price,
        currentPrice: price,
        originalInvestment: investment,
        currentValue: investment,
        gainLoss: 0,
        dividendReceived: 0,
        sector: newStockForm.sector,
        accountType: newStockForm.accountType,
        brokerage: 'Wealthsimple', // Default to Wealthsimple
        lastUpdated: new Date().toISOString().split('T')[0],
        purchaseDate: newStockForm.purchaseDate
      };
      
      const updatedData = [...portfolioData, newStock];
      updatePortfolioData(updatedData);
      
      setNewStockForm({
        symbol: '',
        currency: 'USD',
        shares: '',
        price: '',
        sector: '',
        accountType: 'RRSP',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    };

    const handleAddCash = () => {
      if (!newCashForm.amount) return;
      
      const amount = parseFloat(newCashForm.amount);
      
      // Check if currency already exists
      const existingCashIndex = cashPositions.findIndex(cash => cash.currency === newCashForm.currency);
      
      if (existingCashIndex >= 0) {
        // Add to existing currency
        const updatedCash = cashPositions.map((cash, index) => 
          index === existingCashIndex 
            ? { ...cash, amount: cash.amount + amount }
            : cash
        );
        updateCashPositions(updatedCash);
      } else {
        // Add new currency
        const updatedCash = [...cashPositions, {
          currency: newCashForm.currency,
          amount: amount,
          dateAdded: newCashForm.dateAdded
        }];
        updateCashPositions(updatedCash);
      }
      
      setNewCashForm({
        currency: 'USD',
        amount: '',
        dateAdded: new Date().toISOString().split('T')[0]
      });
    };

    const [dividendForm, setDividendForm] = useState({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      currency: 'USD'
    });

    const handleAddDividend = () => {
      if (!dividendForm.symbol || !dividendForm.dividendAmount) return;
      
      const updatedData = portfolioData.map(stock => {
        if (stock.symbol === dividendForm.symbol) {
          const newDividendAmount = parseFloat(dividendForm.dividendAmount) || 0;
          const newShares = parseFloat(dividendForm.sharesReceived) || 0;
          
          return {
            ...stock,
            dividendReceived: stock.dividendReceived + newDividendAmount,
            currentShares: stock.currentShares + newShares,
            currentValue: (stock.currentShares + newShares) * stock.currentPrice
          };
        }
        return stock;
      });
      
      updatePortfolioData(updatedData);
      setDividendForm({ symbol: '', dividendAmount: '', sharesReceived: '', currency: 'USD' });
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Portfolio Updates</h2>
        
        {/* Radio Button Selection */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-3">Select Action:</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="price"
                checked={updateMode === 'price'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Update Stock Price</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="stock"
                checked={updateMode === 'stock'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add New Stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="cash"
                checked={updateMode === 'cash'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add Cash</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="dividend"
                checked={updateMode === 'dividend'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add Dividend</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="data"
                checked={updateMode === 'data'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>💾 Data Management</span>
            </label>
          </div>
        </div>

        {/* Update Stock Price Form */}
        {updateMode === 'price' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <RefreshCw className="mr-2" size={20} />
              Update Stock Price
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock Symbol</label>
                <select
                  value={priceForm.symbol}
                  onChange={(e) => setPriceForm(prev => ({ ...prev, symbol: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Stock</option>
                  {portfolioData.map(stock => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} (Current: {stock.currency} ${stock.currentPrice.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">New Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={priceForm.newPrice}
                  onChange={(e) => setPriceForm(prev => ({ ...prev, newPrice: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
              
              <button
                onClick={handleUpdatePrice}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Update Price
              </button>
            </div>
          </div>
        )}

        {/* Add Stock Form */}
        {updateMode === 'stock' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Add New Stock
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Symbol *</label>
                  <input
                    type="text"
                    value={newStockForm.symbol}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    className="w-full p-2 border rounded-md uppercase"
                    placeholder="AAPL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Currency *</label>
                  <select
                    value={newStockForm.currency}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Shares *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newStockForm.shares}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, shares: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price per Share *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newStockForm.price}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="150.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sector *</label>
                  <select
                    value={newStockForm.sector}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Sector</option>
                    {SECTORS.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Account Type *</label>
                  <select
                    value={newStockForm.accountType}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, accountType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    {ACCOUNT_TYPES.map(accountType => (
                      <option key={accountType} value={accountType}>{accountType}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Date *</label>
                <input
                  type="date"
                  value={newStockForm.purchaseDate}
                  onChange={(e) => setNewStockForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              {newStockForm.shares && newStockForm.price && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Total Investment: {newStockForm.currency} ${(parseFloat(newStockForm.shares || 0) * parseFloat(newStockForm.price || 0)).toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                </div>
              )}
              
              <button
                onClick={handleAddStock}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Add Stock
              </button>
            </div>
          </div>
        )}

        {/* Add Cash Form */}
        {updateMode === 'cash' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <DollarSign className="mr-2" size={20} />
              Add Cash
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Currency *</label>
                  <select
                    value={newCashForm.currency}
                    onChange={(e) => setNewCashForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCashForm.amount}
                    onChange={(e) => setNewCashForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="1000.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date Added *</label>
                <input
                  type="date"
                  value={newCashForm.dateAdded}
                  onChange={(e) => setNewCashForm(prev => ({ ...prev, dateAdded: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <button
                onClick={handleAddCash}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Add Cash
              </button>
            </div>
          </div>
        )}

        {/* Add Dividend Form */}
        {updateMode === 'dividend' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <DollarSign className="mr-2" size={20} />
              Add Dividend
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock Symbol</label>
                <select
                  value={dividendForm.symbol}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, symbol: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Stock</option>
                  {portfolioData.map(stock => (
                    <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Dividend Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dividendForm.dividendAmount}
                    onChange={(e) => setDividendForm(prev => ({ ...prev, dividendAmount: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Shares Received (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dividendForm.sharesReceived}
                    onChange={(e) => setDividendForm(prev => ({ ...prev, sharesReceived: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAddDividend}
                className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                Add Dividend
              </button>
            </div>
          </div>
        )}

        {/* Data Management Section */}
        {updateMode === 'data' && (
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-4">💾 Data Management</h3>
            
            <div className="space-y-3">
              <button
                onClick={exportPortfolioData}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                📤 Export Backup
              </button>
              
              <div>
                <label className="block text-sm font-medium mb-1">Import Backup File:</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={importPortfolioData}
                  className="w-full p-2 border rounded-md text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Import backup file (.json)</p>
              </div>
              
              <button
                onClick={resetToInitialData}
                className="w-full bg-yellow-600 text-white py-2 rounded-md font-medium hover:bg-yellow-700 transition-colors"
              >
                🔄 Reset to Initial Data
              </button>
              
              <button
                onClick={clearAllData}
                className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                🗑️ Clear All Data
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
              <p><strong>💡 How Data Persistence Works:</strong></p>
              <p>• All changes are automatically saved to your device</p>
              <p>• Data survives app updates and refreshes</p>
              <p>• Export backup before major changes</p>
              <p>• Each device stores its own data</p>
              <div className="mt-2">
                <p><strong>📊 Current Storage:</strong></p>
                <p>• {portfolioData.length} stocks tracked</p>
                <p>• {cashPositions.length} cash positions</p>
                <p>• Last saved: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Portfolio Summary (always visible for non-data modes) */}
        {updateMode !== 'data' && (
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-4">Portfolio Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Holdings</p>
                <p className="font-bold">{portfolioData.length} stocks</p>
              </div>
              <div>
                <p className="text-gray-600">Cash Positions</p>
                <p className="font-bold">{cashPositions.length} currencies</p>
              </div>
              <div>
                <p className="text-gray-600">Portfolio Value</p>
                <p className="font-bold">${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 0})} USD</p>
              </div>
              <div>
                <p className="text-gray-600">Total Return</p>
                <p className={`font-bold ${metrics.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.returnPercentage >= 0 ? '+' : ''}{metrics.returnPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => {
    const tabs = [
      { id: 'performance', icon: TrendingUp, label: 'Performance' },
      { id: 'overview', icon: List, label: 'Overview' },
      { id: 'sector', icon: PieChart, label: 'Sectors' },
      { id: 'dividend', icon: DollarSign, label: 'Dividends' },
      { id: 'update', icon: RefreshCw, label: 'Update' }
    ];

    return (
   <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
    {tabs.map(tab => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Icon size={20} />
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      );
    })}
      </div>
    </div>
    );
  };

  // Main App Component
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div style={{backgroundColor: '#2563eb', color: 'white', padding: '1rem', textAlign: 'center'}}>
        <h1 className="text-xl font-bold">Portfolio</h1>
        <p className="text-sm opacity-90">Total: ${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 0})} USD</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'performance' && <PerformanceTab />}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'sector' && <SectorBreakdownTab />}
        {activeTab === 'dividend' && <DividendTab />}
        {activeTab === 'update' && <UpdatePriceTab />}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default PortfolioApp;
Portfolio PWA Development Roadmap - Claude