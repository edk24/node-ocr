const fs = require('fs')
const tesseract = require("node-tesseract-ocr")
const formidable = require("formidable");
const express = require('express')
const app = express()

// 跨域
const cors = require('cors');
app.use(cors());

// ocr 配置
const ocrConfig = {
    lang: "chi_sim",
    // oem: 1,
    // psm: 3,
}

// 首页
app.get('/', (req, res) => {
    res.send('Hello :)')
})

// 识别图像
app.post('/api/ocr', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if (!files.img) {
            res.send({code:400, error:'没有识别对象'})
        }
        const img = fs.readFileSync(files.img.filepath)
        tesseract
            .recognize(img, ocrConfig)
            .then((text) => {
                res.send({code:200, result: text})
            })
            .catch((error) => {
                res.send({code:400, error: error.message})
            })
    });
})

// 图像识别ex
// app.post('/api/ocr', (req, res) => {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (error, fields, files) {
//         if (!files.img) {
//             res.send({code:400, error:'没有识别对象'})
//         }
//         const img = fs.readFileSync(files.img.filepath)
//         tesseract
//             .recognize(img, ocrConfig)
//             .then((text) => {
//                 res.send({code:200, result: text})
//             })
//             .catch((error) => {
//                 res.send({code:400, error: error.message})
//             })
//     });
// })


const server = app.listen(3000, function () {
    const { address, port } = server.address();

    console.log('server listening at http://%s:%s', address, port);
});
