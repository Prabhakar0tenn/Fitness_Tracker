// Spirit animal data
const spiritAnimals = {
    shark: {
        name: "Shark",
        description: "You have a shark spirit! Your explosive power and relentless drive will dominate any workout.",
        exercises: [
            { name: "Explosive Push-ups", reps: "15" },
            { name: "Burpees", reps: "20" },
            { name: "Mountain Climbers", reps: "30 sec" },
            { name: "Squat Jumps", reps: "15" }
        ],
        motivationalPhrase: "Keep moving forward like the ocean's apex predator!"
    },
    dragon: {
        name: "Dragon",
        description: "You have a dragon spirit! Your fiery determination and mighty strength will crush every challenge.",
        exercises: [
            { name: "Wide-Grip Push-ups", reps: "12" },
            { name: "Dragon Flags", reps: "8" },
            { name: "Fire Breath Squats", reps: "20" },
            { name: "Plank Shoulder Taps", reps: "16" }
        ],
        motivationalPhrase: "Let your inner fire burn through every obstacle!"
    },
    tiger: {
        name: "Tiger",
        description: "You have a tiger spirit! Your explosive power and focused intensity will shred through any workout.",
        exercises: [
            { name: "Tiger Push-ups", reps: "10" },
            { name: "Pouncing Lunges", reps: "12 each leg" },
            { name: "Claw Planks", reps: "45 sec" },
            { name: "Stealth Squats", reps: "18" }
        ],
        motivationalPhrase: "Stalk your fitness goals with silent determination!"
    },
    bear: {
        name: "Bear",
        description: "You have a bear spirit! Your raw power and endurance will power through any challenge.",
        exercises: [
            { name: "Bear Crawls", reps: "20 steps" },
            { name: "Grizzly Push-ups", reps: "12" },
            { name: "Hibernation Planks", reps: "60 sec" },
            { name: "Salmon Squats", reps: "15" }
        ],
        motivationalPhrase: "Channel your inner strength - nothing can stop you!"
    },
    wolf: {
        name: "Wolf",
        description: "You have a wolf spirit! Your pack mentality and endurance will carry you through the toughest routines.",
        exercises: [
            { name: "Wolf Howl Push-ups", reps: "15" },
            { name: "Pack Run in Place", reps: "60 sec" },
            { name: "Lone Wolf Lunges", reps: "10 each leg" },
            { name: "Moonlight Squats", reps: "20" }
        ],
        motivationalPhrase: "Hunt your goals with pack-like determination!"
    },
    phoenix: {
        name: "Phoenix",
        description: "You have a phoenix spirit! Your ability to rise stronger from every challenge is unmatched.",
        exercises: [
            { name: "Rising Push-ups", reps: "12" },
            { name: "Rebirth Burpees", reps: "10" },
            { name: "Ashes to Glory Squats", reps: "15" },
            { name: "Flight Planks", reps: "45 sec" }
        ],
        motivationalPhrase: "Every setback is fuel for your comeback!"
    },
    gorilla: {
        name: "Gorilla",
        description: "You have a gorilla spirit! Your primal strength and powerful movements will build unstoppable muscle.",
        exercises: [
            { name: "Chest-Beat Push-ups", reps: "10" },
            { name: "Jungle Squats", reps: "20" },
            { name: "Tree-Climb Pull-ups", reps: "8" },
            { name: "Silverback Planks", reps: "60 sec" }
        ],
        motivationalPhrase: "Harness your raw power - you're the king of the gym!"
    }
};

// DOM Elements
const spiritCards = document.querySelectorAll('.spirit-card');
const modal = new bootstrap.Modal(document.getElementById('workoutModal'));
const modalTitle = document.getElementById('modalSpiritTitle');
const modalDesc = document.getElementById('modalSpiritDesc');
const modalStreak = document.getElementById('modalStreakCount');
const modalExerciseList = document.getElementById('modalExerciseList');
const completeWorkoutBtn = document.getElementById('completeWorkoutBtn');
const goalDaysInput = document.getElementById('goalDays');
const setGoalBtn = document.getElementById('setGoalBtn');
const goalProgress = document.getElementById('goalProgress');
const goalProgressBar = document.getElementById('goalProgressBar');
const goalMessage = document.getElementById('goalMessage');
const currentMonthEl = document.getElementById('currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const logoutBtn = document.getElementById('logoutBtn');

// State variables
let currentStreak = 0;
let goalDays = 0;
let daysCompleted = 0;
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedAnimal = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
    
    // Load saved data
    const savedAnimal = localStorage.getItem('selectedAnimal');
    if (savedAnimal) loadAnimalData(savedAnimal);
});

// Event Listeners
spiritCards.forEach(card => {
    card.addEventListener('click', () => {
        selectedAnimal = card.dataset.animal;
        localStorage.setItem('selectedAnimal', selectedAnimal);
        loadAnimalData(selectedAnimal);
        modal.show();
    });
});

completeWorkoutBtn.addEventListener('click', completeWorkout);
setGoalBtn.addEventListener('click', setGoal);
prevMonthBtn.addEventListener('click', goToPrevMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);
logoutBtn.addEventListener('click', handleLogout);

// Functions
function loadAnimalData(animal) {
    const spirit = spiritAnimals[animal];
    modalTitle.textContent = `${spirit.name} Spirit`;
    modalDesc.textContent = spirit.description;
    
    // Load streak
    currentStreak = parseInt(localStorage.getItem(`${animal}_streak`)) || 0;
    modalStreak.textContent = currentStreak;
    
    // Load exercises
    modalExerciseList.innerHTML = '';
    spirit.exercises.forEach(ex => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between';
        li.innerHTML = `
            <span>${ex.name}</span>
            <span class="badge bg-primary rounded-pill">${ex.reps}</span>
        `;
        modalExerciseList.appendChild(li);
    });
}

function completeWorkout() {
    if (!selectedAnimal) return;
    
    currentStreak++;
    modalStreak.textContent = currentStreak;
    localStorage.setItem(`${selectedAnimal}_streak`, currentStreak.toString());
    
    // Update goal progress
    if (goalDays > 0) {
        daysCompleted++;
        updateGoalProgress();
    }
    
    // Update calendar
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let completedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
    if (!completedDates.includes(dateStr)) {
        completedDates.push(dateStr);
        localStorage.setItem('completedDates', JSON.stringify(completedDates));
    }
    
    renderCalendar(currentMonth, currentYear);
    alert(`Great job! ${spiritAnimals[selectedAnimal].motivationalPhrase}`);
    modal.hide();
}

function setGoal() {
    goalDays = parseInt(goalDaysInput.value);
    daysCompleted = 0;
    
    if (goalDays > 0) {
        goalProgress.style.display = 'block';
        updateGoalProgress();
        localStorage.setItem('fitnessGoal', JSON.stringify({
            days: goalDays,
            completed: daysCompleted,
            startDate: new Date().toISOString()
        }));
    } else {
        goalProgress.style.display = 'none';
    }
}

function updateGoalProgress() {
    const percentage = Math.min(100, (daysCompleted / goalDays) * 100);
    goalProgressBar.style.width = `${percentage}%`;
    
    const daysLeft = goalDays - daysCompleted;
    if (daysLeft > 0) {
        goalMessage.textContent = `${daysLeft} days left to complete your ${goalDays}-day goal!`;
    } else {
        goalMessage.textContent = `Horray! You achieved your ${goalDays}-day goal!`;
    }
    
    // Save progress
    const goalData = JSON.parse(localStorage.getItem('fitnessGoal') || '{}');
    goalData.completed = daysCompleted;
    localStorage.setItem('fitnessGoal', JSON.stringify(goalData));
}

function renderCalendar(month, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const completedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
    
    calendarGrid.innerHTML = '';
    
    // Day headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        const dateStr = `${year}-${month}-${day}`;
        if (completedDates.includes(dateStr)) {
            dayCell.classList.add('completed');
        }
        
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

function goToPrevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

function handleLogout() {
    // Clear all fitness data (optional)
    localStorage.clear();
    
    // Redirect to login page
    window.location.href = "index.html";
}