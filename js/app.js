/* ================= DAY DATA ================= */
const dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];

/* ================= WORKOUT DATA ================= */
// Reusing workouts for the rest of the week so every day has data
const workouts = {
    0: { name: "Rest Day 💤", exercises: [] }, // Sunday
    1: { // Monday
        name: "Strength A 💪",
        exercises: [
            { title: "Jumping Jacks (Warmup)", reps: "30 sec", duration: 30, guide: "Light warm-up to increase heart rate.", video: "https://www.youtube.com/embed/iSSAk4XCsRA" },
            { title: "Squats", reps: "15 reps × 4 sets", guide: "Stand shoulder-width apart. Push hips back and down.", video: "https://www.youtube.com/embed/xqvCmoLULNY" },
            { title: "Pushups", reps: "12–15 reps × 4 sets", guide: "Keep body straight and lower chest to floor.", video: "https://www.youtube.com/embed/VQKqjHtY8jA" },
            { title: "Reverse Lunges", reps: "12 each leg × 3 sets", guide: "Step backward and lower knee toward floor.", video: "https://www.youtube.com/embed/94AXT7D3bKY" },
            { title: "Plank", reps: "40 sec × 3 sets", duration: 40, guide: "Keep body straight and core tight.", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
            { title: "High Knees (Finisher)", reps: "40 sec × 3 rounds", duration: 40, guide: "Run in place lifting knees high.", video: "https://www.youtube.com/embed/Xh8JEoYjYhg" },
            { title: "Stomach Vacuum", reps: "1 min × 2", duration: 60, guide: "Pull stomach inward while breathing slowly.", video: "https://www.youtube.com/embed/V9cZUCFoShA" }
        ]
    },
    2: { // Tuesday
        name: "HIIT 🔥",
        exercises: [
            { title: "Jumping Jacks", reps: "40 sec", duration: 40, guide: "Warmup cardio movement.", video: "https://www.youtube.com/embed/iSSAk4XCsRA" },
            { title: "High Knees", reps: "40 sec × 4 rounds", duration: 40, guide: "Run in place lifting knees high.", video: "https://www.youtube.com/embed/Xh8JEoYjYhg" },
            { title: "Jump Squats", reps: "40 sec × 4 rounds", duration: 40, guide: "Squat then explode upward.", video: "https://www.youtube.com/embed/Azl5tkCzDcc" },
            { title: "Mountain Climbers", reps: "40 sec × 4 rounds", duration: 40, guide: "Drive knees toward chest quickly.", video: "https://www.youtube.com/embed/ckaRjXaLiiM" },
            { title: "Plank", reps: "45 sec × 3 sets", duration: 45, guide: "Hold body straight and tight.", video: "https://www.youtube.com/embed/pSHjTRCQxIw" }
        ]
    },
    3: { // Wednesday
        name: "Core + Mobility 🧘",
        exercises: [
            { title: "Jumping Jacks", reps: "30 sec", duration: 30, guide: "Light cardio to warm up the body.", video: "https://www.youtube.com/embed/iSSAk4XCsRA" },
            { title: "Glute Bridge", reps: "15 reps × 3 sets", guide: "Lift hips upward while squeezing glutes.", video: "https://www.youtube.com/embed/bpUudcsZQ8g" },
            { title: "Bird Dog", reps: "12 each side × 3 sets", guide: "Extend opposite arm and leg while keeping core stable.", video: "https://www.youtube.com/embed/wNnR2d7YpCk" },
            { title: "Side Plank", reps: "30 sec each side", duration: 30, guide: "Keep body straight and core tight.", video: "https://www.youtube.com/embed/K2VljzCC16g" },
            { title: "Mountain Climbers", reps: "40 sec", duration: 40, guide: "Drive knees toward chest quickly.", video: "https://www.youtube.com/embed/ckaRjXaLiiM" },
            { title: "Stomach Vacuum", reps: "1 min", duration: 60, guide: "Pull stomach inward while breathing slowly.", video: "https://www.youtube.com/embed/V9cZUCFoShA" }
        ]
    }
};

// Mirroring workouts for Thursday, Friday, and Saturday
workouts[4] = workouts[1];
workouts[5] = workouts[2];
workouts[6] = workouts[3];

/* ================= APP STATE ================= */
const todayIndex = new Date().getDay();
const todayWorkout = workouts[todayIndex] || workouts[1];
let currentExerciseIndex = 0;

let workoutTimer;
let timeLeft = 0;
let restTime = 10;
let isRest = false;

/* ================= INITIALIZATION ================= */
if (document.getElementById("todayName")) {
    document.getElementById("todayName").innerText = dayNames[todayIndex];
}

if (document.getElementById("todayWorkout")) {
    document.getElementById("todayWorkout").innerText = todayWorkout.name;
}

// First load
if (document.getElementById("exerciseTitle")) {
    if (todayWorkout.exercises.length > 0) {
        loadExercise();
    } else {
        document.getElementById("exerciseTitle").innerText = "Enjoy your rest day!";
        document.getElementById("timerDisplay").innerText = "💤";
    }
}

/* ================= LOAD EXERCISE ================= */
function loadExercise() {
    const exercise = todayWorkout.exercises[currentExerciseIndex];
    if (!exercise) return;

    if (document.getElementById("exerciseTitle")) {
        document.getElementById("exerciseTitle").innerText = exercise.title;
    }

    if (document.getElementById("exerciseReps")) {
        document.getElementById("exerciseReps").innerText = exercise.reps;
    }

    if (document.getElementById("exerciseGuide")) {
        document.getElementById("exerciseGuide").innerText = exercise.guide;
    }

    if (document.getElementById("exerciseVideo")) {
        document.getElementById("exerciseVideo").src = exercise.video;
    }

    // Progress indicator
    if (document.getElementById("exerciseProgress")) {
        document.getElementById("exerciseProgress").innerText =
            (currentExerciseIndex + 1) + " / " + todayWorkout.exercises.length;
    }

    // Reset Timer UI
    if (document.getElementById("timerDisplay")) {
        if (exercise.duration) {
            document.getElementById("timerDisplay").innerText = exercise.duration;
        } else {
            document.getElementById("timerDisplay").innerText = "--";
        }
    }
}

/* ================= TIMER & WORKOUT LOGIC ================= */
function startWorkout() {
    runExercise();
}

function runExercise() {
    const exercise = todayWorkout.exercises[currentExerciseIndex];
    clearInterval(workoutTimer); // Ensure no overlapping timers

    // If exercise has no duration, tell the user to complete reps manually
    if (!exercise.duration) {
        if (document.getElementById("timerDisplay")) {
            document.getElementById("timerDisplay").innerText = "Do Reps!";
        }
        return;
    }

    timeLeft = exercise.duration;
    updateTimer();

    workoutTimer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(workoutTimer);
            startRest();
        }
    }, 1000);
}

function startRest() {
    isRest = true;
    timeLeft = restTime;
    document.getElementById("exerciseTitle").innerText = "Rest";

    workoutTimer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(workoutTimer);
            isRest = false;
            nextExercise();
            // Automatically start the next exercise after resting
            if (currentExerciseIndex < todayWorkout.exercises.length) {
                runExercise();
            }
        }
    }, 1000);
}

function stopWorkout() {
    clearInterval(workoutTimer);
}

function updateTimer() {
    const display = document.getElementById("timerDisplay");
    if (display) {
        display.innerText = timeLeft;
    }
}

/* ================= NAVIGATION ================= */
function nextExercise() {
    clearInterval(workoutTimer); // Stop any running timers or rest periods
    currentExerciseIndex++;

    if (currentExerciseIndex >= todayWorkout.exercises.length) {
        if (confirm("🔥 Workout Completed! Start second round?")) {
            currentExerciseIndex = 0;
            loadExercise();
        } else {
            alert("Great job! Workout finished.");
            completeWorkout(); // Log the streak
            currentExerciseIndex = 0; // Reset for next time
            loadExercise();
        }
        return;
    }
    loadExercise();
}

function prevExercise() {
    if (currentExerciseIndex > 0) {
        clearInterval(workoutTimer);
        currentExerciseIndex--;
        loadExercise();
    }
}

function restartWorkout() {
    clearInterval(workoutTimer);
    currentExerciseIndex = 0;
    loadExercise();
}

/* ================= STREAK ================= */
let streak = localStorage.getItem("streak") || 0;

if (document.getElementById("streakCount")) {
    document.getElementById("streakCount").innerText = streak + " Days";
}

function completeWorkout() {
    streak++;
    localStorage.setItem("streak", streak);
    if (document.getElementById("streakCount")) {
        document.getElementById("streakCount").innerText = streak + " Days";
    }
}

/* ================= WEIGHT ================= */
function saveWeight() {
    const weightInput = document.getElementById("weightInput");
    if (weightInput) {
        const weight = weightInput.value;
        localStorage.setItem("weight", weight);
        alert("Weight saved!");
    }
}

if (document.getElementById("currentWeight")) {
    const weight = localStorage.getItem("weight") || "Not Set";
    document.getElementById("currentWeight").innerText = weight + " kg";
}

/* ================= ACTIVE TAB ================= */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".bottom-nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});
