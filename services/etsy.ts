const getSearchPageHTML = async (url: string, searchTerm: string = '', pageNumber: number = 1) => {
    searchTerm = searchTerm.split(" ").join("+");

    const searchQuery: string = `q=${searchTerm}&ref=pagination&page=${pageNumber}`;
    const response = await fetch(`${url}/search?${searchQuery}`);
    const html = await response.text();

    return html;
}

const getShophPageHTML = async (url: string, shopName: string, query: string = '') => {
    const response = await fetch(`${url}/shop/${shopName}?${query}`);
    const html = await response.text();

    return html;
}

export { getSearchPageHTML, getShophPageHTML };