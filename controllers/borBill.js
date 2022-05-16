const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')

addBorBill = async(req,res)=>{
    let cn = req.session.chinhanh
    let user = req.session.user
    let data = req.body
    try {
        if(cn=='CN1'){
            let pool = await connTram1

            let sqlcheckPM = `select * from SACH where MaSach='${data.MaSach}' and TrangThai = 0`
            let result = await pool.request().query(sqlcheckPM)
            if(result.recordset==0){
                return res.json({
                    code:400,
                    message:'ma sach khong ton tai hoac da dc muon'
                })
            }

            let MaPM = "PM"+ Math.floor(Math.random() * 90000) + 10000
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            await pool.request()
            .input('mapm',MaPM)
            .input('manv',user.MaNV)
            .input('masach',data.MaSach)
            .input('masv_gv',data.MaSV_GV)
            .input('tensv_gv',data.TenSV_GV)
            .input('ngaymuon',date)
            .input('macn',cn)
            .execute(`sp_ThemPhieuMuon`)
            return res.json({
                code:200,
                message:'them phieu muon thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2

            let sqlcheckPM = `select * from SACH where MaSach='${data.MaSach}' and TrangThai = 0`
            let result = await pool.request().query(sqlcheckPM)
            if(result.recordset==0){
                return res.json({
                    code:400,
                    message:'ma sach khong ton tai hoac da duoc muon'
                })
            }

            let MaPM = "PM"+ Math.floor(Math.random() * 90000) + 10000
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            await pool.request()
            .input('mapm',MaPM)
            .input('manv',user.MaNV)
            .input('masach',data.MaSach)
            .input('masv_gv',data.MaSV_GV)
            .input('tensv_gv',data.TenSV_GV)
            .input('ngaymuon',date)
            .input('macn',cn)
            .execute(`sp_ThemPhieuMuon`)
            return res.json({
                code:200,
                message:'them phieu muon thanh cong'
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

getborBills = async(req,res)=>{
    let cn = req.session.chinhanh
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let sql = `select PHIEUMUON.*, SACH.TenSach, SACH.HinhAnh
                        from PHIEUMUON
                        left join PHIEUTRA on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH on PHIEUMUON.MaSach = SACH.MaSach
                        where PHIEUTRA.MaPM is null`
            let result = await pool.request().query(sql)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let sql = `select PHIEUMUON.*, SACH.TenSach, SACH.HinhAnh
                        from PHIEUMUON
                        left join PHIEUTRA on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH on PHIEUMUON.MaSach = SACH.MaSach
                        where PHIEUTRA.MaPM is null`
            let result = await pool.request().query(sql)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset
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

getBorBill = async(req,res)=>{
    let cn = req.session.chinhanh
    let id = req.params.id
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let sql = `select PHIEUMUON.*, SACH.TenSach, SACH.HinhAnh
                        from PHIEUMUON
                        left join PHIEUTRA on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH on PHIEUMUON.MaSach = SACH.MaSach
                        where PHIEUTRA.MaPM is null and PHIEUMUON.MaPM = '${id}'`
            let result = await pool.request().input('mapm',id).query(sql)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0] || []
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let sql = `select PHIEUMUON.*, SACH.TenSach, SACH.HinhAnh
                        from PHIEUMUON
                        left join PHIEUTRA on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH on PHIEUMUON.MaSach = SACH.MaSach
                        where PHIEUTRA.MaPM is null and PHIEUMUON.MaPM = '${id}'`
            let result = await pool.request().input('mapm',id).query(sql)  
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0] || []
            })
        }
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
},


changeStatusBorrow = async(req,res)=>{
    let cn = req.session.chinhanh
    let user = req.session.user
    let data = req.body
    try {
        if(cn=='CN1'){
            let pool = await connTram1

            let sqlcheckPM = `update SACH set TrangThai = 1 where MaSach='${data.MaSach}'`
            let result = await pool.request().query(sqlcheckPM)
            return res.json({
                code:200,
                message:'cap nhat trang thay thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2

            let sqlcheckPM = `update SACH set TrangThai = 1 where MaSach='${data.MaSach}'`
            let result = await pool.request().query(sqlcheckPM)
            return res.json({
                code:200,
                message:'cap nhat trang thay thanh cong'
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

module.exports = {
    addBorBill,
    getborBills,
    getBorBill,
    changeStatusBorrow
}