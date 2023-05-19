import express, { Response, Request } from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "images/" });

router.post("/", upload.single("image"), function (req: Request, res: Response) {
  console.log(req.file);
  res.send(200);
});

export default router;
