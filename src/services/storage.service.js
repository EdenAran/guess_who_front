function load(key) {
    var val = sessionStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function store(key, val) {
    sessionStorage[key] = JSON.stringify(val);
}


export const storageService = {
    load,
    store

}