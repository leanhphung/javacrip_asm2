"use strict";

//các DOM Element cần sử dụng
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị danh sách
renderTableBreed(breedArr);

// Bắt sự kiện click vào nút 'submit'
btnSubmit.addEventListener("click", function() {
    // Lấy dữ liệu từ form
    const data = {
        breed: breedInput.value,
        type: typeInput.value,
    };

    // Kiểm tra dữ liệu
    const isValidate = validate(data);

    if (isValidate) {
        // Thêm dữ liệu vào mảng các breed
        breedArr.push(data);
        // Lưu dữ liệu, cập nhật lại dữ liệu
        saveToStorage("breedArr", breedArr);

        // Hiển thị lại bảng thông tin các breed
        renderTableBreed(breedArr);

        // Xóa thông tin từ form nhập
        deleteForm();
    }
});

function validate(data) {
    let isValidate = true;

    // Nếu nhập vào chuỗi trống hoặc toàn dấu cách thì báo lỗi
    if (breedInput.value.trim().length === 0) {
        alert("Please input for breed !");
        isValidate = false;
    }

    // Bắt buộc phải chọn 'type' Dog - Cat
    if (typeInput.value === "Select Type") {
        alert("Please select Type !");
        isValidate = false;
    }

    return isValidate;
}

///////////////////////////////
// Hàm xóa thông tin trên form nhập
function deleteForm() {
    breedInput.value = "";
    typeInput.value = "Select Type";
}

// Hàm hiển thị thông tin 'breed' lên bảng
function renderTableBreed() {
    tableBodyEl.innerHTML = "";

    // Cứ mỗi loại breed sẽ thêm 1 dòng (row) dữ liệu
    breedArr.forEach(function(breedItem, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td scope = "col">${index + 1}</td>
    <td scope = "col">${breedItem.breed}</td>
    <td scope = "col">${breedItem.type}</td>
    <td>
    <button type = "button" onclick = "deleteBreed('${breedItem.breed}')"
    class = "btn btn-danger">Delete</button>
    </td>`;

        tableBodyEl.appendChild(row);
    });
}

////////////////////////////
// Hàm xóa các breed
function deleteBreed(breed) {
    // Xác nhận xóa
    const isDelete = confirm("Are you sure?");

    if (isDelete) {
        // Thực hiện bước xóa
        for (let i = 0; i < breedArr.length; i++) {
            if (breed === breedArr[i].breed) {
                // xóa khỏi mảng
                breedArr.splice(i, 1);
                // Cập nhật lại dữ liệu localStorage
                saveToStorage("breedArr", breedArr);
                // Gọi lại hàm hiển thị
                renderTableBreed(breedArr);
                break;
            }
        }
    }
}