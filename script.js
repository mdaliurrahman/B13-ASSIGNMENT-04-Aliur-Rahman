// ============================
// ELEMENT SELECTORS
// ============================

const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

const allBtn = document.getElementById("all");
const interviewFilterBtn = document.getElementById("interview");
const rejectFilterBtn = document.getElementById("reject");

const emptyMessage = document.getElementById("empty-message");

// ============================
// UPDATE COUNTS
// ============================

function updateCounts() {
  const allCards = document.querySelectorAll("#allCards > div");
  const interviewCards = document.querySelectorAll(".status-interview");
  const rejectedCards = document.querySelectorAll(".status-rejected");

  totalCount.textContent = allCards.length;
  interviewCount.textContent = interviewCards.length;
  rejectedCount.textContent = rejectedCards.length;
}

// ============================
// SET STATUS
// ============================

function setStatus(card, status) {
  const statusBtn = card.querySelector("button.bg-\\[\\#EEF4FF\\], button.bg-green-100, button.bg-red-100");

  // Remove previous status
  card.classList.remove("status-interview", "status-rejected");

  // Reset button
  statusBtn.className = "btn mt-5 font-medium text-sm";

  if (status === "interview") {
    statusBtn.textContent = "INTERVIEW";
    statusBtn.classList.add("bg-green-100", "text-green-700");
    card.classList.add("status-interview");
  }

  if (status === "rejected") {
    statusBtn.textContent = "REJECTED";
    statusBtn.classList.add("bg-red-100", "text-red-700");
    card.classList.add("status-rejected");
  }

  updateCounts();
  applyCurrentFilter();
}

// ============================
// DELETE CARD
// ============================

function deleteCard(card) {
  card.remove();
  updateCounts();
  applyCurrentFilter();
}

// ============================
// FILTER SYSTEM
// ============================

let currentFilter = "all";

function filterCards(type) {
  const cards = document.querySelectorAll("#allCards > div");
  let visibleCount = 0;

  cards.forEach((card) => {
    if (type === "all") {
      card.style.display = "grid";
      visibleCount++;
    } 
    else if (type === "interview") {
      if (card.classList.contains("status-interview")) {
        card.style.display = "grid";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    } 
    else if (type === "rejected") {
      if (card.classList.contains("status-rejected")) {
        card.style.display = "grid";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    }
  });

  handleEmptyMessage(type, visibleCount);
}

function handleEmptyMessage(type, visibleCount) {
  if (visibleCount === 0) {
    emptyMessage.classList.remove("hidden");

    if (type === "all") {
      emptyMessage.textContent = "No job available";
    } 
    else if (type === "interview") {
      emptyMessage.textContent = "No interview jobs available";
    } 
    else if (type === "rejected") {
      emptyMessage.textContent = "No rejected jobs available";
    }
  } else {
    emptyMessage.classList.add("hidden");
  }
}

function applyCurrentFilter() {
  filterCards(currentFilter);
}

// ============================
// ACTIVE FILTER BUTTON STYLE
// ============================

function setActiveButton(activeBtn) {
  [allBtn, interviewFilterBtn, rejectFilterBtn].forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("bg-white", "text-[#64748B]");
  });

  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("bg-white", "text-[#64748B]");
}

// ============================
// EVENT LISTENERS
// ============================

document.querySelectorAll("#allCards > div").forEach((card) => {
  const interviewBtn = card.querySelector(".btn-success");
  const rejectBtn = card.querySelector(".btn-secondary");
  const deleteBtn = card.querySelector(".fa-trash-can");

  interviewBtn.addEventListener("click", () => {
    setStatus(card, "interview");
  });

  rejectBtn.addEventListener("click", () => {
    setStatus(card, "rejected");
  });

  deleteBtn.addEventListener("click", () => {
    deleteCard(card);
  });
});

// Filter buttons
allBtn.addEventListener("click", () => {
  currentFilter = "all";
  setActiveButton(allBtn);
  filterCards("all");
});

interviewFilterBtn.addEventListener("click", () => {
  currentFilter = "interview";
  setActiveButton(interviewFilterBtn);
  filterCards("interview");
});

rejectFilterBtn.addEventListener("click", () => {
  currentFilter = "rejected";
  setActiveButton(rejectFilterBtn);
  filterCards("rejected");
});

// ============================
// INIT
// ============================

updateCounts();
filterCards("all");
setActiveButton(allBtn);