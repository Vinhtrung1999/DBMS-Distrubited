let model_borrowBill = document.getElementById('model_borrowBill')
let close_model_borrowBill = document.getElementById('close_model_borrowBill')
let model_returnBill = document.getElementById('model_returnBill')
let close_model_returnBill = document.getElementById('close_model_returnBill')

close_model_borrowBill.addEventListener('click', () => {
    model_borrowBill.style.display = 'none'
})

close_model_returnBill.addEventListener('click', () => {
    model_returnBill.style.display = 'none'
})

show_bill_borrow = (MaPM, MaNV, TenSach, HinhAnh, MaSach, MaSV_GV, TenSV_GV, NgayMuon, MaCN) => {
    document.getElementById('bor_MaPM').innerHTML = MaPM
    document.getElementById('bor_MaNV').innerHTML = MaNV
    document.getElementById('bor_MaSach').innerHTML = MaSach
    document.getElementById('bor_MaSV_GV').innerHTML = MaSV_GV
    document.getElementById('bor_TenSV_GV').innerHTML = TenSV_GV
    document.getElementById('bor_NgayMuon').innerHTML = NgayMuon
    document.getElementById('bor_TenSach').innerHTML = TenSach
    document.getElementById('img').setAttribute('src',HinhAnh)
    document.getElementById('bor_MaCN').innerHTML = MaCN
    model_returnBill.style.display = 'none'
    model_borrowBill.style.display = 'block'
}

show_bill_return = (MaPM, MaPT, TenSach, HinhAnh, MaSach, MaSV_GV, TenSV_GV, NgayMuon, NgayTra) => {
    document.getElementById('rt-img').setAttribute('src', HinhAnh)
    document.getElementById('rt-MaPM').innerHTML = MaPM
    document.getElementById('rt-MaPT').innerHTML = MaPT
    document.getElementById('rt-MaSach').innerHTML = MaSach
    document.getElementById('rt-MaSV_GV').innerHTML = MaSV_GV
    document.getElementById('rt-TenSV_GV').innerHTML = TenSV_GV
    document.getElementById('rt-NgayMuon').innerHTML = NgayMuon
    document.getElementById('rt-NgayTra').innerHTML = NgayTra
    document.getElementById('rt-TenSach').innerHTML = TenSach
    model_borrowBill.style.display = 'none'
    model_returnBill.style.display = 'block'
}

//list borrow bill
let borrowBill = document.getElementById('borrowBill')
let list_borrow = []
fetch('/borBills', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }    
})
.then(data => data.json())
.then(data => {
    if(data.code == 200){
        let temp = ''
        data.data.forEach((val, index) => {
            list_borrow.push(val)
            temp += `<div onclick="show_bill_borrow('${val.MaPM}', '${val.MaNV}', '${val.TenSach}', '${val.HinhAnh}', '${val.MaSach}', '${val.MaSV_GV}', '${val.TenSV_GV}', '${val.NgayMuon.split("T")[0]}', '${val.MaCN}')" class="list-content-items ${index % 2 == 0 ? 'bg-yl cl-wh' : ''}">${val.MaPM}</div>`
        })

        borrowBill.innerHTML = temp        
    }

})
.catch(err => console.log(err))

//list return bill
let returnBill = document.getElementById('returnBill')
fetch('/retBills', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }    
})
.then(data => data.json())
.then(data => {
    console.log(data.data)
    if(data.code == 200){
        let temp = ''
        data.data.forEach((val, index) => {
            list_borrow.push(val)
            temp += `<div onclick="show_bill_return('${val.MaPM}', '${val.MaPT}', '${val.TenSach}', '${val.HinhAnh}', '${val.MaSach}', '${val.MaSV_GV}', '${val.TenSV_GV}', '${val.NgayMuon.split("T")[0]}', '${val.NgayTra.split("T")[0]}')" class="list-content-items ${index % 2 == 0 ? 'bg-green cl-wh' : ''}">${val.MaPT}</div>`
        })

        returnBill.innerHTML = temp        
    }

})
.catch(err => console.log(err))