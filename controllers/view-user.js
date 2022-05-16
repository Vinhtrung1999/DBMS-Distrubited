//================USER (Dùng chung cho ADMIN và STAFF)===================
//[GET] http://localhost:8888/view/cf-cn-user
//Thiết lập session chi nhánh
let cf_cn_user = (req, res) => {
    let cn = req.params.cn
    req.session.chinhanh = cn
    return res.redirect('/view/login')
}

//[GET] http://localhost:8888/view/login
//Render template login
let login = (req,res)=>{
    if(req.session.user)                                //Login rồi thì chuyển đến trang phân quyền
        return res.redirect('/view/authentication')

    if(!req.session.chinhanh)                           //Chưa chọn chi nhánh thì quay về trang chọn chi nhánh
        return res.redirect('/view')

    return res.render('interface/login')   
}

//[GET] http://localhost:8888/view/
//Render template chọn chi nhánh
let view_index = (req,res)=>{
    let mess = req.query.mess || 'Vui lòng chọn đúng chi nhánh'
    if(req.session.user)
        return res.redirect('/view/authentication')     //Login rồi thì chuyển đến trang phân quyền

    return res.render('interface/employee-confirm', {mess})
}

//[GET] http://localhost:8888/view/authentication
//Phân quyền
let authentication = (req, res) => {
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
}

//[GET] http://localhost:8888/view/logout
//Xóa session cho user
let logout = (req, res) => {
    req.session.destroy()
    return res.redirect('/view')
}

module.exports = {
    cf_cn_user,
    view_index,
    authentication,
    login,
    logout
}