const Address = require('../models/index').Address;

exports.getAddress = async (req, res) => {
    const addressId = req.params.id;
    const address = await Address.findByPk(addressId);
    res.status(200).json(address);  
};

exports.updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const {city, district} = req.body; 

    if(!addressId) return res.status(400).send('Address ID is required');   
    try{
        const address = await Address.findByPk(addressId);
        if(!address) return res.status(404).send('Address not found');
        address.city = city || address.city;
        address.district = district || address.district;
        await address.save();
        res.status(200).send('Address updated successfully');
    }catch(error){
        res.status(500).send('Error: ' + error.message);
    }
}




