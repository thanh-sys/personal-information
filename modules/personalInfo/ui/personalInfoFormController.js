import { PersonalInfoFormView } from "./personalInfoFormView.js";
import { addItem, submitPersonalInfo } from "../application/personalInfoService.js";

/* lớp điều khiển form personal info
      tạo một instance view của PersonalInfoFormView
      trong hàm init() đăng ký các sự kiện cho các nút thêm sport, thêm role và submit form
       */
export class PersonalInfoFormController {
  constructor() {
    this.view = new PersonalInfoFormView();
    this.init();
  }

  init() {
    this.view.onAddSport(() => this.handleAddItem("sport"));
    this.view.onAddRole(() => this.handleAddItem("role"));
    this.view.onSubmit((event) => this.handleSubmit(event));
  }

  /* hàm xử lý sự kiện khi nhấn nút thêm sport hoặc thêm role
        lấy giá trị từ input từ view
        lấy danh sách item hiện có 
        gọi hàm addItem để validate và chuẩn hóa value 
        nếu có lỗi thì hiện dùng hàm showValidationErrors hiện lỗi
        nếu không thì clear lỗi và gọi hàm updateSport để thêm sport mới vào giao diện  */
  handleAddItem(type) {
    const inputKey = type === "sport" ? "addSportInput" : "addRoleInput";
    const existingItems = type === "sport" ? this.view.getSportValues() : this.view.getRoleValues();
    const itemName = this.view[inputKey].value;
    const result = addItem(itemName, existingItems, type);

    if (result.error) {
      this.view.showValidationErrors({ [type]: result.error });
      return;
    }

    if (!result[type]) {
      return;
    }

    this.view.showValidationErrors({ [type]: null });

    if (type === "sport") {
      this.view.updateSport(result.sport);
      return;
    }

    this.view.updateRole(result.role);
  }

  /* hàm xử lý sự kiện khi submit form
        lấy dữ liệu từ form từ view
        gọi hàm submitPersonalInfo để validate và chuẩn hóa dữ liệu form
        nếu có lỗi thì hiện dùng hàm showValidationErrors hiện lỗi
        nếu không thì gọi hàm showPersonalInfo để hiển thị thông tin cá nhân đã được validate */
  handleSubmit(event) {
    event.preventDefault();

    const inputData = this.view.getFormData();

    const result = submitPersonalInfo(inputData);
    this.view.showValidationErrors(result.errors);

    if (!result.personalInfo) {
      return;
    }

    this.view.showPersonalInfo(result.personalInfo);

  }
}