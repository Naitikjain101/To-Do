# TO-DO | Task Management App

A sleek, dark-themed productivity application built using **HTML5, CSS3, and Vanilla JavaScript**. Manage tasks, organize priorities, track progress, and stay productive with a clean and intuitive interface.

**No frameworks. No installation. No backend required.**

---

## Features

### Authentication & User Management
- Login and sign-up functionality on a single page with two tabs.
- Input validation with clear error messages.
- Protected application page with session checking.
- Separate task lists for individual users.
- Logout functionality.

### Task Management
- Add new tasks.
- Edit tasks using double-click.
- Delete individual tasks.
- Mark tasks as completed.
- Confetti celebration on task completion.
- Three priority levels: Low, Medium, and High.

### Productivity Dashboard
- Filter tasks by All, Active, and Done.
- Visual progress ring.
- Tasks-left counter.
- Clear all completed tasks at once.
- Personalized time-based greeting.
- Automatic task saving using browser storage.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, layouts, glass effects and transitions |
| JavaScript ES6 | Application logic and DOM manipulation |
| localStorage | Browser-side data persistence |
| Google Fonts (Sora) | Typography |

---

## Project Structure

```text
todo-app/
│
├── login.html
│   └── Login and Sign-Up Page
│
├── index.html
│   └── Main To-Do Application
│
├── css/
│   └── style.css
│       └── Shared Styling
│
├── js/
│   ├── login.js
│   │   └── Authentication and Session Management
│   │
│   └── app.js
│       └── Task Management and Dashboard Logic
│
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/todo-app.git
```

### 2. Navigate to the Project

```bash
cd todo-app
```

### 3. Launch the Application

Open `login.html` directly in your preferred web browser.

Supported browsers:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

### 4. Create Your Account

1. Open the Sign Up tab.
2. Enter your username and password.
3. Create your account.
4. Start managing your tasks.

---

## Application Workflow

```text
             LOGIN / SIGN-UP
                    |
                    v
             AUTHENTICATION
                    |
                    v
             SESSION CREATED
                    |
                    v
             MAIN DASHBOARD
                    |
          +---------+---------+
          |         |         |
          v         v         v
        ADD       EDIT      DELETE
          |         |         |
          +---------+---------+
                    |
                    v
             UPDATE TASKS
                    |
                    v
             SAVE TO STORAGE
                    |
                    v
              RENDER UI
                    |
                    v
                LOGOUT
                    |
                    v
              LOGIN PAGE
```

---

## How It Works

### Authentication System

- Users can register and log in through a unified authentication page.
- Account details are stored in browser `localStorage`.
- Login credentials are validated against stored account information.
- Successful authentication creates a user session.
- The application checks the session before loading the dashboard.

### Protected Application

When `index.html` loads, `app.js` checks whether an authenticated session exists.

If no session is available, the user is redirected to `login.html`.

### Individual Task Storage

Each user's tasks are stored under a separate browser storage key:

```javascript
nocturne_tasks_<username>
```

This keeps task lists separate between users on the same browser.

### Task Rendering System

The application follows a simple state-management workflow:

```text
User Action
    |
    v
Update Task Array
    |
    v
Save to localStorage
    |
    v
Call render()
    |
    v
Refresh Dashboard
```

---

## Core Functionality

| Feature | Description |
|---|---|
| Create | Add new tasks |
| Read | Display saved tasks |
| Update | Edit tasks and completion status |
| Delete | Remove individual tasks |
| Filter | View All, Active or Done tasks |
| Prioritize | Assign Low, Medium or High priority |
| Persist | Save tasks in localStorage |

---

## Security & Limitations

This application is intended for educational purposes and personal demonstrations.

- User credentials are stored in browser `localStorage`.
- Passwords are not protected using server-side hashing.
- Client-side authentication can be bypassed.
- Data remains limited to the browser and device where it was created.
- No backend database or cloud synchronization is implemented.

**Important:** Do not use this demonstration authentication system for real passwords or sensitive information.

---

## Future Improvements

- [ ] Backend authentication and secure password hashing.
- [ ] Database integration.
- [ ] Cloud synchronization across devices.
- [ ] Due dates and deadline reminders.
- [ ] Task categories and custom labels.
- [ ] Advanced search and sorting.
- [ ] Drag-and-drop task organization.
- [ ] Dark and light theme switching.
- [ ] Progressive Web App (PWA) support.
- [ ] Notifications and recurring tasks.

---

## Learning Outcomes

This project demonstrates practical knowledge of:

- HTML5 and CSS3.
- JavaScript ES6.
- DOM manipulation and event handling.
- Browser storage using localStorage.
- Basic authentication workflows.
- Session management.
- CRUD operations.
- Responsive web design.
- Frontend application architecture.

---

## License

Free to use, modify, and distribute for educational purposes and personal learning.

---

## Support

If you find this project useful:

- Star the repository.
- Fork the project.
- Explore and contribute improvements.
- Share it with other developers.

---

<p align="center">

**TO-DO**

*Less chaos. More clarity. One task at a time.*

Built with HTML, CSS and JavaScript.

</p>
