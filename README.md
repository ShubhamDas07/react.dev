# Task Manager App

This repository contains the source code for a Task Manager application built with React and Firebase. The application allows users to create, edit, delete, and export tasks stored in a Firebase Firestore database.

---

# Features

- Add tasks with a title, description, and status.
- Edit existing tasks.
- Delete tasks from the Firestore database.
- Export all tasks to a JSON file.

---

# Prerequisites

To run this project, ensure you have the following installed:

- "Node.js" (version 14 or later)
- "npm" or "yarn"
- A "Firebase project" with Firestore enabled
- "Axios"
- "firebase"

---


# 1. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

# 2. Set Up Firebase

1. Log in to your [Firebase Console](https://console.firebase.google.com/).
2. Create a Firebase project (if you don’t have one already).
3. Enable Firestore Database in your Firebase project.
4. Add a web app to your Firebase project and copy the Firebase configuration.
5. Replace the placeholder configuration in `firebaseConfig.js` with your Firebase project’s credentials.

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
```

# 3. Start the Development Server

Run the following command to start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000/`.

---

# Using the App

# 1. Adding a Task

- Fill out the "Task Title" and "Task Description" fields.
- Select the status from the dropdown menu (“Pending”, “In Progress”, “Completed”).
- Click the "Add Task" button.

# 2. Editing a Task

- Click the "Edit" button next to the task you want to update.
- Modify the fields and click the "Update Task" button.

# 3. Deleting a Task

- Click the "Delete" button next to the task you want to remove.

# 4. Exporting Tasks

- Click the "Export Tasks" button to download all tasks as a JSON file.

---

# Exporting Firestore Data

If you want to backup or share the data:

1. Use the "Export Tasks" button in the app to download the data as a `firestore-data.json` file.
2. Alternatively, export the data manually using the Firebase Console.

---

# Deployment


Deployment from CodeSandbox

You can deploy the app directly from CodeSandbox by:

Opening the project in CodeSandbox.

Clicking the Deploy button in the top-right corner.

Following the on-screen instructions to deploy your app.

Once deployed, you will receive a live URL to share your project.

# Troubleshooting

#Common Issues

- Firebase Error:`FirebaseError: Missing or insufficient permissions.`

  - Ensure Firestore Rules allow read and write access during development:
    ```
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if true; // Replace with stricter rules in production
        }
      }
    }
    ```

- React App Not Loading:

  - Ensure your Firebase configuration in `firebaseConfig.js` is correct.
  - Verify that your Firestore database has been initialized.

---
#licence

You are free to use, modify, and distribute this project as per the terms of the license.

# Acknowledgments

- "Firebase" for backend services.
- "React" for the frontend framework.
---

For further assistance, feel free to reach out via shubhamdas0718@gmail.com


