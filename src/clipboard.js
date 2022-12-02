import { costDisplay, percentDispay } from "./utils";

export const clipboardResults = (tab) => {

    let text = '―― Tab ――\n';

    Object.keys(tab.charges).forEach((p) => {
        text = text.concat(`${p}: ${costDisplay(tab.charges[p].total)}\n`);
    });

    text = text.concat(`\nTotal: ${costDisplay(tab.total)}\n`);
    if (tab.tax > 0 || tab.tip > 0) {
        text = text.concat(`(includes ${costDisplay(tab.tax)} tax and ${costDisplay(tab.tip)} tip)`);
    }

    navigator.clipboard.writeText(text);
}

export const clipboardDetails = (tab) => {

    let text = '';

    Object.keys(tab.charges).forEach((p) => {
        text = text.concat(`―― ${p} ――\n`);
        text = text.concat(`Items: \n`);
        tab.charges[p].items.forEach((x) => {
            if (x.owner.length > 1) {
                text = text.concat(` - ${x.name} (${costDisplay(x.cost)} ÷ ${x.owner.length})\n`);
            } else {
                text = text.concat(` - ${x.name} (${costDisplay(x.cost)})\n`);
            }
        });

        text = text.concat(`Sub: ${costDisplay(tab.charges[p].subtotal)}\n`);
        text = text.concat(`Tax: ${costDisplay(tab.charges[p].tax)}\n`);
        text = text.concat(`Tip: ${costDisplay(tab.charges[p].tip)}\n`);
        text = text.concat(`Total: ${costDisplay(tab.charges[p].total)}\n\n`);
    });

    text = text.concat(`―― Overall ――\n`);
    text = text.concat(`Subtotal: ${costDisplay(tab.subtotal)}\n`);
    text = text.concat(`Tax: ${costDisplay(tab.tax)} (${percentDispay(tab.taxProportion)})\n`);
    text = text.concat(`Tip: ${costDisplay(tab.tip)} (${percentDispay(tab.tipProportion)})\n`);
    text = text.concat(`Total: ${costDisplay(tab.total)}\n`);

    navigator.clipboard.writeText(text);
}
