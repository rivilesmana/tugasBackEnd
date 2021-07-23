// const helper = require('../helper/response')
const response = require('../helper/response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const {getAllUserModel, postUserModel, updateDataUserModel, deleteDataUserModel, selectOneUserModel} = require('../models/userModel')

module.exports = {
    getAlluser: async (req, res) =>{
        try {
            const result = await getAllUserModel()
            return response.response(
                res,
                200,
                "success get all user data",
                result
            );
        } catch (error) {
            console.log(error);
                return response.response(res, 400, "Bad request")           
        }
    },
insertuser: async (req, res) =>{
    try {
        const {
            id, name, password, email, alamat, foto
        } = req.body

        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)

        const crypto = require('crypto')
        const userKey = crypto.randomBytes(20).toString('hex')

        const setData = {
            id, name, password : encryptPassword, email, alamat, foto
        }
        console.log('line39')
            const checkDuplicateEmail = await selectOneUserModel(email)
            console.log('line41')
            if (checkDuplicateEmail.length > 0) {
                return response.response(
                    res,
                    400,
                    'Duplicate Email, email has been used by another account'
                )
            }

            const result = await postUserModel(setData)
            if (result) {
                return response.response(
                    res,
                    200,
                    'Success register account',
                    result
                )
            }
        } catch (error) {
            console.log(error)
            return response.response(res, 400, 'Bad Request', error)
        }


        // console.log(req.body);
    //     const result = await postUserModel(req.body)
    //     return response.response(
    //         res,
    //         200,
    //         "success post user data",
    //         result
    //     );
    // } catch (error) {
    //     console.log(error);
    //         return response.response(res, 400, "Bad request")           
    
},
updateDataUser: async (req, res) =>{
    try {
        console.log(req.body);
        const result = await updateDataUserModel(req.body, req.params.id)
        return response.response(
            res,
            200,
            `success update user data with id : ${req.params.id}`,
            result
        );
    } catch (error) {
        console.log(error);
            return response.response(res, 400, "Bad request")           
    }
},
deleteDataUser: async (req, res) =>{
    try {
        console.log(req.body);
        await deleteDataUserModel(req.params.id)
        return response.response(
            res,
            200,
            `success delete user data with id : ${req.params.id}`
        );
    } catch (error) {
        console.log(error);
            return response.response(res, 400, "Bad request")           
    }
},


loginUser: async (req, res) =>{
    // try {
    //     // pertama, perintah pilih data email dari data base;
    //     let user = await selectOneUserModel(req.body.email)
    //     // cek data email dari database, jika tidak ada data user
    //     if (!user){
    //         return response.response(
    //             res,
    //             402,
    //             "user tidak ditemukan"
    //         );
    //         // lanjut cek data email dan data ditemukan
    //     } else {
    //         console.log(user)
    //         if (user[0].password == req.body.password){
    //             return response.response(
    //                 res,
    //                 200,
    //                 "sudah login dengan user",
    //                 user[0]
    //                 // hasil kalau password sama
    //             );
    //         } else {
    //             return response.response(
    //                 res,
    //                 402,
    //                 "password salah"
    //                 // hasil kalau password tidak sama
    //             );
    //         }    
    //     }
        
        
    // } catch (error) {
    //     console.log(error);
    //         return response.response(res, 400, "Bad request")           
    // }
    try {
        const {email,password} = req.body
        console.log(req.body)
        const checkUserData = await selectOneUserModel(email)
        console.log(checkUserData.rows.length)
        if (checkUserData.rows.length > 0) {
            const checkPassword = bcrypt.compareSync(
                password, checkUserData.rows[0].password
            )

            if (checkPassword) {
                const {
                    id: id,
                    email: email
                } = checkUserData.rows[0]

                const payload = {
                    id, 
                    email
                }

                const token = jwt.sign(payload, 'RAHASIA', {expiresIn: '1h'})
                const result = { ...payload, token}
                return response.response(res, 200, 'Login Success', result)
            }   else {
                return response.response(res, 400, 'Password invalid')
            }
        } else {
            return response.response(res, 400, 'Account not Registered')
        }
    } catch (error) {
        console.log(error)
        return response.response(res, 400, 'Bad Request', error)
    }
},


}
