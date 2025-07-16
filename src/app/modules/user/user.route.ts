import { Router } from "express";
import { UserControler } from "./user.controller";

const router = Router();

router.post("/register", UserControler.createUser);
router.get("/all-users", UserControler.getAllUsers);

export const UserRoutes = router;
