import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function registration(email: string, password: string, registration: boolean) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL}/${registration ? "registration" : "login"}`, {
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
      sessionStorage.setItem("token", data);
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