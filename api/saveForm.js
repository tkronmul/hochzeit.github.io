// api/saveForm.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Beispiel: Schreibe ins Log (in Vercel -> Functions -> Logs sichtbar)
    console.log("Formulardaten empfangen:", data);

    // Hier könntest du die Daten:
    // - an eine Datenbank (z.B. Supabase, MongoDB Atlas, Firebase) schicken
    // - oder an eine externe API weiterleiten
    // - oder in eine JSON-Datei schreiben (lokal geht nicht -> besser DB nutzen)

    return res.status(200).json({ message: "Daten gespeichert", data });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
