var bookmarkNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("siteUrl");

var dataList = [];
if (localStorage.getItem("container") !== null) {
  dataList = JSON.parse(localStorage.getItem("container"));
  displayData();
}

function isValidURL(url) {
  if (!(url.startsWith("http://") || url.startsWith("https://"))) return false;
  if (url.includes(" ")) return false;

  var countDot = 0;
  for (var i = 0; i < url.length; i++) {
    if (url[i] === ".") countDot++;
  }

  return countDot <= 2;
}

function submitData() {
  var data = {
    name: bookmarkNameInput.value.trim(),
    url: siteUrlInput.value.trim(),
  };

  if (!isValidURL(data.url) || data.name.length < 3) {
    showAlert();
    return;
  }

  closeAlert();
  dataList.push(data);
  localStorage.setItem("container", JSON.stringify(dataList));
  displayData();
  clearInputs();
  resetIcons();
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < dataList.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataList[i].name}</td>
        <td><button onclick="visitSite('${dataList[i].url}')" class="btn btn1"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteItem(${i})" class="btn btn2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("content").innerHTML = cartona;
}

function visitSite(url) {
  window.open(url, "_blank");
}

function clearInputs() {
  bookmarkNameInput.value = "";
  siteUrlInput.value = "";
}

function deleteItem(index) {
  dataList.splice(index, 1);
  localStorage.setItem("container", JSON.stringify(dataList));
  displayData();
}

function showAlert() {
  document.getElementById("urlAlert").classList.remove("d-none");
}

function closeAlert() {
  document.getElementById("urlAlert").classList.add("d-none");
}

function validateName() {
  const icon = document.getElementById("nameIcon");
  const name = bookmarkNameInput.value.trim();

  if (name.length >= 3) {
    icon.className = "fa-solid fa-circle-check position-absolute top-50 end-0 translate-middle-y me-3 text-success";
  } else {
    icon.className = "fa-solid fa-circle-question position-absolute top-50 end-0 translate-middle-y me-3 text-danger";
  }
}

function validateURL() {
  const icon = document.getElementById("urlIcon");
  const url = siteUrlInput.value.trim();

  if (isValidURL(url)) {
    icon.className = "fa-solid fa-circle-check position-absolute top-50 end-0 translate-middle-y me-3 text-success";
  } else {
    icon.className = "fa-solid fa-circle-question position-absolute top-50 end-0 translate-middle-y me-3 text-danger";
  }
}

function resetIcons() {
  document.getElementById("nameIcon").className = "fa-solid fa-circle-question position-absolute top-50 end-0 translate-middle-y me-3 text-muted";
  document.getElementById("urlIcon").className = "fa-solid fa-circle-question position-absolute top-50 end-0 translate-middle-y me-3 text-muted";
}
