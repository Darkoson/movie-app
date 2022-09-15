import express from "express";
import * as MovieCtrl from "./controllers/movie-controller";
import * as DirectorCtrl from "./controllers/director-controller";

const router = express.Router();

// movies routes
router.post("/movies", MovieCtrl.postMovie);
router.get("/movies", MovieCtrl.getAllMovies);
router.get("/movies/:id", MovieCtrl.getMovie);
router.put("/movies/:id", MovieCtrl.updateMovie);
router.delete("/movies/:id", MovieCtrl.deleteMovie);

// director routes
router.post("/directors", DirectorCtrl.postDirector);
router.get("/directors", DirectorCtrl.getAllDirectors);
router.get("/directors/:id", DirectorCtrl.getDirector);
router.put("/directors/:id", DirectorCtrl.updateDirector);
router.delete("/directors/:id", DirectorCtrl.deleteDirector);

export default router;
