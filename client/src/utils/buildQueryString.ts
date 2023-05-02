/**
 * @description This method cycles through the data in an Object and uses them to generate a URL query string.
 * @param queryObj {Object} Object containing data to be converted to query string. 
 * @returns {String} The generated query string.
 */
const buildQueryString = (queryObj) => {
    const query = {};
    let queryString = ``;

    for (let key in queryObj) {
        if (queryObj[key]) {
            query[key] = queryObj[key];
            queryString += `${ key }=${ encodeURIComponent(queryObj[key]) }&`;
        }
    }
    
    // remove the trailing '&' from the generated query string.
    queryString = queryString.slice(0, queryString.lastIndexOf("&"));
    return queryString;
};

export { buildQueryString };
