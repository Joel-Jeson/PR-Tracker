let datas = [];
//for error
const form = document.getElementById("myForm");
const error = document.getElementById("error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("nameBox").value.trim();
  const pr = document.getElementById("prBox").value.trim();
  const reps = document.getElementById("repBox").value.trim();

  if (name === "") {
    error.textContent = "Exersice can't be empty";
    return;
  }
  if (pr === "") {
    error.textContent = "Please enter Your Pr weight";
    return;
  }

  if (reps === "") {
    error.textContent = "Please enter your Reps.";
    return;
  }

  error.textContent = "";
});
function saveTo() {
  localStorage.setItem("myDatas", JSON.stringify(datas));
}

function loadFromLocalStorage() {
  const loadData = localStorage.getItem("myDatas");
  if (loadData) {
    datas = JSON.parse(loadData);
  }
}
function displayData() {
  const table = document.getElementById("table");
  table.innerHTML = "";
  if (datas.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
  <td colspan="4" style="text-align:center; color:red;">Enter Your Progress.</td>
  `;
    table.appendChild(tr);
    return;
  }
  datas.forEach((data) => {
    const tr = document.createElement("tr");

    if (data.editData) {
      tr.innerHTML = `
  <td>${data.name}</td>
  <td><input value="${data.pr}" id="pr-${data.id}"/></td>
  <td><input value="${data.reps}" id="reps-${data.id}"/></td>
  <td>
    <button onclick="deleteRow(${data.id})"><i class="fa-solid fa-trash"></i></button>
    <button onclick="updateRow(${data.id})"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
 
    </td>
`;
    } else {
      tr.innerHTML = `
    <th>${data.name}</th>
    <th>${data.pr} Kgs</th>
    <th>${data.reps} reps</th>
  <td><button onclick="deleteRow(${data.id})"><i class="fa-solid fa-trash"></i></button>
    <button onclick="editRow(${data.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
    `;
    }
    table.appendChild(tr);
  });
}

function addData() {
  const name = document.getElementById("nameBox");
  const pr = document.getElementById("prBox");
  const reps = document.getElementById("repBox");
  if (!name.value || !pr.value || !reps.value) {
    alert("Please enter something");
    return;
  } else {
    const data = {
      id: Date.now(),
      editData: false,
      name: name.value,
      pr: pr.value,
      reps: reps.value,
    };
    datas = [data, ...datas];
    name.value = "";
    pr.value = "";
    reps.value = "";
  }
  saveTo();
  displayData();
}

function deleteRow(dataId) {
  datas = datas.filter((data) => {
    return data.id !== dataId;
  });
  saveTo();
  displayData();
}

function editRow(dataId) {
  datas = datas.map((data) => {
    if (data.id === dataId) {
      return {
        ...data,
        editData: true,
      };
    } else {
      return {
        ...data,
        editData: false,
      };
    }
  });
  displayData();
}

function updateRow(dataId) {
  const inputPr = document.getElementById(`pr-${dataId}`);
  const inputReps = document.getElementById(`reps-${dataId}`);

  datas = datas.map((data) => {
    if (data.id === dataId) {
      return {
        ...data,
        pr: inputPr.value,
        reps: inputReps.value,
        editData: false,
      };
    } else {
      return data;
    }
  });
  saveTo();
  displayData();
}

function clearAll() {
  datas = [];
  localStorage.clear();
  displayData();
  saveTo();
}
loadFromLocalStorage();
displayData();
