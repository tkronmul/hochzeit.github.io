export default async function handler(req, res) {
      if (req.method === 'POST') {
            try {
                  // Daten speichern
                  const data = req.body;
                  console.log('Formulardaten:', data);
                  res.status(200).json({ message: 'Erfolgreich gespeichert' });
            } catch (error) {
                  res.status(500).json({message: 'Fehler beim Verarbeiten der Daten', error: error.message })
            }
      } else {
            res.seHeader('Allow', ['POST']);
      res.status(405).json({ message: 'Method not allowed' });
      }
      }
