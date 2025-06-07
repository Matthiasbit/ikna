import { useState } from "react";

function useRegistrierung() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function registrieren(email: string, password: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:80/registrieren", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Registrierung fehlgeschlagen");
      }
      setSuccess(true);
      return await response.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { registrieren, loading, error, success };
}

export default useRegistrierung;