const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')
const bcrypt = require('bcrypt');

getInfo=(req, res)=>{
    let info = req.session.user
    return res.status(200).json({
        code:200,
        message: 'Xem thong tin ca nhan thanh cong',
        data: info
    })
}

updatePass= async(req, res)=>{
    try {
        let pool = await connTram3
        let info = req.session.user
        let data = req.body
        let hash = await bcrypt.hash(data.newPass,10)
        let validPass = await bcrypt.compare(data.curPass,info.Pass)
        if(validPass){
            await pool.request()
            .input('manv',info.MaNV)
            .input('hoten',info.HoTen)
            .input('ngaysinh',info.NgaySinh)
            .input('diachi',info.Diachi)
            .input('email',info.Email)
            .input('sdt',info.Sdt)
            .input('luong',info.Luong)
            .input('macv',info.MaCV)
            .input('pass',hash)
            .input('macn',info.MaCN)
            .execute(`sp_CapNhatNhanVien`)
            return res.json({
                code:200,
                message:'cap nhat mat khau thanh cong'
            })
        }
        else{
            return res.json({
                code:400,
                message:'Mat khau cu khong chinh xac!'
            })
        }
        
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

getStaffs = async(req,res)=>{
    try {
        let pool = await connTram3
        let result = await pool.request().execute(`sp_TatCaNhanVien`)
        return res.json({
            code:200,
            message:'thanh cong',
            data: result.recordset
        })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

getStaff = async(req,res)=>{
    let id = req.params.id
    try {
        let pool = await connTram3
            let result = await pool.request().input('manv',id).execute(`sp_TimNhanVien`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0]
            })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

addStaff = async(req,res)=>{
    try {
        let pool = await connTram3
        let data = req.body
        let MaNV = "NV"+ Math.floor(Math.random() * 90000) + 10000
        let hash = bcrypt.hashSync('123456', 10);
        await pool.request()
        .input('manv',MaNV)
        .input('hoten',data.HoTen)
        .input('ngaysinh',data.NgaySinh)
        .input('diachi',data.DiaChi)
        .input('email',data.Email)
        .input('sdt',data.Sdt)
        .input('luong',data.Luong)
        .input('macv',data.MaCV)
        .input('pass',hash)
        .input('macn',data.MaCN)
        .execute(`sp_ThemNhanVien`)
        return res.json({
            code:200,
            message:'them nhan vien thanh cong'
        })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

updateStaff= async(req, res)=>{
    try {
        let pool = await connTram3
        let id = req.params.id
        let data = req.body
        let hash = await bcrypt.hash('123456',10)
        await pool.request()
            .input('manv',id)
            .input('hoten',data.HoTen)
            .input('ngaysinh',data.NgaySinh)
            .input('diachi',data.DiaChi)
            .input('email',data.Email)
            .input('sdt',data.Sdt)
            .input('luong',data.Luong)
            .input('macv',data.MaCV)
            .input('pass',hash)
            .input('macn',data.MaCN)
            .execute(`sp_CapNhatNhanVien`)
        return res.json({
            code:200,
            message:'cap nhat nhan vien thanh cong'
        })
        
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

module.exports={
    getInfo,
    getStaffs,
    getStaff,
    addStaff,
    updatePass,
    updateStaff
}