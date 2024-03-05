const axios = require('axios');

class ShazamController {
    static async discoverDashboard(req,res) {
        const url = 'https://shazam-core.p.rapidapi.com/v1/charts/world';
        const options = {
          headers: {
            'X-RapidAPI-Key': process.env.SHAZAM_X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.SHAZAM_X_RapidAPI_Host
          },
        };
        try {
            const response = await axios.get(url, options);
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


module.exports = ShazamController