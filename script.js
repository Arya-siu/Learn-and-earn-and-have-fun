const STORAGE_KEY = "learnEarnPlatformState";

const storeItems = [
  {
    id: "course-js",
    title: "JavaScript Mastery Course",
    description: "A structured video roadmap covering fundamentals, DOM work, async patterns, and projects.",
    price: 120,
    type: "Online Course"
  },
  {
    id: "ui-kit",
    title: "UI/UX Design Pack",
    description: "Premium dashboard screens, component ideas, color systems, and usability checklists.",
    price: 90,
    type: "Design Pack"
  },
  {
    id: "biz-templates",
    title: "Business Launch Templates",
    description: "Pitch deck, offer planner, pricing worksheet, and weekly execution tracker.",
    price: 75,
    type: "Business"
  },
  {
    id: "coding-resources",
    title: "Coding Resource Vault",
    description: "Practice prompts, project briefs, debugging guides, and interview prep sheets.",
    price: 100,
    type: "Coding"
  }
];

const badgeRules = [
  { id: "starter", label: "Skill Starter", test: state => state.skills.length >= 1 },
  { id: "builder", label: "Progress Builder", test: state => state.points >= 100 },
  { id: "collector", label: "Resource Collector", test: state => state.purchases.length >= 1 },
  { id: "planner", label: "Budget Planner", test: state => state.expenses.length >= 3 },
  { id: "finisher", label: "Course Finisher", test: state => state.skills.some(skill => skill.progress >= 100) }
];

let state = loadState();

const elements = {
  navLinks: document.querySelectorAll(".nav-link"),
  sections: document.querySelectorAll(".page-section"),
  pageTitle: document.getElementById("pageTitle"),
  walletCoins: document.getElementById("walletCoins"),
  storeCoins: document.getElementById("storeCoins"),
  skillsStat: document.getElementById("skillsStat"),
  pointsStat: document.getElementById("pointsStat"),
  expensesStat: document.getElementById("expensesStat"),
  spendingStat: document.getElementById("spendingStat"),
  streakCount: document.getElementById("streakCount"),
  badgesList: document.getElementById("badgesList"),
  focusQueue: document.getElementById("focusQueue"),
  skillForm: document.getElementById("skillForm"),
  skillName: document.getElementById("skillName"),
  skillsList: document.getElementById("skillsList"),
  storeList: document.getElementById("storeList"),
  expenseForm: document.getElementById("expenseForm"),
  expenseTitle: document.getElementById("expenseTitle"),
  expenseAmount: document.getElementById("expenseAmount"),
  budgetTotal: document.getElementById("budgetTotal"),
  expensesList: document.getElementById("expensesList"),
  menuToggle: document.getElementById("menuToggle"),
  sidebar: document.querySelector(".sidebar"),
  chatForm: document.getElementById("chatForm"),
  chatInput: document.getElementById("chatInput"),
  chatWindow: document.getElementById("chatWindow"),
  toast: document.getElementById("toast")
};

function loadState() {
  const fallback = {
    skills: [],
    points: 50,
    expenses: [],
    purchases: [],
    streak: 0,
    lastLearningDate: null
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function markLearningActivity() {
  const today = todayKey();

  if (state.lastLearningDate === today) {
    return;
  }

  state.streak = state.lastLearningDate === yesterdayKey() ? state.streak + 1 : 1;
  state.lastLearningDate = today;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2600);
}

function switchSection(target) {
  elements.sections.forEach(section => section.classList.toggle("active", section.id === target));
  elements.navLinks.forEach(link => link.classList.toggle("active", link.dataset.target === target));
  elements.pageTitle.textContent = target === "store" ? "Digital Store" : target.charAt(0).toUpperCase() + target.slice(1);
  elements.sidebar.classList.remove("open");
}

function renderDashboard() {
  const totalSpending = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  elements.walletCoins.textContent = state.points;
  elements.storeCoins.textContent = state.points;
  elements.skillsStat.textContent = state.skills.length;
  elements.pointsStat.textContent = state.points;
  elements.expensesStat.textContent = state.expenses.length;
  elements.spendingStat.textContent = formatCurrency(totalSpending);
  elements.budgetTotal.textContent = formatCurrency(totalSpending);
  elements.streakCount.textContent = `${state.streak} ${state.streak === 1 ? "day" : "days"}`;

  elements.badgesList.innerHTML = badgeRules.map(rule => {
    const unlocked = rule.test(state);
    return `<span class="badge ${unlocked ? "" : "locked"}">${unlocked ? "Unlocked" : "Locked"} - ${rule.label}</span>`;
  }).join("");

  const nextSkills = [...state.skills].sort((a, b) => a.progress - b.progress).slice(0, 3);
  elements.focusQueue.innerHTML = nextSkills.length
    ? nextSkills.map(skill => `<div class="activity-item"><strong>${escapeHtml(skill.name)}</strong><br>${skill.progress}% complete</div>`).join("")
    : `<div class="empty-state">Add your first skill to generate a focus queue.</div>`;
}

function renderSkills() {
  elements.skillsList.innerHTML = state.skills.length
    ? state.skills.map(skill => `
      <article class="skill-card">
        <div class="card-top">
          <div>
            <h3>${escapeHtml(skill.name)}</h3>
            <span class="price-pill">${skill.progress}% complete</span>
          </div>
          <button class="danger-btn" data-delete-skill="${skill.id}" aria-label="Delete ${escapeHtml(skill.name)}">Delete</button>
        </div>
        <div class="progress-shell" aria-label="${escapeHtml(skill.name)} progress">
          <div class="progress-bar" style="width: ${skill.progress}%"></div>
        </div>
        <div class="card-actions">
          <button class="primary-btn" data-increase-skill="${skill.id}">Increase Progress</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">No skills yet. Add one above and earn your first learning coins.</div>`;
}

function renderStore() {
  elements.storeList.innerHTML = storeItems.map(item => {
    const purchased = state.purchases.includes(item.id);
    return `
      <article class="store-card">
        <div class="card-top">
          <div>
            <span class="price-pill">${item.type}</span>
            <h3>${item.title}</h3>
          </div>
          <span class="price-pill">${item.price} coins</span>
        </div>
        <p>${item.description}</p>
        <div class="card-actions">
          <button class="${purchased ? "ghost-btn" : "primary-btn"}" data-buy-item="${item.id}" ${purchased ? "disabled" : ""}>
            ${purchased ? "Owned" : "Buy"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderExpenses() {
  elements.expensesList.innerHTML = state.expenses.length
    ? state.expenses.map(expense => `
      <div class="expense-item">
        <div>
          <strong>${escapeHtml(expense.title)}</strong>
          <div class="expense-meta">${new Date(expense.createdAt).toLocaleDateString()}</div>
        </div>
        <div class="card-actions">
          <strong>${formatCurrency(expense.amount)}</strong>
          <button class="danger-btn" data-delete-expense="${expense.id}">Delete</button>
        </div>
      </div>
    `).join("")
    : `<div class="empty-state">No expenses tracked yet.</div>`;
}

function renderAll() {
  renderDashboard();
  renderSkills();
  renderStore();
  renderExpenses();
}

function addSkill(name) {
  state.skills.unshift({
    id: crypto.randomUUID(),
    name,
    progress: 0,
    createdAt: new Date().toISOString()
  });
  state.points += 25;
  markLearningActivity();
  saveState();
  renderAll();
  showToast("Skill added. You earned 25 coins.");
}

function increaseSkill(id) {
  const skill = state.skills.find(item => item.id === id);
  if (!skill) return;

  const previous = skill.progress;
  skill.progress = Math.min(100, skill.progress + 10);

  if (skill.progress > previous) {
    state.points += 10;
    markLearningActivity();
    saveState();
    renderAll();
    showToast(skill.progress === 100 ? "Skill completed. Badge unlocked!" : "Progress increased. You earned 10 coins.");
  } else {
    showToast("That skill is already complete.");
  }
}

function deleteSkill(id) {
  state.skills = state.skills.filter(skill => skill.id !== id);
  saveState();
  renderAll();
  showToast("Skill removed.");
}

function buyItem(id) {
  const item = storeItems.find(resource => resource.id === id);
  if (!item || state.purchases.includes(id)) return;

  if (state.points < item.price) {
    showToast("Not enough coins yet. Keep learning to earn more.");
    return;
  }

  state.points -= item.price;
  state.purchases.push(id);
  saveState();
  renderAll();
  showToast(`${item.title} added to your library.`);
}

function addExpense(title, amount) {
  state.expenses.unshift({
    id: crypto.randomUUID(),
    title,
    amount,
    createdAt: new Date().toISOString()
  });
  saveState();
  renderAll();
  showToast("Expense added.");
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(expense => expense.id !== id);
  saveState();
  renderAll();
  showToast("Expense removed.");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function assistantReply(message) {
  const lower = message.toLowerCase();
  const skill = state.skills.find(item => lower.includes(item.name.toLowerCase()));

  if (skill) {
    return `Focus on ${skill.name} for one 25 minute session. Build one tiny project, then return here and increase progress. Current progress: ${skill.progress}%.`;
  }

  if (lower.includes("design") || lower.includes("ui")) {
    return "Pick one product screen, recreate it, then improve one detail: spacing, hierarchy, contrast, or empty states. Save the before and after notes.";
  }

  if (lower.includes("business")) {
    return "Study one business model, write the target customer, core offer, price, and acquisition channel. Keep it to one page so it stays useful.";
  }

  if (lower.includes("javascript") || lower.includes("coding")) {
    return "Use a project-first loop: learn one concept, code a small feature, debug it, and write three notes about what changed your understanding.";
  }

  return "Choose one skill, define a clear 30 minute outcome, remove distractions, and finish with a quick reflection. Small completed loops beat vague marathon sessions.";
}

function appendChatMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chat-message ${type}`;
  message.textContent = text;
  elements.chatWindow.appendChild(message);
  elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
}

function bindEvents() {
  elements.navLinks.forEach(link => {
    link.addEventListener("click", () => switchSection(link.dataset.target));
  });

  document.querySelectorAll("[data-jump]").forEach(button => {
    button.addEventListener("click", () => switchSection(button.dataset.jump));
  });

  elements.menuToggle.addEventListener("click", () => {
    elements.sidebar.classList.toggle("open");
  });

  elements.skillForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = elements.skillName.value.trim();
    if (!name) return;
    addSkill(name);
    elements.skillForm.reset();
  });

  elements.skillsList.addEventListener("click", event => {
    const increaseButton = event.target.closest("[data-increase-skill]");
    const deleteButton = event.target.closest("[data-delete-skill]");

    if (increaseButton) increaseSkill(increaseButton.dataset.increaseSkill);
    if (deleteButton) deleteSkill(deleteButton.dataset.deleteSkill);
  });

  elements.storeList.addEventListener("click", event => {
    const buyButton = event.target.closest("[data-buy-item]");
    if (buyButton) buyItem(buyButton.dataset.buyItem);
  });

  elements.expenseForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = elements.expenseTitle.value.trim();
    const amount = Number(elements.expenseAmount.value);
    if (!title || !Number.isFinite(amount) || amount <= 0) return;
    addExpense(title, amount);
    elements.expenseForm.reset();
  });

  elements.expensesList.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete-expense]");
    if (deleteButton) deleteExpense(deleteButton.dataset.deleteExpense);
  });

  elements.chatForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = elements.chatInput.value.trim();
    if (!text) return;
    appendChatMessage(text, "user");
    appendChatMessage(assistantReply(text), "bot");
    elements.chatForm.reset();
  });

  document.querySelectorAll("[data-prompt]").forEach(button => {
    button.addEventListener("click", () => {
      elements.chatInput.value = button.dataset.prompt;
      elements.chatInput.focus();
    });
  });
}

bindEvents();
renderAll();
