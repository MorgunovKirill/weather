export const getValueFromStorage = (name) => {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(name);
    } else {
        window.alert('Please use a modern browser to properly view this template!');
    }
}

export const storeValueInStorage = (name, val) =>  {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(name, val);
    } else {
        window.alert('Please use a modern browser to properly view this template!');
    }
}