import {useState} from "react";
import {z} from "zod";

const registrationSchema = z.object({
    email: z.string().email({message: "Bitte eine gültige E-Mail-Adresse eingeben."}),
    password: z.string().min(1, {message: "Passwort erforderlich."}),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useRegistration() {
    const [loading, setLoading] = useState(false);
    const [errormessage, setErrorMessage] = useState<string | null>(null);

    async function registration(email: string, password: string, registration: boolean):Promise<boolean> {
        setLoading(true);
        setErrorMessage(null);

        const parseResult = registrationSchema.safeParse({email, password});
        if (!parseResult.success) {
            setErrorMessage(parseResult.error.errors[0].message);
            setLoading(false);
            return false;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${registration ? "user" : "login"}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (!response.ok){ 
                setErrorMessage(data.error || "Registrierung fehlgeschlagen");
                return false;
            }

            sessionStorage.setItem("token", data);
            return true;

        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message || "Unbekannter Fehler"
                    : "Unbekannter Fehler";
            setErrorMessage(message);
            return false
        } finally {
            setLoading(false);
        }
    }

  return { registration, errormessage, setErrorMessage, loading };
}

export default useRegistration;