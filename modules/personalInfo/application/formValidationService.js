/* hàm nhận vào các quy tắc xác thực từ domain
      nếu tất cả các quy tắc đều hợp lệ thì trả về isValid = true 
      nếu có quy tắc false thì trả về isValid = false, errors = { fieldName: message }
      trong đó fieldName là tên trường dữ liệu không hợp lệ, message là thông báo lỗi tương ứng */
export function formValidate(rules) {
  const errors = {};

  for (const rule of rules) {
    if (rule.isValid && !errors[rule.fieldName]) {
        errors[rule.fieldName] = null;
      continue;
    }

    if (!errors[rule.fieldName]) {
      errors[rule.fieldName] = rule.message;
    }
  }

  return {
    isValid: !Object.values(errors).some((v) => v),
    errors
  };
}