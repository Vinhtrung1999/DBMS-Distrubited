const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')

addRetBill = async(req,res)=>{
    let cn = req.session.chinhanh
    let data = req.body
    try {
        if(cn=='CN1'){
            let pool = await connTram1

            let sqlcheckPM = `select * from PHIEUMUON where MaPM='${data.MaPM}'`
            let result = await pool.request().query(sqlcheckPM)
            if(result.recordset==0){
                return res.json({
                    code:400,
                    message:'ma phieu muon khong ton tai o chi nhanh nay'
                })
            }
            let MaPT = "PT"+ Math.floor(Math.random() * 90000) + 10000
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            await pool.request()
            .input('mapt',MaPT)
            .input('mapm',data.MaPM)
            .input('ngaytra',date)
            .input('macn',cn)
            .execute(`sp_ThemPhieuTra`)
            return res.json({
                code:200,
                message:'them phieu tra thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2

            let sqlcheckPM = `select * from PHIEUMUON where MaPM='${data.MaPM}'`
            let result = await pool.request().query(sqlcheckPM)
            if(result.recordset==0){
                return res.json({
                    code:400,
                    message:'ma phieu muon khong ton tai o chi nhanh nay'
                })
            }
            let MaPT = "PT"+ Math.floor(Math.random() * 90000) + 10000
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            await pool.request()
            .input('mapt',MaPT)
            .input('mapm',data.MaPM)
            .input('ngaytra',date)
            .input('macn',cn)
            .execute(`sp_ThemPhieuTra`)
            return res.json({
                code:200,
                message:'them phieu tra thanh cong'
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

getRetBills = async(req,res)=>{
    let cn = req.session.chinhanh
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let sql = `select PHIEUTRA.*, PHIEUMUON.NgayMuon, PHIEUMUON.MaSV_GV, PHIEUMUON.TenSV_GV, SACH.MaSach, SACH.TenSach, SACH.HinhAnh
                        from PHIEUTRA
                        inner join PHIEUMUON on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH ON PHIEUMUON.MaSach = SACH.MaSach`
            let result = await pool.request().query(sql)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let sql = `select PHIEUTRA.*, PHIEUMUON.NgayMuon, PHIEUMUON.MaSV_GV, PHIEUMUON.TenSV_GV, SACH.MaSach, SACH.TenSach, SACH.HinhAnh
                        from PHIEUTRA
                        inner join PHIEUMUON on PHIEUTRA.MaPM = PHIEUMUON.MaPM
                        inner join SACH ON PHIEUMUON.MaSach = SACH.MaSach`
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

getRetBill = async(req,res)=>{
    let cn = req.session.chinhanh
    let id = req.params.id
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let result = await pool.request().input('mapt',id).execute(`sp_TimPhieuTra`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0]
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let result = await pool.request().input('mapt',id).execute(`sp_TimPhieuTra`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0]
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

changeStatusReturn = async(req,res)=>{
    let cn = req.session.chinhanh
    let user = req.session.user
    let data = req.body
    try {
        if(cn=='CN1'){
            let pool = await connTram1

            let sqlcheckPM = `update SACH set TrangThai = 0 where MaSach='${data.MaSach}'`
            let result = await pool.request().query(sqlcheckPM)
            return res.json({
                code:200,
                message:'cap nhat trang thay thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2

            let sqlcheckPM = `update SACH set TrangThai = 0 where MaSach='${data.MaSach}'`
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
    addRetBill,
    getRetBills,
    getRetBill,
    changeStatusReturn
}