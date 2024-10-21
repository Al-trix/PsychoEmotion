import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/survey.routes.js";
import routesAdmin from "./routes/admin.routes.js";
import routesUserAdmin from "./routes/userAdmin.routes.js";
import cors from 'cors'
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/',routes);
app.use('/api/',routesUserAdmin);
app.use('/api/',routesAdmin);

export default app;
