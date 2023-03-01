let element = (id) => document.getElementById(id);

let error_name = "Username must be at least 3 characters long";
let error_email = "Email must be of form 'johndoe@email.com'";
let error_terms = "Agree to terms and conditions";
let error_dob = "Age must be between 18 and 55 years";
let empty = "This is a required field";

let item = [];

let uname = element("name"),
  email = element("email"),
  pass = element("password"),
  dob = element("dob"),
  terms = element("terms"),
  form = element("form");
submit = element("submit");

function fill() {
  let item = localStorage.getItem("entry");
  if (item) {
    item = JSON.parse(item);
  } else {
    item = [];
  }
  return item;
}
item = fill();

function error(itm, msg, cnd) {
  if (!cnd) {
    itm.style.border = "4px solid red";
    itm.setCustomValidity(msg);
    itm.reportValidity();
  } else {
    itm.style.border = "";
    itm.setCustomValidity("");
  }
}

uname.addEventListener("input", (msg) => {
  let x = uname.value.length >= 3;
  msg.preventDefault();
  error(uname, error_name, x);
});

email.addEventListener("input", (msg) => {
  let x = email.value.includes("@") && email.value.includes(".");
  msg.preventDefault();
  error(email, error_email, x);
});

dob.addEventListener("input", (msg) => {
  let age =
    Number(new Date().getFullYear()) -
    Number(new Date(dob.value).getFullYear());
  let x = age >= 18 && age <= 55;
  msg.preventDefault();
  error(dob, error_dob, x);
});

function createObj() {
  let check = false;
  if (terms.checked) {
    check = true;
  }
  let obj = {
    name: uname.value,
    email: email.value,
    password: pass.value,
    dob: dob.value,
    checked: check,
  };
  return obj;
}

function show() {
  let table = element("entry-table");
  let items = item;
  let str = `<caption><b>Entries</b></caption>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
  for (let i = 0; i < items.length; i++) {
    str += `<tr>
                    <td>${items[i].name}</td>
                    <td>${items[i].email}</td>
                    <td>${items[i].password}</td>
                    <td>${items[i].dob}</td>
                    <td>${items[i].checked}</td>
                </tr>\n`;
  }
  table.innerHTML = str;
}

form.addEventListener("submit", (msg) => {
  let x = !terms.checked;
  msg.preventDefault();
  if (!x) {
    let obj = createObj();
    item.push(obj);
    localStorage.setItem("entry", JSON.stringify(item));
  }
  show();
});

window.onload = (event) => {
  show();
};

