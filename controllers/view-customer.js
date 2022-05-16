//[GET] http://localhost:8888/view/cn-logout
//Thiết lập session chi nhánh cho Customer
let cf_cn_customer = (req, res) => {
    let cn = req.params.cn
    req.session.chinhanh = cn
    return res.redirect('/view/customer')
}

//[GET] http://localhost:8888/view/cn-customer
//Render temple xác nhận chi nhánh
let cn_customer = (req,res)=>{
    if(req.session.chinhanh)                    //Chưa chọn chi nhánh thì quay lại trang chọn chi nhánh
        return res.redirect('/view/customer')

    return res.render('interface/customer-confirm')
}

////[GET] http://localhost:8888/view/customer
//Render temple trang chủ của Customer
let customer = (req,res)=>{
    if(!req.session.chinhanh)                    //Chưa chọn chi nhánh thì quay lại trang chọn chi nhánh
        return res.redirect('/view/cn-customer')
    return res.render('interface/customer')
}

////[GET] http://localhost:8888/view/customer-listBook
//Render temple xác nhận chi nhánh
let customer_listBook = (req,res)=>{
    if(!req.session.chinhanh)                   //Chưa chọn chi nhánh thì quay lại trang chọn chi nhánh
        return res.redirect('/view/cn-customer')

    return res.render('interface/customer-listBook')
}

////[GET] http://localhost:8888/view/customer-detail-book
//
let customer_detail_book = (req,res)=>{
    if(!req.session.chinhanh)                   //Chưa chọn chi nhánh thì quay lại trang chọn chi nhánh
        return res.redirect('/view/cn-customer')
    let {MaSach} = req.params
    return res.render('interface/customer-detail-book', {MaSach})
}

//[GET] http://localhost:8888/view/cn-logout
//Xóa session chi nhánh cho Customer
let cn_logout = (req, res) => {
    req.session.destroy()
    return res.redirect('/')
}

module.exports = {
    customer,
    cn_customer,
    customer_detail_book,
    customer_listBook,
    cf_cn_customer,
    cn_logout
}