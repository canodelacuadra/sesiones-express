import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth-routes.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Middleware de sesión
app.use(
 session({
   secret: "mi_secreto",
   resave: false,
   saveUninitialized: false,
   cookie: {
     maxAge: 1000 * 60 * 30
   }
 })
);

app.use(authRoutes);

app.listen(3000, () => {
 console.log("Servidor iniciado");
});

