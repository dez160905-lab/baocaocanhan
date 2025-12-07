// js/script.js

// Hàm định dạng tiền tệ VNĐ
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
}

// Hàm thêm vào giỏ hàng (Lưu vào LocalStorage)
function themVaoGio(id, ten, gia, hinh) {
    let giohang = JSON.parse(localStorage.getItem('giohang')) || [];
    
    // Kiểm tra xem sản phẩm đã có chưa
    let item = giohang.find(i => i.id === id);
    if (item) {
        item.soluong++;
    } else {
        giohang.push({ id, ten, gia, hinh, soluong: 1 });
    }

    localStorage.setItem('giohang', JSON.stringify(giohang));
    alert('Đã thêm "' + ten + '" vào giỏ hàng!');
    capNhatSoLuongIcon();
}

// Hàm hiển thị giỏ hàng (Dùng cho trang giohang.html và dathang.html)
function hienThiGioHang() {
    let giohang = JSON.parse(localStorage.getItem('giohang')) || [];
    let tbody = document.getElementById('cart-body');
    let tongTienElement = document.getElementById('tong-tien');
    
    if (!tbody || !tongTienElement) return;

    tbody.innerHTML = '';
    let tongTien = 0;

    giohang.forEach((sp, index) => {
        let thanhTien = sp.gia * sp.soluong;
        tongTien += thanhTien;

        tbody.innerHTML += `
            <tr>
                <td><img src="${sp.hinh}" width="50"></td>
                <td>${sp.ten}</td>
                <td>${formatMoney(sp.gia)}</td>
                <td>${sp.soluong}</td>
                <td>${formatMoney(thanhTien)}</td>
                <td><button onclick="xoaSanPham(${index})" style="background:red; padding: 5px 10px;">Xóa</button></td>
            </tr>
        `;
    });

    tongTienElement.innerText = formatMoney(tongTien);
}

// Xóa sản phẩm khỏi giỏ
function xoaSanPham(index) {
    let giohang = JSON.parse(localStorage.getItem('giohang')) || [];
    giohang.splice(index, 1);
    localStorage.setItem('giohang', JSON.stringify(giohang));
    hienThiGioHang();
    capNhatSoLuongIcon();
}

// Cập nhật số lượng trên menu (Optional)
function capNhatSoLuongIcon() {
    let giohang = JSON.parse(localStorage.getItem('giohang')) || [];
    let total = giohang.reduce((sum, item) => sum + item.soluong, 0);
    let cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = `(${total})`;
}

// Xử lý khi đặt hàng thành công
function xuLyDatHang(event) {
    event.preventDefault();
    alert("Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ sớm.");
    localStorage.removeItem('giohang'); // Xóa giỏ hàng
    window.location.href = 'trangchu.html';
}

// Chạy khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    hienThiGioHang();
    capNhatSoLuongIcon();
});