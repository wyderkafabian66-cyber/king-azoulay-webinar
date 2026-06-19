# Google Sheets + GHL Setup — Beginner Walkthrough

**What this gives you:** every lead that fills out the form lands in a Google Sheet automatically. From there, you can either:

* **Option A:** Use the Sheet as your CRM (filter, sort, share with setters)
* **Option B:** Have the Sheet **also forward** every lead to GHL automatically (one form submission → two destinations)

You don't need Zapier or any paid tool. This uses **Google Apps Script** (built into Google Sheets, free).

**Time:** 20–30 minutes the first time.

---

## Before You Start

You need:
1. A Google account (regular Gmail works fine)
2. The website code on GitHub: [king-azoulay-webinar/index.html](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/index.html)
3. The Apps Script template (it's already in your repo): [`google-apps-script-template.js`](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/google-apps-script-template.js)
4. *(Optional, for Option B)*: Your GHL Inbound Webhook URL — get it by following Steps 2.1 to 2.3 of **GHL-SETUP.md**

---

## Step 1 — Create the Google Sheet (5 minutes)

### 1.1 Open Google Sheets

1. Go to `https://sheets.google.com`
2. Click the **+ Blank** spreadsheet (top-left, big rainbow plus).
3. A blank sheet opens.

### 1.2 Rename the sheet and the tab

1. At the top-left, where it says **"Untitled spreadsheet"** → click and rename to: `King Azoulay - Leads`
2. At the bottom-left, you'll see a tab labeled `Sheet1`. **Double-click it** and rename to exactly: `Leads`
   * Capitalization matters. It must be `Leads` to match the Apps Script.

### 1.3 Add the column headers

1. Click cell **A1** (top-left cell).
2. Paste this entire row of headers in one shot (copy the whole block below):

```
Timestamp	First Name	Email	Phone	Country	Lead Score	Tier	Q1 Income	Q2 Position	Q3 Area	Q4 What They Need	Q5 Investment History	Q6 12-Month Goal	Q7 Urgency	Q8 Age	Score-Income	Score-Investment	Score-Urgency	Score-Age	Source	Webinar Date
```

3. Press **Enter** — Google Sheets will split it across columns A through U automatically (the tabs are column separators).

### 1.4 Make the header row look nice (optional but recommended)

1. Click the **1** on the far left to select the entire row 1.
2. Click **Format → Bold** (or `Cmd+B` / `Ctrl+B`).
3. Click **View → Freeze → 1 row** so the headers stay visible when you scroll.
4. Optional: fill row 1 with a light gold background to match your brand.

---

## Step 2 — Add the Apps Script (10 minutes)

The Apps Script is the "engine" that receives data from the website and writes rows into your sheet.

### 2.1 Open the Apps Script editor

1. In your Google Sheet, click **Extensions** in the top menu.
2. Click **Apps Script**.
3. A new tab opens with the Apps Script editor. You'll see a default file called `Code.gs` with placeholder code that says:
   ```js
   function myFunction() {
   }
   ```
4. **Select all the code in that file** (`Cmd+A` or `Ctrl+A`) and **delete it**.

### 2.2 Paste in the template

1. Open the template file in another tab: [`google-apps-script-template.js`](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/google-apps-script-template.js)
2. Click the **copy icon** (top-right of the GitHub code viewer) to copy the entire file.
3. Switch back to your Apps Script tab and **paste** into the empty editor (`Cmd+V` / `Ctrl+V`).
4. The editor should now show ~95 lines of code, starting with `/** KING AZOULAY WEBINAR...`

### 2.3 (Option B only) Wire up GHL forwarding

**Skip this section if you only want the Sheet.**

If you want every lead to ALSO land in GHL:

1. Find this line near the top of the code (around line 22):
   ```js
   const GHL_WEBHOOK_URL = '';
   ```
2. Paste your GHL Inbound Webhook URL between the quotes:
   ```js
   const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/abc.../webhook-trigger/def...';
   ```

If you've already gone through GHL-SETUP.md and have a GHL workflow set up — paste that webhook URL here. The Apps Script will fire it every time a lead comes in.

### 2.4 Save the script

1. Click the **floppy disk save icon** in the top toolbar of the Apps Script editor.
2. The first time you save, it'll ask you to name the project. Name it: `King Azoulay Webhook`
3. The file `Code.gs` should now be saved.

---

## Step 3 — Deploy the Script as a Web App (5 minutes)

A Web App is the "public URL" that the website POSTs data to. Until you deploy, the script can't be reached from outside.

### 3.1 Open Deploy

1. In the Apps Script editor, click the **Deploy** button (top-right, blue button).
2. From the dropdown, click **New deployment**.

### 3.2 Configure the deployment

1. A dialog opens. At the top, find the **gear icon ⚙️** next to "Select type" and click it.
2. Choose **Web app**.
3. The dialog updates with web-app-specific fields:
   * **Description:** `King Azoulay form receiver` (anything works, this is just for you)
   * **Execute as:** `Me (your-email@gmail.com)`
   * **Who has access:** **Anyone** ← this is critical. The website needs to POST without logging in.
4. Click **Deploy**.

### 3.3 Authorize the script

1. Google will pop up an authorization request because the script wants permission to write to your sheet.
2. Click **Authorize access**.
3. Choose your Google account.
4. You'll see a scary "Google hasn't verified this app" warning. This is normal for personal scripts. Click **Advanced** at the bottom-left, then click **Go to King Azoulay Webhook (unsafe)** at the bottom.
5. Review what the script wants to access (your Google Sheets + external URL fetch) and click **Allow**.

### 3.4 Copy the Web App URL

1. After deployment, a confirmation dialog appears showing your **Web App URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycby...abc123.../exec
   ```
2. **Copy that URL** and save it somewhere — you'll paste it into the website in Step 4.
3. Click **Done**.

### 3.5 Quick health check

1. Open a new browser tab.
2. Paste the Web App URL and visit it.
3. You should see the text: `King Azoulay webinar webhook is running ✓`
4. **If you see that → ✓ working.** Move on.
5. **If you see an error page** → revisit Step 3.2 and make sure "Who has access" is set to **Anyone**.

---

## Step 4 — Paste the Web App URL into the Website (3 minutes)

1. Open the website code: [`king-azoulay-webinar/index.html`](https://github.com/wyderkafabian66-cyber/king-azoulay-webinar/blob/main/index.html)
2. Click the **pencil/edit icon** at the top-right to edit the file in GitHub.
3. Press `Cmd+F` (Mac) or `Ctrl+F` (Windows) and search for: `SHEETS_WEBHOOK_URL`
4. You'll find this line:
   ```js
   const SHEETS_WEBHOOK_URL = ''; // TODO: paste your Apps Script Web App URL here
   ```
5. Paste your Web App URL between the empty quotes:
   ```js
   const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby...abc123.../exec';
   ```
6. Scroll to the bottom. Commit message: `Add Google Sheets webhook URL`
7. Click the green **Commit changes** button.
8. **Wait ~30 seconds** — Vercel auto-redeploys.

---

## Step 5 — Test End-to-End (3 minutes)

1. Open your **live Vercel URL** in a fresh incognito browser window.
2. Fill out the form with a recognizable test name like `Sheet Test 1`. Use a real email + phone you own.
3. Answer all 8 quiz questions.
4. Submit.
5. Switch to your Google Sheet.
6. **Within 2 seconds**, a new row should appear with all the data filled in.
7. The row should be **colored** based on tier (gold = HOT, yellow = WARM, etc.).

**If the row appears → ✓ working.**

**If you also enabled Option B (GHL forward)** → also check your GHL contacts list. The same lead should be there too.

---

## What You Have Now

* ✅ Every lead lands in your Google Sheet **within 2 seconds** of submission
* ✅ Rows are **color-coded by tier** so HOT leads jump out
* ✅ All 8 quiz answers + lead score + tier are in readable columns
* ✅ The Sheet is shareable — invite setters with "Editor" or "Viewer" access
* ✅ (If Option B) The same data lands in GHL too, fully automated

---

## How Setters Use the Sheet

1. **Open the sheet** anytime to see new leads.
2. **Filter by Tier** (Data → Create a filter → click the funnel on the Tier column → pick HOT) to see priority leads.
3. **Sort by Lead Score** (highest to lowest) to attack the best leads first.
4. **Mark leads as worked** — add a Status column (V) and put `Contacted`, `Replied`, `Booked`, `Closed` as you work them.

You can also create **separate views** of the sheet:
* Filter view: "HOT leads only"
* Filter view: "Hasn't been contacted yet"
* Filter view: "Need follow-up"

---

## How to Share the Sheet With Your Setters

1. Click the green **Share** button (top-right of the sheet).
2. Add your setters' email addresses.
3. Permission: **Editor** (so they can mark statuses) or **Viewer** (read-only).
4. Optional: copy the share link and paste it in your team's Slack/WhatsApp.

---

## Troubleshooting

### Rows aren't appearing in the sheet
1. Visit your Web App URL in a browser. You should see `King Azoulay webinar webhook is running ✓`. If not, the deployment is broken — redeploy from Step 3.
2. Check the website. Open DevTools (`F12`), Network tab, submit a test form. Look for a POST to `script.google.com`. If it's not there, the `SHEETS_WEBHOOK_URL` constant is still empty in `index.html`.
3. Open Apps Script editor → **Executions** (left sidebar). You should see recent runs. If they're failing, click one to see the error.

### "Sheet 'Leads' not found"
The Apps Script is looking for a tab named exactly `Leads` (capital L, no spaces). Open the sheet, look at the tab name at the bottom-left, and make sure it's exactly `Leads`. Rename if needed.

### Columns are off / data lands in wrong columns
You changed the header row order. The Apps Script expects columns in the specific order from Step 1.3. Either restore the original headers, or edit the row order in the Apps Script `doPost` function to match yours.

### Authorization expired / script stopped working
Apps Script Web Apps occasionally need re-authorization. Go to **Deploy → Manage deployments**, click the **pencil/edit icon** next to your active deployment, change "Version" to "New version", click Deploy. Re-authorize if prompted.

### Want to receive an email every time a new HOT lead lands
Add this to the bottom of `doPost`, right before the final `return`:
```js
if ((data.tier || '').toUpperCase() === 'HOT') {
  MailApp.sendEmail({
    to: 'your-email@gmail.com',
    subject: '🔥 HOT LEAD: ' + data.firstName,
    body: 'Score: ' + data.leadScore + '/25\n\n'
        + 'Position: ' + data.q2_position + '\n'
        + 'Income: ' + data.q1_income + '\n'
        + 'Biggest area: ' + data.q3_area_needs_work + '\n'
        + 'What they need: ' + data.q4_what_they_need + '\n'
        + 'Goal: ' + data.q6_biggest_goal + '\n\n'
        + 'Contact within 1 hour. Voice messages only.'
  });
}
```
Save, then redeploy (Deploy → Manage deployments → edit → new version → Deploy).

---

## Recap of the Two Setups

| Path | What you do | What you get |
| --- | --- | --- |
| **Sheets only** | Steps 1-5, leave GHL field empty in Apps Script | Spreadsheet you can sort, filter, share. No GHL. |
| **Sheets + GHL** | Do GHL-SETUP.md first to get the GHL webhook URL. Then do all steps here, including Step 2.3 (paste GHL URL into Apps Script). | Every lead lands in BOTH the Sheet AND GHL automatically. |

**Recommended path:** Sheets + GHL. The Sheet is your backup/audit log. GHL is your automation engine. Best of both.
