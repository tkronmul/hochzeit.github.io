export default async function handler(req, res) {
      if (req.method === 'POST') {
        // Daten speichern
        res.status(200).json({ message: 'Erfolgreich gespeichert' });
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
      }
