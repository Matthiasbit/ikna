
export async function getCardsBySetId(setId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getCards?setId=${setId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });

    if (!res.ok) throw new Error("Fehler beim Laden der Karten");
    return await res.json();
}
