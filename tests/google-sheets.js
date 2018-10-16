const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const ansi = require("ansi-colors");

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = __dirname+'/google-token.json';
console.log(TOKEN_PATH)

// Load client secrets from a local file.
fs.readFile(__dirname+'/google-credentials.json', (err, content) => {
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
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        
        // Check if we have previously stored a token.
        try{
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err){
                    console.log("No previous token (2)")
                    return getNewToken(oAuth2Client, callback);
                }
                oAuth2Client.setCredentials(JSON.parse(token));
                callback(oAuth2Client);
            });
        }catch(except){
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
    * Prints the names and majors of students in a sample spreadsheet:
    * @see https://docs.google.com/spreadsheets/d/1_4-wPGsQqzcj2a9XG6bUuk1zhUT8E9N8fF3rjLNGE8U/edit#gid=0
    * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
    */
    
    const spreadsheetId = '1_4-wPGsQqzcj2a9XG6bUuk1zhUT8E9N8fF3rjLNGE8U'
    
    function mainProgram(auth) {
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: '1:2',
        }, (err, res) => {
            if (err) return console.log(ansi.redBright('The API returned an error: ' + err));
            const rows = res.data.values;
            if (rows.length) {
                // Print columns A and E, which correspond to indices 0 and 4.
                rows.map((row) => {
                    console.log(row);
                });
            } else {
                console.log('No data found.');
            }

            secondProgram(sheets);
        });
    }

function secondProgram(sheets){
    console.log("\n Now it's your turn to be on the spreadsheet.")
    var NAME = "";
        rl.question("What's your name? : ", (name)=>{
            askHeight(sheets,NAME);
        })
}
    
function askHeight(sheets, name){
    rl.question("What's your name? : ", (name)=>{
    })
    /*rl.question("How tall are you ? (in meters) : ", (height)=>{
        rl.close();

        console.log("Ok... Wait a second")
        var values = [[name], [height]];

        var body = {values: values}
        
        sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: "1:2",
            valueInputOption: "USER_ENTERED",
            ressource: body
        }, ((response)=>{                  
            var result = response.result;
            console.log(response)
            console.log(ansi.green(`\n ${result.updates.updatedCells} cells appended.`));
        }))
    })*/
}