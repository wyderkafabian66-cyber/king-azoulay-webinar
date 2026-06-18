# GoHighLevel (GHL) Setup Guide

How to connect the King Azoulay webinar landing page to your GHL sub-account so every form submission lands in GHL with the **lead score, tier, and all 8 quiz answers** mapped to contact custom fields. Once that's done, you can build setter workflows and trigger bloo.io automations off the tier.

**Time to complete:** 20–30 minutes.

---

## What Gets Sent to GHL

When a lead submits the form, the page fires a single JSON payload to a GHL Inbound Webhook. The payload looks like this:

```json
{
  "firstName": "John",
  "email": "john@example.com",
  "phone": "+14155551234",
  "phoneCountry": "us",

  "leadScore": 21,
  "leadScoreMax": 25,
  "tier": "HOT",

  "breakdown_q1_income": 8,
  "breakdown_q5_investment": 6,
  "breakdown_q7_urgency": 3,
  "breakdown_q8_age": 4,

  "q1_income": "$30K-$100K/mo",
  "q2_position": "Running my own business",
  "q3_area_needs_work": "Freedom",
  "q4_what_they_need": "Mentor or coach",
  "q5_investment_history": "Courses or programs",
  "q6_biggest_goal": "Build a business that runs without me",
  "q7_urgency": "Ready to do the work",
  "q8_age": "35-44",

  "webinarDate": "2026-07-01T19:00:00-04:00",
  "submittedAt": "2026-06-18T14:32:11.554Z",
  "source": "King Azoulay Webinar Landing"
}
```

Every key in that JSON will become a **custom field on the contact** in GHL. Your setters see all of it on the contact card.

---

## Step 1 — Create Custom Fields in GHL

In GHL, go to **Settings → Custom Fields → Contact** and create the fields below. For each one, **the Field Key matters** — set it to the exact string in the right column so the webhook auto-fills them later.

### Required custom fields

| Display Name | Field Key | Field Type |
| --- | --- | --- |
| Lead Score | `leadScore` | Number |
| Lead Score Max | `leadScoreMax` | Number |
| Tier | `tier` | Single-line text |
| Score · Income | `breakdown_q1_income` | Number |
| Score · Investment | `breakdown_q5_investment` | Number |
| Score · Urgency | `breakdown_q7_urgency` | Number |
| Score · Age | `breakdown_q8_age` | Number |
| Q1 · Monthly Income | `q1_income` | Single-line text |
| Q2 · Current Position | `q2_position` | Single-line text |
| Q3 · Area Needs Most Work | `q3_area_needs_work` | Single-line text |
| Q4 · What They Need (the tease) | `q4_what_they_need` | Single-line text |
| Q5 · Investment History | `q5_investment_history` | Single-line text |
| Q6 · 12-Month Goal | `q6_biggest_goal` | Single-line text |
| Q7 · Urgency | `q7_urgency` | Single-line text |
| Q8 · Age Range | `q8_age` | Single-line text |
| Webinar Date | `webinarDate` | Date |
| Submitted At | `submittedAt` | Date |
| Source | `source` | Single-line text |

> **Heads up:** GHL has built-in fields for **First Name, Email, Phone, Country** — don't create custom fields for those. The webhook will map them automatically in Step 4.

---

## Step 2 — Create the Inbound Webhook in GHL

1. Go to **Automation → Workflows** in GHL.
2. Click **+ Create Workflow** → **Start from scratch**.
3. Name it: `King Azoulay – Landing Page Webhook`.
4. Click **Add New Trigger** → search for and select **"Inbound Webhook"**.
5. GHL will generate a **unique webhook URL**. It looks like:
   ```
   https://services.leadconnectorhq.com/hooks/abc123XYZ/webhook-trigger/def456...
   ```
6. **Copy that URL** — you'll paste it into the website in Step 3.
7. **Don't save the workflow yet.** First send a test submission so GHL can read the payload shape. Open another tab → run a real test submission on the landing page (with the URL pasted, see Step 3). Once GHL receives that test, the **"Sample Payload"** section in the Inbound Webhook trigger will populate with all your fields.

---

## Step 3 — Paste the Webhook URL into the Site

1. Open the repo on GitHub: [`king-azoulay-webinar/index.html`](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/index.html)
2. Near the top of the `<script>` block (around line 2240) you'll see:
   ```js
   const GHL_WEBHOOK_URL = ''; // TODO: paste your GHL Inbound Webhook URL here
   ```
3. Paste your GHL webhook URL inside the quotes:
   ```js
   const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/abc123XYZ/webhook-trigger/def456...';
   ```
4. Commit, push to GitHub → Vercel auto-redeploys in ~30 seconds.

---

## Step 4 — Map the Webhook Fields to Contact Fields

Back in your GHL workflow:

1. Click your **Inbound Webhook** trigger to open it. You should see the test submission's data in the "Sample Payload" section.
2. Now add the **Create/Update Contact** action right after the trigger:
   * Click **+ Add Action** → **"Create/Update Contact"**.
3. For each contact field, map it to a webhook payload key. Use the **{{trigger.bodyJson.X}}** custom value picker:

| GHL Contact Field | Map to webhook value |
| --- | --- |
| First Name | `{{trigger.bodyJson.firstName}}` |
| Email | `{{trigger.bodyJson.email}}` |
| Phone | `{{trigger.bodyJson.phone}}` |
| Country | `{{trigger.bodyJson.phoneCountry}}` |
| Source | `{{trigger.bodyJson.source}}` |
| Lead Score (custom) | `{{trigger.bodyJson.leadScore}}` |
| Tier (custom) | `{{trigger.bodyJson.tier}}` |
| Q1 · Monthly Income | `{{trigger.bodyJson.q1_income}}` |
| Q2 · Current Position | `{{trigger.bodyJson.q2_position}}` |
| Q3 · Area Needs Most Work | `{{trigger.bodyJson.q3_area_needs_work}}` |
| Q4 · What They Need | `{{trigger.bodyJson.q4_what_they_need}}` |
| Q5 · Investment History | `{{trigger.bodyJson.q5_investment_history}}` |
| Q6 · 12-Month Goal | `{{trigger.bodyJson.q6_biggest_goal}}` |
| Q7 · Urgency | `{{trigger.bodyJson.q7_urgency}}` |
| Q8 · Age Range | `{{trigger.bodyJson.q8_age}}` |
| Score · Income (custom) | `{{trigger.bodyJson.breakdown_q1_income}}` |
| Score · Investment (custom) | `{{trigger.bodyJson.breakdown_q5_investment}}` |
| Score · Urgency (custom) | `{{trigger.bodyJson.breakdown_q7_urgency}}` |
| Score · Age (custom) | `{{trigger.bodyJson.breakdown_q8_age}}` |
| Webinar Date (custom) | `{{trigger.bodyJson.webinarDate}}` |
| Submitted At (custom) | `{{trigger.bodyJson.submittedAt}}` |

4. Save the action.
5. Toggle the workflow to **Publish / Active** at the top right.

---

## Step 5 — Add Tags Based on Tier (so setters can filter)

Right after the "Create/Update Contact" action, add tier-based tagging. This makes it easy to filter the contact list by HOT / WARM / NEUTRAL / COLD.

1. Click **+ Add Action** → **"If/Else"**.
2. Branch 1 condition: `{{trigger.bodyJson.tier}}` equals `HOT`
   * Inside the branch → **+ Add Action** → **"Add Tag"** → tag name: `webinar-hot`.
3. Branch 2: `tier` equals `WARM` → tag `webinar-warm`.
4. Branch 3: `tier` equals `NEUTRAL` → tag `webinar-neutral`.
5. Branch 4: `tier` equals `COLD` → tag `webinar-cold`.

---

## Step 6 — Fire the Setter Notification (HOT leads only)

You want HOT leads to ping the setter immediately so they hit them within 1 hour. Inside the **HOT branch** from Step 5:

1. **+ Add Action** → **"Send Internal Notification"** (SMS or email to your setter).
   * Message: `🔥 HOT LEAD: {{contact.first_name}} ({{contact.email}}) — Score {{trigger.bodyJson.leadScore}}/25. Needs: {{trigger.bodyJson.q4_what_they_need}}. Goal: {{trigger.bodyJson.q6_biggest_goal}}.`
2. (Optional) **+ Add Action** → **"Webhook"** to fire the AI opener via bloo.io with the lead's data.

---

## Step 7 — Test End-to-End

1. Open your live landing page (Vercel URL).
2. Fill out the form with a test name like `Test HOT` and a real email/phone you control.
3. Submit. The page redirects you to the thank-you URL.
4. Switch to GHL → **Contacts** → search for `Test HOT`.
5. Open the contact card. You should see:
   * First name, email, phone filled in
   * All quiz custom fields populated with the human-readable answers
   * Lead score + tier filled in
   * The right tier-tag applied
6. Open your workflow → **Execution Logs** to confirm the run was successful.

If anything is missing, check the field key in Step 1 matches the JSON key exactly.

---

## Step 8 — Build Follow-Up Workflows

Now that contacts are landing cleanly, build tier-based automation. Some patterns:

### HOT (20–25)
* Immediate SMS to setter (already done in Step 6)
* Auto-send the AI opener via SMS within 60 seconds
* Wait 5 min → if no reply → setter task in CRM

### WARM (14–19)
* Wait 1 hour → send AI opener
* Wait 4 hours → setter task

### NEUTRAL (8–13)
* Wait 24 hours → send AI opener
* Setter assigned next business day

### COLD (0–7)
* Wait 48 hours → send AI opener
* Drop into long-term email nurture

### All tiers
* **2 days before July 1st** → send pre-webinar reminder ("You ready for the 1st?")
* **Day before** → send the day-before script from LEAD-SCORE.md
* **30 min before** → final reminder with the live link
* **Day after** → if attended → push to book a call. If skipped → send replay + "what got in the way?"

---

## Troubleshooting

**Webhook isn't firing**
* Check that `GHL_WEBHOOK_URL` is set in `index.html` and the change was deployed to Vercel.
* Open browser DevTools → Network tab → submit the form → look for a POST to `services.leadconnectorhq.com`. If you don't see it, the URL constant is still empty.

**Webhook fires but contact is empty in GHL**
* Step 4 mapping is wrong. The webhook payload uses **`{{trigger.bodyJson.fieldName}}`**, not `{{trigger.X}}`.
* Re-check the JSON key names exactly match (case-sensitive).

**Lead score landing as a string, not a number**
* In Step 1, make sure `leadScore`, `leadScoreMax`, and all `breakdown_*` fields are set to **Number** type, not Text.

**Phone number format is weird**
* The site sends E.164 format (e.g. `+14155551234`). GHL should accept this. If it doesn't, ensure the contact's phone field is set to international format in GHL settings.

**The setter notification isn't sending**
* Internal notifications in GHL need to be sent to a specific user. Make sure the setter is added as a user in your GHL sub-account and assigned to the notification action.

---

## What You Have After Setup

Every lead that fills the form lands in GHL with:

1. Their contact info (name, email, phone, country)
2. Their **lead score and tier** as filterable fields
3. All 8 quiz answers as readable text on the contact card
4. The right **tier tag** applied (`webinar-hot` etc.)
5. The right **automation** firing based on tier
6. Internal notification to your setter for HOT leads

Your setters open a contact and immediately see all 4 setter-angle answers (Q2/Q3/Q4/Q6) from the LEAD-SCORE.md playbook → they know exactly what tease to use and when to drop the King access hook.

---

**Done.** Once Step 3 is committed and Step 4–7 are tested, the funnel is live end-to-end: page → GHL → setter playbook → bloo.io → webinar.
