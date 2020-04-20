const siteUrl = "<my-playlist-url>";
const axios = require("axios");
const util = require('util')
fs = require('fs');

const fetchData = async () => {
    const result = await axios.get(siteUrl);

    rawData = result.data.toString();
    newData = rawData.split('\"');

    let substring = '/watch?';
    let fullLinkArrayList = [];
    let vidIdArrayList = [];
    let videoIdFilter = 'v='

    newData.forEach(element => {
        // console.log(element);
        if (element.includes(substring)) {
            var res = element.split(";");
            let songWatchLink = res[0];
            let vidIdSplit = songWatchLink.split("=");
            let vidId = vidIdSplit[1];
            let beginLink = "https://www.youtube.com"
            var fullLink = beginLink.concat(songWatchLink);
            var fullLink = fullLink.concat(res[1]);
            if (!fullLinkArrayList.includes(fullLink) && res[2] !== undefined) {
                fullLinkArrayList.push(fullLink);
                vidIdArrayList.push(vidId);
            }
        }

    });

    return vidIdArrayList
};


module.exports = {
    fetchData: fetchData
}