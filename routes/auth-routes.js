import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
 res.render("login");
});
router.post("/login", (req, res) => {
 const { usuario } = req.body;

 req.session.usuario = usuario;

 res.redirect("/panel");
});

router.get("/panel", (req, res) => {

 if (!req.session.usuario) {
   return res.redirect("/");
 }

 res.render("panel", {
   usuario: req.session.usuario
 });
});

router.get("/logout", (req, res) => {

 req.session.destroy(() => {
   res.redirect("/");
 });

});

export default router;