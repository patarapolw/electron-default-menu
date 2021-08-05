// @ts-check

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const yaml = require("js-yaml");
const template = require("../template")();

describe("Comparing template", () => {
    const menu = /** @type {import('electron').Menu} */ (
        yaml.load(
            fs.readFileSync(
                path.join(__dirname, `menu-${process.platform}.yml`),
                "utf-8"
            )
        )
    );

    it("All labels should be the same", () => {
        /**
         *
         * @param {typeof template} templ
         * @param {typeof menu} submenu
         */
        const comparison = (templ, submenu) => {
            assert.equal(
                templ.length,
                submenu.items.length,
                "template and dumped output must be of the same length"
            );

            templ.map((t, i) => {
                const templ =
                    /** @type {import('electron').MenuItemConstructorOptions[]} */ (
                        t.submenu
                    );

                if (templ) {
                    assert(
                        submenu.items[i].submenu,
                        `${t.label} doesn't have submenu items`
                    );
                    comparison(templ, submenu.items[i].submenu);
                }
            });
        };
        comparison(template, menu);
    });
});
