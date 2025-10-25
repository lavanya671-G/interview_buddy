class UserProfilesApp {
    constructor() {
        this.users = [];
        this.currentView = 'users';
        this.selectedUser = null;
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
                // Initialize with sample data
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
                        skills: 'React, Node.js, MongoDB',
                        projects: 'E-commerce platform, Task management app',
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
                        skills: 'Java, Spring Boot, MySQL',
                        projects: 'Banking application, Inventory system',
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
                        skills: 'Python, Data Science, Machine Learning',
                        projects: 'Predictive analytics, Recommendation engine',
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
        document.getElementById('users-tab').addEventListener('click', () => this.showUsersView());
        document.getElementById('profile-tab').addEventListener('click', () => this.showProfileView());
        document.getElementById('add-user-btn').addEventListener('click', () => this.showAddUserView());
        document.getElementById('back-to-users').addEventListener('click', () => this.showUsersView());
        document.getElementById('cancel-add-user').addEventListener('click', () => this.showUsersView());

        // Add user form
        document.getElementById('add-user-form').addEventListener('submit', (e) => this.handleAddUser(e));
    }

    showAppContent() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
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
        const usersTab = document.getElementById('users-tab');
        const profileTab = document.getElementById('profile-tab');

        usersTab.classList.toggle('active', this.currentView === 'users' || this.currentView === 'add-user');
        profileTab.classList.toggle('active', this.currentView === 'profile');
        profileTab.style.display = this.selectedUser ? 'block' : 'none';
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
                    <div class="d-flex align-items-center">
                        <div class="user-avatar">
                            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                        </div>
                        <div>
                            ${user.firstName} ${user.lastName}
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary view-profile-btn" data-user-id="${user.id}">
                        View Profile
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to view profile buttons
        document.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.target.getAttribute('data-user-id'));
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

        // Bind profile events
        this.bindProfileEvents();
    }

    getProfileHTML(user) {
        return `
            <div class="card">
                <!-- Profile Header -->
                <div class="profile-header">
                    <div class="d-flex align-items-center">
                        <div class="profile-avatar">
                            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                        </div>
                        <div>
                            <h3 class="mb-1">${user.firstName} ${user.lastName}</h3>
                            <p class="mb-1">${user.email}</p>
                            <p class="mb-0">${user.phone}</p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="card-header action-buttons">
                    <button id="back-from-profile" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Back to Users
                    </button>
                    <button id="edit-profile-btn" class="btn btn-primary">
                        <i class="fas fa-edit me-2"></i>Edit Profile
                    </button>
                    <button id="save-profile-btn" class="btn btn-success" style="display: none;">
                        <i class="fas fa-save me-2"></i>Save Changes
                    </button>
                    <button id="cancel-edit-btn" class="btn btn-outline-secondary" style="display: none;">
                        <i class="fas fa-times me-2"></i>Cancel
                    </button>
                </div>

                <!-- Navigation Tabs -->
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="profile-tabs">
                        <li class="nav-item">
                            <button class="nav-link active" data-tab="basic">Basic Details</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-tab="education">Education & Skills</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-tab="experience">Work Experience</button>
                        </li>
                    </ul>
                </div>

                <!-- Tab Content -->
                <div class="tab-content" id="profile-tab-content">
                    ${this.getBasicDetailsHTML(user)}
                    ${this.getEducationSkillsHTML(user)}
                    ${this.getWorkExperienceHTML(user)}
                </div>
            </div>
        `;
    }

    getBasicDetailsHTML(user) {
        return `
            <div class="tab-pane fade show active" id="basic-tab">
                <h5 class="mb-4">Basic Details</h5>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">First name</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.firstName}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Last name</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.lastName}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Year of birth</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.yearOfBirth}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Gender</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.gender}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <p class="form-control-plaintext border-bottom pb-2">${user.address}</p>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Phone number</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.phone}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Alternate Phone no</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.alternatePhone || 'Not provided'}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Pincode</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.pincode}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Email ID</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Domicile country</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.domicileCountry}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Domicile state</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.domicileState}</p>
                    </div>
                </div>
            </div>
        `;
    }

    getEducationSkillsHTML(user) {
        return `
            <div class="tab-pane fade" id="education-tab">
                <h5 class="mb-4">Education Details</h5>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Highest degree or equivalent</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.education.highestDegree}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Year of completion</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.education.yearOfCompletion}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">School / College</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.education.institution}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Grade</label>
                        <p class="form-control-plaintext border-bottom pb-2">${user.education.grade}</p>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label">Course</label>
                    <p class="form-control-plaintext border-bottom pb-2">${user.education.course}</p>
                </div>
                <hr class="my-4">
                <h5 class="mb-4">Skills & Projects</h5>
                <div class="mb-3">
                    <label class="form-label">Skills</label>
                    <p class="form-control-plaintext border-bottom pb-2">${user.skills}</p>
                </div>
                <div class="mb-3">
                    <label class="form-label">Projects</label>
                    <p class="form-control-plaintext border-bottom pb-2">${user.projects}</p>
                </div>
            </div>
        `;
    }

    getWorkExperienceHTML(user) {
        const workExpHTML = user.workExperience.map(exp => `
            <div class="work-experience-item">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Domain</label>
                        <p class="form-control-plaintext border-bottom pb-2">${exp.domain}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Sub-domain</label>
                        <p class="form-control-plaintext border-bottom pb-2">${exp.subDomain}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Experience</label>
                        <p class="form-control-plaintext border-bottom pb-2">${exp.experience}</p>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="tab-pane fade" id="experience-tab">
                <h5 class="mb-4">Work Experience</h5>
                ${workExpHTML}
                <hr class="my-4">
                <h5 class="mb-4">LinkedIn & Resume</h5>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">LinkedIn Profile URL</label>
                        <p class="form-control-plaintext border-bottom pb-2">
                            <a href="${user.linkedIn}" target="_blank">${user.linkedIn}</a>
                        </p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Resume</label>
                        <p class="form-control-plaintext border-bottom pb-2">
                            <a href="#" class="btn btn-outline-primary btn-sm">View Resume</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    bindProfileEvents() {
        // Back button
        document.getElementById('back-from-profile').addEventListener('click', () => this.showUsersView());

        // Tab navigation
        document.querySelectorAll('#profile-tabs .nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.getAttribute('data-tab');
                
                // Update active tab
                document.querySelectorAll('#profile-tabs .nav-link').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('#profile-tab-content .tab-pane').forEach(content => {
                    content.classList.remove('show', 'active');
                });
                document.getElementById(`${tabName}-tab`).classList.add('show', 'active');
            });
        });

        // Edit profile button
        document.getElementById('edit-profile-btn').addEventListener('click', () => {
            this.enableProfileEditing();
        });

        // Save profile button
        document.getElementById('save-profile-btn').addEventListener('click', () => {
            this.saveProfileChanges();
        });

        // Cancel edit button
        document.getElementById('cancel-edit-btn').addEventListener('click', () => {
            this.cancelProfileEditing();
        });
    }

    enableProfileEditing() {
        // Show save/cancel buttons, hide edit button
        document.getElementById('edit-profile-btn').style.display = 'none';
        document.getElementById('save-profile-btn').style.display = 'inline-block';
        document.getElementById('cancel-edit-btn').style.display = 'inline-block';

        // Convert all plain text to editable inputs
        this.convertToEditableFields();
    }

    cancelProfileEditing() {
        // Show edit button, hide save/cancel buttons
        document.getElementById('edit-profile-btn').style.display = 'inline-block';
        document.getElementById('save-profile-btn').style.display = 'none';
        document.getElementById('cancel-edit-btn').style.display = 'none';

        // Re-render profile to reset changes
        this.renderProfile();
    }

    convertToEditableFields() {
        // This is a simplified version - in a real app, you'd want more sophisticated field editing
        const plainTexts = document.querySelectorAll('.form-control-plaintext');
        plainTexts.forEach(element => {
            const value = element.textContent;
            const fieldName = this.getFieldNameFromLabel(element);
            
            element.outerHTML = `
                <input type="text" class="form-control" value="${value}" data-field="${fieldName}">
            `;
        });
    }

    getFieldNameFromLabel(element) {
        // Simplified field name mapping
        const label = element.previousElementSibling?.textContent.toLowerCase() || '';
        if (label.includes('first name')) return 'firstName';
        if (label.includes('last name')) return 'lastName';
        if (label.includes('year of birth')) return 'yearOfBirth';
        if (label.includes('gender')) return 'gender';
        if (label.includes('address')) return 'address';
        if (label.includes('phone number')) return 'phone';
        if (label.includes('alternate phone')) return 'alternatePhone';
        if (label.includes('pincode')) return 'pincode';
        if (label.includes('email')) return 'email';
        if (label.includes('domicile country')) return 'domicileCountry';
        if (label.includes('domicile state')) return 'domicileState';
        return '';
    }

    saveProfileChanges() {
        try {
            const inputs = document.querySelectorAll('#profile-tab-content input[data-field]');
            const updatedUser = { ...this.selectedUser };

            inputs.forEach(input => {
                const field = input.getAttribute('data-field');
                const value = input.value;
                
                if (field.includes('.')) {
                    // Handle nested fields (like education.field)
                    const [parent, child] = field.split('.');
                    updatedUser[parent][child] = value;
                } else {
                    updatedUser[field] = value;
                }
            });

            // Update user in the array
            const userIndex = this.users.findIndex(u => u.id === updatedUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = updatedUser;
                this.selectedUser = updatedUser;
                this.saveUsers();
                this.showError('Profile updated successfully!');
                this.cancelProfileEditing(); // This will re-render with new data
            }
        } catch (error) {
            this.showError('Failed to update profile');
        }
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

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserProfilesApp();
});