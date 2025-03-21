# Simple Form to Google Sheets

A minimal HTML form that collects an email and a message, then sends the data to Google Sheets via Google Apps Script.

## Setup Instructions

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the sheet to something like "Form Responses"
3. Add headers to the first row: "Timestamp", "Email", "Message"

### 2. Create a Google Apps Script
1. In your Google Sheet, click on "Extensions" > "Apps Script"
2. Replace the default code with the following:

```javascript
function doPost(e) {
  // Parse the JSON data from the POST request
  const data = JSON.parse(e.postData.contents);
  
  // Get the active spreadsheet and sheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  
  // Add data to the sheet
  sheet.appendRow([
    data.timestamp,
    data.email,
    data.message
  ]);
  
  // Return success response
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Data added to spreadsheet'
  }))
  .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project with a name like "Form Handler"

### 3. Deploy the Google Apps Script as a Web App
1. Click on "Deploy" > "New deployment"
2. Select "Web app" as the deployment type
3. Set "Execute as" to "Me" (your Google account)
4. Set "Who has access" to "Anyone" (this allows the form to send data without authentication)
5. Click "Deploy" and authorize the app when prompted
6. Copy the Web App URL that appears after deployment

### 4. Update the Form's JavaScript
1. Open the `script.js` file in this project
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with the URL you copied in step 3.6

### 5. Test the Form
1. Open `index.html` in a web browser
2. Fill out the form and submit
3. Check your Google Sheet to confirm the data was received

## Notes
- The Google Apps Script is configured to accept cross-origin requests
- For security in production, consider implementing additional validation
- The web app is deployed with "Anyone" access for simplicity, but you may want to restrict access in production environments 