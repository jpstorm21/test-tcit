import { Router } from "express";
import postCtrl from "../controllers/post.controller";

const router = Router();

//GET
router.get("/", postCtrl.getPosts);

//PUT
router.put("/edit", postCtrl.editPost);

//DELETE
router.delete("/delete/:id", postCtrl.deletePost);

//POST
router.post("/register", postCtrl.register);

// ALL
router.all("*", (req, res) => {
  res.status(404).json({
    message: "La ruta de la solicitud HTTP no es reconocida por el servidor.",
  });
});

export default router;
