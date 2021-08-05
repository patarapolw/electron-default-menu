const fs = require('fs')

const { app, Menu } = require('electron')
const yaml = require('js-yaml')

async function main() {
    await app.whenReady()
    const out = process.argv[2] ? fs.createWriteStream(process.argv[2]) : process.stdout
    out.write(yaml.dump(Menu.getApplicationMenu(), { skipInvalid: true }))
    app.quit()
}

main()
