import { prisma } from "../utils/prisma";
import express from "express";
import path from "path";
import { upload } from "../middleware";

export const routes = express.Router();

const basepath = path.join(__dirname, "../../public/static.html");

routes.get("/", (_, res) => {
  res.json({
    message: "Server is running",
  });
});

routes.get("/static", (_, res) => {
  res.sendFile(basepath);
});

routes.post(
  "/api/v1/items",
  upload.single("image"),
  async (req: any, res: any) => {
    const { name, description, p, m, g, gg, key } = req.body;

    if (key.trim() !== process.env.SECRET_KEY) {
      return res.status(401).json({
        error: "Access denied",
      });
    }

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      p.trim() === "" ||
      m.trim() === "" ||
      g.trim() === "" ||
      gg.trim() === "" ||
      !req.file
    ) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const filepathReplace = req.file.location
      .replace("chilipeppers.", "")
      .replace("us-east-1.", "");

    const item = await prisma.item.create({
      data: {
        name,
        image: filepathReplace,
        description,
        priceSmall: parseFloat(p),
        priceMedium: parseFloat(m),
        priceLarge: parseFloat(g),
        priceXLarge: parseFloat(gg),
      },
    });

    res.json({
      message: "Updated database.",
      data: item,
    });
  }
);

routes.get("/api/v1/items", async (_, res) => {
  const data = await prisma.item.findMany();

  res.json(data);
});
