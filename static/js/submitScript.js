import {MESSAGES} from "./message.js";


/* hàm nhận error element và text lỗi và gán nội dung text lỗi vào element đó*/
function showError(el, message) {
  el.textContent = message;
}

/* hàm nhận error element và xóa nội dung hiện tại của element đó*/
function clearError(el) {
  el.textContent = "";
}

/* hàm nhận input là một text rồi thực hiện lần lượt
      xóa khoảng trắng đầu và cuối
      viết thường toàn bộ
      tách chuỗi thành mảng theo khoảng trắng
      biến đổi từng giá trị của mảng đó sao cho chữ cái đầu viết hoa rồi nối nó với ký tự còn lại
      ghép các từ lại thành một chuôi cách nhau bởi khoảng trắng
   kết thúc hàm   */
function capitalizeWords(text) {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/*  hàm nhận input danh sách các sport đã được chọn
    
      nếu danh sách không có giá trị nào
        hiện thông báo lỗi
        trả về false
        kết thúc hàm
      kết thúc nếu

      xóa thông báo lỗi
      trả về true
    kết thúc hàm */
function validateFavoriteSports(selectedSports) {  
  if (selectedSports.length === 0) {
    showError(document.getElementById("sports-error"),MESSAGES.REQUIRED_SPORT);
    return false;
  }
  clearError(document.getElementById("sports-error"));
  return true;
}

/* hàm nhận input là text name và element hiển thị lỗi
      nếu text name có chứa ký tự khác chữ cái
        gọi hàm show error báo lỗi
        return false 

      nếu không thì gọi hàm clearError xóa lỗi nếu có
      return true
   kết thúc hàm */
function validateName(name,el) {
  if (!/^[\p{L}\s]*$/u.test(name)) {
    showError(el,MESSAGES.NAME_ERROR);
    return false;
  }
  clearError(el);
  return true;
  
}

/* hàm gọi các validate để kiểm tra và trả về giá trị true nếu tất cả validate đểu đúng 
hoặc false nếu có một cái là sai */ 
function validateForm(selectedSports, firstName, lastName) {
  let okFirstName = validateName(firstName,document.getElementById("first-name-error"));
  let okLastName = validateName(lastName,document.getElementById("last-name-error"));
  let okFavoriteSports = validateFavoriteSports(selectedSports);
  
  return okFirstName && okLastName &&  okFavoriteSports;
}

/* hàm nhận input là removeHandler
      tạo một phần tử button mới
      đặt kiểu của button là "button"
      đặt nội dung button là "x"
      gán class "remove-btn" cho button
      gán removehandler vào sự kiện click của button đó
      trả về button
    kết thúc hàm */
function createRemoveButton(removeHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "x";
  button.className = "remove-btn";
  button.addEventListener("click", removeHandler);

  return button;
}

/* hàm trả về danh sách role hiện có và role đang được thêm vào
      tìm tất cả class name "added-role" rồi biến nodelist đó thành mảng
      duyệt qua từng phần tử mảng đó và trả về danh sách value của những role đang add và gán vào biến pendingRoleValues
      tìm tất cả options cuẩ các element có id là role-select và biến html collection đó thành array
      duyệt qua array và trả về danh sách value của các options đó và gán vào biến existingRoleValues 
    
      hàm trả về danh sách được nối lại giữa pendingRoleValues và existingRoleValues
        */
function getExistingRoleValues() {
  const pendingRoleValues = Array.from(
    document.querySelectorAll(".added-role")
  ).map((item) => item.dataset.roleValue);

  const existingRoleValues = Array.from(document.getElementById("role-select").options).map(
    (option) => option.value
  );

  return existingRoleValues.concat(pendingRoleValues);
}

/*  hàm addRole
    nếu input role rỗng hoặc chỉ chứa khoảng trắng thì return

    gọi hàm capitalizeWords cho input role
    chuyển name thành chữ thường và lưu kết quả vào biến value
    duyệt qua tất cả option trong danh sách role và danh sách đang được đợi
        nếu value của một option bằng value mới
            hiển thị thông báo "Role đã tồn tại"
            kết thúc hàm

    tạo nút xóa bằng hàm createRemoveButton và truyền vào đó hàm với hành động là:
    khi người dùng bấm nút xóa
        xóa roleItem khỏi giao diện

    tạo phần tử span mới tên là roleItem
    gán class "added-role" cho roleItem
    thêm name và nút xóa vào roleItem
    thêm roleItem vào phần tử cha đó
  kết thúc hàm */
function addRole() {

  const roleError = document.getElementById("duplicate-role-error");
  const roleName = document.getElementById("add-role-input").value;
  const addRoleGroup = document.getElementById("add-role-group");

  if (!roleName.trim()) return;

  const name = capitalizeWords(roleName);
  const value = name.toLowerCase();

  if (getExistingRoleValues().includes(value)) {
    showError(roleError, MESSAGES.ROLE_DUPLICATE);
    return;
  }
  clearError(roleError);

  const removeButton = createRemoveButton(() => {
    roleItem.remove();
  });

  const roleItem = document.createElement("span");
  roleItem.className = "added-role";
  roleItem.dataset.roleValue = value;
  roleItem.dataset.roleName = name;
  roleItem.append(name, removeButton);

  addRoleGroup.appendChild(roleItem);
  document.getElementById("add-role-input").value = "";
}

/* hàm trả về danh sách sport đã có và sport đang được thêm
      */
function getExistingSportValues() {
  const existingSportValues = Array.from(document.querySelectorAll('input[name="sports"]')
  ).map((checkbox) => checkbox.value);

  const pendingSportValues = Array.from(document.querySelectorAll(".sport-label")
  ).map((item) => item.dataset.sportValue);

  return existingSportValues.concat(pendingSportValues);
}

/* hàm gán các element cần thiết vào các biến sportsGroup,sportError,sportName
    nếu input sport là rỗng hoặc chỉ chưa khoảng trắng
       kết thúc hàm
    
    gọi hàm capitalizeWords cho biến sportName
    chỉnh thành viết thường và gán vào biến value
    duyệt qua danh sách sport và kiểm tra chỉ cần có 1 value của sport trùng với value của người dùng nhập:
      thông báo lỗi đã có sport này rồi
      kết thúc hàm
    
    tạo element label mới và gán vào biến sportLabel
    tạo element input mới và gán vào biến sportCheckBox
    sportCheckBox được gán type là checkbox với name là sports và giá trị biến value và tự động tick checkbox này
    tạo nút xóa label bằng hàm createRemoveButton và truyền vào hàm với hành đ ộng xóa sportLabel khi người dùng nhấn vào nút xóa này
    thêm sportCheckbox với nội dung là biến name và nút xóa vào sportLabel
    thêm sportLabel vào vào phần tử cha sportsGroup */
function addSport() {
  const addSportsGroup = document.getElementById("add-sports-group");
  const sportError= document.getElementById("duplicate-sport-error");
  const sportName = document.getElementById("add-sport-input").value;

  if (!sportName.trim()) return;

  const name = capitalizeWords(sportName);
  const value = name.toLowerCase();

 if (getExistingSportValues().includes(value)) {
    showError(sportError, MESSAGES.SPORT_DUPLICATE);
    return;
  }
  clearError(sportError);

  const sportItem = document.createElement('label');
  sportItem.className = 'sport-label'
  sportItem.dataset.sportValue = value;
  sportItem.dataset.sportName = name;

  const removeButton = createRemoveButton(() => {
    sportItem.remove();
  });

  sportItem.append(name, removeButton);
  addSportsGroup.appendChild(sportItem);
  document.getElementById("add-sport-input").value = "";
}

/* hàm nhận input là text thông báo
      gán element của toast vào biến toast
      thay đổi text của biến toast là input text
      thay đổi biến tên class của element toast là show
      đặt timeout là 3s rồi chạy hàm đổi tên class của toast lại thành rỗng */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";

  setTimeout(() =>  toast.className = "" , 3000);
}

/* hàm lưu lại các */
function saveForm() {
  const roleSelect = document.getElementById("role-select");
  const addedRoleItems = document.querySelectorAll(".added-role");
  const checkboxGroup = document.getElementById("checkbox-group");

  addedRoleItems.forEach((item) => {
    const value = item.dataset.roleValue;
    const name = item.dataset.roleName;

    const option = new Option(name, value);
    option.selected = true;
    roleSelect.add(option);
    item.remove()
  });

  document.querySelectorAll(".sport-label").forEach((item) => {
    const sportLabel = document.createElement("label");
    const sportCheckbox = document.createElement("input");

    sportCheckbox.type = "checkbox";
    sportCheckbox.name = "sports";
    sportCheckbox.value = item.dataset.sportValue;
    sportCheckbox.checked = true;
    sportCheckbox.className = "added-sport";

    sportLabel.append(sportCheckbox, item.dataset.sportName);
    checkboxGroup.appendChild(sportLabel);
    item.remove();
  });
}
/* hàm ngăn form gửi dữ liệu theo cơ chế mặc định của trình duyệt
      gọi hàm validateForm nếu hàm đúng thì tiếp tục nếu sai thì thì hàm kết thúc
      lấy giá trị firstName và lastName xóa khoảng cách đầu cuối và viết hoa chữ đầu lên
      tìm giá trị giới tính được chọn 
      lấy role hiện tại được chọn
      lấy danh sách môn thể thao được chọn từ hàm getSelectedSports
      tạo đối tượng formData gồm:
        firstName, lastName, selectedGender, selectedRole, selectedSports
      
      gửi formData đến API create_personal_info bằng phương thức POST
      chuyển formData thành JSON trước khi gửi
      nếu server trả về response
        chuyển response thành json
        in dữ liệu thành công ra console

      nếu xảy ra lỗi trong quá trình gủi 
        in thông tin lỗi ra console
      
    kết thúc hàm */
let isSubmitting = false;

function submitForm(event) {
  event.preventDefault();

  if (isSubmitting) return;

  const submitButton = document.getElementById("submit-button");

  isSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const firstName = capitalizeWords(document.getElementById('first-name').value);
  const lastName = capitalizeWords(document.getElementById('last-name').value);
  const selectedGender = document.getElementById("male-radio").checked ?  "male" : "female";
  const selectedRole = document.getElementById("role-select").value;
  const selectedSports = Array.from(document.querySelectorAll('input[name="sports"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);;

  if (!validateForm(selectedSports,firstName,lastName)) {
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  const formData = {
    first_name: firstName,
    last_name: lastName,
    gender: selectedGender,
    role: selectedRole,
    favorite_sports: selectedSports
  };

  console.log('Form Data:', formData);
  
  fetch("/create_personal_info/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)

  })
  .then(response => response.json())
  .then(data => {
      showToast(data.message);
      form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    });

}

const addRoleButton = document.getElementById('add-role-button');
const addSportButton = document.getElementById('add-sport-button');
const saveButton = document.getElementById('save-button')
const form = document.getElementById('submit-form');

addRoleButton.addEventListener('click', addRole);

addSportButton.addEventListener('click', addSport);

saveButton.addEventListener('click',saveForm); 

form.addEventListener("submit",submitForm);
