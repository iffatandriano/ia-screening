module.exports = {
    setItem: async (key, value) => await localStorage.setItem(key, value),
    getItem: async (key, value) => await localStorage.getItem(key, value),
    clear: async () => await localStorage.clear(),
}