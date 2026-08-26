const SHEET_NAME = "Sheet1";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: "Sheet1을 찾을 수 없습니다." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const name = (e.parameter.name || "").trim();
  const message = (e.parameter.message || "").trim();

  if (!name || !message) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: "필수값이 없습니다." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"),
    name,
    message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const values = sheet.getDataRange().getDisplayValues();

  if (values.length <= 1) {
    return ContentService
      .createTextOutput(JSON.stringify({ data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = values[0];
  const rows = values.slice(1);

  const data = rows.map(row => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || "";
    });
    return item;
  });

  return ContentService
    .createTextOutput(JSON.stringify({ data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}
