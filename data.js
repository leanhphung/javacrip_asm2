"use strict";
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const fileInput = document.getElementById("input-btn");

// Bắt sự kiện khi bấm nút Export File
btnExport.addEventListener("click", function() {
    const isExport = confirm("Are you sure Export");
    if (isExport) {
        saveStaticDataToFile();
    }
});

// Hàm lưu dữ liệu xuống file
function saveStaticDataToFile() {
    const blod = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
        type: "application/json",
    });
    // lưu file
    saveAs(blod, "petData.json");
}

//Bắt sự kiện khi bấm nút Import file
btnImport.addEventListener("click", function() {
    if (!fileInput.value) {
        alert("Please choose file Import");
    } else {
        const isImport = confirm("Are you sure?");
        if (isImport) {
            const file = fileInput.file[0];
            const reader = new FileReader();
            // sự kiện load sữ liệu file
            reader.addEventListener(
                "load",
                function() {
                    const isValidate = checkFile(JSON.parse(reader.result));
                    if (isValidate) {
                        saveToStorage("petArr", JSON.parse(reader.result));
                        alert("Import success!");
                    }
                },
                false
            );
            // đọc file
            if (file) {
                reader.readAsText(file);
            }
            // reset file
            fileInput.value = "";
        }
    }
});