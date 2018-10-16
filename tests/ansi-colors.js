var ansi = require("ansi-colors");

for(key in ansi.keys){
    ansi.keys[key].forEach(func => {
        console.log(ansi[func](`Voilà a test for ${func}.`));
    })
}

console.log(ansi.greenBright("\n The test is finished"));
process.exit(0);

