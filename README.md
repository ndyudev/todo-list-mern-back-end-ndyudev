<h1 align="center">Todo List API – Backend (Node/Express + MongoDB)</h1>

<p align="center">
  <img alt="Node" src="https://img.shields.io/badge/Node-18+-339933?logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4-black" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

> API cho ứng dụng TodoX (MERN). Cung cấp CRUD nhiệm vụ, thống kê nhanh và lọc theo mốc thời gian (today/week/month/all).

---

## Tính năng
- Tạo / cập nhật / xóa nhiệm vụ
- Đánh dấu hoàn thành và tự động set/reset `completedAt`
- Lấy danh sách nhiệm vụ kèm thống kê `activeCount`/`completeCount`
- Lọc theo thời gian server-side: hôm nay / tuần này / tháng này / tất cả

## Công nghệ
- Node.js, Express
- MongoDB, Mongoose
- dotenv, cors

---

## Cấu trúc
```
src/
  controllers/
    tasksControllers.js
  routers/
    tasksRouters.js
  model/
    Task.js
  config/
    database.js
  server.js
```

---

## Yêu cầu
- Node.js >= 18
- MongoDB (Local hoặc Atlas)

## Cài đặt
```bash
npm install
```

## Biến môi trường (.env)
```
PORT_TODO_LIST=6971
MONGODB_CONNECTION=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173
```

## Chạy dự án
```bash
# Dev (hot reload)
npm run dev

# Production
npm start
```

Mặc định API chạy tại: `http://localhost:${PORT_TODO_LIST}` (vd: `http://localhost:6971`).

---

## API
Base URL: `/api/tasks`

| Method | Endpoint | Query | Body | Mô tả |
|-------|----------|-------|------|-------|
| GET   | /        | `filter=today|week|month|all` | - | Lấy tasks + thống kê |
| POST  | /        | -     | `{ "title": "..." }` | Tạo task |
| PUT   | /:id     | -     | `{ "title"?: "...", "status"?: "active|complete" }` | Cập nhật task, tự set/reset `completedAt` |
| DELETE| /:id     | -     | - | Xóa task |

Phản hồi `GET /api/tasks`:
```json
{
  "tasks": [
    { "_id":"...", "title":"...", "status":"active", "createdAt":"...", "completedAt":null }
  ],
  "activeCount": 0,
  "completeCount": 0
}
```

### Ghi chú lọc theo ngày
- `today`: `[00:00 hôm nay, 00:00 ngày mai)`
- `week`: `[thứ Hai tuần hiện tại, +7 ngày)`
- `month`: `[ngày 1 tháng này, ngày 1 tháng sau)`

---

## Triển khai
- Render/Railway/VPS
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Env: `PORT_TODO_LIST`, `MONGODB_CONNECTION`, `CORS_ORIGIN`

---

## Scripts
```json
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

---

## License
MIT © 2025 ndyudev


