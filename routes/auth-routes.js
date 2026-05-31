import { Router } from "express";
import { auth } from "../auth-middleware.js";
const router = Router();
const usuarios = [
   {
       usuario: "juan",
       password: "1234"
   },
   {
       usuario: "ana",
       password: "abcd"
   }
];

router.get("/", (req, res) => {
 res.render("login");
});
router.post("/login", (req,  res) => {

   const { usuario, password } = req.body;
    const usuarioEncontrado = usuarios.find(
       u =>
           u.usuario === usuario &&
           u.password === password
   );

   if (!usuarioEncontrado) {
       return res.render("login",{error: "login Incorrecto"});
   }

   req.session.usuario =
       usuarioEncontrado.usuario;

   res.redirect("/panel");

   

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