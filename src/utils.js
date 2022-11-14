
export const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
};

export const trimEntries = (array) => {
    return array.map((x) => x.trim());
};

export const dropItem = (array, item) => {
    return array.filter((e) => e !== item);
};

export const anyArrayIsEmpty = (arrays) => {
    let ind = false;
    arrays.forEach((arr) => {
        if (arr.length === 0) ind = true;
    });
    return ind;
};

export const parseCost = (num) => {
    let res = parseFloat(parseFloat(num).toFixed(2));
    if (!res) {
        return 0.00;
    } else {
        return res;
    };
};

export const round = (num, place) => {
    return parseFloat(parseFloat(num).toFixed(place));
}

export const roundDisplay = (num, place) => {
    return parseFloat(num).toFixed(place);
}

export const costDisplay = (num) => {
    return '$' + parseFloat(num).toFixed(2);
}

export const percentDispay = (num) => {
    return (parseFloat(num) * 100).toFixed(1) + '%';
}
