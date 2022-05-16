1.=> Vào file connectDB.js để sửa tên các trạm cơ sở dữ liệu cho phù hợp.
2.=> chạy dòng lệnh: node index.js (server được mở ở port 8888)
3.=> (get) http://localhost:8888/start để khởi tạo một tài khoản admin đầu tiên.
4.=> (post) http://localhost:8888/login để đăng nhập (MaNV=admin;Pass=admin123)
5.=> Sử dụng tài khoản admin này để tạo các tài khoản nhân viên.

6.=> Để có thể đăng nhập vào tài khoản nhân viên, phải xác nhận mình đang làm việc tại chi nhánh nào
    6.1=> (get) http://localhost:8888/index/:cn để xác nhận chi nhánh params=CN1|CN2|ADMIN

7. => Sử dụng tài khoản nhân viên để quản lý sách và các phiếu mượn, phiếu trả.