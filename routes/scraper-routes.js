const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

const db = require("../models");

module.exports = function (app) {
    app.get('/scrape', function (req, res) {
        axios.get('http://www.slickdeals.com').then(function (html) {
            const $ = cheerio.load(html.data);
           
        //    TODO: Sharpen focus of list items to not grab featured deals
            const listItems = $('div.fpItem');
            const insertData = [];

            listItems.each(function (i, listItem) {

                const title = $(listItem).find('div.itemImageLink').find('a.itemTitle').text();
                const url = $(listItem).find('a.itemTitle').attr('href');
                 const vendor = $(listItem).find('a.itemStore').text();
                const image = $(listItem).find('div.imageContainer').children().attr('src');
                const price = $(listItem).find('div.itemPrice').text().trim();
                const msrp = $(listItem).find('span.oldListPrice').text();
                const popularity = $(listItem).find('div.likes').find('span.count').text();
                const shipping = $(listItem).find('div.priceInfo').text();

                insertData.push({
                    title: title,
                    url: url,
                    vendor: vendor,
                    image: image,
                    price: price,
                    msrp: msrp,
                    popularity: popularity,
                    shipping:shipping
                })
            })

            res.send(insertData)

        })
    })
}