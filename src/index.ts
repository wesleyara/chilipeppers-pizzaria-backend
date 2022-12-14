import cors from "cors";
import express from "express";
import { routes } from "./routes";

const app = express();

const port = process.env.PORT || 3333;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
