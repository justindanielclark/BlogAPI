import { appendFile } from "fs";
import { Request, Response } from "express";

export default async function logErrors(err: Error, req: Request, res: Response) {
  if (err.name !== "NotFoundError") {
    const date = new Date();
    const errorLog = `
		\n=====TIMELOG=====\n
		Error Date: ${date.getMonth() + 1}-${date.getDate() + 1}-${date.getFullYear()}
		Error Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
		\n=====NAME========\n
		${err.name}
		\n=====MESSAGE=====\n
		${err.message}
		\n=====STACK=======\n
		${err.stack}
		`;
    appendFile("./errorLog.txt", errorLog, (e) => {
      if (e) {
        console.error("Failure to log error");
      }
    });
    return res.sendStatus(500);
  }
  return res.sendStatus(404);
}
