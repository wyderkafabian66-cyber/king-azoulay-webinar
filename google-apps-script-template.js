/**
 * KING AZOULAY WEBINAR — Google Apps Script Webhook
 *
 * What this does:
 *   1. Receives lead form submissions from the website
 *   2. Appends a new row to the active Google Sheet
 *   3. (Optional) Forwards the same data to a GHL Inbound Webhook
 *
 * Setup is in GOOGLE-SHEETS-SETUP.md — follow that, this file is just the code.
 */

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

// The name of the tab inside your spreadsheet where leads go.
// Default is "Leads" — match this to whatever you name your tab.
const SHEET_NAME = 'Leads';

// OPTIONAL: paste your GHL Inbound Webhook URL here to ALSO forward
// every submission to GHL. Leave empty if you only want Sheets.
const GHL_WEBHOOK_URL = '';

// ─────────────────────────────────────────────
// HANDLER — runs when the website POSTs a submission
// ─────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Open the sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ error: 'Sheet "' + SHEET_NAME + '" not found' });
    }

    // Build the row in the same column order as the headers
    const row = [
      new Date(),                              // A: Timestamp
      data.firstName || '',                    // B: First Name
      data.email || '',                        // C: Email
      data.phone || '',                        // D: Phone
      data.phoneCountry || '',                 // E: Country
      data.leadScore || 0,                     // F: Lead Score
      data.tier || '',                         // G: Tier
      data.q1_income || '',                    // H: Q1 Income
      data.q2_position || '',                  // I: Q2 Position
      data.q3_area_needs_work || '',           // J: Q3 Area
      data.q4_what_they_need || '',            // K: Q4 What They Need (THE TEASE)
      data.q5_investment_history || '',        // L: Q5 Investment History
      data.q6_biggest_goal || '',              // M: Q6 12-Month Goal
      data.q7_urgency || '',                   // N: Q7 Urgency
      data.q8_age || '',                       // O: Q8 Age
      data.breakdown_q1_income || 0,           // P: Score-Income
      data.breakdown_q5_investment || 0,       // Q: Score-Investment
      data.breakdown_q7_urgency || 0,          // R: Score-Urgency
      data.breakdown_q8_age || 0,              // S: Score-Age
      data.source || '',                       // T: Source
      data.webinarDate || ''                   // U: Webinar Date
    ];

    sheet.appendRow(row);

    // Color-code the row by tier so HOT leads jump out at the setters
    const rowIndex = sheet.getLastRow();
    colorRowByTier(sheet, rowIndex, data.tier);

    // OPTIONAL: forward to GHL
    if (GHL_WEBHOOK_URL) {
      try {
        UrlFetchApp.fetch(GHL_WEBHOOK_URL, {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify(data),
          muteHttpExceptions: true
        });
      } catch (ghlErr) {
        Logger.log('GHL forward failed: ' + ghlErr.toString());
      }
    }

    return jsonResponse({ success: true, row: rowIndex });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function colorRowByTier(sheet, rowIndex, tier) {
  const range = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn());
  switch ((tier || '').toUpperCase()) {
    case 'HOT':     range.setBackground('#FFE0B2'); break;  // warm gold
    case 'WARM':    range.setBackground('#FFF9C4'); break;  // light yellow
    case 'NEUTRAL': range.setBackground('#F5F5F5'); break;  // light grey
    case 'COLD':    range.setBackground('#E0E0E0'); break;  // medium grey
  }
}

// Health check — visit your Web App URL in a browser to confirm it's live.
function doGet(e) {
  return ContentService
    .createTextOutput('King Azoulay webinar webhook is running ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
