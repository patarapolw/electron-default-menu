import { MenuItemConstructorOptions } from "electron";

/**
 *
 * @param {string} [repo] Github repo (without `*.git`), e.g. https://github.com/electron/electron
 * @param {string} [platform] Current tested OS's are `darwin` for macOS, `win32` for Windows, `linux` for Linux
 * @returns {import('electron').MenuItemConstructorOptions[]} Template for use in `Menu.setApplicationMenu(Menu.buildFromTemplate(output))`
 *
 * @see https://www.electronjs.org/docs/api/menu#examples
 */
declare function defaultMenu(platform?: string): MenuItemConstructorOptions[];

export = defaultMenu;
