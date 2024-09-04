// Configure the headers for the application
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

export const headers = {
  "Access-Control-Allow-Headers":"Content-Type",
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Methods": "*",
}