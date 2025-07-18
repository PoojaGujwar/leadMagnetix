# LeadMagnetix

 A full-stack lead management app where you can add, edit, and assign leads to agents.
 You can also filter leads by status and agents.
 
 Built with React for the frontend, Express/Node for the backend, MongoDB as the database, and Redux for state management.

 ---

 ## Demo Link
 [Live Demo](https://lead-magnetix-ashy.vercel.app)

 ---

 ## Quick Start
 ```
 git clone https://github.com/PoojaGujwar/leadMagnetix.git
 cd <your-repo>
 npm install
 npm start #or `npm run dev`
 ```

 ---

 ## Technologies
 - React JS
 - Redux
 - React Router
 - Node.js
 - Express
 - MongoDB

 ---

 ## Features
 **Home**
 - Displays a list of all leads
 - Filter leads by status
 - Add new lead via form

 **Lead Details**
 - View full lead information
 - Edit lead 
 - Add comments

 **Report** 
 - Shows lead data by status using bar and pie charts

 **Agents**
 - Displays a list of all agents
 - Add new agent via form

 **Sales**
 - Displays a list of all sales
 - Allows filtering by status

---

 ## API Reference

 ### **GET /leads**
 List all leads<br>
 Sample Response: <br>
 ```
 [{_id, name, salesAgent, status, tags, source, timeToClose, priority, createdAt, updatedAt, closedAt}..]
 ```

 ### **GET /agents**
 List all agents<br>
 Sample Response: <br>
 ```
 [{_id,name, email, createdAt},...]
 ```

 ### **GET /report/lastweek**
 Lists leads completed in the last week<br>
 Sample Response: <br>
 ```
 {message,leads:[{_id, name, salesAgent, status, tags, source, timeToClose, priority, createdAt, updatedAt, closedAt},...]}
 ```

 ### **POST /leads**
 Creates a new lead<br>
 Sample Response: <br>
 ```
 {message, savedLead}
 ```

 ### **POST /agents**
 Creates a new agent<br>
 Sample Response: <br>
 ```
 {_id, name, email, createdAt}
 ```

 ### **PUT /leads/:id**
 Updates a lead<br>
 Sample Response:<br>
 ```
 {message,updatedLead:{_id, name, salesAgent, status, tags, source, timeToClose, priority, createdAt, updatedAt, closedAt }}
 ```

 ---

 ## Contact
 For bugs or feature requests, please reach out to gujwarpooja@gmail.com