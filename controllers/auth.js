const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')
const bcrypt = require('bcrypt');

confirmCN = (req,res)=>{
    let cn = req.params.cn
    req.session.chinhanh = cn
    return res.json({
        code:200,
        message:'ok',
        chiNhanh:cn
    })
}

login = async(req,res)=>{
    let cn = req.session.chinhanh
    let data = req.body
    if(req.session.user){
        return res.json({
            code:400,
            message:'ban da dang nhap roi!'
        })
    }
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let sqlString = `select * from NHANVIEN where MaNV='${data.MaNV}'`
            let result = await pool.request().query(sqlString)
            if(result){
                if(result.recordset==0){
                    return res.json({
                        code:400,
                        message:'sai manv'
                    })
                }
                let validPass = bcrypt.compareSync(data.Pass, result.recordset[0].Pass);
                if(validPass){
                    req.session.user = result.recordset[0]
                    return res.json({
                        code:200,
                        message:'dang nhap thanh cong'
                    })
                }
                else{
                    return res.json({
                        code:400,
                        message:'sai mat khau'
                    })
                }
            }else{
                return res.json({
                    code:400,
                    message:'ket noi that bai'
                })
            }
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let sqlString = `select * from NHANVIEN where MaNV='${data.MaNV}'`
            let result = await pool.request().query(sqlString)
            if(result){
                if(result.recordset==0){
                    return res.json({
                        code:400,
                        message:'sai manv'
                    })
                }
                let validPass = bcrypt.compareSync(data.Pass, result.recordset[0].Pass);
                console.log(validPass)
                if(validPass){
                    req.session.user = result.recordset[0]
                    return res.json({
                        code:200,
                        message:'dang nhap thanh cong'
                    })
                }
                else{
                    return res.json({
                        code:400,
                        message:'sai mat khau'
                    })
                }
            }else{
                return res.json({
                    code:400,
                    message:'ket noi that bai'
                })
            }
        }
        if(cn=='ADMIN'){
            let pool = await connTram3
            let sqlString = `select * from NHANVIEN where MaNV='${data.MaNV}'`
            let result = await pool.request().query(sqlString)
            if(result){
                if(result.recordset==0){
                    return res.json({
                        code:400,
                        message:'sai manv'
                    })
                }
                let validPass = bcrypt.compareSync(data.Pass, result.recordset[0].Pass)
                if(validPass){
                    req.session.user = result.recordset[0]
                    return res.json({
                        code:200,
                        message:'dang nhap thanh cong'
                    })
                }
                else{
                    return res.json({
                        code:400,
                        message:'sai mat khau'
                    })
                }
            }else{
                return res.json({
                    code:400,
                    message:'ket noi that bai'
                })
            }
        }
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

logout= (req,res)=>{
    req.session.destroy()
    return res.status(200).json({
        code:200,
        message: 'dang xuat thanh cong'
    })
}

module.exports={
    confirmCN,
    login,
    logout
}