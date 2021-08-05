/**
 *
 * @param {string} [repo] Github repo (without `*.git`), e.g. https://github.com/electron/electron
 * @param {string} [platform] Current tested OS's are `darwin` for macOS, `win32` for Windows, `linux` for Linux
 * @returns {import('electron').MenuItemConstructorOptions[]} Template for use in `Menu.setApplicationMenu(Menu.buildFromTemplate(output))`
 *
 * @see https://www.electronjs.org/docs/api/menu#examples
 */
module.exports = function (
    repo = "https://github.com/electron/electron",
    platform = process.platform
) {
    const isMac = platform === "darwin";

    const template = [
        ...(isMac
            ? [
                  {
                      label: app.name,
                      submenu: [
                          { role: "about" },
                          { type: "separator" },
                          { role: "services" },
                          { type: "separator" },
                          { role: "hide" },
                          { role: "hideothers" },
                          { role: "unhide" },
                          { type: "separator" },
                          { role: "quit" },
                      ],
                  },
              ]
            : []),
        {
            role: "filemenu",
            submenu: [isMac ? { role: "close" } : { role: "quit" }],
        },
        {
            role: "editmenu",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                ...(isMac
                    ? [
                          { role: "pasteAndMatchStyle" },
                          { role: "delete" },
                          { role: "selectAll" },
                          { type: "separator" },
                          {
                              label: "Speech",
                              submenu: [
                                  { role: "startSpeaking" },
                                  { role: "stopSpeaking" },
                              ],
                          },
                      ]
                    : [
                          { role: "delete" },
                          { type: "separator" },
                          { role: "selectall" },
                      ]),
            ],
        },
        {
            role: "viewmenu",
            submenu: [
                { role: "reload" },
                { role: "forcereload" },
                { role: "toggledevtools" },
                { type: "separator" },
                { role: "resetzoom" },
                { role: "zoomin" },
                { role: "zoomout" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            role: "windowmenu",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [
                          { type: "separator" },
                          { role: "front" },
                          { type: "separator" },
                          { role: "window" },
                      ]
                    : [{ role: "close" }]),
            ],
        },
        {
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal(repo);
                    },
                },
                {
                    label: "Documentation",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal(`${repo}/wiki`);
                    },
                },
                {
                    label: "Community Discussions",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal(`${repo}/discussions`);
                    },
                },
                {
                    label: "Search Issues",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal(`${repo}/issues`);
                    },
                },
            ],
        },
    ];

    return template;
};
