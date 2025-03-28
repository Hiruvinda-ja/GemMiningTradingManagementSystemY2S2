const { addSupplier, getSuppliers, deletesupplier, updateSupplier } = require('../Controllers/supplierController')

const router=require('express').Router()

//create endpoints
router.post('/add-supplier',addSupplier)
router.get('/get-suppliers',getSuppliers)
router.delete('/delete-supplier/:id',deletesupplier)
router.put('/update-supplier/:id', updateSupplier)

module.exports=router

