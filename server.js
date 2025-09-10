import express from 'express';

const app = express();

app.listen(5001, () => {
    console.log("Chạy trên cổng 5001");
});

app.get("/api/tasks", (req, res) => {
    res.status(200).send("Bạn có 1 việc cần làm");
})
