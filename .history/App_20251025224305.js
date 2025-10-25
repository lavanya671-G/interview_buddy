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
        this.updateNavigation();
    }

    showError(message) {
        const errorEl = document.getElementById('error');
        const errorText = document.getElementById('error-text');
        errorText.textContent = message;
        errorEl.classList.add('show');
        
        setTimeout(() => {
            errorEl.classList.remove('show');
        }, 5000);
    }

    showSuccess(message) {
        const errorEl = document.getElementById('error');
        const errorText = document.getElementById('error-text');
        errorText.textContent = message;
        errorEl.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        errorEl.classList.add('show');
        
        setTimeout(() => {
            errorEl.classList.remove('show');
            errorEl.style.background = '';
        }, 3000);
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

        // Remove active class from all tabs
        usersTab.classList.remove('active');
        profileTab.classList.remove('active');

        // Add active class to current tab
        if (this.currentView === 'users' || this.currentView === 'add-user') {
            usersTab.classList.add('active');
        } else if (this.currentView === 'profile') {
            profileTab.classList.add('active');
        }

        // Show/hide profile tab based on selection
        profileTab.style.display = this.selectedUser ? 'block' : 'none';
    }

    renderUsersList() {
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';

        if (this.users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4">
                        <div class="text-muted">
                            <i class="fas fa-users fa-2x mb-3"></i>
                            <p>No users found. Add a new user to get started.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

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

    // ... (rest of the methods remain the same as previous app.js)
    // The renderProfile, getProfileHTML, getBasicDetailsHTML, getEducationSkillsHTML, 
    // getWorkExperienceHTML, bindProfileEvents, enableProfileEditing, cancelProfileEditing,
    // convertToEditableFields, getFieldNameFromLabel, saveProfileChanges, and handleAddUser 
    // methods remain exactly the same as in the previous app.js code
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserProfilesApp();
});