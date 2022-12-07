"use strict";

//các DOM Element cần sử dụng
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

let deleteElList = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

// Hiển thị danh sách thú cưng đã nhập trước đó
renderTableData(petArr);

// Bắt sự kiện ấn chọn vào typeInput để hiển thị loại giống
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị loại giống Dog-Cat
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });

    // Nếu type là Cat
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

////////////////////////////////////////
// Bắt sự kiện vào nút " submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ Input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.Checked,
    dewormed: dewormedInput.Checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // Kiểm tra dữ liệu nhập vào
  const isValidate = validate(data);

  if (isValidate) {
    // Nếu dữ liệu hợp lệ thì thêm thú cưng vào petArr
    petArr.push(data);
    saveToStorage("petArr", petArr);

    // Hiển thị danh sách thú cưng
    renderTableData(petArr);

    // Xóa các dữ  liệu vừa nhập trên form
    deleteForm();
  }
});

///////////////////////////////
// Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  // Xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = "";

  // Tạo hàng (row) chứa dữ liệu mỗi thú cưng trên bảng
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope = "row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}</td>
    <td>${pet.length}</td>
    <td>${pet.breed}</td>
    <td>
    <i class = "bi bi-square-fill" style = "color: ${pet.color}"></i>
    </td>
    <td><i class = "bi
    ${pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class = "bi
    ${pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class = "bi
    ${pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td>
    ${displayTime(pet.date).slice(8, 10)}
    /${displayTime(pet.date).slice(5, 7)}
    /${displayTime(pet.date).slice(0, 4)}
    </td>

    <td><button onclick = "deletePet('${pet.id}')"
     type = "button" class = "btn btn-danger">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  });
}

/////////////////////////////
// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

/////////////////////////////////
// Hàm xóa các dữ liệu vừa nhập trên Form
function deleteForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//////////////////////////////
// Hàm xóa 1 thú cưng với id truyền vào
function deletePet(petId) {
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    // Thực hiện bước xóa
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // Xóa khỏi mảng
        petArr.splice(i, 1);
        // Cập nhật lại dữ liệu localStorage
        saveToStorage("petArr", petArr);
        // Gọi lại hàm hiển thị
        renderTableData(petArr);
        break;
      }
    }
  }
}

///////////////////////////
// Hiển thị thú cưng khỏe mạnh
// Bắt sự kiện click vào nút 'Show Healthy Pet'

let healthyCheck = true;
//healthyCheck = true : thú cưng khỏe mạnh
//healthyCheck = false: tất cả thú cưng

healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    // Hiện thú cưng khỏe mạnh
    showHealthyPet();

    // Thay đổi tên nút 'Show Healthy Pet' thành 'Show All Pet'
    healthyBtn.innerHTML = "Show All Pet";
    healthyCheck = false;
  } else {
    // Hiển thị tất cả thú cưng
    renderTableData(petArr);

    // Thay đổi tên nút thành 'Show Healthy Pet'
    healthyBtn.innerHTML = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Hàm hiển thị các thú cưng khỏe mạnh
function showHealthyPet() {
  let healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  renderTableData(healthyPetArr);
}

///////////////////////////////////
// Kiểm tra dữ liệu
// true = hợp lệ ; false = không hợp lệ
function validate(data) {
  let isValidate = true;

  // Nếu nhập là chuỗi trống hoặc toàn dấu cách thì báo lỗi
  // Kiểm tra trường id
  if (idInput.value.trim().length === 0) {
    alert("Please input for id");
    isValidate = false;
  }

  // Kiểm tra trường name
  if (nameInput.value.trim().length === 0) {
    alert("Please input for name");
    isValidate = false;
  }

  // Kiểm tra trường age
  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }

  // Kiểm tra trường weight
  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }

  // Kiểm tra trường length
  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }

  // ID không được trùng nhau
  if (!petArr.every((pet) => (pet.id !== data.id ? true : false))) {
    alert("ID must unique!");
    isValidate = fasle;
  }

  // Trường age chỉ nhập từ 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = fasle;
  }

  // Trường weight chỉ nhập từ 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = fasle;
  }

  // Trường length chỉ nhập từ 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = fasle;
  }

  // Bắt buộc phải chọn giá trị cho Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = fasle;
  }
  return isValidate;
}
