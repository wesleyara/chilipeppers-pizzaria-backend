import { prisma } from "../utils/prisma";
import express from "express";
import path from "path";

export const routes = express.Router();

const basepath = path.join(__dirname, "../../public/static.html");

routes.get("/", (_, res) => {
  res.json({
    message: "Server is running",
  });
});

routes.get("/status", (_, res) => {
  res.sendFile(basepath);
});

routes.post("/api/v1/status", async (req, res) => {
  const { name, description, p, m, g, gg, key } = req.body;

  if (key.trim() !== process.env.SECRET_KEY) {
    return res.status(401).json({
      error: "Access denied",
    });
  }

  res.json({
    message: "Updated database.",
  });
});

routes.get("/api/v1/status", async (_, res) => {
  const data = await prisma.item.findMany();

  res.json(data);
});
