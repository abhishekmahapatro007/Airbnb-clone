import express from 'express'
import { AddProperties,GetProperties,GetPropertyDetails } from '../controllers/properties.js'

const router = express.Router()

router.post('/add',AddProperties)
router.get('/get',GetProperties)
router.get('/:id',GetPropertyDetails)

export default router