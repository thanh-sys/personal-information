import { isInputNotEmpty, containsOnlyLetters, isListNotEmpty } from "../../../shared/utils/validation.js";
import { MESSAGES } from "../constants/message.js";

/* hàm tạo các rule xác thực cho personal info form
      nhận input là object chứa dữ liệu từ form
      mỗi rule là một object chứa fieldName, isValid và message */
function makeRule(fieldName, condition, message) {
  return { fieldName, isValid: condition, message };
}
 /* hàm nhận input là dữ liệu từ form 
    hared/utils/validation.js và truyền vào các tham số cần thiết 
    hàm trả về mảng các rule xác thực */
export function createPersonalInfoRules({firstNameInput, lastNameInput, selectedSports}) {
  const firstNameEmpty = isInputNotEmpty(firstNameInput);
  const lastNameEmpty = isInputNotEmpty(lastNameInput);
  return [
    makeRule("firstName", firstNameEmpty, MESSAGES.FIRST_NAME_REQUIRED),
    makeRule("firstName", !firstNameEmpty || containsOnlyLetters(firstNameInput), MESSAGES.FIRST_NAME_INVALID),
    makeRule("lastName", lastNameEmpty, MESSAGES.LAST_NAME_REQUIRED),
    makeRule("lastName", !lastNameEmpty || containsOnlyLetters(lastNameInput), MESSAGES.LAST_NAME_INVALID),
    makeRule("favoriteSports", isListNotEmpty(selectedSports), MESSAGES.REQUIRED_SPORT)
  ];
}