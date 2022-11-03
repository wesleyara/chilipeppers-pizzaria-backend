import { prisma } from "../utils/prisma";
import express from "express";
import path from "path";

export const routes = express.Router();

const basepath = path.join(__dirname, "../../public/status.html");

routes.get("/", (_, res) => {
  res.json({
    message: "Server is running",
  });
});

routes.get("/status", (_, res) => {
  res.sendFile(basepath);
});

routes.post("/api/v1/status", async (req, res) => {
  const { status, key } = req.body;

  if (key.trim() !== process.env.SECRET_KEY) {
    return res.status(401).json({
      error: "Access denied",
    });
  }

  const data = await prisma.status.findMany();

  data.length === 0
    ? await prisma.status.create({
        data: { status },
      })
    : await prisma.status.update({
        where: { status: data[0].status },
        data: { status },
      });

  res.json({
    message: "Updated status, check all sites.",
  });
});

routes.get("/api/v1/status", async (_, res) => {
  const data = await prisma.status.findMany();

  res.json(data);
});
