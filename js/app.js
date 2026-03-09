/* ================= DAY DATA ================= */

const dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];

/* ================= WORKOUT DATA ================= */

const workouts = {
    1: {
        name: "Strength A 💪",
        exercises: [
            {
                title: "Squats",
                guide: "Stand shoulder-width. Push hips back. Keep chest up.",
                video: "https://www.youtube.com/embed/aclHkVaku9U"
            },
            {
                title: "Pushups",
                guide: "Body straight. Lower chest. Push up strong.",
                video: "https://www.youtube.com/embed/IODxDxX7oi4"
            },
            {
                title: "Reverse Lunges",
                guide: "Step back. Lower knee. Push through front heel.",
                video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
            },
            {
                title: "Plank",
                guide: "Elbows under shoulders. Keep core tight.",
                video: "https://www.youtube.com/embed/pSHjTRCQxIw"
            }
        ]
    },

    2: {
        name: "HIIT 🔥",
        exercises: [
            {
                title: "High Knees",
                guide: "Run in place. Lift knees high.",
                video: "https://www.youtube.com/embed/OAJ_J3EZkdY"
            },
            {
                title: "Jump Squats",
                guide: "Squat then explode upward.",
                video: "https://www.youtube.com/embed/U4s4mEQ5VqU"
            },
            {
                title: "Mountain Climbers",
                guide: "Plank position. Drive knees fast.",
                video: "https://www.youtube.com/embed/nmwgirgXLYM"
            }
        ]
    }
};

/* ================= LOAD TODAY ================= */

const todayIndex = new Date().getDay();

// fallback if today not defined
const todayWorkout = workouts[todayIndex] || workouts[1];

let currentExerciseIndex = 0;

/* Show Day Name */
if (document.getElementById("todayName")) {
    document.getElementById("todayName").innerText =
        dayNames[todayIndex];
}

/* Show Workout Name */
if (document.getElementById("todayWorkout")) {
    document.getElementById("todayWorkout").innerText =
        todayWorkout.name;
}

/* ================= STEP LOGIC ================= */

function loadExercise() {
    const exercise = todayWorkout.exercises[currentExerciseIndex];

    if (!exercise) return;

    if (document.getElementById("exerciseTitle")) {
        document.getElementById("exerciseTitle").innerText =
            exercise.title;
    }

    if (document.getElementById("exerciseGuide")) {
        document.getElementById("exerciseGuide").innerText =
            exercise.guide;
    }

    if (document.getElementById("exerciseVideo")) {
        document.getElementById("exerciseVideo").src =
            exercise.video;
    }
}

function nextExercise() {
    currentExerciseIndex++;

    if (currentExerciseIndex >= todayWorkout.exercises.length) {
        alert("Workout Completed! 🔥 Great Job!");
        currentExerciseIndex = 0;
    }

    loadExercise();
}

/* Load First Exercise */
if (document.getElementById("exerciseTitle")) {
    loadExercise();
}

/* ================= STREAK ================= */

let streak = localStorage.getItem("streak") || 0;

if (document.getElementById("streakCount")) {
    document.getElementById("streakCount").innerText =
        streak + " Days";
}

function completeWorkout() {
    streak++;
    localStorage.setItem("streak", streak);
    alert("Workout Completed! 🔥");
}

/* ================= WEIGHT ================= */

function saveWeight() {
    const weight = document.getElementById("weightInput").value;
    localStorage.setItem("weight", weight);
    alert("Weight Saved!");
}

if (document.getElementById("currentWeight")) {
    const weight = localStorage.getItem("weight") || "Not Set";
    document.getElementById("currentWeight").innerText =
        weight + " kg";
}

/* ================= DIET ================= */

function saveDiet() {
    const protein = document.getElementById("proteinInput").value;
    const water = document.getElementById("waterInput").value;

    localStorage.setItem("protein", protein);
    localStorage.setItem("water", water);

    alert("Diet Saved!");
}

/* ================= ACTIVE TAB ================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});
