import { showError, clearError } from "../../../shared/ui/errorView.js";
import {showToast} from "../../../shared/ui/toastView.js";
import { MESSAGES } from "../constants/message.js";
/* lớp view của form personal info
    trong constructor khởi tạo các phần tử DOM của form 
    và các phần tử hiển thị lỗi */
export class PersonalInfoFormView {
  constructor() {
    this.form = document.getElementById('submit-form');
    this.firstNameInput = document.getElementById('first-name');
    this.lastNameInput = document.getElementById('last-name');
    this.maleRadio = document.getElementById('male-radio');
    this.roleSelect = document.getElementById('role-select');
    this.addSportInput = document.getElementById('add-sport-input');
    this.addRoleInput = document.getElementById('add-role-input');
    this.addSportButton = document.getElementById('add-sport-button');
    this.addRoleButton = document.getElementById('add-role-button');
    this.checkboxGroup = document.getElementById('checkbox-group');
    this.roleFormGroup = document.getElementById('role-form-group');
    this.output = document.getElementById("output");
    this.errorElements = {
      firstName: document.getElementById("first-name-error"),
      lastName: document.getElementById("last-name-error"),
      favoriteSports: document.getElementById("sports-error"),
      role: document.getElementById("duplicate-role-error"),
      sport: document.getElementById("duplicate-sport-error")
    };
  }

  /* hàm lấy dữ liệu từ form thông qua các phần tử DOM 
  và trả về một object chứa dữ liệu form*/
  getFormData() {
    return {
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      gender: this.maleRadio.checked ? 'male' : 'female',
      role: this.roleSelect.value,
      favoriteSports: Array.from(document.querySelectorAll('input[name="sports"]:checked')).map((checkbox) => checkbox.value)
    };
  }

  /* hàm nhận input là object errors chứa các trường lỗi và nội dung lỗi
        duyệt qua các cặp key-value trường lỗi và nội dung lỗi của object errors
        nếu trường lỗi tồn tại trong errorElements và có nội dung lỗi thì hiển thị lỗi bằng hàm showError
        nếu không có nội dung lỗi thì xóa lỗi bằng hàm clearError
     hiển thị lỗi tương ứng cho từng trường trong form */
  showValidationErrors(errors) {
    for (const [fieldName, message] of Object.entries(errors)) {
      const errorElement = this.errorElements[fieldName];

      if (message) {
        showError(errorElement, message);
      } else {
        clearError(errorElement);
      }
    }
  }

  /* hàm duyệt qua tất cả element hiển thị lỗi và gọi hàm xóa lỗi cho từng element */
  clearValidationErrors() {
    for (const errorElement of Object.values(this.errorElements)) {
      clearError(errorElement);
    }
  }

  /* hàm lấy danh sách sport hiện có trong form
        duyệt qua các checkbox có name là "sports" và trả về mảng chứa các 
        giá trị của các checkbox đó*/
  getSportValues() {
    return Array.from(this.checkboxGroup.querySelectorAll('input[name="sports"]'))
    .map((checkbox) => checkbox.value);
  }

  /* hàm nhận input là object chứa tên và giá trị của sport mới
        tạo phần tử label và checkbox mới với giá trị và tên tương ứng
        thêm label chứa checkbox, tên sport vào checkboxGroup
        xóa giá trị trong input thêm sport */
  updateSport({ name, value }) {
    const sportLabel = document.createElement('label');
    const sportCheckbox = document.createElement('input');

    sportCheckbox.type = 'checkbox';
    sportCheckbox.name = 'sports';
    sportCheckbox.value = value;
    sportCheckbox.checked = true;

    sportLabel.append(sportCheckbox, name);
    this.checkboxGroup.appendChild(sportLabel);
    this.addSportInput.value = "";
  }

  /* hàm lấy danh sách role hiện có trong form
        duyệt qua các option trong select role và trả về mảng chứa các 
        giá trị của các option đó*/
  getRoleValues() {
    return Array.from(this.roleSelect.options).map((option) => option.value);
  }

  /* hàm nhận input là object chứa tên và giá trị của role mới
        tạo phần tử option mới với giá trị và tên tương ứng
        thêm role mới vào role select trong form */
  updateRole({ name, value }) {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = value;
    option.selected = true;

    this.roleSelect.add(option);
    this.addRoleInput.value = "";
  }

  /* hàm nhận input là object personalInfo chứa thông tin cá nhân đã được validate và chuẩn hóa
        xóa nội dung trong output
        tạo các phần tử DOM để hiển thị thông tin cá nhân
        thêm các phần tử DOM vào output
        reset form */
  showPersonalInfo(personalInfo) {
    this.output.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = "Personal information";

    const pElements = {"First Name": personalInfo.firstName, "Last Name": personalInfo.lastName, 
      "Gender": personalInfo.gender, 
      "Role": personalInfo.role, 
      "Favorite Sports": personalInfo.favoriteSports.join(", ")
    };
    
    this.output.append(title);
    for (const personalInfoKey in pElements) {
      const p = document.createElement("p");
      p.textContent = `${personalInfoKey}: ${pElements[personalInfoKey]}`;
      this.output.append(p);
    }

    this.form.reset();
    this.addRoleInput.value = "";
    this.addSportInput.value = "";
    this.clearValidationErrors();
    showToast(MESSAGES.SUBMIT_SUCCESS);
  }

  onAddSport(handler) {
    this.addSportButton.addEventListener('click', handler);
  }

  onAddRole(handler) {
    this.addRoleButton.addEventListener('click', handler);
  }

  onSubmit(handler) {
    this.form.addEventListener('submit', handler);
  }
}