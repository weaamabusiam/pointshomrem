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
// הוספת נקודת שמירה (CREATE)
app.post('/points', (req, res) => {
    let newPoint = { pointName: req.body.pointName, location: req.body.location };
    points.push(newPoint);
    res.status(200).json("נקודת השמירה נוספה בהצלחה");
});

app.patch('/points/:idx', (req, res) => {
    let idx = req.params.idx;
    if (points[idx]) {
        points[idx].pointName = req.body.pointName;
        points[idx].location = req.body.location;
        res.status(200).json("נקודת השמירה עודכנה בהצלחה");
    } else {
        res.status(400).json("נקודת שמירה לא נמצאה");
    }
});

app.get('/points', (req, res) => {
    res.status(200).json(points);
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
