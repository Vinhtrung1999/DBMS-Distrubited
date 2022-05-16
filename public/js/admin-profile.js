let model_change_pwd = document.getElementById('model_change_pwd')
let btn_change_pwd = document.getElementById('btn_change_pwd')
let btn_close_model = document.getElementById('btn_close_model')
let btn_save_pass = document.getElementById('btn-save-pass')
let message = document.getElementById('message')

btn_change_pwd.addEventListener('click', () => {
    model_change_pwd.style.animation = 'model-show 0.5s ease-in'
    model_change_pwd.style.display = 'block'
})

btn_close_model.addEventListener('click', () => {
    model_change_pwd.style.animation = 'model-close 0.5s ease-in'
    setTimeout(() => {
        model_change_pwd.style.display = 'none'
    }, 500)
   // 
})

btn_save_pass.addEventListener('click', () => {
    let pwd = document.getElementById('pwd').value
    let newPwd = document.getElementById('newPwd').value
    let confPwd = document.getElementById('confPwd').value
    if(pwd && newPwd && confPwd){
        if(newPwd == confPwd){
            fetch('/updatePass',{
                method:'PUT',
                body: JSON.stringify({curPass: pwd, newPass:newPwd}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if(data.code === 200){
                    alert('Bạn vừa đổi mật khẩu, đăng nhập lại!')
                    window.location.href = '/view/logout'
                }
                else{
                    let msg = '<div class="msg bg-err">Mật khẩu cũ sai</div>'
                    message.innerHTML = msg
                }
            })
            .catch(err => console.log(err))
        }
        else{
            let msg = '<div class="msg bg-err">Xác nhận không khớp</div>'
            message.innerHTML = msg
        }
    }
    else{
        let msg = '<div class="msg bg-err">Điền thông tin</div>'
        message.innerHTML = msg
    }

})

