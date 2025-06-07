import { Router } from "express";
const router = Router();

router.post("/registrieren", (_, res) => {
  // Registrierungscode
  res.json({ message: "Registrierung erfolgreich" });
});

export default router;