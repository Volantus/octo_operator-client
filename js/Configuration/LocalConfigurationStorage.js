function LocalConfigStorage ()
{
}

/**
 * @param {string} key
 * @param {string|object|array} data
 */
LocalConfigStorage.setItem = function(key, data)
{
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * @param {string} key
 * @return {string|object|array}
 */
LocalConfigStorage.getItem = function (key)
{
    return JSON.parse(localStorage.getItem(key));
};
