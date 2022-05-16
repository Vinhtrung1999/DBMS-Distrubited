const {sql,connMaychu,connTram1,connTram2,connTram3} = require('../connectDB')


getBooks = async(req,res)=>{
    let cn = req.session.chinhanh
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let result = await pool.request().execute(`sp_TatCaSach`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let result = await pool.request().execute(`sp_TatCaSach`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset
            })
        }
        return res.json({
            code:400,
            message:'admin khong xem sach!'
        })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

getBook = async(req,res)=>{
    let cn = req.session.chinhanh
    let id = req.params.id
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let result = await pool.request().input('masach',id).execute(`sp_TimSach`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0]
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let result = await pool.request().input('masach',id).execute(`sp_TimSach`)   
            return res.json({
                code:200,
                message:'thanh cong',
                data: result.recordset[0]
            })
        }
        return res.json({
            code:400,
            message:'admin khong xem sach!'
        })
    } catch (error) {
        return res.json({
            code:500,
            message: 'that bai',
            err: error
        })
    }
}

addBook = async(req,res)=>{
    let cn = req.session.chinhanh
    let data = req.body
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let MaSach = "BOOK"+ Math.floor(Math.random() * 9000) + 1000
            await pool.request()
            .input('masach',MaSach)
            .input('tensach',data.TenSach)
            .input('hinhanh',data.HinhAnh)
            .input('tacgia',data.TacGia)
            .input('maloai',data.MaLoai)
            .input('macn',cn)
            .input('trangthai',data.TrangThai)
            .execute(`sp_ThemSach`)
            return res.json({
                code:200,
                message:'them sach thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let MaSach = "BOOK"+ Math.floor(Math.random() * 9000) + 1000
            await pool.request()
            .input('masach',MaSach)
            .input('tensach',data.TenSach)
            .input('hinhanh',data.HinhAnh)
            .input('tacgia',data.TacGia)
            .input('maloai',data.MaLoai)
            .input('macn',cn)
            .input('trangthai',data.TrangThai)
            .execute(`sp_ThemSach`)
            return res.json({
                code:200,
                message:'them sach thanh cong'
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

updateBook = async(req,res)=>{
    let cn = req.session.chinhanh
    let data = req.body
    let id = req.params.id
    try {
        if(cn=='CN1'){
            let pool = await connTram1
            let MaSach = id
            await pool.request()
            .input('masach',MaSach)
            .input('tensach',data.TenSach)
            .input('hinhanh',data.HinhAnh)
            .input('tacgia',data.TacGia)
            .input('maloai',data.MaLoai)
            .input('macn',cn)
            .input('trangthai',data.TrangThai)
            .execute(`sp_CapNhatSach`)
            return res.json({
                code:200,
                message:'cap nhat sach thanh cong'
            })
        }
        if(cn=='CN2'){
            let pool = await connTram2
            let MaSach = id
            await pool.request()
            .input('masach',MaSach)
            .input('tensach',data.TenSach)
            .input('hinhanh',data.HinhAnh)
            .input('tacgia',data.TacGia)
            .input('maloai',data.MaLoai)
            .input('macn',cn)
            .input('trangthai',data.TrangThai)
            .execute(`sp_CapNhatSach`)
            return res.json({
                code:200,
                message:'cap nhat sach thanh cong'
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
    getBooks,
    getBook,
    addBook,
    updateBook
}