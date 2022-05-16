let model_info = document.getElementById('model_info')
let close_model_info = document.getElementById('close_model_info')
let listStaff = document.getElementById('list-staff')
let search = document.getElementById('search')

//functions
let show_info = (MaNV,HoTen,NgaySinh,Diachi,Email,Sdt,Luong,MaCV, MaCN) => {
    let bodyModel = document.getElementById('body-model')
    NgaySinh = NgaySinh.split('T')[0]

    temp = `<div class="model-info-items">
                <div class="model-items-title">Staff id</div>
                <div>${MaNV}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Staff name</div>
                <div>${HoTen}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Birth</div>
                <div>${NgaySinh}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Address</div>
                <div>${Diachi}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Email</div>
                <div>${Email}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Phone</div>
                <div>${Sdt}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Position</div>
                <div>${MaCV == 0 ? 'admin' : 'nhan vien'}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Campus</div>
                <div>${MaCN}</div>
            </div>
            <div class="model-info-items">
                <div class="model-items-title">Salary</div>
                <div>${Luong}</div>
            </div>`
    bodyModel.innerHTML = temp
    model_info.style.display = 'block'

}

close_model_info.addEventListener('click', () => {
    model_info.style.display = 'none'
})

let list_staff = []

fetch('/staffs', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }    
})
.then(data => data.json())
.then(data => {
    temp = ''
    data.data.forEach((val, index) => {
        list_staff.push(val)
        temp += `<div onclick="show_info('${val.MaNV}', '${val.HoTen}', '${val.NgaySinh}', '${val.Diachi}', '${val.Email}', '${val.Sdt}', '${val.Luong}', '${val.MaCV}', '${val.MaCN}')" class="list-staff-items ${index % 2 == 0 ? 'bg-green cl-wh' : ''}">
                    <div class="list-staff-item-id">${val.MaNV}</div>
                    <div class="list-staff-item-name">${val.HoTen}</div>
                    <div class="list-staff-item-author">${val.MaCV == 0 ? 'Admin' : 'Nhân viên'}</div>
                </div>`
    })

    listStaff.innerHTML = temp
})

search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let tmp = ''
    let count_cl = 0
    list_staff.forEach((val, index) => {
        if(val.HoTen.toLowerCase().indexOf(words.toLowerCase()) != -1){
            tmp += `<div onclick="show_info('${val.MaNV}', '${val.HoTen}', '${val.NgaySinh}', '${val.Diachi}', '${val.Email}', '${val.Sdt}', '${val.Luong}', '${val.MaCV}', '${val.MaCN}')" class="list-staff-items ${count_cl % 2 == 0 ? 'bg-green cl-wh' : ''}">
                        <div class="list-staff-item-id">${val.MaNV}</div>
                        <div class="list-staff-item-name">${val.HoTen}</div>
                        <div class="list-staff-item-author">${val.MaCV == 0 ? 'Admin' : 'Nhân viên'}</div>
                    </div>`
            count_cl += 1
        }
    })
    listStaff.innerHTML = tmp
})