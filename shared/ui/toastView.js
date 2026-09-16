/* hàm nhận input là message
      lấy element toast từ DOM
      thay đổi text của toast message thành message
      thay đổi class của toast thành show để hiển thị toast
      đặt timeout 3s sau đó chạy hàm đổi class của toast lại thành rỗng để ẩn toast */
export function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";

  setTimeout(() =>  toast.className = "" , 3000);
}