const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard cat'
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
  
const start = require('./controllers/start')
const {getBooks,getBook, addBook, updateBook} = require('./controllers/book')
const {confirmCN,login,logout} = require('./controllers/auth')
const {checkConfirmCN, checkLogin, onlyAdmin, onlyStaff} = require('./middleware/auth')
const { getInfo, getStaffs, getStaff, addStaff, updatePass, updateStaff } = require('./controllers/staff')
const { addBorBill, getborBills, getBorBill, changeStatusBorrow } = require('./controllers/borBill')
const { addRetBill, getRetBills, getRetBill, changeStatusReturn } = require('./controllers/retBill')
const { render, redirect } = require('express/lib/response')

// ====Tạo tài khoản admin để bắt đầu=====
app.get('/start',start)

// ====Dành cho người sử dụng thư viện(chung cho cả người dùng, staff và admin)=====
// Xác định chi nhánh
app.get('/index/:cn',confirmCN) //done

// Xem danh sách các quyển sách
app.get('/books',checkConfirmCN,getBooks) //done

// Xem chi tiết quyển sách
app.get('/book/:id',checkConfirmCN,getBook) //done


// // ====Đăng nhập và đăng xuất====
app.post('/login',checkConfirmCN,login) //done

app.get('/logout',logout) //done

// // ====Quản lý thông tin cá nhân=====
// Xem thông tin cá nhân
app.get('/info',checkLogin,getInfo) //done

// Cập nhật mật khẩu cá nhân
app.put('/updatePass',checkLogin,updatePass) // done

// // ====Quản lý nhân viên====
// // Xem danh sách các nhân viên
app.get('/staffs',checkLogin,onlyAdmin,getStaffs) //done

// // Xem thông tin một nhân viên cụ thể
app.get('/staff/:id',checkLogin,onlyAdmin,getStaff) //done

// // Thêm nhân viên mới
app.post('/staff/add',checkLogin,onlyAdmin,addStaff) // done

// // Cập nhật thông tin nhân viên
app.put('/staff/:id',checkLogin,onlyAdmin,updateStaff) //done

// ====Quản lý sách======
// Thêm sách mới
app.post('/book/add',checkLogin,onlyStaff,addBook) //Done

// Cập nhật sách
app.put('/book/:id',checkLogin,onlyStaff,updateBook) //Done

// ====Quản lý phiếu mượn========
// Thêm một phiếu mượn mới
app.post('/borBill/add',checkLogin,onlyStaff,addBorBill) //Done

// Thay đổi trạng thái sách khi mượn (=> 1)
app.post('/changeStatusBorrow',checkLogin,onlyStaff,changeStatusBorrow)

// Xem danh sách phiếu mượn
app.get('/borBills',checkLogin,onlyStaff,getborBills) //Done

// Xem thông tin một phiếu mượn cụ thể
app.get('/borBill/:id',checkLogin,onlyStaff,getBorBill) //Done

// ====Quản lý phiếu trả========
// Thêm một phiếu trả mới (kèm thay đổi trạng thái của sách)
app.post('/retBill/add',checkLogin,onlyStaff,addRetBill) //Done

// Thay đổi trạng thái sách khi mượn (=> 0)
app.post('/changeStatusReturn',checkLogin,onlyStaff, changeStatusReturn)

// Xem danh sách phiếu trả
app.get('/retBills',checkLogin,onlyStaff,getRetBills) //Done

// Xem thông tin một phiếu trả cụ thể
app.get('/retBill/:id',checkLogin,onlyStaff,getRetBill) //Done


// =============View========================================
//-------------login user------------------------------
app.get('/view/cf-cn-user/:cn', (req, res) => {
    let cn = req.params.cn
    req.session.chinhanh = cn
    return res.redirect('/view/login')
})

app.get('/view/login',(req,res)=>{
    if(req.session.user){
        return res.redirect('/view/authentication')
    }
    if(!req.session.chinhanh){
        return res.redirect('/view')
    }
    return res.render('interface/login')   
})

app.get('/view',(req,res)=>{
    let mess = req.query.mess || 'Vui lòng chọn đúng chi nhánh'
    if(req.session.user){
        return res.redirect('/view/authentication')
    }
    return res.render('interface/employee-confirm', {mess})
})

app.get('/view/authentication', (req, res) => {
    let user = req.session.user
    let cn = req.session.chinhanh
    if(!user)                                          //Nhan vien chua login
        return res.redirect('/view')

    if(user.MaCN !== cn && user.MaCV !== 0)           //Nhan vien chon sai chi nhanh logout
        return res.redirect('/view/logout')

    if(user.MaCV === 0)                                  //0: admin
        return res.redirect('/view/admin-profile')
    else                                                //1: staff
        return res.redirect('/view/staff-profile')
})

//-----Customer--------------------
app.get('/view/cf-cn-customer/:cn', (req, res) => {
    let cn = req.params.cn
    req.session.chinhanh = cn
    return res.redirect('/view/customer')
})

app.get('/view/cn-customer',(req,res)=>{
    if(req.session.chinhanh){
        return res.redirect('/view/customer')
    }
    return res.render('interface/customer-confirm')
})

app.get('/view/customer',(req,res)=>{
    if(!req.session.chinhanh)
        return res.redirect('/view/cn-customer')
    return res.render('interface/customer')
})

app.get('/view/customer-detail-book/:MaSach',(req,res)=>{
    if(!req.session.chinhanh)
        return res.redirect('/view/cn-customer')
    let {MaSach} = req.params
    return res.render('interface/customer-detail-book', {MaSach})
})

app.get('/view/customer-listBook',(req,res)=>{
    if(!req.session.chinhanh)
        return res.redirect('/view/cn-customer')
    let {MaSach} = req.params
    return res.render('interface/customer-listBook')
})

//-----------profile------------------------
app.get('/view/admin-profile',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    let user = req.session.user
    return res.render('interface/admin-profile',{user})
})

app.get('/view/staff-profile',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    let user = req.session.user
    return res.render('interface/staff-profile',{user})
})
//-----------------Magament--------------------
app.get('/view/admin-staffManager',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/admin-staffManager')
})


app.get('/view/staff-bookManager',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-bookManager')
})
//---------------------------------------------------

app.get('/view/admin-listStaff',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/admin-listStaff')
})

app.get('/view/admin-addStaff',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/admin-addStaff')
})

app.get('/view/admin-updateStaff',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/admin-updateStaff')
})

//book view---------------------------------------------
app.get('/view/staff-listBook',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-listBook')
})

app.get('/view/staff-addBook',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-addbook')
})

app.get('/view/staff-updateBook',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-updateBook')
})
//--------Borrow book-------------------------------
app.get('/view/staff-borrowBook', (req, res) => {
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-borrowBook')
})
//--------Return book-------------------------------
app.get('/view/staff-returnBook', (req, res) => {
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-returnBook')
})
//--------Bill--------------------------------------
app.get('/view/staff-bill', (req, res) => {
    if(!req.session.user){
        return res.redirect('/view/login')
    }
    return res.render('interface/staff-bill')
})
//--------------------------------------------------
app.get('/view/logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/view/login')
})

app.get('/view/cn-logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})

app.use((req,res)=>{
    return res.redirect('/view/cn-customer')
})

const PORT = 8888
app.listen(PORT,()=>{console.log(`server is running at http://localhost:${PORT}`)})