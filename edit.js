"use strict";

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
const formEl = document.getElementById("container-form");

// Hiển thị dữ liệu các thú cưng
renderTableData(petArr);

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
  
      <td><button onclick="editPet('${
        pet.id
      }')" type = "button" class = "btn btn-danger">Edit</button></td>`;

    tableBodyEl.appendChild(row);
  });
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// chỉnh sửa thông tin thú cưng
function editPet(id) {
  formEl.classList.remove("hide");
  const pet = petArr.find((petItem) => petItem.id === id);
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  renderBreed();
  breedInput.value = `${pet.breed}`;
}

// nhấn chuột vào typeInput
typeInput.addEventListener("click", renderBreed);

//hàm hiển thị các loại giống đúng theo từng loại dog-cat
//hàm hiện ds breed theo type
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  // Nếu type là dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    //Nếu type là cat
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //VALIDATE DATA

  function validate(data) {
    let isValidate = true;

    if (nameInput.value.trim().length === 0) {
      alert("Please input for name");
      isValidate = false;
    }
    if (isNaN(data.age)) {
      alert("Please select Age!");
      isValidate = false;
    }

    if (isNaN(data.weight)) {
      alert("Please select Weight!");
      isValidate = false;
    }

    if (isNaN(data.length)) {
      alert("Please select length!");
      isValidate = false;
    }

    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must unique!");
        isValidate = false;
        break;
      } else if (data.age < 1 || data.age > 15 || !data.age) {
        alert("Age must be between 1 and 15!");
        return false;
      } else if (data.weight < 1 || data.weight > 15 || !data.weight) {
        alert("Weight must be between 1 and 15!");
        return false;
      } else if (data.length < 1 || data.length > 100 || !data.length) {
        alert("Length must be between 1 and 100!");
        return false;
      } else if (data.type === "Select Type") {
        alert("Please select Type");
        return false;
      } else if (data.breed === "Select Breed") {
        alert("Please select Breed");
        return false;
      } else {
        return true;
      }
    }

    return isValidate;
  }

  const isValidate = validate(data);
  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
