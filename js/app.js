// ===================================================
// app.js  –  the to-do app itself
// ===================================================

// ----- 0. Protect the page: no login = back to the login page -----
const user = localStorage.getItem("nocturne_session");
if (!user) {
  window.location.href = "login.html";
}

// ----- 1. Data: each user has their own task list -----
const STORAGE_KEY = "nocturne_tasks_" + user;
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filter = "all";
let chosenPriority = "medium";
let newId = null;                         // remembers which task to animate in

const input = document.getElementById("taskInput");
const list  = document.getElementById("taskList");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ----- 2. Actions: change the data, then redraw -----
function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const task = { id: Date.now(), text: text, done: false, priority: chosenPriority };
  tasks.unshift(task);                    // newest task on top
  newId = task.id;
  input.value = "";
  save();
  render();
}

function toggleTask(id, checkEl) {
  const t = tasks.find(t => t.id === id);
  t.done = !t.done;
  if (t.done) fireConfetti(checkEl);
  save();
  render();
}

function deleteTask(id, li) {
  li.classList.add("removing");           // play slide-out first
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, 250);
}

function editTask(id, span) {
  const t = tasks.find(t => t.id === id);
  const box = document.createElement("input");
  box.className = "edit-input";
  box.value = t.text;
  span.replaceWith(box);
  box.focus();
  function finish() {
    if (box.value.trim()) t.text = box.value.trim();
    save();
    render();
  }
  box.onblur = finish;
  box.onkeydown = e => { if (e.key === "Enter") finish(); };
}

// ----- 3. Confetti -----
function fireConfetti(el) {
  const r = el.getBoundingClientRect();
  const colors = ["#8b5cf6", "#ff3d81", "#ffb86b", "#4ade80"];
  for (let i = 0; i < 14; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = r.left + r.width / 2 + "px";
    c.style.top  = r.top + r.height / 2 + "px";
    c.style.background = colors[i % colors.length];
    c.style.setProperty("--x", (Math.random() * 160 - 80) + "px");
    c.style.setProperty("--y", (Math.random() * 160 - 80) + "px");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 800);
  }
}

// ----- 4. Draw the whole screen from the data -----
function render() {
  list.innerHTML = "";

  const visible = tasks.filter(t =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  if (visible.length === 0) {
    list.innerHTML = '<div class="empty">All clear. Add something above ✨</div>';
  }

  visible.forEach(t => {
    const li = document.createElement("li");
    li.className = t.priority + (t.done ? " done" : "") + (t.id === newId ? " new" : "");

    const check = document.createElement("div");
    check.className = "check";
    check.textContent = "✓";
    check.onclick = () => toggleTask(t.id, check);

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = t.text;            // textContent keeps user input safe
    span.ondblclick = () => editTask(t.id, span);

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "✕";
    del.onclick = () => deleteTask(t.id, li);

    li.append(check, span, del);
    list.appendChild(li);
  });
  newId = null;

  // Progress ring (213.6 = full length of the circle)
  const total = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;
  document.getElementById("ringFill").style.strokeDashoffset = 213.6 - (213.6 * percent) / 100;
  document.getElementById("percent").textContent = percent + "%";
  document.getElementById("counter").textContent =
    (total - doneCount) + (total - doneCount === 1 ? " task left" : " tasks left");
}

// ----- 5. Connect the buttons -----
document.getElementById("addBtn").onclick = addTask;
input.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });

document.querySelectorAll("#prioPicker button").forEach(btn => {
  btn.onclick = () => {
    document.querySelector("#prioPicker .active").classList.remove("active");
    btn.classList.add("active");
    chosenPriority = btn.dataset.p;
  };
});

document.querySelectorAll("#filters button").forEach(btn => {
  btn.onclick = () => {
    document.querySelector("#filters .active").classList.remove("active");
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  };
});

document.getElementById("clearBtn").onclick = () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
};

// ----- 6. Log out: remove the session and go back to the login page -----
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("nocturne_session");
  window.location.href = "login.html";
};

// ----- 7. Greeting with the user's name + today's date -----
document.getElementById("userName").textContent = "Signed in as " + user;

const hour = new Date().getHours();
const word = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
const greeting = document.getElementById("greeting");
const accent = document.createElement("span");
accent.textContent = word + ", " + user + ".";   // textContent keeps the name safe
greeting.append("Good", document.createElement("br"), accent);

document.getElementById("today").textContent =
  new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

render();
