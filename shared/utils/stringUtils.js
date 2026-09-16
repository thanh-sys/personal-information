/* hàm nhận input là một text rồi thực hiện lần lượt
      xóa khoảng trắng đầu và cuối
      viết thường toàn bộ
      tách chuỗi thành mảng theo khoảng trắng
      biến đổi từng giá trị của mảng đó sao cho chữ cái đầu viết hoa rồi nối nó với ký tự còn lại
      ghép các từ lại thành một chuôi cách nhau bởi khoảng trắng
   kết thúc hàm   */
export function capitalizeWords(text) {
    return text
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
