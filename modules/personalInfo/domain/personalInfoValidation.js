import { isInputNotEmpty, containsOnlyLetters, isListNotEmpty} from "../../../shared/utils/validation.js";

import { MESSAGES } from "../constants/message.js";

/* hàm tạo các rule xác thực cho personal info form
    hàm nhận input là dữ liệu từ form
    gọi các hàm xác thực từ shared/utils/validation.js và truyền vào các tham số cần thiết 
    hàm trả về mảng các rule xác thực */
export function createPersonalInfoRules({
  firstNameInput,
  lastNameInput,
  selectedSports
}) {
  return [
    {
      fieldName: "firstName",
      isValid: isInputNotEmpty(firstNameInput),
      message: MESSAGES.FIRST_NAME_REQUIRED
    },
    {
      fieldName: "firstName",
      isValid: !isInputNotEmpty(firstNameInput) || containsOnlyLetters(firstNameInput),
      message: MESSAGES.FIRST_NAME_INVALID
    },
    {
      fieldName: "lastName",
      isValid: isInputNotEmpty(lastNameInput),
      message: MESSAGES.LAST_NAME_REQUIRED
    },
    {
      fieldName: "lastName",
      isValid: !isInputNotEmpty(lastNameInput) || containsOnlyLetters(lastNameInput),
      message: MESSAGES.LAST_NAME_INVALID
    },
    {
      fieldName: "favoriteSports",
      isValid: isListNotEmpty(selectedSports),
      message: MESSAGES.REQUIRED_SPORT
    }
  ];
}