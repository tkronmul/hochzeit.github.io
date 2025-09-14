import { GoogleSpreadsheet } from 'google-spreadsheet';


export default async function handler(req, res) {
      const allowedOrigins =[
            'https://hochzeitsfeier-anna-tim.de',
            'https://localhost:5500'
            ];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
      }
      //res.setHeader('Access-Control-Allow-Origin', 'https://hochzeitsfeier-anna-tim.de');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (req.method === 'OPTIONS') {
            return res.status(200).end();
      }
      if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method ${req.method} not allowed' });
      }
      try {
       // Daten speichern
       const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
       await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
       });

       await doc.loadInfo();
       const sheet = doc.sheetsByIndex[0];

       const formData = req.body;
       await sheet.addRow(formData);

       return res-status(200).json({message: 'Data erfolgreich gespeichert'});
       /*
            let data = await new Promise((resolve, reject) => { //alt: req.body
                  let body = '';
                  req.on('data', chunk => body += chunk.toString());
                  req.on('end', () => resolve(JSON.parse(body)));
                  req.on('error', err => reject(err));
            });
            //if (typeof data === 'string') data = JSON.parse(data);
            console.log('Formulardaten:', data);
            return res.status(200).json({ message: 'Erfolgreich gespeichert' , received: data});
       */
      } catch (error) {
            console.error('Fehler in saveForm:', error);
            return res.status(500).json({message: 'Fehler beim Verarbeiten der Daten', error: error.message })
      }
      }
