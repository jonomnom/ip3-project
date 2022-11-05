import { Request, Response } from "express";
import * as express from "express";
import rentableNFTRouter from "../routes/rentableNFTRouter";

const app = express();

// middleware
// Uncomment this line if we want to start using ID token for authentication
// app.use(verifyIdToken);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/rentableNFT", rentableNFTRouter);

// routes

app.get("/", (req: Request, res: Response) =>
  res.status(200).send("hello IP3")
);
// Invalid routes
app.all("*", (req, res) => {
  res.status(404).send("API resource not found.");
});

export default app;
