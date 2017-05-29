var nodes = {
    pool: {},
    /**
     * return specified dom
     * if it doesnt exist in pool, get it and cache it in pool
     * @param {*} key 
     */
    getDOM(key) {
        if (nodes.pool.hasOwnProperty(key)) {
            return nodes.pool[key]
        } else {
            return nodes.pool[key] = document.querySelector('#' + key)
        }
    }
}

module.exports = nodes