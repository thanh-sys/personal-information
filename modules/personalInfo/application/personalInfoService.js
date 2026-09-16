import { capitalizeWords } from "../../../shared/utils/stringUtils.js";
import { MESSAGES } from "../constants/message.js";
import { createPersonalInfoRules } from "../domain/personalInfoValidation.js";
import { formValidate } from "./formValidationService.js";


/* hàm nhận input là tên item mới và danh sách item hiện có và loại item (sport hoặc role)
      nếu tên item rỗng thì trả về null
      nếu tên item đã tồn tại trong danh sách thì trả về nội dung lỗi và loại item là null
      nếu tên item hợp lệ và chưa tồn tại trong danh sách thì trả về nội dung lỗi null và loại item là object { name, value }
      trong đó name là tên item đã được viết hoa chữ cái đầu của mỗi từ, value là tên item viết thường */
export function addItem(itemName, existingItems, itemType) {
  if (!itemName.trim()) {
    return { [itemType]: null, error: null };
  }

  const name = itemName.trim();
  const value = name.toLowerCase();
  const duplicateMessage = MESSAGES[`${itemType.toUpperCase()}_DUPLICATE`];

  if (existingItems.includes(value)) {
    return { [itemType]: null, error: duplicateMessage };
  }

  return { [itemType]: { name, value }, error: null };
}

/* hàm nhận input là dữ liệu form 
    gọi hàm createPersonalInfoRules để tạo rule xác thực từ domain
    gọi hàm formValidate và gán kết quả validateForm vào validationResult 
    nếu validationResult false thì trả về lỗi các trường lỗi và nội dung lỗi
    ngược lại thì trả về thông tin cá nhân đã được validate và viết hoa chữ cái đầu của firstName và lastName */
export function submitPersonalInfo( inputData ) {

  const rules = createPersonalInfoRules({
    firstNameInput: inputData.firstName,
    lastNameInput: inputData.lastName,
    selectedSports: inputData.favoriteSports
  });

  const validationResult = formValidate(rules);

  if (!validationResult.isValid) {
    return {
      personalInfo: null,
      errors: validationResult.errors
    };
  }

  return {
    personalInfo: {
      firstName: capitalizeWords(inputData.firstName),
      lastName: capitalizeWords(inputData.lastName),
      gender: inputData.gender,
      role: inputData.role,
      favoriteSports: inputData.favoriteSports
    },
    errors: {}
  };
}