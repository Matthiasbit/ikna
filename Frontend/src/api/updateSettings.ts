export type UpdateSettingsOptions = {
  lernmethode: string;
  easy: number;
  medium: number;
  hard: number;
  shareSets: boolean;
  shareStats: boolean;
};

export async function updateSettings(options: UpdateSettingsOptions): Promise<Response> {
  const token = sessionStorage.getItem('token');
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/Settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (token || "")
    },
    body: JSON.stringify(options)
  });
}