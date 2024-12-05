import properties from "../models/properties.js";

export const AddProperties = async(req, res, next) => {
    try {
        const { title, desc, img, rating, location, price} = req.body
        const Property = new properties({
            title, 
            desc, 
            img, 
            rating, 
            location, 
            price
        })
        const createdProperty = await Property.save()
        return res.status(201).json({message:"Property added successfully",createdProperty})
    } catch (error) {
        next(err)
    }
}
export const GetProperties = async(req, res, next) => {
    try {
        let { search } = req.query
        const filter = {}

        if(search){
            filter.$or = [
                {title : { $regex: new RegExp(search,"i") }},
                { desc : { $regex: new RegExp(search,"i") }},
                { location : { $regex: new RegExp(search,"i") }},
            ]
        }
        const Properties = await properties.find(filter,{
            title: 1,
            desc : 1, 
            img : 1, 
            rating : 1, 
            location : 1, 
            price : 1
        })
        return res.status(200).json(Properties)
    } catch (error) {
        next(err)
    }
}
export const GetPropertyDetails = async(req, res, next) => {
    try {
        const { id } = req.params
        const property = await properties.findById(id)

        return res.status(200).json(property)
    } catch (error) {
        next(err)
    }
}