const client = require("../config/postgre")

module.exports = {
    getAllUserModel:() => {
       return new Promise((resolve, reject)=>{
           client.query('SELECT * FROM public.user', (error, result)=>{
               if (!error) {
                   resolve(result.rows);
               }else {
                   reject(new Error(error));
               }
           });
       });
    },
    postUserModel: (setData) => {
        console.log(setData)
        return new Promise((resolve, reject) => {
            client.query(`INSERT INTO public.user (name, password, email, alamat, foto) VALUES ('${setData.name}', '${setData.password}', '${setData.email}', '${setData.alamat}', '${setData.foto}') RETURNING id, name, password, email, alamat, foto`,
            // [data.name, data.password, data.email, data.alamat, data.foto], 
            (error, result) => {
                // if (!error) {
                //     resolve(result.rows);
                // }else{
                //     console.log(error)
                //     reject(new Error(error));
                // }
                if(!error){
                    const newResult = {
                        user_id: result.insertedId,
                        ...setData
                    }
                    delete newResult.password
                    resolve(newResult)
                }else {
                    console.log(error)
                    reject(new Error (error));
                }
            }
        );    
    })
},
updateDataUserModel: (data, id) => {
    return new Promise((resolve, reject) => {
        client.query(
            `UPDATE user SET 
            name = '${data.name}', 
            password = '${data.password}', 
            email='${data.email}', 
            alamat='${data.alamat}',
            foto='${data.foto}'  
            WHERE id = ${id} RETURNING id, name, password, email, alamat, foto`, 
        (error, result) => {
            if (!error) {
                resolve(result.rows);
            }else{
                reject(new Error(error));
            }
        }
        )  ;



    })
},
deleteDataUserModel: (id) => {
    return new Promise((resolve, reject) => {
        client.query(
            `DELETE FROM user WHERE id = ${id}`, 
        (error, result) => {
            if (!error) {
                resolve(result.rows);
            }else{
                reject(new Error(error));
            }
        }
        )  ;



    })
},
selectOneUserModel:(email) => {
    return new Promise((resolve, reject) => {
        // client.query(
        //     `SELECT * FROM public.user WHERE email = '${email}'`, 
        // (error, result) => {
        //     if (!error) {
        //         console.log(result)
        //         resolve(result.rows);
        //     }else{
        //         reject(new Error(error));
        //     }
        // }
        // )  ;
        client.query(
            `SELECT * FROM public.user WHERE email = '${email}'`,
            (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            }
        )


    })
}
};
