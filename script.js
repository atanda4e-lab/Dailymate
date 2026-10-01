/* =========================================================
   DAILYMate | STUDENT PRODUCTIVITY
   FIREBASE VERSION
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    get,
    push,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBRd4HQqZiZzB6N7_QIOGSacQysnLI9dwE",
    authDomain: "dailymate-a83cb.firebaseapp.com",
    databaseURL: "https://dailymate-a83cb-default-rtdb.firebaseio.com",
    projectId: "dailymate-a83cb",
    storageBucket: "dailymate-a83cb.firebasestorage.app",
    messagingSenderId: "45281015541",
    appId: "1:45281015541:web:acecf5c9d35ee8c0acb7bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


/* =========================================================
   HELPERS
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function escapeHTML(value) {
    if (value === null || value === undefined) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showMessage(elementId, message, type = "error") {
    const element = getElement(elementId);

    if (!element) return;

    element.textContent = message;
    element.className = `message ${type}`;

    setTimeout(() => {
        if (element) {
            element.textContent = "";
            element.className = "message";
        }
    }, 4000);
}

function getCurrentUser() {
    return auth.currentUser;
}

function userPath(collection = "") {
    const user = auth.currentUser;

    if (!user) return null;

    return collection
        ? `users/${user.uid}/${collection}`
        : `users/${user.uid}`;
}


/* =========================================================
   UNIVERSITIES
   ========================================================= */

const universities = [
    "Abubakar Tafawa Balewa University",
    "Ahmadu Bello University",
    "Bayero University Kano",
    "University of Abuja",
    "University of Benin",
    "University of Calabar",
    "University of Ibadan",
    "University of Ilorin",
    "University of Jos",
    "University of Lagos",
    "University of Maiduguri",
    "University of Nigeria Nsukka",
    "University of Port Harcourt",
    "University of Uyo",
    "Obafemi Awolowo University",
    "Lagos State University",
    "Olabisi Onabanjo University",
    "Ladoke Akintola University of Technology",
    "Osun State University",
    "Kwara State University",
    "Ekiti State University",
    "Adekunle Ajasin University",
    "Nnamdi Azikiwe University",
    "Federal University Oye-Ekiti",
    "Federal University of Agriculture Abeokuta",
    "Federal University of Technology Akure",
    "Federal University of Technology Minna",
    "Federal University of Technology Owerri",
    "Federal University of Agriculture Makurdi",
    "Federal University Dutse",
    "Federal University Gashua",
    "Federal University Gusau",
    "Federal University Kashere",
    "Federal University Lafia",
    "Federal University Lokoja",
    "Federal University Birnin Kebbi",
    "Federal University Wukari",
    "Federal University Dutsin-Ma",
    "University of Maiduguri",
    "University of Ilesa",
    "Al-Hikmah University",
    "Babcock University",
    "Bowen University",
    "Covenant University",
    "Landmark University",
    "Redeemer's University",
    "American University of Nigeria",
    "Pan-Atlantic University",
    "Afe Babalola University",
    "Fountain University",
    "Kwara State Polytechnic",
    "Federal Polytechnic Offa",
    "The Polytechnic Ibadan",
    "Yaba College of Technology"
];


/* =========================================================
   DEPARTMENTS
   ========================================================= */

const departments = [
    "Accounting",
    "Actuarial Science",
    "Agricultural Economics",
    "Agricultural Engineering",
    "Agriculture",
    "Anatomy",
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
    "Civil Engineering",
    "Computer Engineering",
    "Computer Science",
    "Computer Science Education",
    "Cyber Security",
    "Data Science",
    "Dentistry",
    "Economics",
    "Education",
    "Electrical Engineering",
    "Electrical/Electronics Engineering",
    "Electronic Engineering",
    "English Language",
    "Estate Management",
    "Environmental Health",
    "Estate Surveying",
    "Fine Arts",
    "Fisheries",
    "Food Science and Technology",
    "Forestry",
    "Geography",
    "Geology",
    "Guidance and Counselling",
    "Health Education",
    "History",
    "Hospitality Management",
    "Human Anatomy",
    "Human Kinetics",
    "Industrial Chemistry",
    "Industrial Design",
    "Industrial Engineering",
    "Information Science",
    "Information Technology",
    "Insurance",
    "International Relations",
    "Law",
    "Library and Information Science",
    "Linguistics",
    "Management",
    "Marketing",
    "Mass Communication",
    "Mathematics",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Medical Laboratory Science",
    "Medicine and Surgery",
    "Microbiology",
    "Nursing",
    "Nutrition and Dietetics",
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
    "Software Engineering",
    "Sociology",
    "Statistics",
    "Surveying and Geoinformatics",
    "Teacher Education",
    "Telecommunication Engineering",
    "Theatre Arts",
    "Urban and Regional Planning",
    "Veterinary Medicine",
    "Zoology"
];


/* =========================================================
   REGISTRATION SELECTS
   ========================================================= */

function convertToSelect(id, options, placeholder) {
    const oldElement = getElement(id);

    if (!oldElement) return;

    if (oldElement.tagName.toLowerCase() === "select") {
        return;
    }

    const select = document.createElement("select");

    select.id = oldElement.id;
    select.name = oldElement.name || oldElement.id;
    select.required = oldElement.required;

    const placeholderOption = document.createElement("option");

    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    select.appendChild(placeholderOption);

    options.forEach(option => {
        const optionElement = document.createElement("option");

        optionElement.value = option;
        optionElement.textContent = option;

        select.appendChild(optionElement);
    });

    oldElement.replaceWith(select);
}


function populateRegistrationOptions() {
    convertToSelect(
        "university",
        universities,
        "Select your university"
    );

    convertToSelect(
        "department",
        departments,
        "Select your department"
    );
}


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

    pages.forEach(id => {
        const page = getElement(id);

        if (page) {
            page.style.display = "none";
        }
    });
}


function showLanding() {
    hideAllPages();

    const page = getElement("landingPage");

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo(0, 0);
}


function showLogin() {
    hideAllPages();

    const page = getElement("loginPage");

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo(0, 0);
}


function showRegister() {
    hideAllPages();

    const page = getElement("registerPage");

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

    window.scrollTo(0, 0);

    loadDashboard();
}


function showDashboardSection(sectionId) {
    showDashboard();

    setTimeout(() => {
        const section = getElement(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, 200);
}


function scrollToSection(sectionId) {
    const section = getElement(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* =========================================================
   FIREBASE DATABASE HELPERS
   ========================================================= */

async function getCollection(collectionName) {
    const path = userPath(collectionName);

    if (!path) return [];

    try {
        const snapshot = await get(ref(database, path));

        if (!snapshot.exists()) {
            return [];
        }

        const data = snapshot.val();

        return Object.entries(data).map(([id, item]) => ({
            id,
            ...item
        }));

    } catch (error) {
        console.error(`Error loading ${collectionName}:`, error);
        return [];
    }
}


async function addCollectionItem(collectionName, data) {
    const path = userPath(collectionName);

    if (!path) {
        throw new Error("No authenticated user.");
    }

    const collectionRef = ref(database, path);
    const newItemRef = push(collectionRef);

    await set(newItemRef, data);

    return newItemRef.key;
}


async function updateCollectionItem(collectionName, id, data) {
    const path = userPath(`${collectionName}/${id}`);

    if (!path) {
        throw new Error("No authenticated user.");
    }

    await update(ref(database, path), data);
}


async function deleteCollectionItem(collectionName, id) {
    const path = userPath(`${collectionName}/${id}`);

    if (!path) {
        throw new Error("No authenticated user.");
    }

    await remove(ref(database, path));
}


/* =========================================================
   AUTHENTICATION
   ========================================================= */

async function registerUser(event) {
    event.preventDefault();

    const fullName = getElement("fullName")?.value.trim();
    const email = getElement("registerEmail")?.value.trim();
    const password = getElement("registerPassword")?.value;
    const university = getElement("university")?.value;
    const department = getElement("department")?.value;
    const level = getElement("level")?.value;
    const semester = getElement("semester")?.value;

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
            "Please complete all fields.",
            "error"
        );

        return;
    }

    if (password.length < 6) {
        showMessage(
            "registerMessage",
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }

    try {
        showMessage(
            "registerMessage",
            "Creating your DailyMate account...",
            "success"
        );

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await updateProfile(user, {
            displayName: fullName
        });

        const profileData = {
            fullName,
            email,
            university,
            department,
            level,
            semester,
            createdAt: Date.now()
        };

        await set(
            ref(database, `users/${user.uid}/profile`),
            profileData
        );

        await set(
            ref(database, `users/${user.uid}/createdAt`),
            Date.now()
        );

        showDashboard();

    } catch (error) {
        console.error(error);

        let message = "Registration failed.";

        if (error.code === "auth/email-already-in-use") {
            message = "This email already has a DailyMate account.";
        }

        if (error.code === "auth/invalid-email") {
            message = "Please enter a valid email address.";
        }

        if (error.code === "auth/weak-password") {
            message = "Password is too weak.";
        }

        if (error.code === "auth/operation-not-allowed") {
            message =
                "Email/password authentication is not enabled in Firebase.";
        }

        showMessage(
            "registerMessage",
            message,
            "error"
        );
    }
}


async function loginUser(event) {
    event.preventDefault();

    const email = getElement("loginEmail")?.value.trim();
    const password = getElement("loginPassword")?.value;

    if (!email || !password) {
        showMessage(
            "loginMessage",
            "Please enter your email and password.",
            "error"
        );

        return;
    }

    try {
        showMessage(
            "loginMessage",
            "Signing you in...",
            "success"
        );

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        showDashboard();

    } catch (error) {
        console.error(error);

        let message = "Login failed.";

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            message = "Incorrect email or password.";
        }

        if (error.code === "auth/invalid-email") {
            message = "Please enter a valid email address.";
        }

        showMessage(
            "loginMessage",
            message,
            "error"
        );
    }
}


async function logoutUser() {
    try {
        await signOut(auth);

        showLanding();

        const loginForm = getElement("loginForm");

        if (loginForm) {
            loginForm.reset();
        }

    } catch (error) {
        console.error("Logout error:", error);
    }
}


/* =========================================================
   PROFILE
   ========================================================= */

async function getUserProfile() {
    const user = auth.currentUser;

    if (!user) return null;

    try {
        const snapshot = await get(
            ref(database, `users/${user.uid}/profile`)
        );

        if (snapshot.exists()) {
            return snapshot.val();
        }

        return {
            fullName: user.displayName || "Student",
            email: user.email || ""
        };

    } catch (error) {
        console.error("Profile error:", error);

        return {
            fullName: user.displayName || "Student",
            email: user.email || ""
        };
    }
}


async function loadProfile() {
    const user = auth.currentUser;

    if (!user) return;

    const profile = await getUserProfile();

    if (!profile) return;

    const name =
        profile.fullName ||
        user.displayName ||
        "Student";

    const email =
        profile.email ||
        user.email ||
        "";

    const elements = {
        dashboardUserName: name,
        welcomeName: name,
        profileFullName: name,
        profileEmail: email,
        profileUniversity: profile.university || "Not provided",
        profileDepartment: profile.department || "Not provided",
        profileLevel: profile.level || "Not provided",
        profileSemester: profile.semester || "Not provided"
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }
    });

    const avatarLetter = name.charAt(0).toUpperCase();

    const avatarIds = [
        "dashboardAvatar",
        "profileAvatar"
    ];

    avatarIds.forEach(id => {
        const element = getElement(id);

        if (element) {
            element.textContent = avatarLetter;
        }
    });
}


/* =========================================================
   COURSE MANAGER
   ========================================================= */

let editingCourseId = null;


async function getCourses() {
    return await getCollection("courses");
}


async function openCourseForm() {
    editingCourseId = null;

    const formCard = getElement("courseFormCard");
    const form = getElement("courseForm");

    if (formCard) {
        formCard.style.display = "block";
    }

    if (form) {
        form.reset();
    }

    const message = getElement("courseMessage");

    if (message) {
        message.textContent = "";
    }
}


function closeCourseForm() {
    const formCard = getElement("courseFormCard");

    if (formCard) {
        formCard.style.display = "none";
    }

    editingCourseId = null;
}


async function submitCourse(event) {
    event.preventDefault();

    const code = getElement("courseCode")?.value.trim();
    const title = getElement("courseTitle")?.value.trim();
    const unit = getElement("courseUnit")?.value;
    const semester = getElement("courseSemester")?.value;

    if (!code || !title || !unit || !semester) {
        showMessage(
            "courseMessage",
            "Please complete all course fields.",
            "error"
        );

        return;
    }

    try {
        const data = {
            code,
            title,
            unit: Number(unit),
            semester,
            updatedAt: Date.now()
        };

        if (editingCourseId) {

            await updateCollectionItem(
                "courses",
                editingCourseId,
                data
            );

        } else {

            await addCollectionItem(
                "courses",
                {
                    ...data,
                    createdAt: Date.now()
                }
            );
        }

        showMessage(
            "courseMessage",
            "Course saved successfully.",
            "success"
        );

        closeCourseForm();

        await loadCourses();

    } catch (error) {
        console.error(error);

        showMessage(
            "courseMessage",
            "Could not save course.",
            "error"
        );
    }
}


async function loadCourses() {
    const courses = await getCourses();

    const list = getElement("courseList");

    if (list) {
        list.innerHTML = "";

        if (courses.length === 0) {
            list.innerHTML =
                `<p class="empty-state">No courses added yet.</p>`;
        } else {

            courses.forEach(course => {

                const item = document.createElement("div");

                item.className = "data-card";

                item.innerHTML = `
                    <div>
                        <strong>${escapeHTML(course.code)}</strong>
                        <h3>${escapeHTML(course.title)}</h3>
                        <p>${escapeHTML(course.unit)} Unit(s)</p>
                        <small>${escapeHTML(course.semester)}</small>
                    </div>

                    <div class="card-actions">
                        <button onclick="editCourse('${course.id}')">
                            Edit
                        </button>

                        <button onclick="deleteCourse('${course.id}')">
                            Delete
                        </button>
                    </div>
                `;

                list.appendChild(item);
            });
        }
    }

    const totalUnits = courses.reduce(
        (total, course) =>
            total + Number(course.unit || 0),
        0
    );

    const values = {
        courseCount: courses.length,
        totalCourses: courses.length,
        totalUnits,
        courseListCount: courses.length
    };

    Object.entries(values).forEach(([id, value]) => {
        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }
    });

    await populateAssignmentCourses(courses);
    await populateTimetableCourses(courses);
}


async function editCourse(id) {
    const courses = await getCourses();

    const course = courses.find(item => item.id === id);

    if (!course) return;

    editingCourseId = id;

    await openCourseForm();

    getElement("courseCode").value = course.code || "";
    getElement("courseTitle").value = course.title || "";
    getElement("courseUnit").value = course.unit || "";
    getElement("courseSemester").value = course.semester || "";
}


async function deleteCourse(id) {
    if (!confirm("Delete this course?")) return;

    try {
        await deleteCollectionItem("courses", id);

        await loadCourses();

    } catch (error) {
        console.error(error);
        alert("Could not delete course.");
    }
}


/* =========================================================
   ASSIGNMENTS
   ========================================================= */

let editingAssignmentId = null;


async function getAssignments() {
    return await getCollection("assignments");
}


async function openAssignmentForm() {
    editingAssignmentId = null;

    const card = getElement("assignmentFormCard");
    const form = getElement("assignmentForm");

    if (card) {
        card.style.display = "block";
    }

    if (form) {
        form.reset();
    }

    await populateAssignmentCourses();
}


function closeAssignmentForm() {
    const card = getElement("assignmentFormCard");

    if (card) {
        card.style.display = "none";
    }

    editingAssignmentId = null;
}


async function populateAssignmentCourses(courses = null) {
    const select = getElement("assignmentCourse");

    if (!select) return;

    if (!courses) {
        courses = await getCourses();
    }

    const currentValue = select.value;

    select.innerHTML =
        `<option value="">Select Course</option>`;

    courses.forEach(course => {
        const option = document.createElement("option");

        option.value = course.id;

        option.textContent =
            `${course.code} - ${course.title}`;

        select.appendChild(option);
    });

    if (currentValue) {
        select.value = currentValue;
    }
}


async function submitAssignment(event) {
    event.preventDefault();

    const title = getElement("assignmentTitle")?.value.trim();
    const courseId = getElement("assignmentCourse")?.value;
    const dueDate = getElement("assignmentDueDate")?.value;
    const priority = getElement("assignmentPriority")?.value;
    const description =
        getElement("assignmentDescription")?.value.trim();

    if (!title || !courseId || !dueDate || !priority) {
        showMessage(
            "assignmentMessage",
            "Please complete the required fields.",
            "error"
        );

        return;
    }

    try {
        const data = {
            title,
            courseId,
            dueDate,
            priority,
            description,
            updatedAt: Date.now()
        };

        if (editingAssignmentId) {

            await updateCollectionItem(
                "assignments",
                editingAssignmentId,
                data
            );

        } else {

            await addCollectionItem(
                "assignments",
                {
                    ...data,
                    completed: false,
                    createdAt: Date.now()
                }
            );
        }

        closeAssignmentForm();

        await loadAssignments();

    } catch (error) {
        console.error(error);

        showMessage(
            "assignmentMessage",
            "Could not save assignment.",
            "error"
        );
    }
}


function formatAssignmentDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


async function loadAssignments() {
    const assignments = await getAssignments();
    const courses = await getCourses();

    const list = getElement("assignmentList");

    const courseMap = {};

    courses.forEach(course => {
        courseMap[course.id] = course;
    });

    let pending = 0;
    let completed = 0;
    let overdue = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (list) {

        list.innerHTML = "";

        if (assignments.length === 0) {

            list.innerHTML =
                `<p class="empty-state">No assignments added yet.</p>`;

        } else {

            assignments
                .sort((a, b) =>
                    String(a.dueDate)
                        .localeCompare(String(b.dueDate))
                )
                .forEach(assignment => {

                    const course =
                        courseMap[assignment.courseId];

                    const dueDate =
                        new Date(
                            `${assignment.dueDate}T00:00:00`
                        );

                    if (assignment.completed) {
                        completed++;
                    } else {
                        pending++;

                        if (dueDate < today) {
                            overdue++;
                        }
                    }

                    const item =
                        document.createElement("div");

                    item.className =
                        `data-card ${
                            assignment.completed
                                ? "completed"
                                : ""
                        }`;

                    item.innerHTML = `
                        <div>
                            <h3>${escapeHTML(assignment.title)}</h3>

                            <p>
                                ${
                                    course
                                        ? escapeHTML(
                                            course.code +
                                            " - " +
                                            course.title
                                        )
                                        : "Course"
                                }
                            </p>

                            <p>
                                Due:
                                ${formatAssignmentDate(
                                    assignment.dueDate
                                )}
                            </p>

                            <small>
                                Priority:
                                ${escapeHTML(
                                    assignment.priority
                                )}
                            </small>

                            ${
                                assignment.description
                                    ? `<p>${escapeHTML(
                                        assignment.description
                                      )}</p>`
                                    : ""
                            }
                        </div>

                        <div class="card-actions">

                            <button onclick="toggleAssignmentComplete('${assignment.id}')">
                                ${
                                    assignment.completed
                                        ? "Undo"
                                        : "Complete"
                                }
                            </button>

                            <button onclick="editAssignment('${assignment.id}')">
                                Edit
                            </button>

                            <button onclick="deleteAssignment('${assignment.id}')">
                                Delete
                            </button>

                        </div>
                    `;

                    list.appendChild(item);
                });
        }
    }

    const values = {
        assignmentCount: assignments.length,
        totalAssignments: assignments.length,
        pendingAssignments: pending,
        completedAssignments: completed,
        overdueAssignments: overdue,
        assignmentListCount: assignments.length
    };

    Object.entries(values).forEach(([id, value]) => {

        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }

    });
}


async function toggleAssignmentComplete(id) {

    try {

        const assignments = await getAssignments();

        const assignment =
            assignments.find(item => item.id === id);

        if (!assignment) return;

        await updateCollectionItem(
            "assignments",
            id,
            {
                completed: !assignment.completed,
                updatedAt: Date.now()
            }
        );

        await loadAssignments();

    } catch (error) {
        console.error(error);
    }
}


async function editAssignment(id) {

    const assignments = await getAssignments();

    const assignment =
        assignments.find(item => item.id === id);

    if (!assignment) return;

    editingAssignmentId = id;

    await openAssignmentForm();

    getElement("assignmentTitle").value =
        assignment.title || "";

    getElement("assignmentCourse").value =
        assignment.courseId || "";

    getElement("assignmentDueDate").value =
        assignment.dueDate || "";

    getElement("assignmentPriority").value =
        assignment.priority || "";

    getElement("assignmentDescription").value =
        assignment.description || "";
}


async function deleteAssignment(id) {

    if (!confirm("Delete this assignment?")) return;

    try {

        await deleteCollectionItem(
            "assignments",
            id
        );

        await loadAssignments();

    } catch (error) {

        console.error(error);

        alert("Could not delete assignment.");
    }
}


/* =========================================================
   TIMETABLE
   ========================================================= */

let editingTimetableId = null;

const DAY_ORDER = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
};


async function getTimetable() {
    return await getCollection("timetable");
}


async function openTimetableForm() {

    editingTimetableId = null;

    const card = getElement("timetableFormCard");
    const form = getElement("timetableForm");

    if (card) {
        card.style.display = "block";
    }

    if (form) {
        form.reset();
    }

    await populateTimetableCourses();
}


function closeTimetableForm() {

    const card = getElement("timetableFormCard");

    if (card) {
        card.style.display = "none";
    }

    editingTimetableId = null;
}


async function populateTimetableCourses(courses = null) {

    const select = getElement("timetableCourse");

    if (!select) return;

    if (!courses) {
        courses = await getCourses();
    }

    const currentValue = select.value;

    select.innerHTML =
        `<option value="">Select Course</option>`;

    courses.forEach(course => {

        const option =
            document.createElement("option");

        option.value = course.id;

        option.textContent =
            `${course.code} - ${course.title}`;

        select.appendChild(option);
    });

    if (currentValue) {
        select.value = currentValue;
    }
}


async function submitTimetable(event) {

    event.preventDefault();

    const day = getElement("timetableDay")?.value;
    const courseId = getElement("timetableCourse")?.value;
    const start = getElement("timetableStart")?.value;
    const end = getElement("timetableEnd")?.value;
    const venue = getElement("timetableVenue")?.value.trim();
    const lecturer =
        getElement("timetableLecturer")?.value.trim();

    if (!day || !courseId || !start || !end) {

        showMessage(
            "timetableMessage",
            "Please complete the required fields.",
            "error"
        );

        return;
    }

    try {

        const data = {
            day,
            courseId,
            start,
            end,
            venue,
            lecturer,
            updatedAt: Date.now()
        };

        if (editingTimetableId) {

            await updateCollectionItem(
                "timetable",
                editingTimetableId,
                data
            );

        } else {

            await addCollectionItem(
                "timetable",
                {
                    ...data,
                    createdAt: Date.now()
                }
            );
        }

        closeTimetableForm();

        await loadTimetable();

    } catch (error) {

        console.error(error);

        showMessage(
            "timetableMessage",
            "Could not save timetable.",
            "error"
        );
    }
}


async function loadTimetable() {

    const timetable = await getTimetable();
    const courses = await getCourses();

    const courseMap = {};

    courses.forEach(course => {
        courseMap[course.id] = course;
    });

    timetable.sort((a, b) => {

        const dayDifference =
            (DAY_ORDER[a.day] || 99) -
            (DAY_ORDER[b.day] || 99);

        if (dayDifference !== 0) {
            return dayDifference;
        }

        return String(a.start)
            .localeCompare(String(b.start));
    });

    const list = getElement("timetableList");

    if (list) {

        list.innerHTML = "";

        if (timetable.length === 0) {

            list.innerHTML =
                `<p class="empty-state">No timetable entries yet.</p>`;

        } else {

            timetable.forEach(item => {

                const course =
                    courseMap[item.courseId];

                const element =
                    document.createElement("div");

                element.className = "data-card";

                element.innerHTML = `

                    <div>

                        <small>
                            ${escapeHTML(item.day)}
                        </small>

                        <h3>
                            ${
                                course
                                    ? escapeHTML(course.code)
                                    : "Course"
                            }
                        </h3>

                        <p>
                            ${
                                course
                                    ? escapeHTML(course.title)
                                    : ""
                            }
                        </p>

                        <p>
                            ${escapeHTML(item.start)}
                            -
                            ${escapeHTML(item.end)}
                        </p>

                        ${
                            item.venue
                                ? `<p>Venue: ${escapeHTML(item.venue)}</p>`
                                : ""
                        }

                        ${
                            item.lecturer
                                ? `<p>Lecturer: ${escapeHTML(item.lecturer)}</p>`
                                : ""
                        }

                    </div>

                    <div class="card-actions">

                        <button onclick="editTimetable('${item.id}')">
                            Edit
                        </button>

                        <button onclick="deleteTimetable('${item.id}')">
                            Delete
                        </button>

                    </div>
                `;

                list.appendChild(element);
            });
        }
    }

    const counter =
        getElement("timetableListCount");

    if (counter) {
        counter.textContent = timetable.length;
    }
}


async function editTimetable(id) {

    const timetable = await getTimetable();

    const item =
        timetable.find(entry => entry.id === id);

    if (!item) return;

    editingTimetableId = id;

    await openTimetableForm();

    getElement("timetableDay").value =
        item.day || "";

    getElement("timetableCourse").value =
        item.courseId || "";

    getElement("timetableStart").value =
        item.start || "";

    getElement("timetableEnd").value =
        item.end || "";

    getElement("timetableVenue").value =
        item.venue || "";

    getElement("timetableLecturer").value =
        item.lecturer || "";
}


async function deleteTimetable(id) {

    if (!confirm("Delete this timetable entry?")) return;

    try {

        await deleteCollectionItem(
            "timetable",
            id
        );

        await loadTimetable();

    } catch (error) {

        console.error(error);

        alert("Could not delete timetable entry.");
    }
}


/* =========================================================
   GOALS
   ========================================================= */

let editingGoalId = null;


async function getGoals() {
    return await getCollection("goals");
}


async function openGoalForm() {

    editingGoalId = null;

    const card = getElement("goalFormCard");
    const form = getElement("goalForm");

    if (card) {
        card.style.display = "block";
    }

    if (form) {
        form.reset();
    }
}


function closeGoalForm() {

    const card = getElement("goalFormCard");

    if (card) {
        card.style.display = "none";
    }

    editingGoalId = null;
}


async function submitGoal(event) {

    event.preventDefault();

    const title = getElement("goalTitle")?.value.trim();
    const category = getElement("goalCategory")?.value;
    const targetDate =
        getElement("goalTargetDate")?.value;

    const progress =
        getElement("goalProgress")?.value;

    const description =
        getElement("goalDescription")?.value.trim();

    if (!title || !category || !targetDate) {

        showMessage(
            "goalMessage",
            "Please complete the required fields.",
            "error"
        );

        return;
    }

    try {

        const numericProgress =
            Math.min(
                100,
                Math.max(
                    0,
                    Number(progress || 0)
                )
            );

        const data = {
            title,
            category,
            targetDate,
            progress: numericProgress,
            description,
            completed: numericProgress >= 100,
            updatedAt: Date.now()
        };

        if (editingGoalId) {

            await updateCollectionItem(
                "goals",
                editingGoalId,
                data
            );

        } else {

            await addCollectionItem(
                "goals",
                {
                    ...data,
                    createdAt: Date.now()
                }
            );
        }

        closeGoalForm();

        await loadGoals();

    } catch (error) {

        console.error(error);

        showMessage(
            "goalMessage",
            "Could not save goal.",
            "error"
        );
    }
}


async function loadGoals() {

    const goals = await getGoals();

    const list = getElement("goalList");

    let completed = 0;
    let totalProgress = 0;

    goals.forEach(goal => {

        const progress =
            Number(goal.progress || 0);

        totalProgress += progress;

        if (
            goal.completed ||
            progress >= 100
        ) {
            completed++;
        }
    });

    const active =
        goals.length - completed;

    const average =
        goals.length
            ? Math.round(totalProgress / goals.length)
            : 0;

    if (list) {

        list.innerHTML = "";

        if (goals.length === 0) {

            list.innerHTML =
                `<p class="empty-state">No goals added yet.</p>`;

        } else {

            goals.forEach(goal => {

                const progress =
                    Number(goal.progress || 0);

                const item =
                    document.createElement("div");

                item.className = "data-card";

                item.innerHTML = `

                    <div>

                        <h3>
                            ${escapeHTML(goal.title)}
                        </h3>

                        <p>
                            Category:
                            ${escapeHTML(goal.category)}
                        </p>

                        <p>
                            Target:
                            ${escapeHTML(goal.targetDate)}
                        </p>

                        <p>
                            Progress:
                            ${progress}%
                        </p>

                        <div class="progress-bar">
                            <div
                                class="progress-fill"
                                style="width:${progress}%"
                            ></div>
                        </div>

                        ${
                            goal.description
                                ? `<p>${escapeHTML(
                                    goal.description
                                  )}</p>`
                                : ""
                        }

                    </div>

                    <div class="card-actions">

                        <button onclick="editGoal('${goal.id}')">
                            Edit
                        </button>

                        <button onclick="deleteGoal('${goal.id}')">
                            Delete
                        </button>

                    </div>
                `;

                list.appendChild(item);
            });
        }
    }

    const values = {
        goalCount: goals.length,
        totalGoals: goals.length,
        activeGoals: active,
        completedGoals: completed,
        averageGoalProgress: `${average}%`,
        goalListCount: goals.length
    };

    Object.entries(values).forEach(([id, value]) => {

        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }

    });
}


async function editGoal(id) {

    const goals = await getGoals();

    const goal =
        goals.find(item => item.id === id);

    if (!goal) return;

    editingGoalId = id;

    await openGoalForm();

    getElement("goalTitle").value =
        goal.title || "";

    getElement("goalCategory").value =
        goal.category || "";

    getElement("goalTargetDate").value =
        goal.targetDate || "";

    getElement("goalProgress").value =
        goal.progress || 0;

    getElement("goalDescription").value =
        goal.description || "";
}


async function deleteGoal(id) {

    if (!confirm("Delete this goal?")) return;

    try {

        await deleteCollectionItem(
            "goals",
            id
        );

        await loadGoals();

    } catch (error) {

        console.error(error);

        alert("Could not delete goal.");
    }
}


/* =========================================================
   EXPENSE MANAGER
   ========================================================= */

let editingExpenseId = null;


async function getExpenses() {
    return await getCollection("expenses");
}


async function openExpenseForm() {

    editingExpenseId = null;

    const card = getElement("expenseFormCard");
    const form = getElement("expenseForm");

    if (card) {
        card.style.display = "block";
    }

    if (form) {
        form.reset();
    }
}


function closeExpenseForm() {

    const card = getElement("expenseFormCard");

    if (card) {
        card.style.display = "none";
    }

    editingExpenseId = null;
}


async function submitExpense(event) {

    event.preventDefault();

    const type = getElement("expenseType")?.value;
    const amount = getElement("expenseAmount")?.value;
    const category =
        getElement("expenseCategory")?.value;

    const date =
        getElement("expenseDate")?.value;

    const description =
        getElement("expenseDescription")?.value.trim();

    if (!type || !amount || !category || !date) {

        showMessage(
            "expenseMessage",
            "Please complete the required fields.",
            "error"
        );

        return;
    }

    try {

        const data = {
            type,
            amount: Number(amount),
            category,
            date,
            description,
            updatedAt: Date.now()
        };

        if (editingExpenseId) {

            await updateCollectionItem(
                "expenses",
                editingExpenseId,
                data
            );

        } else {

            await addCollectionItem(
                "expenses",
                {
                    ...data,
                    createdAt: Date.now()
                }
            );
        }

        closeExpenseForm();

        await loadExpenses();

    } catch (error) {

        console.error(error);

        showMessage(
            "expenseMessage",
            "Could not save transaction.",
            "error"
        );
    }
}


function formatMoney(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 2
        }
    ).format(Number(amount || 0));
}


function formatExpenseDate(dateString) {

    if (!dateString) return "";

    const date =
        new Date(`${dateString}T00:00:00`);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


async function loadExpenses() {

    const expenses = await getExpenses();

    const list = getElement("expenseList");

    let income = 0;
    let expense = 0;

    expenses.forEach(item => {

        const amount =
            Number(item.amount || 0);

        if (
            String(item.type).toLowerCase() ===
            "income"
        ) {
            income += amount;
        } else {
            expense += amount;
        }
    });

    const balance =
        income - expense;

    if (list) {

        list.innerHTML = "";

        if (expenses.length === 0) {

            list.innerHTML =
                `<p class="empty-state">No transactions added yet.</p>`;

        } else {

            expenses
                .sort((a, b) =>
                    String(b.date)
                        .localeCompare(String(a.date))
                )
                .forEach(item => {

                    const element =
                        document.createElement("div");

                    element.className = "data-card";

                    element.innerHTML = `

                        <div>

                            <h3>
                                ${formatMoney(item.amount)}
                            </h3>

                            <p>
                                ${escapeHTML(item.type)}
                            </p>

                            <p>
                                ${escapeHTML(item.category)}
                            </p>

                            <p>
                                ${formatExpenseDate(item.date)}
                            </p>

                            ${
                                item.description
                                    ? `<small>${escapeHTML(
                                        item.description
                                      )}</small>`
                                    : ""
                            }

                        </div>

                        <div class="card-actions">

                            <button onclick="editExpense('${item.id}')">
                                Edit
                            </button>

                            <button onclick="deleteExpense('${item.id}')">
                                Delete
                            </button>

                        </div>
                    `;

                    list.appendChild(element);
                });
        }
    }

    const values = {
        totalIncome: formatMoney(income),
        totalExpenses: formatMoney(expense),
        expenseBalance: formatMoney(balance),
        expenseTotal: formatMoney(expense),
        expenseListCount: expenses.length
    };

    Object.entries(values).forEach(([id, value]) => {

        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }

    });
}


async function editExpense(id) {

    const expenses = await getExpenses();

    const expense =
        expenses.find(item => item.id === id);

    if (!expense) return;

    editingExpenseId = id;

    await openExpenseForm();

    getElement("expenseType").value =
        expense.type || "";

    getElement("expenseAmount").value =
        expense.amount || "";

    getElement("expenseCategory").value =
        expense.category || "";

    getElement("expenseDate").value =
        expense.date || "";

    getElement("expenseDescription").value =
        expense.description || "";
}


async function deleteExpense(id) {

    if (!confirm("Delete this transaction?")) return;

    try {

        await deleteCollectionItem(
            "expenses",
            id
        );

        await loadExpenses();

    } catch (error) {

        console.error(error);

        alert("Could not delete transaction.");
    }
}


/* =========================================================
   STUDY TIMER
   ========================================================= */

let studyTimerInterval = null;
let studyTimerRunning = false;
let studyTimerMode = "focus";

let studyTimerSeconds = 25 * 60;
let studyTimerTotalSeconds = 25 * 60;


const TIMER_DURATIONS = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};


async function getStudySessions() {
    return await getCollection("studySessions");
}


function setTimerMode(mode) {

    if (!TIMER_DURATIONS[mode]) return;

    pauseStudyTimer();

    studyTimerMode = mode;

    studyTimerTotalSeconds =
        TIMER_DURATIONS[mode];

    studyTimerSeconds =
        TIMER_DURATIONS[mode];

    updateTimerModeUI();
    updateTimerDisplay();
}


function updateTimerModeUI() {

    const modeElement =
        getElement("timerMode");

    if (modeElement) {

        const names = {
            focus: "Focus",
            shortBreak: "Short Break",
            longBreak: "Long Break"
        };

        modeElement.textContent =
            names[studyTimerMode];
    }

    const buttons = {
        focusModeBtn:
            studyTimerMode === "focus",

        shortBreakModeBtn:
            studyTimerMode === "shortBreak",

        longBreakModeBtn:
            studyTimerMode === "longBreak"
    };

    Object.entries(buttons).forEach(([id, active]) => {

        const button = getElement(id);

        if (button) {
            button.classList.toggle(
                "active",
                active
            );
        }
    });
}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            studyTimerSeconds / 60
        );

    const seconds =
        studyTimerSeconds % 60;

    const minuteElement =
        getElement("timerMinutes");

    const secondElement =
        getElement("timerSeconds");

    if (minuteElement) {
        minuteElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondElement) {
        secondElement.textContent =
            String(seconds).padStart(2, "0");
    }

    const progressBar =
        getElement("timerProgressBar");

    if (progressBar) {

        const completed =
            studyTimerTotalSeconds -
            studyTimerSeconds;

        const percentage =
            studyTimerTotalSeconds
                ? (
                    completed /
                    studyTimerTotalSeconds
                  ) * 100
                : 0;

        progressBar.style.width =
            `${percentage}%`;
    }
}


function startStudyTimer() {

    if (studyTimerRunning) return;

    studyTimerRunning = true;

    const startButton =
        getElement("startTimerBtn");

    const pauseButton =
        getElement("pauseTimerBtn");

    if (startButton) {
        startButton.disabled = true;
    }

    if (pauseButton) {
        pauseButton.disabled = false;
    }

    studyTimerInterval =
        setInterval(async () => {

            if (studyTimerSeconds > 0) {

                studyTimerSeconds--;

                updateTimerDisplay();

            } else {

                await finishStudyTimer();
            }

        }, 1000);
}


function pauseStudyTimer() {

    studyTimerRunning = false;

    if (studyTimerInterval) {

        clearInterval(
            studyTimerInterval
        );

        studyTimerInterval = null;
    }

    const startButton =
        getElement("startTimerBtn");

    const pauseButton =
        getElement("pauseTimerBtn");

    if (startButton) {
        startButton.disabled = false;
    }

    if (pauseButton) {
        pauseButton.disabled = true;
    }
}


function resetStudyTimer() {

    pauseStudyTimer();

    studyTimerSeconds =
        TIMER_DURATIONS[studyTimerMode];

    studyTimerTotalSeconds =
        TIMER_DURATIONS[studyTimerMode];

    updateTimerDisplay();
}


async function finishStudyTimer() {

    pauseStudyTimer();

    if (studyTimerMode === "focus") {

        const minutes =
            Math.round(
                studyTimerTotalSeconds / 60
            );

        await saveCompletedStudySession(
            minutes
        );
    }

    const message =
        getElement("timerMessage");

    if (message) {

        message.textContent =
            "Timer completed!";

        setTimeout(() => {
            message.textContent = "";
        }, 4000);
    }

    resetStudyTimer();

    await loadStudyStatistics();
}


async function saveCompletedStudySession(minutes) {

    try {

        const date =
            new Date();

        const dateKey =
            date.toISOString()
                .split("T")[0];

        await addCollectionItem(
            "studySessions",
            {
                mode: studyTimerMode,
                durationMinutes: minutes,
                dateKey,
                completedAt: Date.now()
            }
        );

    } catch (error) {

        console.error(
            "Could not save study session:",
            error
        );
    }
}


async function loadStudyStatistics() {

    const sessions =
        await getStudySessions();

    let focusMinutes = 0;

    sessions.forEach(session => {

        if (session.mode === "focus") {

            focusMinutes +=
                Number(
                    session.durationMinutes || 0
                );
        }
    });

    const values = {
        completedStudySessions:
            sessions.length,

        totalFocusMinutes:
            focusMinutes,

        currentTimerMode:
            studyTimerMode === "focus"
                ? "Focus"
                : studyTimerMode === "shortBreak"
                    ? "Short Break"
                    : "Long Break"
    };

    Object.entries(values).forEach(([id, value]) => {

        const element =
            getElement(id);

        if (element) {
            element.textContent = value;
        }

    });
}


function requestTimerNotification() {

    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {
        Notification.requestPermission();
    }
}


function initializeStudyTimer() {

    studyTimerMode = "focus";

    studyTimerSeconds =
        TIMER_DURATIONS.focus;

    studyTimerTotalSeconds =
        TIMER_DURATIONS.focus;

    updateTimerModeUI();
    updateTimerDisplay();

    requestTimerNotification();
}


/* =========================================================
   DASHBOARD
   ========================================================= */

async function loadDashboard() {

    const user = auth.currentUser;

    if (!user) return;

    await loadProfile();

    await loadCourses();

    await loadAssignments();

    await loadTimetable();

    await loadGoals();

    await loadExpenses();

    await loadStudyStatistics();
}


/* =========================================================
   QUICK NAVIGATION
   ========================================================= */

function openCourses() {
    showDashboardSection("coursesSection");
}

function openAssignments() {
    showDashboardSection("assignmentsSection");
}

function openTimetable() {
    showDashboardSection("timetableSection");
}

function openGoals() {
    showDashboardSection("goalsSection");
}

function openExpenses() {
    showDashboardSection("expensesSection");
}

function openStudyTimer() {
    showDashboardSection("studyTimerSection");
}

function openProfile() {
    showDashboardSection("profileSection");
}


/* =========================================================
   AUTH STATE
   ========================================================= */

onAuthStateChanged(auth, async user => {

    if (user) {

        console.log(
            "Logged in Firebase user:",
            user.email
        );

        showDashboard();

    } else {

        console.log(
            "No Firebase user logged in."
        );

        showLanding();
    }
});


/* =========================================================
   FORM EVENT LISTENERS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateRegistrationOptions();

        const registerForm =
            getElement("registerForm");

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                registerUser
            );
        }

        const loginForm =
            getElement("loginForm");

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                loginUser
            );
        }

        const courseForm =
            getElement("courseForm");

        if (courseForm) {

            courseForm.addEventListener(
                "submit",
                submitCourse
            );
        }

        const assignmentForm =
            getElement("assignmentForm");

        if (assignmentForm) {

            assignmentForm.addEventListener(
                "submit",
                submitAssignment
            );
        }

        const timetableForm =
            getElement("timetableForm");

        if (timetableForm) {

            timetableForm.addEventListener(
                "submit",
                submitTimetable
            );
        }

        const goalForm =
            getElement("goalForm");

        if (goalForm) {

            goalForm.addEventListener(
                "submit",
                submitGoal
            );
        }

        const expenseForm =
            getElement("expenseForm");

        if (expenseForm) {

            expenseForm.addEventListener(
                "submit",
                submitExpense
            );
        }

        initializeStudyTimer();
    }
);


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML ONCLICK
   ========================================================= */

window.showLogin = showLogin;
window.showRegister = showRegister;
window.showLanding = showLanding;
window.showDashboard = showDashboard;

window.showDashboardSection =
    showDashboardSection;

window.scrollToSection =
    scrollToSection;

window.logoutUser =
    logoutUser;

window.openCourses =
    openCourses;

window.openAssignments =
    openAssignments;

window.openTimetable =
    openTimetable;

window.openGoals =
    openGoals;

window.openExpenses =
    openExpenses;

window.openStudyTimer =
    openStudyTimer;

window.openProfile =
    openProfile;


/* Courses */

window.openCourseForm =
    openCourseForm;

window.closeCourseForm =
    closeCourseForm;

window.editCourse =
    editCourse;

window.deleteCourse =
    deleteCourse;


/* Assignments */

window.openAssignmentForm =
    openAssignmentForm;

window.closeAssignmentForm =
    closeAssignmentForm;

window.editAssignment =
    editAssignment;

window.deleteAssignment =
    deleteAssignment;

window.toggleAssignmentComplete =
    toggleAssignmentComplete;


/* Timetable */

window.openTimetableForm =
    openTimetableForm;

window.closeTimetableForm =
    closeTimetableForm;

window.editTimetable =
    editTimetable;

window.deleteTimetable =
    deleteTimetable;


/* Goals */

window.openGoalForm =
    openGoalForm;

window.closeGoalForm =
    closeGoalForm;

window.editGoal =
    editGoal;

window.deleteGoal =
    deleteGoal;


/* Expenses */

window.openExpenseForm =
    openExpenseForm;

window.closeExpenseForm =
    closeExpenseForm;

window.editExpense =
    editExpense;

window.deleteExpense =
    deleteExpense;


/* Timer */

window.setTimerMode =
    setTimerMode;

window.startStudyTimer =
    startStudyTimer;

window.pauseStudyTimer =
    pauseStudyTimer;

window.resetStudyTimer =
    resetStudyTimer;