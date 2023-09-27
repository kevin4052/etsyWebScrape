import * as cheerio from "cheerio";
import * as cliProgress from 'cli-progress';
import { getSearchPageHTML } from "./etsy";

const getSearchTopShops = async (url: string, searchTerm: string) => {
    let shopList: string[] = [];
    let pageNumber: number = 1;
    const barGettingShopList = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
    barGettingShopList.start(50, 0);

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

            if (reviews.includes("k")) {
                shopList.push(shopName);
            }
        });

        pageNumber += 1;
        barGettingShopList.update(shopList.length);
    }

    barGettingShopList.stop();
    return [...new Set(shopList)];
}


export { getSearchTopShops };
