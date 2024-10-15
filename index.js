const port = 4326;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

// רשימת נקודות שמירה
let points = [
    { pointName: "חדר מצלמות", location: "צפון" },
    { pointName: "מחסן ראשי", location: "מערב" },
    { pointName: "חדר שמירה", location: "דרום" },
    { pointName: "בניין משרדים", location: "מזרח" },
    { pointName: "שער ראשי", location: "מזרח" },
    { pointName: "חניון אורחים", location: "מערב" }
];

app.get('/points', (req, res) => {
    res.status(200).json(points);
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
