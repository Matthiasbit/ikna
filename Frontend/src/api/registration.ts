import { useState } from "react";
import { z } from "zod";

const registrationSchema = z.object({
  email: z.string().email({ message: "Bitte eine gültige E-Mail-Adresse eingeben." }),
  password: z.string().min(1, { message: "Passwort erforderlich." }),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function registration(email: string, password: string, registration: boolean) {
    setLoading(true);
    setErrorMessage(null);
    setSuccess(false);

    const parseResult = registrationSchema.safeParse({ email, password });
    if (!parseResult.success) {
      setErrorMessage(parseResult.error.errors[0].message);
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/${registration ? "registration" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) setErrorMessage(data.error || "Registrierung fehlgeschlagen");
      else setSuccess(true);
      sessionStorage.setItem("token", data);
      return data;
    } catch (err: any) {
      setErrorMessage(err?.message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  return { registration, errormessage, loading, success };
}

export default useRegistration;