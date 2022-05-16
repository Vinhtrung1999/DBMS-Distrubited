const bcrypt = require('bcrypt');
const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')

start = async(req,res)=>{
    try {
        let pool = await connTram3
        let data = {
            MaNV: 'admin',
            HoTen: 'First Admin',
            NgaySinh: '2000/12/12',
            DiaChi: 'admin address',
            Email: 'admin@gmail.com',
            Sdt: '123456789',
            Luong: 10000000,
            MaCV: 0,
            Pass: 'admin123',
            MaCN: 'CN1'
        }
        let hash = bcrypt.hashSync(data.Pass, 10);
        let result = await pool.request()
        .input('manv',data.MaNV)
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
        req.session.chinhanh = "ADMIN"
        return res.json({
            code:200,
            message:'Khoi tao tai khoan admin thanh cong'
        })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

module.exports = start