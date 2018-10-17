const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const ansi = require("ansi-colors");

if (process.platform == "win32" || true) {
    console.log(ansi.redBright("To access this test on Windows, please run : ") + ansi.bold("node " + __filename))
    process.exit(1);
}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = __dirname + '/google-token.json';

// Load client secrets from a local file.
fs.readFile(__dirname + '/google-credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), mainProgram);
});

/**
* Create an OAuth2 client with the given credentials, and then execute the
* given callback function.
* @param {Object} credentials The authorization client credentials.
* @param {function} callback The callback to call with the authorized client.
*/
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    try {
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                console.log("No previous token (2)")
                return getNewToken(oAuth2Client, callback);
            }
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    } catch (except) {
        console.log("No previous token (1)")
    }
}

/**
* Get and store new token after prompting for user authorization, and then
* execute the given callback with the authorized OAuth2 client.
* @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
* @param {getEventsCallback} callback The callback for the authorized client.
*/
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log(ansi.green('Authorize this app by visiting this url:'));
    console.log(ansi.blue(authUrl))

    rl.question(ansi.gray('Enter the code from that page here: '), (code) => {
        rl.close();

        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
* Prints the names and height of people in our club
* @see https://docs.google.com/spreadsheets/d/1_4-wPGsQqzcj2a9XG6bUuk1zhUT8E9N8fF3rjLNGE8U/edit#gid=0
* @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
*/

const spreadsheetId = '1_4-wPGsQqzcj2a9XG6bUuk1zhUT8E9N8fF3rjLNGE8U'
var sheetData = null;
function mainProgram(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: '1:2',
    }, (err, res) => {
        if (err) return console.log(ansi.redBright('The API returned an error: ' + err));
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.

            console.log(rows);
            sheetData = rows;
        } else {
            console.log('No data found.');
        }

        secondProgram(sheets);
    });
}

function secondProgram(sheets) {
    console.log("\n Now it's your turn to be on the spreadsheet.")
    var NAME = "";
    rl.question("Telle me about you (Name/Height ==> Killian/1,72) : ", (answer) => {
        rl.close();

        var regexp = /(.*)\/(.*)/i.exec(answer);
        var name = regexp[1];
        var height = regexp[2];

        console.log("Ok... Wait a second")
        var values = [[name], [height]];

        var body = { values: values }

        var range = String.fromCharCode("A".charCodeAt(0) + sheetData[0].length) + "1:" + String.fromCharCode("A".charCodeAt(0) + sheetData[0].length) + "2";

        sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: "USER_ENTERED",
            resource: body
        }, (err, result) => {
            if (err) {
                // Handle error.
                console.log(err);
            } else {
                console.log(ansi.green(`${result.data.updates.updatedCells} cells appended.`));

                console.log("\n You can see the sheet at : " + ansi.blue("https://docs.google.com/spreadsheets/d/1_4-wPGsQqzcj2a9XG6bUuk1zhUT8E9N8fF3rjLNGE8U/"))
                console.log(ansi.greenBright("\n The test is finished. \n"))
                process.exit(0);
            }
        })

    })
}