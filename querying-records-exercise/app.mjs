import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const result = await pool.query(
      "select * from movies where movie_id = $1",
      [movieId],
    );

    return res.json({
      data: result.rows[0],
    });
  } catch (e) {
    return res.json({
      error: "ไม่สามารถเชื่อมต่อ Database ได้",
    });
  }
});

// 📍 **** สร้าง API เพื่อใช้ในการดูข้อมูลหนังแต่ละเรื่องด้วย movieId ตรงนี้ ****

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
});
