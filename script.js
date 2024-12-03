// const currentDateTime = new Date();

// const year = currentDateTime.getFullYear();
// const month = currentDateTime.getMonth() + 1; // Months are zero-based
// const day = currentDateTime.getDate();

// const hours = currentDateTime.getHours();
// const minutes = currentDateTime.getMinutes();
// // const seconds = currentDateTime.getSeconds();

// function time(hours) {

//   if (hours == 1 || hours == 13) {
//     return hours = 1;
//   } else if (hours == 2 || hours == 14) {
//    return  hours = 2;
//   } else if (hours == 3 || hours == 15) {
//    return  hours = 3;
//   } else if (hours == 4 || hours == 16) {
//    return  hours = 4;
//   } else if (hours == 5 || hours == 17) {
//     return hours = 5;
//   } else if (hours == 6 || hours == 18) {
//    return  hours = 6;
//   } else if (hours == 7 || hours == 19) {
//     return hours = 7;
//   } else if (hours == 8 || hours == 20) {
//     return hours = 8;
//   } else if (hours == 9 || hours == 21) {
//     return hours = 9;
//   } else if (hours == 10 || hours == 22) {
//     return hours = 10;
//   } else if (hours == 11 || hours == 23) {
//     return hours = 11;
//   } else {
//     return hours = 12;
//   }
// }

// const currentTime=`${year}-${month}-${day} ${time(hours)}:${minutes}`;

// console.log(currentTime);


// =============================== Retrieve tasks and taskCounter from localStorage  ===============================

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskCounter = parseInt(localStorage.getItem('taskCounter'), 10) || 0;

// Initialize tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
  tasks.forEach((task) => {
    renderTask(task);
  });
});

// =======================   Add a new task  =====================================

document.getElementById('add-task').addEventListener('click', () => {
  const taskTitleInput = document.getElementById('task-title');
  const taskDescriptionInput = document.getElementById('task-description');
  const taskTitle = taskTitleInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskTitle) {
    alert('Please enter a task title!');
    return;
  }

  taskCounter++;
  const now = new Date();
  const currentDate = now.toLocaleDateString();
  const currentTime = now.toLocaleTimeString();

  const newTask = {
    id: Date.now(), 
    title: taskTitle,
    description: taskDescription,
    date: currentDate,
    time: currentTime,
  };

  tasks.push(newTask);
  saveTasks();
  rerenderTasks();

  //==============================  Clear input fields  ========================

  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
});

//================================  Save tasks and taskCounter to localStorage  ============================

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('taskCounter', taskCounter.toString());
}

//==========================  Render all tasks ==========================================

function rerenderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear current tasks
  taskCounter = 0; // Reset the counter
  tasks.forEach((task) => {
    taskCounter++;
    task.number = taskCounter; // Update task number
    renderTask(task);
  });
  saveTasks();
}

//=====================================  Render a single task  ===================================

function renderTask(task) {
  const taskList = document.getElementById('task-list');

  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  listItem.setAttribute('data-id', task.id);
  listItem.innerHTML = `
    <header>${task.number}. ${task.title}</header>
    <p>${task.description}</p>
    <footer>
      <span>${task.date} ${task.time}</span>
      <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </footer>
  `;

  taskList.appendChild(listItem);

  //====================================  Edit task ========================================= 

  listItem.querySelector('.edit-btn').addEventListener('click', () => {
    const newTaskTitle = prompt('Edit task title:', task.title);
    const newTaskDescription = prompt('Edit task description:', task.description);

    if (newTaskTitle && newTaskDescription) {
      task.title = newTaskTitle;
      task.description = newTaskDescription;
      listItem.querySelector('header').textContent = `${task.number}. ${task.title}`;
      listItem.querySelector('p').textContent = task.description;
      saveTasks();
    } else {
      alert('Both title and description must be filled!');
    }
  });

  //==================================  Delete task =============================================

  listItem.querySelector('.delete-btn').addEventListener('click', () => {
    const taskId = task.id;
    tasks = tasks.filter((t) => t.id !== taskId);
    rerenderTasks();
  });
}
