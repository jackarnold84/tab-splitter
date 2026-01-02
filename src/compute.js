import { parseCost, round } from "./utils";

export const runningSubtotal = (itemList) => {
    let subtotal = 0.00;
    itemList.forEach((item) => {
        const quantity = parseInt(item.quantity) || 1;
        subtotal += parseCost(item.cost) * quantity;
    });
    return subtotal;
}


export const tabSplitResults = (personList, itemList, addedCharges) => {

    // compute totals
    let subtotal = 0.00;
    let tax = parseCost(addedCharges.tax) + parseCost(addedCharges.surcharges);
    let tip = parseCost(addedCharges.tip);

    itemList.forEach((item) => {
        const quantity = parseInt(item.quantity) || 1;
        subtotal += parseCost(item.cost) * quantity;
    });

    let total = subtotal + tax + tip;
    let taxProportion = subtotal > 0 ? tax / subtotal : 0;
    let tipProportion = subtotal > 0 ? tip / subtotal : 0;

    // create entry for each person
    let charges = Object.fromEntries(
        personList.map((p) => (
            [
                p,
                {
                    items: [],
                    subtotal: 0.00,
                    tax: 0.00,
                    tip: 0.00,
                    total: 0.00,
                }
            ]
        ))
    );

    // assign items to people
    itemList.forEach((item) => {
        let nOwners = item.owner.length;
        const quantity = parseInt(item.quantity) || 1;
        const itemTotalCost = parseCost(item.cost) * quantity;
        item.owner.forEach((owner) => {
            charges[owner].items.push({
                'name': item.name,
                'cost': itemTotalCost,
                'owner': item.owner,
            });
            charges[owner].subtotal += itemTotalCost / nOwners;
        })
    });

    // compute totals by person
    Object.keys(charges).forEach((p) => {
        const personSubtotal = charges[p].subtotal;
        charges[p].subtotal = parseCost(charges[p].subtotal);
        charges[p].tax = parseCost(personSubtotal * taxProportion);
        charges[p].tip = parseCost(personSubtotal * tipProportion);
        charges[p].total = parseCost(
            charges[p].subtotal +
            (personSubtotal * taxProportion) +
            (personSubtotal * tipProportion)
        );
    });

    return {
        subtotal: subtotal,
        tax: tax,
        tip: tip,
        total: total,
        taxProportion: round(taxProportion, 3),
        tipProportion: round(tipProportion, 3),
        charges: charges
    };

}
