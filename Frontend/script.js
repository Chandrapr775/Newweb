const API_URL = "http://localhost:5000/api/tasks";

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  document.getElementById("task-form").reset();
  fetchTasks();
});

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.title} - ${task.description}</span>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
