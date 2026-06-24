# GoHighLevel Setup — Complete Beginner Walkthrough

**You've never used GHL before? Perfect. This guide assumes zero knowledge.** Follow every step in order. You'll know it's working when you submit a test form on your website and see the contact appear in GHL with their lead score.

**Time:** 30–45 minutes if it's your first time.

---

## Before You Start — What You Need

1. A **GoHighLevel account** with a sub-account already created. If you don't have one yet, you need to either sign up at gohighlevel.com or get added as a user by your agency owner.
2. **Login URL:** `https://app.gohighlevel.com` (or your agency's white-labeled URL — looks like `app.youragency.com`).
3. The website code on GitHub. You'll need to edit one line later: [king-azoulay-webinar/index.html](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/index.html)
4. **30 minutes of uninterrupted time.** Don't try to do this in 5-minute bursts.

---

## Step 0 — Log In and Get Oriented

1. Go to `https://app.gohighlevel.com` and log in.
2. You'll land in your **Dashboard**. On the left side of the screen you'll see a **vertical sidebar menu** with items like:
   * Dashboard
   * Conversations
   * Calendars
   * Contacts
   * Opportunities
   * Marketing
   * **Automation** ← we'll use this
   * Sites
   * Reputation
   * Reporting
   * Memberships
   * **Settings** ← we'll use this (usually a ⚙️ gear icon at the bottom of the sidebar OR the very top-right of the screen)

3. **If you see multiple "locations" or sub-accounts**, click on the King Azoulay one. If there's only one, you're already in it.

---

## Step 1 — Create the Custom Fields (15 minutes)

Custom fields are how GHL stores extra info on a contact (like their quiz answers and lead score). You need to create one custom field for each piece of data the website sends.

### 1.1 Open Custom Fields

1. In the left sidebar, click **Settings** (or click the ⚙️ gear icon).
2. The Settings page opens. On the left side you'll see a sub-menu with items like Business Info, Staff, Phone Numbers, **Custom Fields**, Custom Values, etc.
3. Click **Custom Fields**.
4. At the top of the Custom Fields page, make sure the toggle/tab is set to **Contact** (not Opportunity or Company). You should see existing default fields like "First Name", "Last Name", "Email", "Phone" listed.

### 1.2 Add the Lead Score field (do this one slowly so you learn the pattern)

1. Click the **+ Add Field** button (usually top-right, blue/orange button).
2. A side panel or modal opens with a form. Fill it in like this:
   * **Group:** *Contact* (default is fine)
   * **Field Name:** `Lead Score`
   * **Field Type:** select **Number**
   * **Unique Key / Field Key:** This is the most important part. It must be set to exactly: `leadScore`
     * In GHL, the Field Key is sometimes auto-generated from the Field Name. Look for a small "Edit" pencil or a "Field Key" input near the bottom of the form. Make sure it reads `leadScore` (camelCase, no spaces).
3. Click **Save**.

You just created your first custom field. The other 17 fields follow the exact same pattern.

### 1.3 Add the remaining 17 fields

Repeat the same process for each row in the table below. For each one:
- Click **+ Add Field**
- Type the **Field Name** in the Name input
- Choose the **Field Type** from the dropdown
- Set the **Field Key** to exactly what's in the table (this is the critical part — they have to match the website code)
- Click **Save**

| # | Field Name | Field Type | Field Key (must match exactly) |
| --- | --- | --- | --- |
| 1 | Lead Score | Number | `leadScore` |
| 2 | Lead Score Max | Number | `leadScoreMax` |
| 3 | Tier | Single-line text | `tier` |
| 4 | Score - Income | Number | `breakdown_q1_income` |
| 5 | Score - Investment | Number | `breakdown_q5_investment` |
| 6 | Score - Urgency | Number | `breakdown_q7_urgency` |
| 7 | Score - Age | Number | `breakdown_q8_age` |
| 8 | Q1 Monthly Income | Single-line text | `q1_income` |
| 9 | Q2 Current Position | Single-line text | `q2_position` |
| 10 | Q3 Area Needs Most Work | Single-line text | `q3_area_needs_work` |
| 11 | Q4 What They Need | Single-line text | `q4_what_they_need` |
| 12 | Q5 Investment History | Single-line text | `q5_investment_history` |
| 13 | Q6 12-Month Goal | Single-line text | `q6_biggest_goal` |
| 14 | Q7 Urgency | Single-line text | `q7_urgency` |
| 15 | Q8 Age Range | Single-line text | `q8_age` |
| 16 | Webinar Date | Date | `webinarDate` |
| 17 | Submitted At | Date | `submittedAt` |
| 18 | Source | Single-line text | `source` |

> **Heads-up:** GHL already has First Name, Email, Phone, and Country as built-in fields. **Do NOT create custom fields for those** — the webhook will use the built-in ones.

### 1.4 Verify

Scroll down your Custom Fields list. You should see all 18 fields you just created. If any are missing or have a wrong field key, click the pencil icon next to it and fix it.

---

## Step 2 — Create the Webhook in Workflows (5 minutes)

### 2.1 Open Workflows

1. In the left sidebar, click **Automation**.
2. A sub-menu opens. Click **Workflows**.
3. You'll see a list (probably empty for a new account) of existing workflows.

### 2.2 Create a new workflow

1. Click the **+ Create Workflow** button (top-right, usually blue/orange).
2. A modal pops up asking how you want to start:
   * Click **Start from Scratch**.
3. The workflow editor opens. At the top, there's a **workflow name** field (says "Untitled" or similar).
4. Click that name field and rename it to: `King Azoulay - Landing Page Webhook`
5. You'll see a big empty canvas with a **+ Add New Trigger** button in the middle/top.

### 2.3 Add the Inbound Webhook trigger

1. Click **+ Add New Trigger**.
2. A side panel opens with a search box and a list of trigger types.
3. In the search box, type **Inbound Webhook**.
4. Click **Inbound Webhook** when it appears.
5. The panel updates. You'll see:
   * A **Workflow Trigger Name** field — type: `Landing page submission`
   * A **Webhook URL** field with a long URL that GHL just generated for you. It looks like:
     ```
     https://services.leadconnectorhq.com/hooks/abc123XYZ/webhook-trigger/def456...
     ```
6. **Copy that URL.** Click the copy icon next to it (or select the whole URL and `Cmd+C`). Paste it somewhere safe — a sticky note, a text file, anywhere you won't lose it.
7. Click **Save Trigger** (bottom of the side panel).
8. **Leave this browser tab open.** Don't close the workflow yet.

---

## Step 3 — Paste the Webhook URL into the Website (3 minutes)

1. Open a new browser tab.
2. Go to: [`king-azoulay-webinar/index.html`](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/index.html)
3. Click the **pencil/edit icon** at the top-right of the file viewer to edit the file in GitHub.
4. Use the search shortcut: `Cmd+F` (Mac) or `Ctrl+F` (Windows). Type: `GHL_WEBHOOK_URL`
5. You'll find this line:
   ```js
   const GHL_WEBHOOK_URL = ''; // TODO: paste your GHL Inbound Webhook URL here
   ```
6. Paste your GHL webhook URL inside the empty single quotes:
   ```js
   const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/abc123XYZ/webhook-trigger/def456...';
   ```
7. Scroll to the bottom of the page. In the "Commit changes" box:
   * Title: `Add GHL webhook URL`
   * Click the green **Commit changes** button.
8. **Wait ~30 seconds.** Vercel will auto-redeploy the website with the new URL.

---

## Step 4 — Send a Test Submission (so GHL learns the data shape)

1. Open another new tab and go to your **live Vercel website URL**.
2. Click **Reserve My Seat** or **Begin Qualification**.
3. Fill out the form with a recognizable test name like `Test Lead 1`. Use a real email + phone you own.
4. Answer all 8 quiz questions however you want.
5. Submit the form. You should see the success screen with a score.
6. Now go back to your **GHL workflow tab** (the one you left open in Step 2).

### 4.1 Verify GHL received the test

1. Click on your **Inbound Webhook** trigger again to open the side panel.
2. Scroll down — you should see a **"Sample Payload" or "Recent Webhook Data"** section that now shows the data from your test submission. You'll see all your fields: `firstName`, `email`, `phone`, `q1_income`, `tier`, etc.
3. **If you see the data — perfect.** Move on to Step 5.
4. **If you don't see anything**, the webhook didn't fire. Common fixes:
   * The URL in `GHL_WEBHOOK_URL` is wrong (re-check)
   * The Vercel redeploy hasn't finished yet (wait another 30 seconds and try a new test submission)
   * Browser ad-blocker is blocking the request (try in an incognito window)

---

## Step 5 — Tell GHL What to Do with the Data (10 minutes)

The webhook is receiving data. Now you tell GHL to **create a contact** from it.

### 5.1 Add the Create/Update Contact action

1. In your workflow, you should see your trigger at the top with a small **+ icon** below it.
2. Click that **+** icon.
3. A panel opens with a list of actions. Search for `Create/Update Contact` and click it.
4. The action's settings open.

### 5.2 Map each field

You'll see a list of contact fields (First Name, Email, Phone, etc.). For each one, you click in the field's input box and either:
- Type text directly, OR
- Click the **{{}} curly braces icon** to pick a value from the webhook data

For **every field below**, click the {{}} icon, find the matching key from your webhook (it'll be under "Inbound Webhook Trigger" → "bodyJson" → and then the field name), and select it.

| GHL Contact Field | Click the {{}} icon and pick |
| --- | --- |
| First Name | `firstName` |
| Email | `email` |
| Phone | `phone` |
| Country | `phoneCountry` |
| Source | `source` |
| Lead Score | `leadScore` |
| Lead Score Max | `leadScoreMax` |
| Tier | `tier` |
| Q1 Monthly Income | `q1_income` |
| Q2 Current Position | `q2_position` |
| Q3 Area Needs Most Work | `q3_area_needs_work` |
| Q4 What They Need | `q4_what_they_need` |
| Q5 Investment History | `q5_investment_history` |
| Q6 12-Month Goal | `q6_biggest_goal` |
| Q7 Urgency | `q7_urgency` |
| Q8 Age Range | `q8_age` |
| Score - Income | `breakdown_q1_income` |
| Score - Investment | `breakdown_q5_investment` |
| Score - Urgency | `breakdown_q7_urgency` |
| Score - Age | `breakdown_q8_age` |
| Webinar Date | `webinarDate` |
| Submitted At | `submittedAt` |

> **Tip:** if you can't find a custom field in the GHL list, scroll all the way down — custom fields are usually grouped under "Custom Fields" at the bottom of the contact fields list.

3. Click **Save Action** when all fields are mapped.

---

## Step 6 — Add Tier-Based Tags (5 minutes)

Tags let your setters filter contacts. You're going to add 4 tags so each lead gets one of `webinar-hot`, `webinar-warm`, `webinar-neutral`, or `webinar-cold`.

### 6.1 Add an If/Else condition

1. Below your **Create/Update Contact** action, click the **+** icon.
2. Search for **If/Else** and click it.

### 6.2 Build the HOT branch

1. Click **+ Add Filter** inside the first branch.
2. In the filter setup:
   * Choose **Webhook Trigger** → **bodyJson** → `tier`
   * Operator: **is equal to**
   * Value: type `HOT`
3. Save the filter.
4. Now inside that HOT branch, click the **+** below the filter to add an action.
5. Search for **Add Tag** and click it.
6. Tag name: `webinar-hot`. Save.

### 6.3 Repeat for the other 3 tiers

1. Click **+ Add Branch** to add another branch.
2. Filter: `tier` equals `WARM` → action: Add Tag → `webinar-warm`.
3. Add another branch. Filter: `tier` equals `NEUTRAL` → action: Add Tag → `webinar-neutral`.
4. Add another branch. Filter: `tier` equals `COLD` → action: Add Tag → `webinar-cold`.

You should now have 4 branches, each tagging the contact based on tier.

---

## Step 7 — Send Yourself a Notification for HOT Leads

You want HOT leads to ping the setter the moment they come in. Inside the **HOT branch** (after the tag action):

1. Click **+** below the tag action.
2. Search for **Send Internal Notification**. Click it.
3. Fill out the form:
   * **Notification Type:** Email (or SMS if you've got it configured)
   * **To:** select the setter user from the dropdown
   * **Subject:** `🔥 HOT LEAD: {{contact.first_name}} ({{trigger.bodyJson.leadScore}}/25)`
   * **Message:**
     ```
     {{contact.first_name}} just registered. Score: {{trigger.bodyJson.leadScore}}/25 — HOT.

     Position: {{trigger.bodyJson.q2_position}}
     Income: {{trigger.bodyJson.q1_income}}
     Biggest area: {{trigger.bodyJson.q3_area_needs_work}}
     What they need: {{trigger.bodyJson.q4_what_they_need}}
     Goal: {{trigger.bodyJson.q6_biggest_goal}}

     Dial them within 1 hour. Voice messages only.
     ```
4. Save.

---

## Step 8 — Publish the Workflow

You did all the setup but the workflow is still in **Draft** mode. Until you publish it, nothing actually fires.

1. At the **top-right of the workflow editor**, find the **Publish** toggle (some versions show it as a button labeled "Save & Publish" or a Draft/Published toggle).
2. Click it to switch from **Draft → Published**.
3. You should see a confirmation that the workflow is now active.

---

## Step 9 — Final End-to-End Test

1. Open your live website in a fresh incognito browser window (so you don't reuse the previous test submission).
2. Fill out the form with a new test name like `Test Lead 2`. Use real but fake-looking email + phone.
3. Submit.
4. Switch to GHL → click **Contacts** in the left sidebar.
5. Search for `Test Lead 2`. You should see a contact card appear within seconds.
6. Open the contact. Verify:
   * ✅ First name, email, phone are filled in
   * ✅ All 8 quiz fields show **readable text** (e.g. "Mentor or coach", "$30K-$100K/mo")
   * ✅ Lead Score and Tier are populated
   * ✅ The right tier tag is applied (look at the tags section)
7. If you set tier to HOT in your test → check your inbox for the setter notification email.

**If everything checks out, you're live.** The funnel is now: landing page → GHL contact → tagged → setter notified → setter picks up the playbook from LEAD-SCORE.md.

---

## What to Do Next (Beyond This Tutorial)

Once you've confirmed Step 9 works, here are the workflows to build next:

### Pre-webinar sequence (all tiers)
1. **2 days before July 13th** → text reminder
2. **Day before** → the day-before script from LEAD-SCORE.md
3. **30 min before** → final live-link reminder

### Post-webinar sequence
1. **2 hours after** → if they attended → push to book a call
2. **Day after** → if they skipped → "what got in the way?" + replay link

### Bloo.io integration (separate setup)
Inside the HOT branch (after notification), add another action: **Webhook** → POST to your bloo.io webhook URL. That fires the AI opener message immediately.

You'll need bloo.io's own webhook URL for that — get it from their dashboard.

---

## Troubleshooting

### Webhook isn't firing
1. Open the website in your browser, then open DevTools (`F12` or `Cmd+Option+I`).
2. Go to the **Network** tab.
3. Submit the form.
4. Look for a POST request to `services.leadconnectorhq.com`. If it's NOT there, the URL constant is empty or the change didn't deploy yet.

### Test submission lands in GHL but fields are empty
- Step 5 mapping is wrong. Open the **Create/Update Contact** action again and check that each field is using `{{trigger.bodyJson.X}}`, not just `{{trigger.X}}`.

### Numbers showing up as text strings
- Step 1.3 — those fields need to be **Number** type, not Text. Fix the field types and re-test.

### Phone number not landing
- Make sure your country code is in the phone (looks like `+14155551234`). The site sends international format automatically.

### Workflow isn't running at all
- You forgot to **Publish** in Step 8. Check the top-right toggle.

### I can't find Custom Fields in Settings
- You might be in your Agency view instead of the sub-account. Click the location switcher (top of the sidebar) and select the King Azoulay sub-account.

---

## What You Built

After all 9 steps, you have:

✅ Every lead lands in GHL with full quiz data
✅ Lead score and tier as filterable fields
✅ Auto-applied tier tag (HOT / WARM / NEUTRAL / COLD)
✅ Internal setter notification for HOT leads
✅ Foundation to build any follow-up automation on top

**Time to follow the LEAD-SCORE.md playbook for messaging.**
