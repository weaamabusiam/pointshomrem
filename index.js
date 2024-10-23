const port = 4325;

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

// רשימת ביקורים
let visits = [];

// הוספת נקודת שמירה (CREATE)
app.post('/points', (req, res) => {
    let newPoint = { pointName: req.body.pointName, location: req.body.location };
    points.push(newPoint);
    res.status(201).json("נקודת השמירה נוספה בהצלחה");
});

// הצגת כל נקודות השמירה (READ)
app.get('/points', (req, res) => {
    res.status(200).json(points);
});

// עדכון נקודת שמירה לפי אינדקס (UPDATE)
app.patch('/points/:idx', (req, res) => {
    let idx = parseInt(req.params.idx);
    if (points[idx]) {
        points[idx].pointName = req.body.pointName; // עדכון שם הנקודה
        points[idx].location = req.body.location; // עדכון מיקום הנקודה
        res.status(200).json("נקודת השמירה עודכנה בהצלחה");
    } else {
        res.status(404).json("נקודת שמירה לא נמצאה");
    }
});

// מחיקת נקודת שמירה לפי אינדקס (DELETE)
app.delete('/points/:idx', (req, res) => {
    let idx = parseInt(req.params.idx);
    if (points[idx]) {
        points.splice(idx, 1);
        res.status(200).json(points);
    } else {
        res.status(404).json("נקודת שמירה לא נמצאה");
    }
});

// הוספת ביקור (CREATE)
app.post('/visit', (req, res) => {
    let newVisit = {
        pointName: points[req.body.point_id].pointName,
        visitTime: new Date()
    };
    visits.push(newVisit);
    res.status(200).json("הביקור נשמר בהצלחה");
});

// הצגת כל הביקורים (READ)
app.get('/visits', (req, res) => {
    res.status(200).json(visits);
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
