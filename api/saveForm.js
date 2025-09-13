export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Formulardaten empfangen:", data);

    return res.status(200).json({ message: "Daten erfolgreich gespeichert!", data });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
