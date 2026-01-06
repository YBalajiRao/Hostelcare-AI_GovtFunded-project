# 🏠 HostelCare AI  
## Voice-Based Complaint Management System for Visually Impaired Hostel Students

HostelCare AI is a web-based, voice-enabled complaint management system designed to empower visually impaired hostel students. The platform enables students to submit complaints using speech input, which is automatically converted into text, securely stored, and managed through a dedicated warden dashboard.

This system promotes accessibility, inclusivity, and dignity by eliminating the dependency on visual interfaces and manual typing.

---

## 🎯 Objectives

- Enable visually impaired students to report hostel-related issues independently
- Provide a simple and accessible voice-driven interface
- Ensure timely grievance handling through a centralized system
- Improve hostel administration efficiency

---

## ✨ Key Features

- 🎤 Voice-based complaint submission
- 🗣️ Speech-to-text conversion using Google Speech APIs
- ♿ Accessibility-first UI design
- 📊 Warden dashboard for complaint monitoring
- 🔄 Complaint status management (Pending / In Progress / Resolved)
- 🌐 Responsive web application

---

## 🛠️ Technology Stack

### Frontend
- HTML5  
- CSS3 (High-contrast, accessible design)  
- JavaScript  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose ODM  

### APIs & Tools
- Google Speech-to-Text API  
- RESTful API architecture  

---

## 📁 Project Structure

```

hostelcare-ai/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # REST API routes
│   └── server.js         # Express server
│
├── frontend/
│   ├── index.html        # Student interface
│   ├── warden.html       # Warden dashboard
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── package.json
├── .gitignore
└── README.md

````

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- Google Speech API credentials

---

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hostelcare-ai.git
   cd hostelcare-ai
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_APPLICATION_CREDENTIALS=path_to_credentials.json
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Access the application**

   ```
   Student Interface : http://localhost:3000
   Warden Dashboard  : http://localhost:3000/warden.html
   ```

---

## 🎤 System Workflow

### Student Module

1. Student opens the web application
2. Enters basic details (Name, Room Number)
3. Submits complaint using voice input
4. Speech is converted to text
5. Complaint is stored in the database
6. Audio feedback confirms submission

### Warden Module

1. Warden accesses the dashboard
2. Views all submitted complaints
3. Updates complaint status
4. Tracks resolution progress

---

## ♿ Accessibility Features

* Voice-based interaction (no typing required)
* Audio confirmation messages
* High-contrast interface
* Keyboard navigation support
* Screen-reader compatibility
* Mobile-responsive design

---

## 🌐 Browser Compatibility

| Browser        | Support    |
| -------------- | ---------- |
| Google Chrome  | ✅ Full     |
| Microsoft Edge | ✅ Full     |
| Firefox        | ⚠️ Partial |
| Safari         | ⚠️ Partial |

---

## 📌 Limitations

* Requires internet connectivity for speech processing
* Speech recognition accuracy depends on environment noise
* Limited browser support for speech APIs

---

## 🔮 Future Enhancements

* User authentication and role management
* Multilingual speech recognition
* Complaint priority classification
* Mobile application support
* Analytics and reporting dashboard

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Balu Sir**
Assistant Professor

---

## ⭐ Acknowledgment

* Google Speech-to-Text API
* Node.js & Express.js open-source community
* Accessibility and inclusive technology research initiatives

---

*Developed with a strong focus on accessibility, inclusivity, and real-world impact.*

```

