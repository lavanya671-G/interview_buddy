@"
# User Profiles Management System

A responsive web application for managing user profiles built with HTML, CSS, and JavaScript.

## Features
- User list view with profiles
- Detailed profile pages with tabs (Basic Details, Education & Skills, Work Experience)
- Add new users functionality
- Responsive design
- Local storage persistence

## Technologies Used
- HTML5
- CSS3 with Bootstrap
- Vanilla JavaScript
- Local Storage API

## Setup
1. Clone the repository
2. Open \`index.html\` in a web browser
3. No additional dependencies or build process required

## Usage
- Click \"View Profile\" to see user details
- Use tabs to navigate between Basic Details, Education & Skills, and Work Experience
- Click \"Add User\" to create new profiles
- All data is saved locally in your browser

## Project Structure
\`\`\`
interview_buddy/
├── index.html          # Main application
├── styles.css          # Styles and responsive design
├── app.js              # Application logic
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
\`\`\`
"@ | Out-File -FilePath "README.md" -Encoding UTF8
