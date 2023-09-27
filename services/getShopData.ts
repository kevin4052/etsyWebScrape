import * as cheerio from 'cheerio';
import { ShopData } from '../models/shopData';
import { getShophPageHTML } from './etsy';

const getShopData = async (url: string, shopName: string) => {
    const highestPriceQuery: string = '&sort_order=price_desc';
    const lowestPriceQuery: string = '&sort_order=price_asc';

    // fetch HTML
    const shopSitehighestPrice = await getShophPageHTML(url, shopName, highestPriceQuery);
    const shopSitelowestPrice = await getShophPageHTML(url, shopName, lowestPriceQuery);

    // loading page HTML into cheerio
    const $max = cheerio.load(shopSitehighestPrice);
    const $min = cheerio.load(shopSitelowestPrice);

    // selecting data from page HTML
    const sales: string = $max('.shop-sales-reviews > span:contains("|"):first').next().text().split(' ')[0].split(',').join('');
    const reviews: string = $max('.reviews-total > div:last').text().slice(1, -1);
    const numberOfListings: string = $max('ul.wt-tab').children('').first().children('span:last').text();
    const yearStarted: string = $max('#about > div > div > div.shop-home-wider-sections.wt-mr-lg-4 > div > div > div:nth-child(2) > span').text();
    const maxListingPrice: string = $max('.responsive-listing-grid > div:first').find('span.currency-value:first').text();
    const minListingPrice: string = $min('.responsive-listing-grid > div:first').find('span.currency-value:first').text();

    const shopData: ShopData = {
        name: shopName,
        url: `${url}shop/${shopName}`,
        reviews,
        sales,
        numberOfListings,
        yearStarted,
        maxListingPrice,
        minListingPrice
    };

    return shopData;
}



export { getShopData }

