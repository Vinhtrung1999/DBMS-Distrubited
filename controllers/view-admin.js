//[GET] http://localhost:8888/view/admin-profile
//render template thông tin cá nhân của admin
let admin_profile = (req,res)=>{
    if(!req.session.user)                                   //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')

    if(req.session.user.MaCV != 0)                          //Không phải staff thì quay lại phân quyền
        return res.redirect('/view/authentication')

    let user = req.session.user
    return res.render('interface/admin-profile',{user})
}

//[GET] http://localhost:8888/view/admin-staffManager
//render template các chức năng quản lý nhân viên
let admin_staffManager = (req,res)=>{
    if(!req.session.user)                                   //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 0)                          //Không phải staff thì quay lại phân quyền
        return res.redirect('/view/authentication')
    
    return res.render('interface/admin-staffManager')
}

//[GET] http://localhost:8888/view/admin-listStaff
//render template danh sách nhân viên
let admin_listStaff = (req,res)=>{
    if(!req.session.user)                                   //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 0)                          //Không phải staff thì quay lại phân quyền
        return res.redirect('/view/authentication')
    
    return res.render('interface/admin-listStaff')
}

//[GET] http://localhost:8888/view/admin-addStaff
//render template thêm nhân viên
let admin_addStaff = (req,res)=>{
    if(!req.session.user)                                   //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
    
    if(req.session.user.MaCV != 0)                          //Không phải staff thì quay lại phân quyền
        return res.redirect('/view/authentication')

    return res.render('interface/admin-addStaff')
}

//[GET] http://localhost:8888/view/admin-updateStaff
//render template cập nhật nhân viên
let admin_updateStaff = (req,res)=>{
    if(!req.session.user)                                   //chưa login thì chuyển đến trang login
        return res.redirect('/view/login')
        
    if(req.session.user.MaCV != 0)                          //Không phải staff thì quay lại phân quyền
        return res.redirect('/view/authentication')
    
    return res.render('interface/admin-updateStaff')
}

module.exports = {
    admin_profile,
    admin_staffManager,
    admin_addStaff,
    admin_listStaff,
    admin_updateStaff
}