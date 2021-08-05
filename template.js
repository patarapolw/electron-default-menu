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
            label: "File",
            submenu: [isMac ? { role: "close" } : { role: "quit" }],
        },
        {
            label: "Edit",
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
                          { role: "selectAll" },
                      ]),
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            label: "Window",
            role: "window",
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
            label: "Help",
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
