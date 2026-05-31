import { Router } from "express";
import { auth } from "../auth-middleware.js";
const router = Router();
router.get("/", (req, res) => {
 res.render("login");
});
router.post("/login", (req,  res) => {

   const { usuario, password } = req.body;

   if (
       usuario === "admin" &&
       password === "1234"
   ) {

       req.session.usuario = usuario;

       return res.redirect("/panel");
   }

});

router.get(
   "/panel",
   auth,
   (req, res) => {
       res.render("panel", {
           usuario: req.session.usuario
       });

   }
);

router.get("/logout", (req, res) => {

 req.session.destroy(() => {
   res.redirect("/");
 });

});

export default router;