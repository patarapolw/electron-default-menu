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
    const comparison = (templ, submenu, name = "ROOT") => {
        it(`${name}: compare label naming`, () => {
            assert.deepStrictEqual(
                templ.map((t) => t.role || t.label || ""),
                submenu.items.map((t) => t.role || t.label)
            );
        });

        const allLabels = new Set(submenu.items.map((t) => t.role || t.label));
        templ.map((t) => {
            const label = t.role || t.label;
            if (label && allLabels.has(label)) {
                const newsub = submenu.items.find(
                    (t0) => t0.role === t.role || t0.label === t.label
                );

                const templ =
                    /** @type {import('electron').MenuItemConstructorOptions[]} */ (
                        t.submenu
                    );

                if (templ) {
                    it(`${name}.${label}: must have submenu items`, () => {
                        assert(newsub.submenu);
                    });

                    comparison(templ, newsub.submenu, t.label);
                }
            }
        });
    };
    comparison(template, menu);
});
