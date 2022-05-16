

checkConfirmCN = (req,res,next)=>{
    let cn = req.session.chinhanh

    if(!cn){
        return res.json({
            code:400,
            message:'chua xac nhan chi nhanh'
        })
    }
    next()
}

checkLogin = (req,res,next)=>{
    if(!req.session.user){
        return res.json({
            code:400,
            message:'vui long dang nhap'
        })
    }
    next()
}

onlyAdmin = (req, res, next) => {
    let user = req.session.user
    if(user.MaCV==1){
        return res.json({
            code: 999,
            message: 'Nhan vien khong co quyen truy cap!!'
        })
    }
    next()
}

onlyStaff = (req,res, next)=>{
    let user = req.session.user
    if(user.MaCV==0){
        return res.json({
            code:999,
            message:'Admin khong co quyen truy cap'
        })
    }
    next()
}

module.exports = {
    checkConfirmCN,
    checkLogin,
    onlyAdmin,
    onlyStaff
}