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

    /**
         *
         * @param {typeof template} templ
         * @param {typeof menu} submenu
         * @param {string} name
         */
    const comparison = (templ, submenu, name = 'ROOT') => {
        it(`${name}: compare label naming`, () => {
            assert.equal(templ.map((t) => t.label), submenu.items.map((t) => t.label))
        })

        const allLabels = new Set(submenu.items.map((t) => t.label))
        templ.map((t) => {
            if (t.label && allLabels.has(t.label)) {
                const newsub = submenu.items.find((t0) => t0.label === t.label)

                const templ =
                    /** @type {import('electron').MenuItemConstructorOptions[]} */ (
                        t.submenu
                    );

                if (templ) {
                    it(`${name}.${t.label}: must have submenu items`, () => {
                        assert(newsub)
                    })

                    comparison(templ, newsub.submenu, t.label);
                }
            }
        })
    };
    comparison(template, menu);
});
