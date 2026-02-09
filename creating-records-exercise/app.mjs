import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

// 📍 **** สร้าง API เพื่อใช้ในการเพิ่มข้อมูลหนังเรื่องใหม่ไปที่ Database ตรงนี้ ****
app.post("/movies", async (req, res) => {
  const newMovie = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO movies (title, description, genres, year, poster, rating) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        newMovie.title,
        newMovie.description,
        newMovie.genres,
        newMovie.year,
        newMovie.poster,
        newMovie.rating,
      ],
    );
    return res.status(201).json({
      message: "Movie has been created.",
    });
  } catch (error) {
    console.error("Error inserting movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
});
