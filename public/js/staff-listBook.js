let model_info = document.getElementById('model_info')
let close_model_info = document.getElementById('close_model_info')

//functions
let show_info = (id, name, author, type, campus, status, img) => {
    document.getElementById('dt-book-id').innerHTML = id
    document.getElementById('img').setAttribute('src', img)
    document.getElementById('dt-book-name').innerHTML = name
    document.getElementById('dt-book-author').innerHTML = author
    if(type == 'Sach01')
        document.getElementById('dt-book-type').innerHTML = 'Tiểu thuyết'
    else if(type == 'Sach02')
        document.getElementById('dt-book-type').innerHTML = 'Truyện cười'
    else if(type == 'Sach03')
        document.getElementById('dt-book-type').innerHTML = 'Trinh thám'
    else
        document.getElementById('dt-book-type').innerHTML = 'Truyện ma'

    campus == 'CN1' ? document.getElementById('dt-book-campus').innerHTML = "Chi nhánh 1": document.getElementById('dt-book-campus').innerHTML = "Chi nhánh 2" 
    
    if(status == 'false'){
        document.getElementById('dt-book-status').innerHTML='Có thể mượn'
        document.getElementById('dt-book-status').setAttribute('class', 'cl-green')
    }
    else{
        document.getElementById('dt-book-status').innerHTML='Đã mượn'
        document.getElementById('dt-book-status').setAttribute('class', 'cl-red')
    }
    model_info.style.display = 'block'
}

close_model_info.addEventListener('click', () => {
    model_info.style.display = 'none'
})

let books = []

fetch('/books',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then(data => {
    if(data.code == 200){
        let list_book = document.getElementById('list-book')
        let temp = ''
        data.data.forEach((val, index) => {
            books.push(val)
            temp += `<div onclick="show_info('${val.MaSach}', '${val.TenSach}', '${val.TacGia}', '${val.MaLoai}', '${val.MaCN}', '${val.TrangThai}', '${val.HinhAnh}')" class="list-book-items ${index % 2 == 0 ?'bg-blue cl-wh':''}">
                        <div class="list-book-item-id">${val.MaSach}</div>
                        <div class="list-book-item-name">${val.TenSach}</div>
                        <div class="list-book-item-author">${val.TacGia}</div>
                    </div>  `
        });

        list_book.innerHTML = temp
    }
})
.catch(err => console.log(err))

let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let list_book = document.getElementById('list-book')
    let tmp = ''
    let count_cl = 0
    books.forEach((val, index) => {
        if(val.TenSach.toLowerCase().indexOf(words.toLowerCase()) != -1){
            tmp += `<div onclick="show_info('${val.MaSach}', '${val.TenSach}', '${val.TacGia}', '${val.MaLoai}', '${val.MaCN}', '${val.TrangThai}', '${val.HinhAnh}')" class="list-book-items ${count_cl % 2 == 0 ?'bg-blue cl-wh':''}">
                        <div class="list-book-item-id">${val.MaSach}</div>
                        <div class="list-book-item-name">${val.TenSach}</div>
                        <div class="list-book-item-author">${val.TacGia}</div>
                    </div>  `
            count_cl += 1
        }
    })

    list_book.innerHTML = tmp
})