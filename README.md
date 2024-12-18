# Online Training Website

## Project Overview
The Online Training Website is a comprehensive platform designed to help users explore and apply for various online courses. It features two main modules: **Admin** and **User**. The **User Module** allows potential students to view course details and trial videos, while the **Admin Module** facilitates the management of courses and users.

---

## Features

### General Features
- About Us, Contact Us, Testimonial, Privacy Policy, Terms & Conditions pages.

### User Module
1. **Display List of Available Courses**
   - Show a comprehensive list of courses offered.
2. **Registration Form**
   - Fields: Name, Phone Number, Email Id, Qualification, Passout Year.
   - Sends username and password via email after registration.
3. **Login Form**
   - Allows users to log in and access trial videos of all courses.
4. **Course Registration/Apply Form**
   - Apply for a specific course after watching the trial video.
   - Provides options to get more details through a popup or a dedicated button.
   - Displays a confirmation message: "HR will contact you shortly."

### Admin Module
1. **Course Management**
   - Add new courses.
   - Delete existing courses.
   - Add or remove trial videos for courses.
2. **User Management**
   - View registered user details (candidate form submissions).
   - Approve or reject future access:
     - **Allow**: Sends username and password to the candidate.
     - **Reject**: Disallows user from accessing the system.
3. **View Interested Candidates**
   - Section 1: Candidates interested in knowing more about the course.
   - Section 2: Candidates who confirmed their interest after watching the trial video.

---

## Technology Stack

- **Frontend:** React (with Vite)
- **Backend:** Django
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)

---

## Setup Instructions

### Prerequisites
1. **Node.js**
2. **Python 3.8+**
3. **MySQL Server**
4. **Package Managers:** npm/yarn for Node.js and pip for Python

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd BACKEND
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # For Unix-based systems
   env\Scripts\activate    # For Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the database:
   - Update database credentials in `settings.py` under `DATABASES`.
   - Run migrations:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd FRONTEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.myenv` file in both `BACKEND` and `FRONTEND` directories and add the following:

### Backend `.myenv`:
```
SECRET_KEY=<your_django_secret_key>
DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=<your_jwt_secret_key>
EMAIL_HOST=<your_email_smtp_host>
EMAIL_PORT=<your_email_smtp_port>
EMAIL_HOST_USER=<your_email>
EMAIL_HOST_PASSWORD=<your_email_password>
```

### Frontend `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

---

## Usage Instructions

### Admin Workflow
1. Log in to the Admin Dashboard.
2. Add, edit, or remove courses and trial videos.
3. Manage user registrations and approve/reject access.

### User Workflow
1. Browse the list of available courses.
2. Register to receive credentials and log in.
3. Watch trial videos and apply for courses.
4. Wait for the HR team to contact for further procedures.

---

## API Endpoints

### User Endpoints
1. **Register:** `POST /ACCOUNT/register`
2. **Login:** `POST /ACCOUNT/login`
3. **Fetch Courses:** `GET /COURSE/courses`
4. **Apply for Course:** `POST /COURSE/courses/apply`

### Admin Endpoints
1. **Manage Courses:**
   - Add: `POST /ACCOUNT/admin/courses`
   - Delete: `DELETE /ACCOUNT/admin/courses/:id`
2. **Manage Users:**
   - View: `GET /COURSE/admin/users`
   - Approve/Reject: `POST /COURSE/admin/users/:id`

---
