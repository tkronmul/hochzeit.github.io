export default async function handler(req, res) {
      if (req.method === 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ message: 'Method &{req.method} not allowed' });
            
            try {
                  // Daten speichern
                  let data = req.body;
                  if (typeof data === 'string') {
                        data = JSON.parse(data);
                  }
                  console.log('Formulardaten:', data);
                  return res.status(200).json({ message: 'Erfolgreich gespeichert' , received: data});
            } catch (error) {
                  console.error('Feler in saveForm:', error)
                  return res.status(500).json({message: 'Fehler beim Verarbeiten der Daten', error: error.message })
            }
      } 
      }
