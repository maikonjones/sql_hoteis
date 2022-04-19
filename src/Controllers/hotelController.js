const express = require('express');
const db = require('../db')
const router = express();



router.get('/list_all', (req, res) => {
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
        req.query.price = parseInt(req.query.price)
        new Promise ((resolve, reject) =>{
            db.query('SELECT * FROM hotels WHERE price <= ?', [req.query.price], (error, results) =>{
                if (error) {
                    reject(error); 
                    return
                }
                
                resolve(results)
                return res.send(results)
            })
        
        
        })
    }
    
} catch (error) {
    console.log(error)
}

});


router.post('/register', (req, res) => {
try {
    
    let {name, description, lat, lng, price, status, timestamp} = req.body

    new Promise ((resolve, reject) =>{
        db.query('INSERT INTO hotels (name, description, lat, lng, price, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, description, lat, lng, price, status, timestamp], (error, results) =>{
            if (error) {
                reject(error); 
                return
            }
            
            resolve(results)
            return res.send(results)
           
            
        })
    
    
    })
    
    
    
} catch (error) {
    console.log(error)
}
    
});


module.exports = app => app.use('/hotels', router)