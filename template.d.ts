import { MenuItemConstructorOptions } from "electron";

/**
 *
 * @returns {import('electron').MenuItemConstructorOptions[]} Template for use in `Menu.setApplicationMenu(Menu.buildFromTemplate(output))`
 *
 * @see https://www.electronjs.org/docs/api/menu#examples
 */
declare function defaultMenu(opts?: {
    /**
     * Github repo (without `*.git`), e.g. https://github.com/electron/electron
     */
    repo?: string;
    /**
     * Current tested OS's are `darwin` for macOS, `win32` for Windows, `linux` for Linux
     */
    platform?: string;
}): MenuItemConstructorOptions[];

export = defaultMenu;
