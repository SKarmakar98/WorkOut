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
                reps: "15 reps × 4 sets",
                guide: "Stand shoulder-width apart. Push hips back and down.",
                video: "https://www.youtube.com/embed/aclHkVaku9U"
            },
            {
                title: "Pushups",
                reps: "12–15 reps × 4 sets",
                guide: "Keep body straight and lower chest to floor.",
                video: "https://www.youtube.com/embed/IODxDxX7oi4"
            },
            {
                title: "Reverse Lunges",
                reps: "12 each leg × 3 sets",
                guide: "Step backward and lower knee toward floor.",
                video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
            },
            {
                title: "Plank",
                reps: "40 sec × 3 sets",
                guide: "Keep body straight and core tight.",
                video: "https://www.youtube.com/embed/pSHjTRCQxIw"
            }
        ]
    },

    2: {
        name: "HIIT 🔥",
        exercises: [
            {
                title: "High Knees",
                reps: "40 sec",
                guide: "Run in place lifting knees high.",
                video: "https://www.youtube.com/embed/OAJ_J3EZkdY"
            },
            {
                title: "Jump Squats",
                reps: "40 sec",
                guide: "Squat then explode upward.",
                video: "https://www.youtube.com/embed/U4s4mEQ5VqU"
            },
            {
                title: "Mountain Climbers",
                reps: "40 sec",
                guide: "Plank position and drive knees quickly.",
                video: "https://www.youtube.com/embed/nmwgirgXLYM"
            }
        ]
    }
};

/* ================= LOAD TODAY ================= */

const todayIndex = new Date().getDay();
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

/* ================= LOAD EXERCISE ================= */

function loadExercise() {

    const exercise = todayWorkout.exercises[currentExerciseIndex];
    if (!exercise) return;

    if (document.getElementById("exerciseTitle")) {
        document.getElementById("exerciseTitle").innerText =
            exercise.title;
    }

    if (document.getElementById("exerciseReps")) {
        document.getElementById("exerciseReps").innerText =
            exercise.reps;
    }

    if (document.getElementById("exerciseGuide")) {
        document.getElementById("exerciseGuide").innerText =
            exercise.guide;
    }

    if (document.getElementById("exerciseVideo")) {
        document.getElementById("exerciseVideo").src =
            exercise.video;
    }

    /* progress indicator */
    if (document.getElementById("exerciseProgress")) {
        document.getElementById("exerciseProgress").innerText =
            (currentExerciseIndex + 1) +
            " / " +
            todayWorkout.exercises.length;
    }

}

/* ================= NEXT EXERCISE ================= */

function nextExercise() {

    currentExerciseIndex++;

    if (currentExerciseIndex >= todayWorkout.exercises.length) {

        alert("🔥 Workout Completed! Great Job!");

        currentExerciseIndex = 0;
        return;
    }

    loadExercise();
}

/* first load */

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
    alert("Workout logged!");
}

/* ================= WEIGHT ================= */

function saveWeight() {

    const weight =
        document.getElementById("weightInput").value;

    localStorage.setItem("weight", weight);

    alert("Weight saved!");
}

if (document.getElementById("currentWeight")) {

    const weight =
        localStorage.getItem("weight") || "Not Set";

    document.getElementById("currentWeight").innerText =
        weight + " kg";
}

/* ================= ACTIVE TAB ================= */

const currentPage =
    window.location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a")
    .forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
