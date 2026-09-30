/* =========================================================
   DAILYMATE | STUDENT PRODUCTIVITY
   Complete JavaScript
========================================================= */


/* =========================================================
   GENERAL HELPERS
========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        const map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return map[char];
    });
}

function showMessage(elementId, message, type = "") {
    const element = getElement(elementId);

    if (!element) return;

    element.textContent = message;
    element.className = "message";

    if (type) {
        element.classList.add(type);
    }
}


/* =========================================================
   UNIVERSITY LIST
========================================================= */

const UNIVERSITIES = [
    "Ahmadu Bello University (ABU)",
    "Bayero University Kano (BUK)",
    "Federal University of Technology Akure (FUTA)",
    "Federal University of Technology Minna (FUTMINNA)",
    "Federal University of Technology Owerri (FUTO)",
    "University of Abuja (UNIABUJA)",
    "University of Benin (UNIBEN)",
    "University of Calabar (UNICAL)",
    "University of Ibadan (UI)",
    "University of Ilorin (UNILORIN)",
    "University of Jos (UNIJOS)",
    "University of Lagos (UNILAG)",
    "University of Nigeria Nsukka (UNN)",
    "University of Port Harcourt (UNIPORT)",
    "University of Uyo (UNIUYO)",
    "Obafemi Awolowo University (OAU)",
    "Lagos State University (LASU)",
    "Olabisi Onabanjo University (OOU)",
    "Ladoke Akintola University of Technology (LAUTECH)",
    "Kwara State University (KWASU)",
    "Osun State University (UNIOSUN)",
    "Ekiti State University (EKSU)",
    "Adekunle Ajasin University (AAUA)",
    "University of Maiduguri (UNIMAID)",
    "Nnamdi Azikiwe University (UNIZIK)",
    "Federal University Oye-Ekiti (FUOYE)",
    "Federal University of Agriculture Abeokuta (FUNAAB)",
    "Federal University of Agriculture Makurdi (FUAM)",
    "Federal University of Health Sciences Ila-Orangun (FUSHI)",
    "Covenant University",
    "Babcock University",
    "Afe Babalola University (ABUAD)",
    "Bowen University",
    "Redeemer's University",
    "Landmark University",
    "American University of Nigeria (AUN)",
    "Pan-Atlantic University (PAU)",
    "University of Ilesa",
    "Al-Hikmah University",
    "Fountain University",
    "Kwara State Polytechnic",
    "The Polytechnic Ibadan",
    "Federal Polytechnic Offa",
    "Yaba College of Technology (YABATECH)"
];


/* =========================================================
   DEPARTMENT LIST
========================================================= */

const DEPARTMENTS = [
    "Accounting",
    "Actuarial Science",
    "Agricultural Engineering",
    "Agricultural Science",
    "Agriculture",
    "Anatomy",
    "Animal Science",
    "Arabic",
    "Architecture",
    "Banking and Finance",
    "Biochemistry",
    "Biology",
    "Biotechnology",
    "Building Technology",
    "Business Administration",
    "Business Education",
    "Chemical Engineering",
    "Chemistry",
    "Christian Religious Studies",
    "Civil Engineering",
    "Classics",
    "Communication Arts",
    "Computer Engineering",
    "Computer Science",
    "Criminology and Security Studies",
    "Cyber Security",
    "Data Science",
    "Dentistry",
    "Dental Technology",
    "Economics",
    "Education",
    "Electrical/Electronics Engineering",
    "Electrical Engineering",
    "English",
    "English and Literary Studies",
    "Estate Management",
    "Environmental Engineering",
    "Environmental Health",
    "Finance",
    "Fine and Applied Arts",
    "Fisheries",
    "Food Science and Technology",
    "Forestry and Wildlife",
    "French",
    "Geography",
    "Geology",
    "Guidance and Counselling",
    "Hausa",
    "Health Education",
    "History",
    "Hospitality Management",
    "Human Anatomy",
    "Human Nutrition and Dietetics",
    "Igbo",
    "Industrial Chemistry",
    "Industrial Design",
    "Industrial Engineering",
    "Information Science",
    "Information Technology",
    "Insurance",
    "International Relations",
    "Islamic Studies",
    "Law",
    "Library and Information Science",
    "Linguistics",
    "Mass Communication",
    "Marketing",
    "Mathematics",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Medicine and Surgery",
    "Medical Laboratory Science",
    "Microbiology",
    "Nursing Science",
    "Nutrition and Dietetics",
    "Optometry",
    "Pharmacy",
    "Philosophy",
    "Physics",
    "Physiotherapy",
    "Political Science",
    "Psychology",
    "Public Administration",
    "Public Health",
    "Quantity Surveying",
    "Radiography",
    "Religious Studies",
    "Science Laboratory Technology",
    "Social Work",
    "Sociology",
    "Software Engineering",
    "Statistics",
    "Surveying and Geoinformatics",
    "Taxation",
    "Teacher Education",
    "Theatre Arts",
    "Tourism and Event Management",
    "Transport Management",
    "Urban and Regional Planning",
    "Veterinary Medicine",
    "Yoruba",
    "Zoology"
];


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function hideAllPages() {
    const pages = [
        "landingPage",
        "loginPage",
        "registerPage",
        "dashboardPage"
    ];

    pages.forEach(function (id) {
        const page = getElement(id);

        if (page) {
            page.style.display = "none";
        }
    });
}


function showLogin() {
    hideAllPages();

    const page = getElement("loginPage");

    if (page) {
        page.style.display = "flex";
    }

    window.scrollTo(0, 0);
}


function showRegister() {
    hideAllPages();

    const page = getElement("registerPage");

    if (page) {
        page.style.display = "flex";
    }

    window.scrollTo(0, 0);
}


function showLanding() {
    hideAllPages();

    const page = getElement("landingPage");

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo(0, 0);
}


function showDashboard() {
    hideAllPages();

    const page = getElement("dashboardPage");

    if (page) {
        page.style.display = "block";
    }

    loadDashboard();
    window.scrollTo(0, 0);
}


/* =========================================================
   LOCAL STORAGE USER FUNCTIONS
========================================================= */

function getUsers() {
    const saved = localStorage.getItem("dailyMateUsers");

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveUsers(users) {
    localStorage.setItem(
        "dailyMateUsers",
        JSON.stringify(users)
    );
}


function getCurrentUser() {
    const saved = localStorage.getItem("dailyMateCurrentUser");

    if (!saved) {
        return null;
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return null;
    }
}


function saveCurrentUser(user) {
    localStorage.setItem(
        "dailyMateCurrentUser",
        JSON.stringify(user)
    );
}


function logout() {
    localStorage.removeItem("dailyMateCurrentUser");

    showLanding();

    const loginForm = getElement("loginForm");

    if (loginForm) {
        loginForm.reset();
    }
}


/* =========================================================
   REGISTRATION SELECTS
========================================================= */

function convertToSelect(id, options, placeholder) {
    const oldElement = getElement(id);

    if (!oldElement) {
        return;
    }

    if (oldElement.tagName === "SELECT") {
        oldElement.innerHTML = "";
    } else {
        const select = document.createElement("select");

        select.id = id;
        select.name = id;
        select.required = true;

        oldElement.replaceWith(select);
    }

    const select = getElement(id);

    if (!select) {
        return;
    }

    select.innerHTML =
        `<option value="">${placeholder}</option>`;

    options.forEach(function (optionText) {
        const option = document.createElement("option");

        option.value = optionText;
        option.textContent = optionText;

        select.appendChild(option);
    });
}


function populateRegistrationOptions() {
    convertToSelect(
        "university",
        UNIVERSITIES,
        "Select University"
    );

    convertToSelect(
        "department",
        DEPARTMENTS,
        "Select Department"
    );
}


/* =========================================================
   REGISTER
========================================================= */

const registerForm = getElement("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName =
            getElement("fullName").value.trim();

        const email =
            getElement("registerEmail").value.trim().toLowerCase();

        const password =
            getElement("registerPassword").value;

        const university =
            getElement("university").value;

        const department =
            getElement("department").value;

        const level =
            getElement("level").value;

        const semester =
            getElement("semester").value;


        if (
            !fullName ||
            !email ||
            !password ||
            !university ||
            !department ||
            !level ||
            !semester
        ) {
            showMessage(
                "registerMessage",
                "Please fill in all fields.",
                "error"
            );

            return;
        }


        if (password.length < 6) {
            showMessage(
                "registerMessage",
                "Password must be at least 6 characters.",
                "error"
            );

            return;
        }


        let users = getUsers();


        const existingUser = users.find(function (user) {
            return user.email.toLowerCase() === email;
        });


        if (existingUser) {
            showMessage(
                "registerMessage",
                "An account with this email already exists.",
                "error"
            );

            return;
        }


        const newUser = {
            id: "user_" + Date.now(),
            fullName: fullName,
            email: email,
            password: password,
            university: university,
            department: department,
            level: level,
            semester: semester,
            createdAt: new Date().toISOString()
        };


        users.push(newUser);

        saveUsers(users);


        showMessage(
            "registerMessage",
            "Account created successfully! You can now login.",
            "success"
        );


        registerForm.reset();


        setTimeout(function () {
            showLogin();
        }, 1000);
    });
}


/* =========================================================
   LOGIN
========================================================= */

const loginForm = getElement("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            getElement("loginEmail").value.trim().toLowerCase();

        const password =
            getElement("loginPassword").value;


        if (!email || !password) {
            showMessage(
                "loginMessage",
                "Please enter your email and password.",
                "error"
            );

            return;
        }


        const users = getUsers();


        const user = users.find(function (item) {
            return (
                item.email.toLowerCase() === email &&
                item.password === password
            );
        });


        if (!user) {
            showMessage(
                "loginMessage",
                "Invalid email or password.",
                "error"
            );

            return;
        }


        saveCurrentUser(user);


        showMessage(
            "loginMessage",
            "Login successful!",
            "success"
        );


        setTimeout(function () {
            showDashboard();
        }, 500);
    });
}


/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard() {

    const user = getCurrentUser();

    if (!user) {
        showLanding();
        return;
    }


    const dashboardUserName =
        getElement("dashboardUserName");

    const welcomeName =
        getElement("welcomeName");


    if (dashboardUserName) {
        dashboardUserName.textContent =
            user.fullName;
    }


    if (welcomeName) {
        welcomeName.textContent =
            user.fullName.split(" ")[0];
    }


    const dashboardAvatar =
        getElement("dashboardAvatar");

    if (dashboardAvatar) {
        dashboardAvatar.textContent =
            user.fullName.charAt(0).toUpperCase();
    }


    loadCourses();
    loadAssignments();
    loadTimetable();
    loadGoals();
    loadExpenses();
    loadStudyStatistics();
    loadProfile();
}


/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

function scrollToSection(id) {

    const section = getElement(id);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function showSection(id) {

    const section = getElement(id);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   COURSE MANAGER
========================================================= */

let editingCourseId = null;


function getCourses() {

    const user = getCurrentUser();

    if (!user || !user.id) {
        return [];
    }

    const key =
        "dailyMateCourses_" + user.id;

    const saved =
        localStorage.getItem(key);

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveCourses(courses) {

    const user = getCurrentUser();

    if (!user || !user.id) {
        return false;
    }

    const key =
        "dailyMateCourses_" + user.id;

    localStorage.setItem(
        key,
        JSON.stringify(courses)
    );

    return true;
}


function openCourseForm() {

    const card =
        getElement("courseFormCard");

    if (!card) {
        return;
    }

    card.style.display = "block";

    editingCourseId = null;


    const form =
        getElement("courseForm");

    if (form) {
        form.reset();
    }


    const title =
        getElement("courseFormTitle");

    if (title) {
        title.textContent = "Add Course";
    }


    const message =
        getElement("courseMessage");

    if (message) {
        message.textContent = "";
    }


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function closeCourseForm() {

    const card =
        getElement("courseFormCard");

    if (card) {
        card.style.display = "none";
    }


    const form =
        getElement("courseForm");

    if (form) {
        form.reset();
    }


    editingCourseId = null;
}


const courseForm =
    getElement("courseForm");


if (courseForm) {

    courseForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const user =
            getCurrentUser();


        if (!user) {
            showMessage(
                "courseMessage",
                "Please login first.",
                "error"
            );

            return;
        }


        const code =
            getElement("courseCode").value
                .trim()
                .toUpperCase();

        const title =
            getElement("courseTitle").value.trim();

        const unit =
            Number(getElement("courseUnit").value);

        const semester =
            getElement("courseSemester").value;


        if (!code || !title || !unit || !semester) {

            showMessage(
                "courseMessage",
                "Please fill all course fields.",
                "error"
            );

            return;
        }


        let courses =
            getCourses();


        if (editingCourseId) {

            const index =
                courses.findIndex(
                    course =>
                        course.id === editingCourseId
                );


            if (index === -1) {

                showMessage(
                    "courseMessage",
                    "Course not found.",
                    "error"
                );

                return;
            }


            courses[index].code = code;
            courses[index].title = title;
            courses[index].unit = unit;
            courses[index].semester = semester;


            saveCourses(courses);


            editingCourseId = null;


            courseForm.reset();


            loadCourses();
            populateAssignmentCourses();


            showMessage(
                "courseMessage",
                "Course updated successfully!",
                "success"
            );

            return;
        }


        const duplicate =
            courses.find(function (course) {
                return (
                    course.code.toUpperCase() === code
                );
            });


        if (duplicate) {

            showMessage(
                "courseMessage",
                "This course already exists.",
                "error"
            );

            return;
        }


        const newCourse = {

            id: "course_" + Date.now(),

            code: code,

            title: title,

            unit: unit,

            semester: semester,

            createdAt:
                new Date().toISOString()
        };


        courses.push(newCourse);


        saveCourses(courses);


        courseForm.reset();


        loadCourses();
        populateAssignmentCourses();


        showMessage(
            "courseMessage",
            "Course added successfully!",
            "success"
        );
    });
}


function loadCourses() {

    const courses =
        getCourses();


    const totalCourses =
        getElement("totalCourses");

    if (totalCourses) {
        totalCourses.textContent =
            courses.length;
    }


    const courseCount =
        getElement("courseCount");

    if (courseCount) {
        courseCount.textContent =
            courses.length;
    }


    let totalUnitsValue = 0;


    courses.forEach(function (course) {

        totalUnitsValue +=
            Number(course.unit) || 0;

    });


    const totalUnits =
        getElement("totalUnits");

    if (totalUnits) {
        totalUnits.textContent =
            totalUnitsValue;
    }


    const courseListCount =
        getElement("courseListCount");


    if (courseListCount) {

        courseListCount.textContent =
            courses.length +
            (
                courses.length === 1
                    ? " course"
                    : " courses"
            );
    }


    const courseList =
        getElement("courseList");


    if (!courseList) {
        return;
    }


    if (courses.length === 0) {

        courseList.innerHTML = `
            <div class="empty-state">
                <h3>No Courses Yet</h3>
                <p>
                    Add your first course to start
                    managing your academic work.
                </p>
            </div>
        `;

        return;
    }


    courseList.innerHTML = "";


    courses.forEach(function (course) {

        const card =
            document.createElement("div");

        card.className =
            "course-card";


        card.innerHTML = `

            <div class="course-card-header">

                <div>

                    <span class="course-code">
                        ${escapeHTML(course.code)}
                    </span>

                    <h3>
                        ${escapeHTML(course.title)}
                    </h3>

                </div>

                <span class="course-unit">
                    ${course.unit}
                    Unit${course.unit == 1 ? "" : "s"}
                </span>

            </div>


            <div class="course-info">

                <span>
                    Semester:
                    <strong>
                        ${escapeHTML(course.semester)}
                    </strong>
                </span>

            </div>


            <div class="course-actions">

                <button
                    class="edit-btn"
                    onclick="editCourse('${course.id}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteCourse('${course.id}')"
                >
                    Delete
                </button>

            </div>
        `;


        courseList.appendChild(card);
    });
}


function editCourse(id) {

    const courses =
        getCourses();


    const course =
        courses.find(
            item => item.id === id
        );


    if (!course) {
        return;
    }


    getElement("courseCode").value =
        course.code;

    getElement("courseTitle").value =
        course.title;

    getElement("courseUnit").value =
        course.unit;

    getElement("courseSemester").value =
        course.semester;


    editingCourseId = id;


    const card =
        getElement("courseFormCard");


    if (card) {

        card.style.display =
            "block";

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    const title =
        getElement("courseFormTitle");


    if (title) {
        title.textContent =
            "Edit Course";
    }
}


function deleteCourse(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this course?"
        );


    if (!answer) {
        return;
    }


    let courses =
        getCourses();


    courses =
        courses.filter(
            course => course.id !== id
        );


    saveCourses(courses);


    loadCourses();
    populateAssignmentCourses();


    showMessage(
        "courseMessage",
        "Course deleted successfully.",
        "success"
    );
}


/* =========================================================
   ASSIGNMENT MANAGER
========================================================= */

let editingAssignmentId = null;


function getAssignments() {

    const user =
        getCurrentUser();

    if (!user || !user.id) {
        return [];
    }


    const key =
        "dailyMateAssignments_" + user.id;


    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return [];
    }


    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveAssignments(assignments) {

    const user =
        getCurrentUser();

    if (!user || !user.id) {
        return false;
    }


    const key =
        "dailyMateAssignments_" + user.id;


    localStorage.setItem(
        key,
        JSON.stringify(assignments)
    );


    return true;
}


function openAssignmentForm() {

    const card =
        getElement("assignmentFormCard");


    if (!card) {
        return;
    }


    card.style.display =
        "block";


    editingAssignmentId =
        null;


    const form =
        getElement("assignmentForm");


    if (form) {
        form.reset();
    }


    const title =
        getElement("assignmentFormTitle");


    if (title) {
        title.textContent =
            "Add Assignment";
    }


    populateAssignmentCourses();


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function closeAssignmentForm() {

    const card =
        getElement("assignmentFormCard");


    if (card) {
        card.style.display =
            "none";
    }


    const form =
        getElement("assignmentForm");


    if (form) {
        form.reset();
    }


    editingAssignmentId =
        null;
}


function populateAssignmentCourses() {

    const select =
        getElement("assignmentCourse");


    if (!select) {
        return;
    }


    const courses =
        getCourses();


    select.innerHTML =
        `<option value="">Select Course</option>`;


    courses.forEach(function (course) {

        const option =
            document.createElement("option");


        option.value =
            course.id;


        option.textContent =
            course.code +
            " - " +
            course.title;


        select.appendChild(option);
    });
}


const assignmentForm =
    getElement("assignmentForm");


if (assignmentForm) {

    assignmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                getElement("assignmentTitle")
                    .value
                    .trim();


            const courseId =
                getElement("assignmentCourse")
                    .value;


            const dueDate =
                getElement("assignmentDueDate")
                    .value;


            const priority =
                getElement("assignmentPriority")
                    .value;


            const description =
                getElement("assignmentDescription")
                    .value
                    .trim();


            if (
                !title ||
                !courseId ||
                !dueDate ||
                !priority
            ) {

                showMessage(
                    "assignmentMessage",
                    "Please fill all required fields.",
                    "error"
                );

                return;
            }


            let assignments =
                getAssignments();


            if (editingAssignmentId) {

                const index =
                    assignments.findIndex(
                        assignment =>
                            assignment.id ===
                            editingAssignmentId
                    );


                if (index === -1) {
                    return;
                }


                assignments[index].title =
                    title;

                assignments[index].courseId =
                    courseId;

                assignments[index].dueDate =
                    dueDate;

                assignments[index].priority =
                    priority;

                assignments[index].description =
                    description;


                saveAssignments(assignments);


                editingAssignmentId =
                    null;


                assignmentForm.reset();


                loadAssignments();


                showMessage(
                    "assignmentMessage",
                    "Assignment updated successfully!",
                    "success"
                );

                return;
            }


            const newAssignment = {

                id:
                    "assignment_" +
                    Date.now(),

                title:
                    title,

                courseId:
                    courseId,

                dueDate:
                    dueDate,

                priority:
                    priority,

                description:
                    description,

                completed:
                    false,

                createdAt:
                    new Date().toISOString()
            };


            assignments.push(
                newAssignment
            );


            saveAssignments(
                assignments
            );


            assignmentForm.reset();


            loadAssignments();


            showMessage(
                "assignmentMessage",
                "Assignment added successfully!",
                "success"
            );
        }
    );
}


function getCourseById(id) {

    const courses =
        getCourses();


    return courses.find(
        course => course.id === id
    );
}


function formatAssignmentDate(date) {

    if (!date) {
        return "No due date";
    }


    return new Date(date).toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function loadAssignments() {

    let assignments =
        getAssignments();


    assignments.sort(
        function (a, b) {

            return (
                new Date(a.dueDate) -
                new Date(b.dueDate)
            );
        }
    );


    let pending = 0;
    let completed = 0;
    let overdue = 0;


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    assignments.forEach(
        function (assignment) {

            if (assignment.completed) {
                completed++;
            } else {
                pending++;

                const due =
                    new Date(
                        assignment.dueDate
                    );

                due.setHours(
                    0,
                    0,
                    0,
                    0
                );


                if (due < today) {
                    overdue++;
                }
            }
        }
    );


    const totalAssignments =
        getElement("totalAssignments");

    const pendingAssignments =
        getElement("pendingAssignments");

    const completedAssignments =
        getElement("completedAssignments");

    const overdueAssignments =
        getElement("overdueAssignments");


    if (totalAssignments) {
        totalAssignments.textContent =
            assignments.length;
    }

    if (pendingAssignments) {
        pendingAssignments.textContent =
            pending;
    }

    if (completedAssignments) {
        completedAssignments.textContent =
            completed;
    }

    if (overdueAssignments) {
        overdueAssignments.textContent =
            overdue;
    }


    const dashboardCount =
        getElement("assignmentCount");


    if (dashboardCount) {
        dashboardCount.textContent =
            pending;
    }


    const listCount =
        getElement("assignmentListCount");


    if (listCount) {

        listCount.textContent =
            assignments.length +
            (
                assignments.length === 1
                    ? " assignment"
                    : " assignments"
            );
    }


    const list =
        getElement("assignmentList");


    if (!list) {
        return;
    }


    if (assignments.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <h3>No Assignments Yet</h3>
                <p>
                    Add an assignment to start
                    tracking your academic work.
                </p>
            </div>
        `;

        return;
    }


    list.innerHTML = "";


    assignments.forEach(
        function (assignment) {

            const course =
                getCourseById(
                    assignment.courseId
                );


            const due =
                new Date(
                    assignment.dueDate
                );


            const today =
                new Date();


            today.setHours(
                0,
                0,
                0,
                0
            );


            due.setHours(
                0,
                0,
                0,
                0
            );


            const isOverdue =
                !assignment.completed &&
                due < today;


            const card =
                document.createElement("div");


            card.className =
                "assignment-card";


            if (assignment.completed) {
                card.classList.add(
                    "completed"
                );
            }


            card.innerHTML = `

                <div class="assignment-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(
                                assignment.title
                            )}
                        </h3>

                        <p>
                            ${
                                course
                                    ? escapeHTML(
                                        course.code +
                                        " - " +
                                        course.title
                                    )
                                    : "Course not found"
                            }
                        </p>

                    </div>

                    <span class="priority-badge ${escapeHTML(
                        assignment.priority
                    )}">
                        ${escapeHTML(
                            assignment.priority
                        )}
                    </span>

                </div>


                <div class="assignment-date">

                    Due:
                    <strong>
                        ${formatAssignmentDate(
                            assignment.dueDate
                        )}
                    </strong>

                    ${
                        isOverdue
                            ? `<span class="overdue-label">
                                Overdue
                               </span>`
                            : ""
                    }

                </div>


                ${
                    assignment.description
                        ? `
                        <p class="assignment-description">
                            ${escapeHTML(
                                assignment.description
                            )}
                        </p>
                        `
                        : ""
                }


                <div class="assignment-actions">

                    <button
                        class="complete-btn"
                        onclick="toggleAssignmentComplete('${assignment.id}')"
                    >
                        ${
                            assignment.completed
                                ? "Mark Pending"
                                : "Complete"
                        }
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editAssignment('${assignment.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteAssignment('${assignment.id}')"
                    >
                        Delete
                    </button>

                </div>
            `;


            list.appendChild(card);
        }
    );
}


function toggleAssignmentComplete(id) {

    const assignments =
        getAssignments();


    const assignment =
        assignments.find(
            item => item.id === id
        );


    if (!assignment) {
        return;
    }


    assignment.completed =
        !assignment.completed;


    saveAssignments(
        assignments
    );


    loadAssignments();


    showMessage(
        "assignmentMessage",
        assignment.completed
            ? "Assignment completed!"
            : "Assignment marked as pending.",
        "success"
    );
}


function editAssignment(id) {

    const assignments =
        getAssignments();


    const assignment =
        assignments.find(
            item => item.id === id
        );


    if (!assignment) {
        return;
    }


    populateAssignmentCourses();


    getElement("assignmentTitle").value =
        assignment.title;

    getElement("assignmentCourse").value =
        assignment.courseId;

    getElement("assignmentDueDate").value =
        assignment.dueDate;

    getElement("assignmentPriority").value =
        assignment.priority;

    getElement("assignmentDescription").value =
        assignment.description || "";


    editingAssignmentId =
        id;


    const card =
        getElement("assignmentFormCard");


    if (card) {

        card.style.display =
            "block";

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    const title =
        getElement("assignmentFormTitle");


    if (title) {
        title.textContent =
            "Edit Assignment";
    }
}


function deleteAssignment(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this assignment?"
        );


    if (!answer) {
        return;
    }


    let assignments =
        getAssignments();


    assignments =
        assignments.filter(
            assignment =>
                assignment.id !== id
        );


    saveAssignments(
        assignments
    );


    loadAssignments();


    showMessage(
        "assignmentMessage",
        "Assignment deleted successfully.",
        "success"
    );
}


/* =========================================================
   TIMETABLE MANAGER
========================================================= */

let editingTimetableId = null;


function getTimetable() {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return [];
    }


    const key =
        "dailyMateTimetable_" +
        user.id;


    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return [];
    }


    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveTimetable(timetable) {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return false;
    }


    const key =
        "dailyMateTimetable_" +
        user.id;


    localStorage.setItem(
        key,
        JSON.stringify(timetable)
    );


    return true;
}


function openTimetableForm() {

    const card =
        getElement("timetableFormCard");


    if (!card) {
        return;
    }


    card.style.display =
        "block";


    editingTimetableId =
        null;


    const form =
        getElement("timetableForm");


    if (form) {
        form.reset();
    }


    const title =
        getElement("timetableFormTitle");


    if (title) {
        title.textContent =
            "Add Timetable Class";
    }


    populateTimetableCourses();


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function closeTimetableForm() {

    const card =
        getElement("timetableFormCard");


    if (card) {
        card.style.display =
            "none";
    }


    const form =
        getElement("timetableForm");


    if (form) {
        form.reset();
    }


    editingTimetableId =
        null;
}


function populateTimetableCourses() {

    const select =
        getElement("timetableCourse");


    if (!select) {
        return;
    }


    const courses =
        getCourses();


    select.innerHTML =
        `<option value="">Select Course</option>`;


    courses.forEach(function (course) {

        const option =
            document.createElement("option");


        option.value =
            course.id;


        option.textContent =
            course.code +
            " - " +
            course.title;


        select.appendChild(option);
    });
}


const timetableForm =
    getElement("timetableForm");


if (timetableForm) {

    timetableForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const day =
                getElement("timetableDay")
                    .value;


            const courseId =
                getElement("timetableCourse")
                    .value;


            const start =
                getElement("timetableStart")
                    .value;


            const end =
                getElement("timetableEnd")
                    .value;


            const venue =
                getElement("timetableVenue")
                    .value
                    .trim();


            const lecturer =
                getElement("timetableLecturer")
                    .value
                    .trim();


            if (
                !day ||
                !courseId ||
                !start ||
                !end
            ) {

                showMessage(
                    "timetableMessage",
                    "Please fill all required fields.",
                    "error"
                );

                return;
            }


            let timetable =
                getTimetable();


            if (editingTimetableId) {

                const index =
                    timetable.findIndex(
                        item =>
                            item.id ===
                            editingTimetableId
                    );


                if (index === -1) {
                    return;
                }


                timetable[index].day =
                    day;

                timetable[index].courseId =
                    courseId;

                timetable[index].start =
                    start;

                timetable[index].end =
                    end;

                timetable[index].venue =
                    venue;

                timetable[index].lecturer =
                    lecturer;


                saveTimetable(
                    timetable
                );


                editingTimetableId =
                    null;


                timetableForm.reset();


                loadTimetable();


                showMessage(
                    "timetableMessage",
                    "Timetable updated successfully!",
                    "success"
                );

                return;
            }


            timetable.push({

                id:
                    "timetable_" +
                    Date.now(),

                day:
                    day,

                courseId:
                    courseId,

                start:
                    start,

                end:
                    end,

                venue:
                    venue,

                lecturer:
                    lecturer,

                createdAt:
                    new Date().toISOString()
            });


            saveTimetable(
                timetable
            );


            timetableForm.reset();


            loadTimetable();


            showMessage(
                "timetableMessage",
                "Class added successfully!",
                "success"
            );
        }
    );
}


const DAY_ORDER = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};


function loadTimetable() {

    let timetable =
        getTimetable();


    timetable.sort(
        function (a, b) {

            const dayDifference =
                (DAY_ORDER[a.day] || 99) -
                (DAY_ORDER[b.day] || 99);


            if (dayDifference !== 0) {
                return dayDifference;
            }


            return a.start.localeCompare(
                b.start
            );
        }
    );


    const count =
        getElement("timetableListCount");


    if (count) {

        count.textContent =
            timetable.length +
            (
                timetable.length === 1
                    ? " class"
                    : " classes"
            );
    }


    const list =
        getElement("timetableList");


    if (!list) {
        return;
    }


    if (timetable.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <h3>No Timetable Yet</h3>
                <p>
                    Add your classes to build
                    your weekly timetable.
                </p>
            </div>
        `;

        return;
    }


    list.innerHTML = "";


    timetable.forEach(
        function (item) {

            const course =
                getCourseById(
                    item.courseId
                );


            const card =
                document.createElement("div");


            card.className =
                "timetable-card";


            card.innerHTML = `

                <div class="timetable-card-header">

                    <div>

                        <span class="timetable-day">
                            ${escapeHTML(item.day)}
                        </span>

                        <h3>
                            ${
                                course
                                    ? escapeHTML(
                                        course.code +
                                        " - " +
                                        course.title
                                    )
                                    : "Course not found"
                            }
                        </h3>

                    </div>

                    <span class="timetable-time">
                        ${escapeHTML(item.start)}
                        -
                        ${escapeHTML(item.end)}
                    </span>

                </div>


                <div class="timetable-info">

                    ${
                        item.venue
                            ? `<span>
                                📍 ${escapeHTML(item.venue)}
                               </span>`
                            : ""
                    }

                    ${
                        item.lecturer
                            ? `<span>
                                👨‍🏫 ${escapeHTML(item.lecturer)}
                               </span>`
                            : ""
                    }

                </div>


                <div class="course-actions">

                    <button
                        class="edit-btn"
                        onclick="editTimetable('${item.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteTimetable('${item.id}')"
                    >
                        Delete
                    </button>

                </div>
            `;


            list.appendChild(card);
        }
    );
}


function editTimetable(id) {

    const timetable =
        getTimetable();


    const item =
        timetable.find(
            timetableItem =>
                timetableItem.id === id
        );


    if (!item) {
        return;
    }


    populateTimetableCourses();


    getElement("timetableDay").value =
        item.day;

    getElement("timetableCourse").value =
        item.courseId;

    getElement("timetableStart").value =
        item.start;

    getElement("timetableEnd").value =
        item.end;

    getElement("timetableVenue").value =
        item.venue || "";

    getElement("timetableLecturer").value =
        item.lecturer || "";


    editingTimetableId =
        id;


    const card =
        getElement("timetableFormCard");


    if (card) {

        card.style.display =
            "block";

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    const title =
        getElement("timetableFormTitle");


    if (title) {
        title.textContent =
            "Edit Timetable Class";
    }
}


function deleteTimetable(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this class?"
        );


    if (!answer) {
        return;
    }


    let timetable =
        getTimetable();


    timetable =
        timetable.filter(
            item =>
                item.id !== id
        );


    saveTimetable(
        timetable
    );


    loadTimetable();


    showMessage(
        "timetableMessage",
        "Class deleted successfully.",
        "success"
    );
}


/* =========================================================
   GOALS MANAGER
========================================================= */

let editingGoalId = null;


function getGoals() {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return [];
    }


    const key =
        "dailyMateGoals_" +
        user.id;


    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return [];
    }


    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveGoals(goals) {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return false;
    }


    const key =
        "dailyMateGoals_" +
        user.id;


    localStorage.setItem(
        key,
        JSON.stringify(goals)
    );


    return true;
}


function openGoalForm() {

    const card =
        getElement("goalFormCard");


    if (!card) {
        return;
    }


    card.style.display =
        "block";


    editingGoalId =
        null;


    const form =
        getElement("goalForm");


    if (form) {
        form.reset();
    }


    const progress =
        getElement("goalProgress");


    if (progress) {
        progress.value = 0;
    }


    const title =
        getElement("goalFormTitle");


    if (title) {
        title.textContent =
            "Add Goal";
    }


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function closeGoalForm() {

    const card =
        getElement("goalFormCard");


    if (card) {
        card.style.display =
            "none";
    }


    const form =
        getElement("goalForm");


    if (form) {
        form.reset();
    }


    editingGoalId =
        null;
}


const goalForm =
    getElement("goalForm");


if (goalForm) {

    goalForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                getElement("goalTitle")
                    .value
                    .trim();


            const category =
                getElement("goalCategory")
                    .value;


            const targetDate =
                getElement("goalTargetDate")
                    .value;


            const progress =
                Number(
                    getElement("goalProgress")
                        .value
                );


            const description =
                getElement("goalDescription")
                    .value
                    .trim();


            if (
                !title ||
                !category ||
                !targetDate
            ) {

                showMessage(
                    "goalMessage",
                    "Please fill all required fields.",
                    "error"
                );

                return;
            }


            if (
                progress < 0 ||
                progress > 100
            ) {

                showMessage(
                    "goalMessage",
                    "Progress must be between 0 and 100.",
                    "error"
                );

                return;
            }


            let goals =
                getGoals();


            if (editingGoalId) {

                const index =
                    goals.findIndex(
                        goal =>
                            goal.id ===
                            editingGoalId
                    );


                if (index === -1) {
                    return;
                }


                goals[index].title =
                    title;

                goals[index].category =
                    category;

                goals[index].targetDate =
                    targetDate;

                goals[index].progress =
                    progress;

                goals[index].description =
                    description;


                saveGoals(goals);


                editingGoalId =
                    null;


                goalForm.reset();


                loadGoals();


                showMessage(
                    "goalMessage",
                    "Goal updated successfully!",
                    "success"
                );

                return;
            }


            goals.push({

                id:
                    "goal_" +
                    Date.now(),

                title:
                    title,

                category:
                    category,

                targetDate:
                    targetDate,

                progress:
                    progress,

                description:
                    description,

                createdAt:
                    new Date().toISOString()
            });


            saveGoals(
                goals
            );


            goalForm.reset();


            loadGoals();


            showMessage(
                "goalMessage",
                "Goal added successfully!",
                "success"
            );
        }
    );
}


function loadGoals() {

    const goals =
        getGoals();


    let completed = 0;
    let active = 0;
    let totalProgress = 0;


    goals.forEach(
        function (goal) {

            const progress =
                Number(goal.progress) || 0;


            totalProgress +=
                progress;


            if (progress >= 100) {
                completed++;
            } else {
                active++;
            }
        }
    );


    const average =
        goals.length > 0
            ? Math.round(
                totalProgress /
                goals.length
            )
            : 0;


    const totalGoals =
        getElement("totalGoals");


    const activeGoals =
        getElement("activeGoals");


    const completedGoals =
        getElement("completedGoals");


    const averageGoalProgress =
        getElement("averageGoalProgress");


    if (totalGoals) {
        totalGoals.textContent =
            goals.length;
    }


    if (activeGoals) {
        activeGoals.textContent =
            active;
    }


    if (completedGoals) {
        completedGoals.textContent =
            completed;
    }


    if (averageGoalProgress) {
        averageGoalProgress.textContent =
            average + "%";
    }


    const dashboardGoalCount =
        getElement("goalCount");


    if (dashboardGoalCount) {
        dashboardGoalCount.textContent =
            active;
    }


    const listCount =
        getElement("goalListCount");


    if (listCount) {

        listCount.textContent =
            goals.length +
            (
                goals.length === 1
                    ? " goal"
                    : " goals"
            );
    }


    const list =
        getElement("goalList");


    if (!list) {
        return;
    }


    if (goals.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <h3>No Goals Yet</h3>
                <p>
                    Create a goal and start
                    tracking your progress.
                </p>
            </div>
        `;

        return;
    }


    list.innerHTML = "";


    goals.forEach(
        function (goal) {

            const progress =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(goal.progress) || 0
                    )
                );


            const card =
                document.createElement("div");


            card.className =
                "goal-card";


            if (progress >= 100) {
                card.classList.add(
                    "completed"
                );
            }


            card.innerHTML = `

                <div class="goal-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(
                                goal.title
                            )}
                        </h3>

                        <span class="goal-category">
                            ${escapeHTML(
                                goal.category
                            )}
                        </span>

                    </div>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="goal-progress">

                    <div class="goal-progress-bar">

                        <span
                            style="width: ${progress}%"
                        ></span>

                    </div>

                    <div class="goal-progress-text">
                        ${progress}% complete
                    </div>

                </div>


                ${
                    goal.description
                        ? `
                        <p class="goal-description">
                            ${escapeHTML(
                                goal.description
                            )}
                        </p>
                        `
                        : ""
                }


                <div class="goal-date">
                    Target:
                    ${formatExpenseDate(
                        goal.targetDate
                    )}
                </div>


                <div class="course-actions">

                    <button
                        class="edit-btn"
                        onclick="editGoal('${goal.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteGoal('${goal.id}')"
                    >
                        Delete
                    </button>

                </div>
            `;


            list.appendChild(card);
        }
    );
}


function editGoal(id) {

    const goals =
        getGoals();


    const goal =
        goals.find(
            item => item.id === id
        );


    if (!goal) {
        return;
    }


    getElement("goalTitle").value =
        goal.title;

    getElement("goalCategory").value =
        goal.category;

    getElement("goalTargetDate").value =
        goal.targetDate;

    getElement("goalProgress").value =
        goal.progress;

    getElement("goalDescription").value =
        goal.description || "";


    editingGoalId =
        id;


    const card =
        getElement("goalFormCard");


    if (card) {

        card.style.display =
            "block";

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    const title =
        getElement("goalFormTitle");


    if (title) {
        title.textContent =
            "Edit Goal";
    }
}


function deleteGoal(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this goal?"
        );


    if (!answer) {
        return;
    }


    let goals =
        getGoals();


    goals =
        goals.filter(
            goal =>
                goal.id !== id
        );


    saveGoals(
        goals
    );


    loadGoals();


    showMessage(
        "goalMessage",
        "Goal deleted successfully.",
        "success"
    );
}


/* =========================================================
   EXPENSE MANAGER
========================================================= */

let editingExpenseId = null;


function getExpenses() {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return [];
    }


    const key =
        "dailyMateExpenses_" +
        user.id;


    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return [];
    }


    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveExpenses(expenses) {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return false;
    }


    const key =
        "dailyMateExpenses_" +
        user.id;


    localStorage.setItem(
        key,
        JSON.stringify(expenses)
    );


    return true;
}


function openExpenseForm() {

    const card =
        getElement("expenseFormCard");


    if (!card) {
        return;
    }


    card.style.display =
        "block";


    editingExpenseId =
        null;


    const form =
        getElement("expenseForm");


    if (form) {
        form.reset();
    }


    const title =
        getElement("expenseFormTitle");


    if (title) {
        title.textContent =
            "Add Transaction";
    }


    const date =
        getElement("expenseDate");


    if (date) {
        date.value =
            new Date()
                .toISOString()
                .split("T")[0];
    }


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function closeExpenseForm() {

    const card =
        getElement("expenseFormCard");


    if (card) {
        card.style.display =
            "none";
    }


    const form =
        getElement("expenseForm");


    if (form) {
        form.reset();
    }


    editingExpenseId =
        null;
}


const expenseForm =
    getElement("expenseForm");


if (expenseForm) {

    expenseForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const type =
                getElement("expenseType")
                    .value;


            const amount =
                Number(
                    getElement("expenseAmount")
                        .value
                );


            const category =
                getElement("expenseCategory")
                    .value;


            const date =
                getElement("expenseDate")
                    .value;


            const description =
                getElement("expenseDescription")
                    .value
                    .trim();


            if (
                !type ||
                !amount ||
                amount <= 0 ||
                !category ||
                !date
            ) {

                showMessage(
                    "expenseMessage",
                    "Please fill all required fields correctly.",
                    "error"
                );

                return;
            }


            let expenses =
                getExpenses();


            if (editingExpenseId) {

                const index =
                    expenses.findIndex(
                        expense =>
                            expense.id ===
                            editingExpenseId
                    );


                if (index === -1) {
                    return;
                }


                expenses[index].type =
                    type;

                expenses[index].amount =
                    amount;

                expenses[index].category =
                    category;

                expenses[index].date =
                    date;

                expenses[index].description =
                    description;


                saveExpenses(
                    expenses
                );


                editingExpenseId =
                    null;


                expenseForm.reset();


                loadExpenses();


                showMessage(
                    "expenseMessage",
                    "Transaction updated successfully!",
                    "success"
                );

                return;
            }


            expenses.push({

                id:
                    "expense_" +
                    Date.now(),

                type:
                    type,

                amount:
                    amount,

                category:
                    category,

                date:
                    date,

                description:
                    description,

                createdAt:
                    new Date().toISOString()
            });


            saveExpenses(
                expenses
            );


            expenseForm.reset();


            const dateInput =
                getElement("expenseDate");


            if (dateInput) {

                dateInput.value =
                    new Date()
                        .toISOString()
                        .split("T")[0];
            }


            loadExpenses();


            showMessage(
                "expenseMessage",
                "Transaction added successfully!",
                "success"
            );
        }
    );
}


function formatMoney(amount) {

    return "₦" +
        Number(amount || 0).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );
}


function formatExpenseDate(date) {

    if (!date) {
        return "No date";
    }


    return new Date(date).toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function loadExpenses() {

    let expenses =
        getExpenses();


    let income = 0;
    let expensesTotal = 0;


    expenses.forEach(
        function (transaction) {

            if (
                transaction.type ===
                "income"
            ) {

                income +=
                    Number(
                        transaction.amount
                    ) || 0;

            } else {

                expensesTotal +=
                    Number(
                        transaction.amount
                    ) || 0;
            }
        }
    );


    const balance =
        income - expensesTotal;


    const totalIncome =
        getElement("totalIncome");


    const totalExpenses =
        getElement("totalExpenses");


    const expenseBalance =
        getElement("expenseBalance");


    if (totalIncome) {
        totalIncome.textContent =
            formatMoney(income);
    }


    if (totalExpenses) {
        totalExpenses.textContent =
            formatMoney(expensesTotal);
    }


    if (expenseBalance) {
        expenseBalance.textContent =
            formatMoney(balance);
    }


    const dashboardExpenseTotal =
        getElement("expenseTotal");


    if (dashboardExpenseTotal) {
        dashboardExpenseTotal.textContent =
            formatMoney(expensesTotal);
    }


    const count =
        getElement("expenseListCount");


    if (count) {

        count.textContent =
            expenses.length +
            (
                expenses.length === 1
                    ? " transaction"
                    : " transactions"
            );
    }


    const list =
        getElement("expenseList");


    if (!list) {
        return;
    }


    if (expenses.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <h3>No Transactions Yet</h3>
                <p>
                    Add your first income or expense
                    to start tracking your money.
                </p>
            </div>
        `;

        return;
    }


    expenses.sort(
        function (a, b) {

            return (
                new Date(b.date) -
                new Date(a.date)
            );
        }
    );


    list.innerHTML = "";


    expenses.forEach(
        function (transaction) {

            const card =
                document.createElement("div");


            card.className =
                "expense-card";


            if (
                transaction.type ===
                "income"
            ) {

                card.classList.add(
                    "income"
                );

            } else {

                card.classList.add(
                    "expense"
                );
            }


            const sign =
                transaction.type ===
                "income"
                    ? "+"
                    : "-";


            card.innerHTML = `

                <div class="expense-card-left">

                    <div class="expense-icon">
                        ${
                            transaction.type ===
                            "income"
                                ? "💰"
                                : "💸"
                        }
                    </div>


                    <div>

                        <h3>
                            ${escapeHTML(
                                transaction.category
                            )}
                        </h3>

                        <p>
                            ${
                                transaction.description
                                    ? escapeHTML(
                                        transaction.description
                                    )
                                    : "No description"
                            }
                        </p>

                        <span class="expense-date">
                            ${formatExpenseDate(
                                transaction.date
                            )}
                        </span>

                    </div>

                </div>


                <div class="expense-card-right">

                    <strong>
                        ${sign}${formatMoney(
                            transaction.amount
                        )}
                    </strong>


                    <div class="expense-actions">

                        <button
                            class="edit-btn"
                            onclick="editExpense('${transaction.id}')"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteExpense('${transaction.id}')"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `;


            list.appendChild(card);
        }
    );
}


function editExpense(id) {

    const expenses =
        getExpenses();


    const transaction =
        expenses.find(
            expense =>
                expense.id === id
        );


    if (!transaction) {
        return;
    }


    getElement("expenseType").value =
        transaction.type;

    getElement("expenseAmount").value =
        transaction.amount;

    getElement("expenseCategory").value =
        transaction.category;

    getElement("expenseDate").value =
        transaction.date;

    getElement("expenseDescription").value =
        transaction.description || "";


    editingExpenseId =
        id;


    const card =
        getElement("expenseFormCard");


    if (card) {

        card.style.display =
            "block";

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    const title =
        getElement("expenseFormTitle");


    if (title) {
        title.textContent =
            "Edit Transaction";
    }
}


function deleteExpense(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!answer) {
        return;
    }


    let expenses =
        getExpenses();


    expenses =
        expenses.filter(
            expense =>
                expense.id !== id
        );


    saveExpenses(
        expenses
    );


    loadExpenses();


    showMessage(
        "expenseMessage",
        "Transaction deleted successfully.",
        "success"
    );
}


/* =========================================================
   STUDY TIMER
========================================================= */

let studyTimerInterval = null;

let studyTimerRunning = false;

let studyTimerMode = "focus";

let studyTimerSeconds =
    25 * 60;

let studyTimerTotalSeconds =
    25 * 60;


const STUDY_TIMER_DURATIONS = {

    focus:
        25 * 60,

    short:
        5 * 60,

    long:
        15 * 60

};


function getStudySessions() {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return [];
    }


    const key =
        "dailyMateStudySessions_" +
        user.id;


    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return [];
    }


    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveStudySessions(sessions) {

    const user =
        getCurrentUser();


    if (!user || !user.id) {
        return false;
    }


    const key =
        "dailyMateStudySessions_" +
        user.id;


    localStorage.setItem(
        key,
        JSON.stringify(sessions)
    );


    return true;
}


function setTimerMode(mode) {

    if (studyTimerRunning) {

        showMessage(
            "timerMessage",
            "Pause the timer before changing mode.",
            "error"
        );

        return;
    }


    studyTimerMode =
        mode;


    studyTimerSeconds =
        STUDY_TIMER_DURATIONS[mode];


    studyTimerTotalSeconds =
        STUDY_TIMER_DURATIONS[mode];


    updateTimerDisplay();

    updateTimerModeUI();


    showMessage(
        "timerMessage",
        "",
        ""
    );
}


function updateTimerModeUI() {

    const modeTitle =
        getElement("timerMode");


    const currentMode =
        getElement("currentTimerMode");


    if (studyTimerMode === "focus") {

        if (modeTitle) {
            modeTitle.textContent =
                "Focus Time";
        }

        if (currentMode) {
            currentMode.textContent =
                "Focus";
        }
    }


    if (studyTimerMode === "short") {

        if (modeTitle) {
            modeTitle.textContent =
                "Short Break";
        }

        if (currentMode) {
            currentMode.textContent =
                "Short Break";
        }
    }


    if (studyTimerMode === "long") {

        if (modeTitle) {
            modeTitle.textContent =
                "Long Break";
        }

        if (currentMode) {
            currentMode.textContent =
                "Long Break";
        }
    }


    const buttons = [
        "focusModeBtn",
        "shortBreakModeBtn",
        "longBreakModeBtn"
    ];


    buttons.forEach(
        function (id) {

            const button =
                getElement(id);


            if (button) {
                button.classList.remove(
                    "active"
                );
            }
        }
    );


    if (studyTimerMode === "focus") {

        getElement(
            "focusModeBtn"
        )?.classList.add(
            "active"
        );
    }


    if (studyTimerMode === "short") {

        getElement(
            "shortBreakModeBtn"
        )?.classList.add(
            "active"
        );
    }


    if (studyTimerMode === "long") {

        getElement(
            "longBreakModeBtn"
        )?.classList.add(
            "active"
        );
    }
}


function startStudyTimer() {

    if (studyTimerRunning) {
        return;
    }


    if (studyTimerSeconds <= 0) {

        studyTimerSeconds =
            STUDY_TIMER_DURATIONS[
                studyTimerMode
            ];

        studyTimerTotalSeconds =
            STUDY_TIMER_DURATIONS[
                studyTimerMode
            ];

        updateTimerDisplay();
    }


    studyTimerRunning =
        true;


    const startButton =
        getElement("startTimerBtn");


    const pauseButton =
        getElement("pauseTimerBtn");


    if (startButton) {
        startButton.disabled =
            true;
    }


    if (pauseButton) {
        pauseButton.disabled =
            false;
    }


    studyTimerInterval =
        setInterval(
            function () {

                studyTimerSeconds--;

                updateTimerDisplay();


                if (
                    studyTimerSeconds <= 0
                ) {

                    finishStudyTimer();
                }

            },
            1000
        );
}


function pauseStudyTimer() {

    if (!studyTimerRunning) {
        return;
    }


    clearInterval(
        studyTimerInterval
    );


    studyTimerInterval =
        null;


    studyTimerRunning =
        false;


    const startButton =
        getElement("startTimerBtn");


    const pauseButton =
        getElement("pauseTimerBtn");


    if (startButton) {
        startButton.disabled =
            false;
    }


    if (pauseButton) {
        pauseButton.disabled =
            true;
    }


    showMessage(
        "timerMessage",
        "Timer paused.",
        ""
    );
}


function resetStudyTimer() {

    clearInterval(
        studyTimerInterval
    );


    studyTimerInterval =
        null;


    studyTimerRunning =
        false;


    studyTimerSeconds =
        STUDY_TIMER_DURATIONS[
            studyTimerMode
        ];


    studyTimerTotalSeconds =
        STUDY_TIMER_DURATIONS[
            studyTimerMode
        ];


    updateTimerDisplay();


    const startButton =
        getElement("startTimerBtn");


    const pauseButton =
        getElement("pauseTimerBtn");


    if (startButton) {
        startButton.disabled =
            false;
    }


    if (pauseButton) {
        pauseButton.disabled =
            true;
    }


    showMessage(
        "timerMessage",
        "Timer reset.",
        ""
    );
}


function finishStudyTimer() {

    clearInterval(
        studyTimerInterval
    );


    studyTimerInterval =
        null;


    studyTimerRunning =
        false;


    if (
        studyTimerMode ===
        "focus"
    ) {

        saveCompletedStudySession();


        showMessage(
            "timerMessage",
            "Focus session completed! Great work.",
            "success"
        );

    } else {

        showMessage(
            "timerMessage",
            "Break completed. You can start another session.",
            "success"
        );
    }


    const startButton =
        getElement("startTimerBtn");


    const pauseButton =
        getElement("pauseTimerBtn");


    if (startButton) {
        startButton.disabled =
            false;
    }


    if (pauseButton) {
        pauseButton.disabled =
            true;
    }


    studyTimerSeconds =
        0;


    updateTimerDisplay();


    if (
        "Notification" in window &&
        Notification.permission ===
        "granted"
    ) {

        new Notification(
            "DailyMate Study Timer",
            {
                body:
                    studyTimerMode ===
                    "focus"
                        ? "Your focus session is complete!"
                        : "Your break is complete!"
            }
        );
    }
}


function saveCompletedStudySession() {

    const sessions =
        getStudySessions();


    sessions.push({

        id:
            "study_" +
            Date.now(),

        minutes:
            25,

        date:
            new Date().toISOString()

    });


    saveStudySessions(
        sessions
    );


    loadStudyStatistics();
}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            studyTimerSeconds /
            60
        );


    const seconds =
        studyTimerSeconds %
        60;


    const minutesElement =
        getElement("timerMinutes");


    const secondsElement =
        getElement("timerSeconds");


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes)
                .padStart(2, "0");
    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds)
                .padStart(2, "0");
    }


    const progressBar =
        getElement("timerProgressBar");


    if (progressBar) {

        const progress =
            (
                (
                    studyTimerTotalSeconds -
                    studyTimerSeconds
                ) /
                studyTimerTotalSeconds
            ) * 100;


        progressBar.style.width =
            Math.max(
                0,
                Math.min(
                    100,
                    progress
                )
            ) + "%";
    }
}


function loadStudyStatistics() {

    const sessions =
        getStudySessions();


    const today =
        new Date()
            .toDateString();


    const todaySessions =
        sessions.filter(
            function (session) {

                return (
                    new Date(
                        session.date
                    ).toDateString() ===
                    today
                );
            }
        );


    let focusMinutes =
        0;


    todaySessions.forEach(
        function (session) {

            focusMinutes +=
                Number(
                    session.minutes
                ) || 0;
        }
    );


    const completedSessions =
        getElement(
            "completedStudySessions"
        );


    const totalFocusMinutes =
        getElement(
            "totalFocusMinutes"
        );


    if (completedSessions) {

        completedSessions.textContent =
            todaySessions.length;
    }


    if (totalFocusMinutes) {

        totalFocusMinutes.textContent =
            focusMinutes;
    }
}


function requestTimerNotification() {

    if (
        "Notification" in window &&
        Notification.permission ===
        "default"
    ) {

        Notification.requestPermission();
    }
}


function initializeStudyTimer() {

    studyTimerMode =
        "focus";


    studyTimerSeconds =
        STUDY_TIMER_DURATIONS.focus;


    studyTimerTotalSeconds =
        STUDY_TIMER_DURATIONS.focus;


    updateTimerDisplay();

    updateTimerModeUI();

    loadStudyStatistics();
}


/* =========================================================
   PROFILE
========================================================= */

function loadProfile() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const profileAvatar =
        getElement("profileAvatar");


    if (profileAvatar) {

        profileAvatar.textContent =
            user.fullName
                .charAt(0)
                .toUpperCase();
    }


    const profileFullName =
        getElement("profileFullName");


    if (profileFullName) {

        profileFullName.textContent =
            user.fullName;
    }


    const profileEmail =
        getElement("profileEmail");


    if (profileEmail) {

        profileEmail.textContent =
            user.email;
    }


    const profileUniversity =
        getElement("profileUniversity");


    if (profileUniversity) {

        profileUniversity.textContent =
            user.university;
    }


    const profileDepartment =
        getElement("profileDepartment");


    if (profileDepartment) {

        profileDepartment.textContent =
            user.department;
    }


    const profileLevel =
        getElement("profileLevel");


    if (profileLevel) {

        profileLevel.textContent =
            user.level;
    }


    const profileSemester =
        getElement("profileSemester");


    if (profileSemester) {

        profileSemester.textContent =
            user.semester;
    }
}


/* =========================================================
   QUICK NAVIGATION
========================================================= */

function openCourses() {

    scrollToSection(
        "coursesSection"
    );
}


function openAssignments() {

    scrollToSection(
        "assignmentsSection"
    );
}


function openTimetable() {

    scrollToSection(
        "timetableSection"
    );
}


function openGoals() {

    scrollToSection(
        "goalsSection"
    );
}


function openExpenses() {

    scrollToSection(
        "expensesSection"
    );
}


function openStudyTimer() {

    scrollToSection(
        "studyTimerSection"
    );
}


function openProfile() {

    scrollToSection(
        "profileSection"
    );
}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        populateRegistrationOptions();

        populateAssignmentCourses();

        populateTimetableCourses();

        initializeStudyTimer();


        const currentUser =
            getCurrentUser();


        if (currentUser) {

            showDashboard();

        } else {

            showLanding();
        }
    }
);