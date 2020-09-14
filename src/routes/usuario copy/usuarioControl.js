// loguin, buscdor de usuario y contrase;a(validaci[on]) 

exports.login = async(req,res,next) => {
    try{
        const {Email, Password} = req.body;
        const user = await user.findOne({Email});
        if (!user) return nest (new Error('Email no registrado'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return nest (new Error('Contrasena incorrecta'))
        const accesToken = jwt.sign({userId: user._id}, process.send,JWT_SECRET, {
            expiresIn: "1d"
        });
        await user.findByIdAndUpdate(user._id,{accesToken})
        res.status(200).json({
            data :{Email :user.email, Role:user.role},
            accessToken
        })
    } catch (error){
        next (error);
    }
}