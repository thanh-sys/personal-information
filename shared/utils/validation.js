/* hàm nhận input là chuỗi
    hàm trả về true nếu chuỗi không rỗng, false nếu chuỗi rỗng */
export function isInputNotEmpty(input) {
  return input.trim().length > 0;
}
/* hàm nhận input là chuỗi
    hàm trả về true nếu chuỗi chỉ chứa chữ cái và khoảng trắng, false nếu chuỗi chứa ký tự khác */
export function containsOnlyLetters(input) {
  return /^[\p{L}\s]+$/u.test(input.trim());
}
/* hàm nhận input là mảng
    hàm trả về true nếu mảng không rỗng, false nếu mảng rỗng */
export function isListNotEmpty(list) {
  return list.length > 0;
}
