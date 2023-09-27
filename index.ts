import { getShopData } from './services/getShopData';
import { getSearchTopShops } from './services/searchTopShops';
import { ShopData } from './models/shopData';
import * as cliProgress from 'cli-progress';

const barGettingShopsData = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

const url: string = `https://www.etsy.com/`;
let searchTerm: string = "";
const shopsListData: ShopData[] = [];

const prompt = "Type something: ";
process.stdout.write(prompt);
for await (const line of console) {
    console.log(`Searching for: ${line}`)
    searchTerm = line;
    break;
}

const shopsList = await getSearchTopShops(url, searchTerm);
barGettingShopsData.start(shopsList.length, 0);

for (let i in shopsList) {
    const shopData: ShopData = await getShopData(url, shopsList[i]);
    shopsListData.push(shopData);
    barGettingShopsData.increment();
}

barGettingShopsData.stop();

shopsListData.sort((a, b) => Number(b.sales) - Number(a.sales))

Bun.write("shopData.json", JSON.stringify(shopsListData, null, 2));
