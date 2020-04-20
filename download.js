var unirest = require("unirest");
const http = require('http');
fs = require('fs');
request = require('request');
const download = require('download');
const getVidList = require('./main')

function downloadVideo(videoId) {
    let downloadVideoPromise = new Promise((resolve, reject) => {
        var req = unirest("GET", "https://download-video-youtube1.p.rapidapi.com/redir.php");

        req.query({
            "video_id": videoId,
            "format": "mp3"
        });

        req.headers({
            "x-rapidapi-host": "download-video-youtube1.p.rapidapi.com",
            "x-rapidapi-key": "<api-key>"
        });


        req.end(function (res) {
            if (res.error) {
                reject(res.error)
            } else {
                resolve(res.body)
            }
        });
    })
    return downloadVideoPromise
}

function downloadListOfVideos(videoList) {
    promArr = []
    videoList.forEach((elem) => {
        promArr.push(downloadVideo(elem))
    })
    Promise.all(promArr).then((data) => {
        data.forEach((video) => {
            videoUrl = `http:${video.vidInfo[0]['dloadUrl']}`
            fileName = `output/${video.vidTitle}.mp3`
            console.log(videoUrl)

            // Download MP3
            console.log(videoUrl)
            download(videoUrl).pipe(fs.createWriteStream(fileName));
        })
    }).catch((err) => {
        console.log(err)
    })
}

// Execute
getVidList.fetchData().then((data) => {
    downloadListOfVideos(data)
}).catch((err) => {
    console.log(err)
})
