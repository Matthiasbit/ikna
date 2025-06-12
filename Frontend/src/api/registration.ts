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
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Registrierung fehlgeschlagen");
        return;
      }
      setSuccess(true);
      return data;
        } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      } else {
        setError("Unbekannter Fehler");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return { registration, loading, error, success };
}

export default useRegistration;