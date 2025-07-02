import { Options } from "@/Components/SettingsDialog";

export async function updateSettings(options: Options): Promise<Response> {
  const token = sessionStorage.getItem('token');
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (token || "")
    },
    body: JSON.stringify(options)
  });
}