import City from '../models/city.js';

const controller = {
    getCities: async (req, res) => {
        let queries = {};
        if(req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i');
        }
        try {
            const cities = await City.find(queries);
            if(cities.length > 0) {   
                return res.status(200).json({
                    success: true,
                    cities: cities
                })
            }
            return res.status(404).json({
                succes: false,
                message: 'No Cities matching your search'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting a Cities give a ERROR'
            })
        }
    },
    getCityById: async (req, res) => {
        try {
            const singleCity = await City.findById(req.params.id);

            if(singleCity) {
                res.status(200).json({
                    success: true,
                    city: singleCity
                })
            }
            return res.status(404).json ({
                success: false,
                message: 'City not found'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting City ERROR'
            })
        }
    },
    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'City created'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Failed to create City'
            })
        }
    }
}

export default controller;