const fs = require('fs')
const path = require('path')

const { app, Menu } = require('electron')
const yaml = require('js-yaml')

async function main() {
    await app.whenReady()
    fs.writeFileSync('menu.yml', yaml.dump(Menu.getApplicationMenu(), { skipInvalid: true }))
    fs.copyFileSync('menu.yml', path.join(__dirname, `menu-${process.platform}.yml`))
    app.quit()
}

main()
