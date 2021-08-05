const fs = require('fs')

const { app, Menu } = require('electron')
const yaml = require('js-yaml')

async function main() {
    await app.whenReady()
    fs.writeFileSync('menu.yml', yaml.dump(Menu.getApplicationMenu(), { skipInvalid: true }))
    app.quit()
}

main()
