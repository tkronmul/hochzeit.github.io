export default async function handler(req, res) {
      res.setHeader('Access-Control-Allow-Origin', 'https://hochzeitsfeier-anna-tim.de');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Heaaders', 'Content-Type');
      if (req-method === 'OPTIONS') return res.status(200).end();
      if (req.ethod !== 'POST') {
            return res.status(405).json({ message: 'Method ${req.method} not allowed' });
      }
      try {
            // Daten speichern
            let data = req.body;
            if (typeof data === 'string') data = JSON.parse(data);
            console.log('Formulardaten:', data);
            return res.status(200).json({ message: 'Erfolgreich gespeichert' , received: data});
      } catch (error) {
            console.error('Fehler in saveForm:', error);
            return res.status(500).json({message: 'Fehler beim Verarbeiten der Daten', error: error.message })
      }
      }
