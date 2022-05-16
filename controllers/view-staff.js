//[GET] http://localhost:8888/view/staff-bookManager
//render template các chức năng quản lý sách
let staff_bookManager = (req,res)=>{
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-bookManager')
}

//[GET] http://localhost:8888/view/staff-profile
//render template thông tin cá nhân của nhân viên
let staff_profile = (req,res)=>{
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    let user = req.session.user
    return res.render('interface/staff-profile',{user})
}

//[GET] http://localhost:8888/view/staff-listBook
//render template danh sách các quyển sách
let staff_listBook = (req,res)=>{
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-listBook')
}

//[GET] http://localhost:8888/view/staff-addBook
//render template thêm sách
let staff_addBook = (req,res)=>{
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-addbook')
}

//[GET] http://localhost:8888/view/staff-updateBook
//render template cập nhật sách
let staff_updateBook = (req,res)=>{
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-updateBook')
}

//[GET] http://localhost:8888/view/staff-borrowBook
//render template chức năng mượn sách
let staff_borrowBook = (req, res) => {
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-borrowBook')
}

//[GET] http://localhost:8888/view/staff-returnBook
//render template chức năng trả sách
let staff_returnBook = (req, res) => {
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/staff-returnBook')
}

//[GET] http://localhost:8888/view/staff-bill
//render template danh sách các phiếu mượn/trả
let staff_bill = (req, res) => {
    if(!req.session.user)                               //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 1)                      //Không phải admin thì quay lại phân quyền
        return res.redirect('/view/authentication')
        
    return res.render('interface/staff-bill')
}

module.exports = {
    staff_bookManager,
    staff_profile,
    staff_listBook,
    staff_addBook,
    staff_updateBook,
    staff_borrowBook,
    staff_returnBook,
    staff_bill
}