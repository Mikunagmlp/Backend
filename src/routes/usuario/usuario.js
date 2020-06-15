const express = require('express');
// creamos el router para todas nuestras peticiones
const router = new express.Router();

const User = require('../../models/usuario');
// token
const bcrypt = require('bcrypt')

/* 
Nueva entrada
async function hashPassword(password){
    return await bcrypt.hash(Password ,10);
}
async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword, hashedPassword);
}
    exports.signup = async (req,res,next) ={
        try{1
            const {NombreCompleto, Email, Role, accestoken, Password, Telefono, Direccion, Genero, Estado} = req.body
            const hashedPassword = await hashPassword(password);
            const newUSer = new User({Email, Role,Password: hashedPassword, role:role || "admi" });
            const accesToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
            newUSer.accesToken = accessToken;
            await newUser.save();
            res.json({
                data:newUSer,
                accesToken
            })

        } catch (error){
            next(error)
        }
    }


*/
// Login Usuario
router.post('/user/login', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        const user = await User.encontrarUsuario( email, password );

        res.send( user );
    } catch (e) {
        res.status(400).send();
    }
});

router.get('/user/edit',async(req,res)=>{
    res.send('Estamos en user Edit');
} )

module.exports = router;
