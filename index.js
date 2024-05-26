import qr from 'qr-image';
import fs from 'fs'; 
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/UrlSubmission", (req, res) => {
    const url = req.body["url"];
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('public/images/qr.png')); // Write to public/images folder
    
    fs.writeFile("public/URL.txt", url, (err) => {
        if (err) throw err;
        console.log(`Qr of the given URL is successfully generated.`);
        console.log('The file has been saved!');
    });
    
    res.render("showimage.ejs", { imageUrl: '/images/qr.png' }); // Render showimage.ejs with image URL
});

app.listen(port, () => {
    console.log(`Server started at port number ${port}`);
});