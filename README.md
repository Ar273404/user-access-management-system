<h1 align="center">🛡️ User Access Management System</h1>

<p align="center">
  A full-stack role-based software access management system built with <b>Node.js</b>, <b>React</b>, <b>TypeORM</b>, and <b>PostgreSQL</b>.
  <br/>
  It includes secure login, JWT-based authentication, and a responsive UI for Admins, Managers, and Employees.
</p>

<hr/>

<h2>🚀 Tech Stack</h2>

<table>
  <tr><th>Layer</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>React, Vite, Tailwind CSS</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js</td></tr>
  <tr><td>Database</td><td>PostgreSQL</td></tr>
  <tr><td>ORM</td><td>TypeORM</td></tr>
  <tr><td>Authentication</td><td>JWT, bcrypt</td></tr>
  <tr><td>Tools</td><td>dotenv, nodemon</td></tr>
</table>

<hr/>

<h2>🔐 User Roles & Permissions</h2>

<table>
  <tr><th>Role</th><th>Capabilities</th></tr>
  <tr><td><b>Admin</b></td><td>Create, update, and delete software</td></tr>
  <tr><td><b>Manager</b></td><td>View all pending requests, approve or reject them</td></tr>
  <tr><td><b>Employee</b></td><td>Sign up, login, request software access, view request status</td></tr>
</table>

<hr/>

<h2>📦 Features</h2>

<ul>
  <li><b>Authentication</b>
    <ul>
      <li>Secure sign-up and login with hashed passwords</li>
      <li>JWT-based session management</li>
      <li>Role-based route protection</li>
    </ul>
  </li>
  <li><b>Admin</b>
    <ul>
      <li>Create new software with access levels (Read, Write, Admin)</li>
      <li>View and manage existing software</li>
    </ul>
  </li>
  <li><b>Employee</b>
    <ul>
      <li>Request access to specific software</li>
      <li>View request status (Approved / Pending / Rejected)</li>
    </ul>
  </li>
  <li><b>Manager</b>
    <ul>
      <li>View all pending requests</li>
      <li>Approve or reject software access requests</li>
    </ul>
  </li>
</ul>

<hr/>

<h2>🧑‍💻 React Frontend Pages</h2>

<table>
  <tr><th>Page</th><th>Path</th><th>Access</th></tr>
  <tr><td>Login</td><td>/login</td><td>Public</td></tr>
  <tr><td>Signup</td><td>/signup</td><td>Public</td></tr>
  <tr><td>Home</td><td>/</td><td>All Roles</td></tr>
  <tr><td>Create Software</td><td>/create-software</td><td>Admin</td></tr>
  <tr><td>Request Access</td><td>/request-access</td><td>Employee</td></tr>
  <tr><td>My Requests</td><td>/my-requests</td><td>Employee</td></tr>
  <tr><td>Pending Requests</td><td>/pending-requests</td><td>Manager</td></tr>
</table>

<hr/>

<h2>🔧 API Endpoints</h2>

<h4>🔐 Auth</h4>
<pre>
POST /api/auth/signup      // Sign up (default: Employee)
POST /api/auth/login       // Login and return JWT
</pre>

<h4>💾 Software (Admin)</h4>
<pre>
GET    /api/software       // Get all software
POST   /api/software       // Create new software
PATCH  /api/software/:id   // Update software
DELETE /api/software/:id   // Delete software
</pre>

<h4>📥 Requests</h4>
<pre>
POST   /api/requests            // Submit a request (Employee)
GET    /api/requests/my         // View own requests (Employee)
GET    /api/requests/pending    // View pending requests (Manager)
PATCH  /api/requests/:id        // Approve or reject a request (Manager)
</pre>

<hr/>

<h2>🗃️ Database Schema (TypeORM Entities)</h2>

<h4>🧑‍💼 User</h4>
<pre>
id: number
username: string
password: string
role: 'Employee' | 'Manager' | 'Admin'
</pre>

<h4>💾 Software</h4>
<pre>
id: number
name: string
description: string
accessLevels: string[] // ['Read', 'Write', 'Admin']
</pre>

<h4>📥 Request</h4>
<pre>
id: number
user: User
software: Software
accessType: 'Read' | 'Write' | 'Admin'
reason: string
status: 'Pending' | 'Approved' | 'Rejected'
</pre>

<hr/>

<h2>⚙️ How to Run Locally</h2>

<ol>
  <li><b>Clone the Repo</b>
    <pre>
git clone https://github.com/your-username/user-access-system.git
cd user-access-system
    </pre>
  </li>

  <li><b>Set Up the Backend</b>
    <pre>
cd backend
npm install
    </pre>

    Create a <code>.env</code> file in <code>backend/</code>:
    <pre>
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=user_access
    </pre>

    Start the server:
    <pre>
npm run dev
    </pre>
  </li>

  <li><b>Set Up the Frontend</b>
    <pre>
cd ../frontend
npm install
npm run dev
    </pre>
  </li>
</ol>

<h3>🔗 Application URLs</h3>

<ul>
  <li><b>Frontend (Live):</b> <a href="https://user-access-management-system-1-62d1.onrender.com/" target="_blank">https://user-access-management-system-1-62d1.onrender.com/</a></li>
  <li><b>Backend (Live API):</b> <a href="https://user-access-management-system-4uty.onrender.com/" target="_blank">https://user-access-management-system-4uty.onrender.com/</a></li>
  <li><b>Frontend (Local):</b> <code>http://localhost:5173</code></li>
  <li><b>Backend (Local):</b> <code>http://localhost:5000</code></li>
</ul>


<hr/>

<h2>📚 Evaluation Criteria</h2>

<ul>
  <li>✅ Full authentication and authorization flow</li>
  <li>✅ Role-based access and views</li>
  <li>✅ Modular backend code with secure practices</li>
  <li>✅ Functional and responsive frontend</li>
  <li>✅ PostgreSQL schema and TypeORM integration</li>
</ul>

<hr/>

<h2>✨ Author</h2>

<p><b>Arun Yadav</b><br/>
Final Year B.Tech CSE, MMMUT<br/>
Passionate Full Stack Developer | DSA Enthusiast<br/>
<a href="https://github.com/Ar273404" target="_blank">GitHub Profile</a></p>
