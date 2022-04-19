const express = require('express');
const db = require('../db')
const router = express();



router.get('/list_all', async (req, res) => {
try {

    if (req.query.allData){
        new Promise ((resolve, reject) =>{
            db.query('SELECT * FROM hotels', (error, results) =>{
                if (error) {
                    reject(error); 
                    return
                }
                
                resolve(results)
                return res.send(results)
            })
        
        
        })
    }
    if (req.query.hotelCode){
        req.query.hotelCode = parseInt(req.query.hotelCode)
        new Promise ((resolve, reject) =>{
            db.query('SELECT * FROM hotels WHERE id = ?', [req.query.hotelCode], (error, results) =>{
                if (error) {
                    reject(error); 
                    return
                }
                
                resolve(results)
                return res.send(results)
            })
        
        
        })
    }
    if (req.query.price){
        
    }
    
} catch (error) {
    console.log(error)
}

});



module.exports = app => app.use('/hotels', router)