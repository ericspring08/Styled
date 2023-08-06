const puppeteer = require("puppeteer")
const attributes = require("./attributes")
const fs = require("node:fs")
const womens = require("./womens.json")
const descriptions = require("./womensdescription.json")
const womansattributes = require("./womensattributes.json")

let jsonData = []

async function Scrape() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })

    const page = await browser.newPage()
    for (let i = 0; i < womens.length; i++) {
        await page.goto(womens[i].productUrl, {
            waitUntil: "domcontentloaded"
        })

        const data = await page.evaluate(() => {
            const element = document.querySelector(".I3-z").getElementsByTagName("ul")
            return element[0].innerHTML
        })

        jsonData.push({
            description: data,
            url: womens[i].productUrl
        })
    }

    await browser.close()
}

Scrape().then(() => {
    jsonData = JSON.stringify(jsonData)
    fs.writeFileSync("./womensdescription.json", jsonData)
})

let data = []
descriptions.map((description, index) => {
    let traits = []
    for (let i = 0; i < attributes.length; i++) {
        if (description.description.toLowerCase().includes(attributes[i].toLowerCase())) {
            traits.push(attributes[i])
        }
    }
    console.log(index)
    data.push(traits)
})

data = JSON.stringify(data)
fs.writeFileSync("./womensattributes.json", data)

let firesotreData = []
for (let i = 0; i < womansattributes.length; i++) {
    const id = womens[i].productId
    const title = womens[i].productName
    const brand = womens[i].brandName
    const price = womens[i].price
    const rating = womens[i].reviewRating
    const url = womens[i].productUrl
    const imageUrl = `https://m.media-amazon.com/images/I/${womens[i].msaImageId}._AC_SR1472,1840_.jpg`
    const attributes = womansattributes[i]
    firesotreData.push({
        id: id,
        title: title,
        brand: brand,
        price: price,
        rating: rating,
        url: url,
        imageUrl: imageUrl,
        attributes: attributes
    })
}

firesotreData = JSON.stringify(firesotreData)
fs.writeFileSync("./womansFirestoreData.json", firesotreData)




