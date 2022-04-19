require ('dotenv').config({path: __dirname + '/./../.env'})
const express = require('express');
const db = require('../Database/db')

const router = express();

const auth = 'Basic ' + Buffer.from(process.env.USER_LOGIN + ':' + process.env.USER_PASSWORD).toString('base64');



router.get('/list_all', async (req, res) => {
try {
    let thisAuth = BasicAuthorization(req.headers.authorization)
    if (!thisAuth)
        return res.send({error: 'Usuário não autenticado ou não autorizado a acessar essa área do sistema'})

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

    let thisAuth = BasicAuthorization(req.headers.authorization)
    if (!thisAuth)
        return res.send({error: 'Usuário não autenticado ou não autorizado a acessar essa área do sistema'})


    let {name, description, lat, lng, price, status, timestamp} = req.body

    new Promise ((resolve, reject) =>{
        db.query('INSERT INTO hotels (name, description, lat, lng, price, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, description, lat, lng, price, status, timestamp], (error, results) =>{
            if (error) {
                reject(error); 
                return
            }
            
            resolve(results)
            return res.send({message: 'Dados inseridos com sucesso!'})
           
            
        })
    
    
    })
    
    
    
} catch (error) {
    console.log(error)
}
    
});

router.put('/update', (req, res) => {
try {
    let thisAuth = BasicAuthorization(req.headers.authorization)
    if (!thisAuth)
        return res.send({error: 'Usuário não autenticado ou não autorizado a acessar essa área do sistema'})

    let {code, name, description, lat, lng, price, status, timestamp} = req.body


    console.log(req.body)
    new Promise ((resolve, reject) =>{
        db.query('UPDATE hotels SET name = ?, description = ?, lat = ?, lng = ?, price = ?, status = ?, timestamp = ?  WHERE id = ?', 
            [name, description, lat, lng, price, status, timestamp, code], (error, results) =>{
            if (error) {
                reject(error); 
                return
            }
            
            resolve(results)
            return res.send({message: 'Dados atualizados com sucesso!'})
            
            
        })
    
    
    })
    
    
    
} catch (error) {
    console.log(error)
}
    
});


function BasicAuthorization(parameters){
try{
    if (parameters !== auth)
        return false
    
    return true
    } catch (error) {
    throw error
}
}

module.exports = app => app.use('/hotels', router)