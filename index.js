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
const viewCustomer = require('./controllers/view-customer')
const viewUser = require('./controllers/view-user')
const viewAdmin = require('./controllers/view-admin')
const viewStaff = require('./controllers/view-staff')

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
//=============USER-VIEW (Dùng chung cho ADMIN và STAFF)===================================
//Thiết lập session chi nhánh
app.get('/view/cf-cn-user/:cn', viewUser.cf_cn_user)

//render template chọn chi nhánh
app.get('/view', viewUser.view_index)

//render template login
app.get('/view/login', viewUser.login)

//Phân quyền
app.get('/view/authentication', viewUser.authentication)

//Xóa session của user
app.get('/view/logout', viewUser.logout)

//==========ADMIN-VIEW=======================
//render template thông tin cá nhân của admin
app.get('/view/admin-profile', viewAdmin.admin_profile)

//render template các chức năng quản lý nhân viên
app.get('/view/admin-staffManager', viewAdmin.admin_staffManager)

//render template danh sách nhân viên
app.get('/view/admin-listStaff', viewAdmin.admin_listStaff)

//render template thêm nhân viên
app.get('/view/admin-addStaff', viewAdmin.admin_addStaff)

//render template cập nhật nhân viên
app.get('/view/admin-updateStaff', viewAdmin.admin_updateStaff)

//========STAFF-VIEW===============================================================
//render template thông tin cá nhân của nhân viên
app.get('/view/staff-profile', viewStaff.staff_profile)

//render template các chức năng quản lý sách
app.get('/view/staff-bookManager', viewStaff.staff_bookManager)

//render template danh sách các quyển sách
app.get('/view/staff-listBook', viewStaff.staff_listBook)

//render template thêm sách
app.get('/view/staff-addBook', viewStaff.staff_addBook)

//render template cập nhật sách
app.get('/view/staff-updateBook', viewStaff.staff_updateBook)

//render template chức năng mượn sách
app.get('/view/staff-borrowBook', viewStaff.staff_borrowBook)

//render template chức năng trả sách
app.get('/view/staff-returnBook', viewStaff.staff_returnBook)

//render template danh sách các phiếu mượn/trả
app.get('/view/staff-bill', viewStaff.staff_bill)

//=========CUSTOMER-VIEW===============================================================
//thiết lập session chi nhánh cho khác hàng
app.get('/view/cf-cn-customer/:cn', viewCustomer.cf_cn_customer)

//render template chọn chi nhánh cho khách hàng
app.get('/view/cn-customer', viewCustomer.cn_customer)

//render template trang chủ thư viện
app.get('/view/customer', viewCustomer.customer)

//render template thông tin chi tiết quyển sách
app.get('/view/customer-detail-book/:MaSach', viewCustomer.customer_detail_book)

//render template danh sách các quyển sách
app.get('/view/customer-listBook', viewCustomer.customer_listBook)

//xóa session chi nhánh cho khách hàng
app.get('/view/cn-logout', viewCustomer.cn_logout)

//====INCORRECT ROUTE => ROUTE FOR CUSTOMER===========================
app.use((req,res)=> res.redirect('/view/cn-customer'))

const PORT = 8888
app.listen(PORT,()=>{console.log(`server is running at http://localhost:${PORT}`)})