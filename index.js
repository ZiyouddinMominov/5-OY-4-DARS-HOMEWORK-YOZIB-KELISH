// O'ZGARUVCHILARNI ANIQLASH
const btn = document.getElementById("btn");
const name = document.getElementById("name");
const age = document.getElementById("age");
const car = document.getElementById("car");
const desc = document.getElementById("description");
const tbody = document.getElementById("tbody");

function validate() {
  // ISM HAQIDA MAL'UMOT TO'G'RILIGI
  if (!name.value) {
    name.focus();
    name.style.outlineColor = "red";
    return false;
  } else {
    name.style.outlineColor = "lightgray";
  }
  // YOSH HAQIDAGI MA'LUMOT TO'G'RILIGI
  if (!age.value) {
    age.focus();
    age.style.outlineColor = "red";
    return false;
  }
  if (age.value <= 0 || age.value >= 150) {
    alert("Bunday yosh kiritish mumkin emas");
    age.focus();
    return false;
  }
  if (!Number(age.value)) {
    alert("Yosh raqamda kiritilishi kerak");
    age.style.outlineColor = "red";
    age.focus();
    return false;
  } else {
    age.style.outlineColor = "lightgray";
  }
  // MASHINA TANLASH HAQIDAGI MA'LUMOT TO'G'RILIGI
  if (!car.value) {
    car.focus();
    car.style.outlineColor = "red";
    alert("Mashinani tanlang");
    return false;
  }
  // DESCCRIPTION HAQIDAGI MA'LUMOT TO'G'RILIGI
  if (!desc.value) {
    desc.focus();
    desc.style.outlineColor = "red";
    alert("Izoh kiritilmadi");
    return false;
  }

  return true;
}

// FUNCTION CLEAR
function clear() {
  name.value = "";
  age.value = "";
  car.value = "";
  desc.value = "";
}
// TUGMA BOSILGANDA
btn &&
  btn.addEventListener("click", function () {
    // AGAR VALIDATE() ISHLASA
    if (validate()) {
      const user = {
        id: Date.now(),
        name: name.value,
        age: age.value,
        car: car.value,
        desc: desc.value,
      };
      // LOCAL STORAGEGA QOSHISH
      let dataLocalStorage = [];

      if (localStorage.getItem("user")) {
        dataLocalStorage = JSON.parse(localStorage.getItem("user"));
      }
      dataLocalStorage.push(user);
      localStorage.setItem("user", JSON.stringify(dataLocalStorage));
      const tr = createRowOptimised(user, dataLocalStorage.length);
      tbody.innerHTML += tr;
      clear();
    }
  });
// LOCAL STORAGEDAGI NARSLARANI BODYGA CHIQARISH
function createRow(user, index) {
  const tr = document.createElement("tr");
  const tdNo = document.createElement("td");
  tdNo.innerHTML = index;
  const tdName = document.createElement("td");
  tdName.innerHTML = user.name;
  const tdAge = document.createElement("td");
  tdAge.innerHTML = user.age;
  const tdCar = document.createElement("td");
  tdCar.innerHTML = user.car;
  const tdDesc = document.createElement("td");
  tdDesc.innerHTML = user.desc;

  tr.appendChild(tdNo);
  tr.appendChild(tdName);
  tr.appendChild(tdAge);
  tr.appendChild(tdCar);
  tr.appendChild(tdDesc);

  return tr;
}
function createRowOptimised(user, index) {
  return `
    <tr>
      <td>${index}</td>
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td>${user.car}</td>
      <td>${user.desc}</td>
      <td>
         <span class = 'update'>Update</span>
         <span data-id = "item_${user.id}" class = 'delete'>Delete</span>
      </td>
    </tr>
  `;
}
document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("user")) {
    data = JSON.parse(localStorage.getItem("user"));
  }

  if (data.length && tbody) {
    data.forEach((element, index) => {
      const tr = createRowOptimised(element, index + 1);
      tbody.innerHTML += tr;
    });
  }
  const DeleteButtons = document.querySelectorAll("span.delete");

  if (DeleteButtons.length) {
    DeleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const elID = this.getAttribute("data-id").slice(5);
        if (elID) {
          let isDelete = confirm("Rostdan ham o'chirmoqchimisiz");
          if (isDelete) {
            data = data.filter((el) => {
              return el.id != elID;
            });
            localStorage.setItem("user", JSON.stringify(data));
            window.location.reload();
          }
        }
      });
    });
  }
});
