import * as cheerio from "cheerio";
import { getSearchPageHTML } from "./etsy";

const getSearchTopShops = async (url: string, searchTerm: string) => {
    let shopList: string[] = [];
    let pageNumber: number = 1;

    while (shopList.length < 50 && pageNumber <= 20) {
        const searchResults = await getSearchPageHTML(url, searchTerm, pageNumber);
        const $ = cheerio.load(searchResults);
        const searchItems = $(".shop-name-with-rating");

        searchItems.each((i, item) => {
            const reviews = $(item).find("p.wt-text-body-smallest:first").text();
            const shopName = $(item)
                .find("p.wt-text-body-smallest:last > span:last")
                .prev()
                .text();

            if (reviews.includes("k") && shopList.indexOf(shopName) === -1) {
                shopList.push(shopName);
            }
        });

        pageNumber += 1;
        console.log(shopList.length)
    }

    return shopList;
}


export { getSearchTopShops };
