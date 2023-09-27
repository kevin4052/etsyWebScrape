import { getShopData } from './services/getShopData';
import { getSearchTopShops } from './services/searchTopShops';
import { ShopData } from './models/shopData';

const url: string = `https://www.etsy.com/`;
let searchTerm: string = "tarot mug";
const shopsListData: ShopData[] = [];

const prompt = "Type something: ";
process.stdout.write(prompt);
for await (const line of console) {
    console.log(`Searching for: ${line}`)
    searchTerm = line;
    break;
}

const shopsList = await getSearchTopShops(url, searchTerm);

for (let i in shopsList) {
    const shopData: ShopData = await getShopData(url, shopsList[i]);
    shopsListData.push(shopData);
}

console.log('total Shops: ', shopsListData.length)

shopsListData.sort((a, b) => Number(b.sales) - Number(a.sales))

Bun.write("shopData.json", JSON.stringify(shopsListData, null, 2));
