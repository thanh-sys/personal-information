# Project Structure

## Main.js (Entry Point)

```javascript
new PersonalInfoFormController();
```

## Domain Layer

### `personalInfoValidation.js`

Định nghĩa các rule validation từ domain.

## Application Layer

### `formValidationService.js`

Nhận rule từ domain → validate → trả kết quả.

### `personalInfoService.js`

* `addItem()`: Thêm sport/role mới.
* `submitPersonalInfo()`: Validate và chuẩn hóa dữ liệu khi submit.

## UI Layer

### `personalInfoFormController.js`

Xử lý sự kiện:

* Add Sport
* Add Role
* Submit

### `personalInfoFormView.js`

Quản lý DOM, lấy/hiển thị dữ liệu.

## Shared Layer

### `stringUtils.js`

Hàm `capitalizeWords()`.

### `validation.js`

Các hàm validate:

* Check empty
* Check letters
* Check list

### `errorView.js`

Hiển thị/xóa lỗi.

### `toastView.js`

Hiển thị thông báo.

---

# `showPersonalInfo()`

Hàm `showPersonalInfo` nhận dữ liệu Personal Information từ Controller.

### Steps

1. Tìm div `#output` trong HTML.
2. Xóa nội dung cũ (nếu có lần submit trước).
3. Tạo các phần tử mới bằng JavaScript:

   * Tạo `<h3>` với text `"Personal information"`.
   * Tạo `<p>` với text `"First name: John Doe"`.
   * Tạo `<p>` với text `"Last name: Smith"`.
   * Tạo `<p>` với text `"Gender: male"`.
   * Tạo `<p>` với text `"Role: manager"`.
   * Tạo `<p>` với text `"Favorite sports: football, basketball"`.
4. Thêm tất cả những phần tử này vào div `#output`.