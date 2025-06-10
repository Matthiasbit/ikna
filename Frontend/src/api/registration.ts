import { useState } from "react";

function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function registration(email: string, password: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:80/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Registrierung fehlgeschlagen");
      }
      setSuccess(true);
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        setError("Unbekannter Fehler");
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }

  return { registration, loading, error, success };
}

export default useRegistration;