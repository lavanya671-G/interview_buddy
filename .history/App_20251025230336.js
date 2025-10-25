class UserProfilesApp {
    constructor() {
        this.users = [];
        this.currentView = 'users';
        this.selectedUser = null;
        this.currentProfileTab = 'basic';
        this.init();
    }

    init() {
        this.loadUsers();
        this.bindEvents();
        this.showAppContent();
    }

    loadUsers() {
        try {
            const savedUsers = localStorage.getItem('userProfiles');
            if (savedUsers) {
                this.users = JSON.parse(savedUsers);
            } else {
                
                this.users = [
                    {
                        id: 1,
                        firstName: 'Dave',
                        lastName: 'Richards',
                        email: 'dave@mail.com',
                        phone: '+91 8332883854',
                        yearOfBirth: '1990',
                        address: '123 Main Street, Mumbai',
                        pincode: '400001',
                        gender: 'Male',
                        domicileCountry: 'India',
                        domicileState: 'Maharashtra',
                        alternatePhone: '+91 9876543210',
                        skills: 'React, Node.js, MongoDB, Express, JavaScript',
                        projects: 'E-commerce platform, Task management app, Social media dashboard',
                        education: {
                            highestDegree: 'Bachelors in Technology',
                            institution: 'Lincoln College',
                            course: 'Computer Science Engineering',
                            yearOfCompletion: '2012',
                            grade: 'A'
                        },
                        workExperience: [
                            {
                                domain: 'Technology',
                                subDomain: 'MERN Stack',
                                experience: '5 years'
                            },
                            {
                                domain: 'Technology',
                                subDomain: 'Frontend Development',
                                experience: '3 years'
                            }
                        ],
                        linkedIn: 'https://linkedin.com/in/dave-richards',
                        resume: 'myresume.pdf'
                    },
                    {
                        id: 2,
                        firstName: 'Abhishek',
                        lastName: 'Hari',
                        email: 'hari@mail.com',
                        phone: '+91 9876543210',
                        yearOfBirth: '1988',
                        address: '456 Park Avenue, Delhi',
                        pincode: '110001',
                        gender: 'Male',
                        domicileCountry: 'India',
                        domicileState: 'Delhi',
                        alternatePhone: '+91 8765432109',
                        skills: 'Java, Spring Boot, MySQL, Microservices, Hibernate',
                        projects: 'Banking application, Inventory system, Payment gateway',
                        education: {
                            highestDegree: 'Masters in Computer Science',
                            institution: 'Delhi University',
                            course: 'Computer Science',
                            yearOfCompletion: '2010',
                            grade: 'A+'
                        },
                        workExperience: [
                            {
                                domain: 'Finance',
                                subDomain: 'Banking Software',
                                experience: '8 years'
                            }
                        ],
                        linkedIn: 'https://linkedin.com/in/abhishek-hari',
                        resume: 'abhishek_resume.pdf'
                    },
                    {
                        id: 3,
                        firstName: 'Nishta',
                        lastName: 'Gupta',
                        email: 'nishta@mail.com',
                        phone: '+91 8765432109',
                        yearOfBirth: '1992',
                        address: '789 Garden Road, Bangalore',
                        pincode: '560001',
                        gender: 'Female',
                        domicileCountry: 'India',
                        domicileState: 'Karnataka',
                        alternatePhone: '+91 7654321098',
                        skills: 'Python, Data Science, Machine Learning, TensorFlow, SQL',
                        projects: 'Predictive analytics, Recommendation engine, Fraud detection system',
                        education: {
                            highestDegree: 'Masters in Data Science',
                            institution: 'IIT Bangalore',
                            course: 'Data Science',
                            yearOfCompletion: '2014',
                            grade: 'A'
                        },
                        workExperience: [
                            {
                                domain: 'Data Science',
                                subDomain: 'Machine Learning',
                                experience: '6 years'
                            }
                        ],
                        linkedIn: 'https://linkedin.com/in/nishta-gupta',
                        resume: 'nishta_resume.pdf'
                    }
                ];
                this.saveUsers();
            }
            this.renderUsersList();
        } catch (error) {
            this.showError('Failed to load user data');
        }
    }

    saveUsers() {
        localStorage.setItem('userProfiles', JSON.stringify(this.users));
    }

    bindEvents() {
        // Navigation
        document.getElementById('users-nav-btn').addEventListener('click', () => this.showUsersView());
        document.getElementById('profile-nav-btn').addEventListener('click', () => this.showProfileView());
        document.getElementById('add-user-btn').addEventListener('click', () => this.showAddUserView());
        document.getElementById('back-to-users').addEventListener('click', () => this.showUsersView());
        document.getElementById('cancel-add-user').addEventListener('click', () => this.showUsersView());

        // Add user form
        document.getElementById('add-user-form').addEventListener('submit', (e) => this.handleAddUser(e));
    }

    showAppContent() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        this.updateNavigation();
    }

    showError(message) {
        const errorEl = document.getElementById('error');
        const errorText = document.getElementById('error-text');
        errorText.textContent = message;
        errorEl.style.display = 'block';
        
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }

    showUsersView() {
        this.currentView = 'users';
        this.selectedUser = null;
        this.updateNavigation();
        document.getElementById('users-view').style.display = 'block';
        document.getElementById('add-user-view').style.display = 'none';
        document.getElementById('profile-view').style.display = 'none';
        this.renderUsersList();
    }

    showAddUserView() {
        this.currentView = 'add-user';
        this.updateNavigation();
        document.getElementById('users-view').style.display = 'none';
        document.getElementById('add-user-view').style.display = 'block';
        document.getElementById('profile-view').style.display = 'none';
        document.getElementById('add-user-form').reset();
    }

    showProfileView(user) {
        if (user) {
            this.selectedUser = user;
        }
        this.currentView = 'profile';
        this.updateNavigation();
        document.getElementById('users-view').style.display = 'none';
        document.getElementById('add-user-view').style.display = 'none';
        document.getElementById('profile-view').style.display = 'block';
        this.renderProfile();
    }

    updateNavigation() {
        const usersNavBtn = document.getElementById('users-nav-btn');
        const profileNavBtn = document.getElementById('profile-nav-btn');

        
        usersNavBtn.classList.toggle('active', this.currentView === 'users' || this.currentView === 'add-user');
        profileNavBtn.style.display = this.selectedUser ? 'inline-block' : 'none';
        profileNavBtn.classList.toggle('active', this.currentView === 'profile');
    }

    renderUsersList() {
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';

        this.users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.className = 'user-list-item';
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">
                            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                        </div>
                        <div>
                            <div class="user-name">${user.firstName} ${user.lastName}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary view-profile-btn" data-user-id="${user.id}">
                        <i class="fas fa-eye me-1"></i>View Profile
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to view profile buttons
        document.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.target.closest('.view-profile-btn').getAttribute('data-user-id'));
                const user = this.users.find(u => u.id === userId);
                if (user) {
                    this.showProfileView(user);
                }
            });
        });
    }

    renderProfile() {
        if (!this.selectedUser) return;

        const profileView = document.getElementById('profile-view');
        profileView.innerHTML = this.getProfileHTML(this.selectedUser);

        
        this.bindProfileEvents();
    }

    getProfileHTML(user) {
        return `
            <div class="card">
                <!-- Profile Header -->
                <div class="profile-header">
                    <div class="profile-header-content">
                        <div class="profile-avatar-large">
                            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                        </div>
                        <div class="profile-info">
                            <h2>${user.firstName} ${user.lastName}</h2>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <div class="profile-nav">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <button class="nav-link ${this.currentProfileTab === 'basic' ? 'active' : ''}" data-tab="basic">
                                    Basic Details
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link ${this.currentProfileTab === 'education' ? 'active' : ''}" data-tab="education">
                                    Education & Skills
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link ${this.currentProfileTab === 'experience' ? 'active' : ''}" data-tab="experience">
                                    Work Experience
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="tab-content">
                    ${this.getBasicDetailsHTML(user)}
                    ${this.getEducationSkillsHTML(user)}
                    ${this.getWorkExperienceHTML(user)}
                </div>
            </div>
        `;
    }

    getBasicDetailsHTML(user) {
        return `
            <div class="tab-pane ${this.currentProfileTab === 'basic' ? 'show active' : ''}" id="basic-tab">
                <div class="profile-form">
                    <h5 class="section-header">Basic Details</h5>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">First name</label>
                            <input type="text" class="form-control" value="${user.firstName}" placeholder="e.g. John" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Last name</label>
                            <input type="text" class="form-control" value="${user.lastName}" placeholder="e.g. Doe" readonly>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Year of birth</label>
                            <input type="text" class="form-control" value="${user.yearOfBirth}" placeholder="YYYY" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Gender</label>
                            <select class="form-select" disabled>
                                <option>${user.gender}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Address</label>
                        <textarea class="form-control" rows="3" placeholder="Enter here" readonly>${user.address}</textarea>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Phone number</label>
                            <input type="text" class="form-control" value="${user.phone}" placeholder="8332883854" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Alternate Phone no</label>
                            <input type="text" class="form-control" value="${user.alternatePhone || ''}" placeholder="e.g. 9876543210" readonly>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Pincode</label>
                            <input type="text" class="form-control" value="${user.pincode}" placeholder="Enter here" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Email ID</label>
                            <input type="email" class="form-control" value="${user.email}" placeholder="e.g. mrrobody@mail.com" readonly>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Domicile country</label>
                            <select class="form-select" disabled>
                                <option>${user.domicileCountry}</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Domicile state</label>
                            <select class="form-select" disabled>
                                <option>${user.domicileState}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getEducationSkillsHTML(user) {
        return `
            <div class="tab-pane ${this.currentProfileTab === 'education' ? 'show active' : ''}" id="education-tab">
                <div class="profile-form">
                    <h5 class="section-header">Education Details</h5>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">School / College</label>
                            <input type="text" class="form-control" value="${user.education.institution}" placeholder="e.g. Lincoln College" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Course</label>
                            <input type="text" class="form-control" value="${user.education.course}" placeholder="e.g. Computer science engineering" readonly>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Highest degree or equivalent</label>
                            <input type="text" class="form-control" value="${user.education.highestDegree}" placeholder="e.g. Bachelors in Technology" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Year of completion</label>
                            <input type="text" class="form-control" value="${user.education.yearOfCompletion}" placeholder="YYYY" readonly>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Grade</label>
                        <input type="text" class="form-control" value="${user.education.grade}" placeholder="Enter here" readonly>
                    </div>
                    
                    <div class="skills-projects-section">
                        <h5 class="section-header">Skills & Projects</h5>
                        
                        <div class="mb-3">
                            <label class="form-label">Skills</label>
                            <textarea class="form-control" rows="3" placeholder="Enter here" readonly>${user.skills}</textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Projects</label>
                            <textarea class="form-control" rows="3" placeholder="Enter here" readonly>${user.projects}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getWorkExperienceHTML(user) {
        const workExpHTML = user.workExperience.map((exp, index) => `
            <div class="work-experience-item">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Domain</label>
                        <input type="text" class="form-control" value="${exp.domain}" placeholder="e.g. Technology" readonly>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Sub-domain</label>
                        <input type="text" class="form-control" value="${exp.subDomain}" placeholder="e.g. MERN Stack" readonly>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Experience</label>
                        <select class="form-select" disabled>
                            <option>${exp.experience}</option>
                        </select>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="tab-pane ${this.currentProfileTab === 'experience' ? 'show active' : ''}" id="experience-tab">
                <div class="profile-form">
                    <h5 class="section-header">Work Experience</h5>
                    ${workExpHTML}
                    
                    <div class="linkedin-resume-section">
                        <h5 class="section-header">LinkedIn & Resume</h5>
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Profile URL</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" value="${user.linkedIn}" placeholder="LinkedIn.com/m/mrbean" readonly>
                                    <button class="btn btn-outline-primary" type="button" onclick="window.open('${user.linkedIn}', '_blank')">
                                        <i class="fab fa-linkedin"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Resume</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" value="${user.resume}" readonly>
                                    <button class="btn btn-outline-primary" type="button">
                                        <i class="fas fa-eye me-1"></i>View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindProfileEvents() {
        
        document.querySelectorAll('.profile-nav .nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.getAttribute('data-tab');
                this.switchProfileTab(tabName);
            });
        });
    }

    switchProfileTab(tabName) {
        this.currentProfileTab = tabName;
        
       
        document.querySelectorAll('.profile-nav .nav-link').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        
        document.querySelectorAll('.tab-pane').forEach(content => {
            content.classList.remove('show', 'active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('show', 'active');
    }

    handleAddUser(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('add-first-name').value;
        const lastName = document.getElementById('add-last-name').value;
        const email = document.getElementById('add-email').value;
        const phone = document.getElementById('add-phone').value;

        const newUser = {
            id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
            firstName,
            lastName,
            email,
            phone,
            yearOfBirth: '',
            address: '',
            pincode: '',
            gender: '',
            domicileCountry: '',
            domicileState: '',
            alternatePhone: '',
            skills: '',
            projects: '',
            education: {
                highestDegree: '',
                institution: '',
                course: '',
                yearOfCompletion: '',
                grade: ''
            },
            workExperience: [],
            linkedIn: '',
            resume: ''
        };

        this.users.push(newUser);
        this.saveUsers();
        this.showUsersView();
        this.showError('User added successfully!');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new UserProfilesApp();
});