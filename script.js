const STORAGE_KEY = "learnEarnPortalStateV2";
const OLD_STORAGE_KEY = "learnEarnPlatformState";

const courseCatalog = [
  {
    id: "geometry",
    title: "Geometry Lab",
    subtitle: "Interactive shapes, formulas, and visual answers.",
    reward: 20,
    visual: "geometry",
    activities: ["Enroll", "Explore a 3D shape", "Ask a visual question"]
  },
  {
    id: "robotics",
    title: "Robotics Circuit Studio",
    subtitle: "Build circuits with battery, resistor, wire, and LED.",
    reward: 30,
    visual: "robotics",
    activities: ["Enroll", "Add components", "Run a working circuit"]
  },
  {
    id: "coding",
    title: "Coding Challenges",
    subtitle: "Solve short prompts to earn coins with real practice.",
    reward: 35,
    visual: "coding",
    activities: ["Enroll", "Write function", "Pass challenge"]
  },
  {
    id: "business",
    title: "Student Business Basics",
    subtitle: "Learn pricing, planning, selling, and customer thinking.",
    reward: 15,
    visual: "business",
    activities: ["Enroll", "Plan offer", "Review marketplace"]
  }
];

const defaultProducts = [
  {
    id: "notebook-set",
    title: "Premium Notebook Set",
    category: "Stationery",
    price: 45,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "school-hoodie",
    title: "Study Hoodie",
    category: "Clothes",
    price: 80,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "sports-shoes",
    title: "Campus Sports Shoes",
    category: "Shoes",
    price: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "robotics-kit",
    title: "Starter Robotics Kit",
    category: "Learning Kit",
    price: 160,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "school-bag",
    title: "Everyday School Bag",
    category: "Stationery",
    price: 95,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "geometry-pack",
    title: "Geometry Practice Pack",
    category: "Learning Kit",
    price: 60,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80"
  }
];

const translations = {
  en: {
    eyebrow: "World class learning portal",
    coins: "Coins",
    startLearning: "Start learning",
    welcome: "Welcome back",
    heroTitle: "Welcome to EduVerse Portal",
    heroText: "Learn skills, complete practical activities, and track progress with students, parents, and sellers in one place."
  },
  hi: {
    eyebrow: "विश्व स्तरीय लर्निंग पोर्टल",
    coins: "कॉइन्स",
    startLearning: "सीखना शुरू करें",
    welcome: "वापसी पर स्वागत है",
    heroTitle: "एडूवर्स पोर्टल में आपका स्वागत है",
    heroText: "एक ही जगह पर सीखें, गतिविधियां पूरी करें, और छात्र, अभिभावक व विक्रेता प्रगति देखें।"
  },
  te: {
    eyebrow: "ప్రపంచ స్థాయి లెర్నింగ్ పోర్టల్",
    coins: "కాయిన్స్",
    startLearning: "నేర్చుకోవడం ప్రారంభించండి",
    welcome: "మళ్లీ స్వాగతం",
    heroTitle: "ఎడూవర్స్ పోర్టల్‌కు స్వాగతం",
    heroText: "ఒకే చోట నేర్చుకోండి, కార్యక్రమాలు పూర్తి చేయండి, విద్యార్థి-తల్లిదండ్రి-విక్రేత పురోగతిని చూడండి."
  },
  gu: {
    eyebrow: "વર્લ્ડ ક્લાસ લર્નિંગ પોર્ટલ",
    coins: "કોઇન્સ",
    startLearning: "શીખવાનું શરૂ કરો",
    welcome: "ફરી સ્વાગત છે",
    heroTitle: "એડુવર્સ પોર્ટલમાં આપનું સ્વાગત છે",
    heroText: "એક જ સ્થળે શીખો, કાર્ય પૂર્ણ કરો અને વિદ્યાર્થી-પેરન્ટ-વેચનાર પ્રગતિ જુઓ."
  },
  pa: {
    eyebrow: "ਵਿਸ਼ਵ ਪੱਧਰੀ ਲਰਨਿੰਗ ਪੋਰਟਲ",
    coins: "ਕੋਇਨ",
    startLearning: "ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ",
    welcome: "ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ ਹੈ",
    heroTitle: "EduVerse Portal ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
    heroText: "ਇੱਕ ਥਾਂ ਤੇ ਸਿੱਖੋ, ਗਤੀਵਿਧੀਆਂ ਪੂਰੀਆਂ ਕਰੋ ਅਤੇ ਵਿਦਿਆਰਥੀ-ਮਾਪੇ-ਵਿਕਰੇਤਾ ਪ੍ਰਗਤੀ ਵੇਖੋ।"
  },
  ta: {
    eyebrow: "உலகத் தரமான கற்றல் போர்டல்",
    coins: "நாணயங்கள்",
    startLearning: "கற்க தொடங்கு",
    welcome: "மீண்டும் வரவேற்கிறோம்",
    heroTitle: "எடூவர்ஸ் போர்டலுக்கு வரவேற்கிறோம்",
    heroText: "ஒரே இடத்தில் கற்றல், செயல்பாடு நிறைவு, மாணவர்-பெற்றோர்-விற்பனையாளர் முன்னேற்றம்."
  },
  ml: {
    eyebrow: "ലോകോത്തര പഠന പോർട്ടൽ",
    coins: "കോയിൻസ്",
    startLearning: "പഠനം തുടങ്ങുക",
    welcome: "വീണ്ടും സ്വാഗതം",
    heroTitle: "എഡ്യൂവർസ് പോർട്ടലിലേക്ക് സ്വാഗതം",
    heroText: "ഒരു ഇടത്ത് പഠിക്കുക, പ്രവർത്തനങ്ങൾ പൂർത്തിയാക്കുക, വിദ്യാർത്ഥി-രക്ഷിതാവ്-വിൽപ്പനക്കാരൻ പുരോഗതി കാണുക."
  },
  kn: {
    eyebrow: "ವಿಶ್ವಮಟ್ಟದ ಕಲಿಕಾ ಪೋರ್ಟಲ್",
    coins: "ನಾಣ್ಯಗಳು",
    startLearning: "ಕಲಿಕೆ ಆರಂಭಿಸಿ",
    welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    heroTitle: "ಎಡ್ಯೂವರ್ಸ್ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ",
    heroText: "ಒಂದು ವೇದಿಕೆಯಲ್ಲಿ ಕಲಿಕೆ, ಚಟುವಟಿಕೆ ಪೂರ್ಣಗೊಳಿಕೆ, ವಿದ್ಯಾರ್ಥಿ-ಪೋಷಕ-ಮಾರಾಟಗಾರ ಪ್ರಗತಿ."
  },
  bho: {
    eyebrow: "वर्ल्ड क्लास लर्निंग पोर्टल",
    coins: "कॉइन",
    startLearning: "सीखे शुरू करीं",
    welcome: "फेरु से स्वागत बा",
    heroTitle: "EduVerse Portal में रउआ के स्वागत बा",
    heroText: "एके जगह पढ़ाई करीं, गतिविधि पूरी करीं, आ विद्यार्थी-परिवार-विक्रेता प्रगति देखि।"
  }
};

const badgeRules = [
  { id: "first-course", label: "First Course", test: state => state.enrolled.length > 0 },
  { id: "coin-earner", label: "Coin Earner", test: state => state.coins >= 150 },
  { id: "geometry", label: "Geometry Explorer", test: state => state.completedActivities.includes("geometry-question") },
  { id: "robotics", label: "Circuit Builder", test: state => state.completedActivities.includes("robotics-run") },
  { id: "seller", label: "Student Seller", test: state => state.sellerProducts.length > 0 }
];

let state = loadState();
let geometryRuntime = null;
let roboticsRuntime = null;

const elements = {
  navLinks: document.querySelectorAll(".nav-link"),
  sections: document.querySelectorAll(".page-section"),
  pageTitle: document.getElementById("pageTitle"),
  sidebar: document.getElementById("sidebar"),
  menuToggle: document.getElementById("menuToggle"),
  walletCoins: document.getElementById("walletCoins"),
  mobileCoins: document.getElementById("mobileCoins"),
  heroCoins: document.getElementById("heroCoins"),
  enrolledStat: document.getElementById("enrolledStat"),
  coinsStat: document.getElementById("coinsStat"),
  challengeStat: document.getElementById("challengeStat"),
  marketStat: document.getElementById("marketStat"),
  nextSteps: document.getElementById("nextSteps"),
  badgeList: document.getElementById("badgeList"),
  courseGrid: document.getElementById("courseGrid"),
  marketGrid: document.getElementById("marketGrid"),
  roleSwitch: document.getElementById("roleSwitch"),
  languageSelect: document.getElementById("languageSelect"),
  codeAnswer: document.getElementById("codeAnswer"),
  submitCodeChallenge: document.getElementById("submitCodeChallenge"),
  codeFeedback: document.getElementById("codeFeedback"),
  geometryQuestion: document.getElementById("geometryQuestion"),
  explainGeometry: document.getElementById("explainGeometry"),
  geometryExplanation: document.getElementById("geometryExplanation"),
  runCircuit: document.getElementById("runCircuit"),
  circuitFeedback: document.getElementById("circuitFeedback"),
  parentProgress: document.getElementById("parentProgress"),
  expenseForm: document.getElementById("expenseForm"),
  expenseTitle: document.getElementById("expenseTitle"),
  expenseAmount: document.getElementById("expenseAmount"),
  budgetTotal: document.getElementById("budgetTotal"),
  expenseList: document.getElementById("expenseList"),
  sellerForm: document.getElementById("sellerForm"),
  sellerTitle: document.getElementById("sellerTitle"),
  sellerCategory: document.getElementById("sellerCategory"),
  sellerPrice: document.getElementById("sellerPrice"),
  sellerListings: document.getElementById("sellerListings"),
  chatForm: document.getElementById("chatForm"),
  chatInput: document.getElementById("chatInput"),
  chatWindow: document.getElementById("chatWindow"),
  toast: document.getElementById("toast")
};

function defaultState() {
  return {
    coins: 80,
    role: "student",
    language: "en",
    enrolled: [],
    completedActivities: [],
    purchases: [],
    sellerProducts: [],
    expenses: [],
    circuitComponents: [],
    currentShape: "cube"
  };
}

function loadState() {
  const fallback = defaultState();
  const saved = safeParse(localStorage.getItem(STORAGE_KEY));
  if (saved) return { ...fallback, ...saved };

  const old = safeParse(localStorage.getItem(OLD_STORAGE_KEY));
  if (!old) return fallback;

  return {
    ...fallback,
    coins: old.points || fallback.coins,
    expenses: old.expenses || []
  };
}

function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function id() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function awardCoins(amount, activityId, message) {
  if (activityId && state.completedActivities.includes(activityId)) {
    showToast("You already earned coins for this activity.");
    return false;
  }

  state.coins += amount;
  if (activityId) state.completedActivities.push(activityId);
  saveState();
  renderAll();
  showToast(message || `You earned ${amount} coins.`);
  return true;
}

function courseProgress(course) {
  const complete = course.activities.filter((_, index) => {
    if (index === 0) return state.enrolled.includes(course.id);
    return state.completedActivities.includes(`${course.id}-${index}`);
  }).length;

  const special = {
    geometry: state.completedActivities.includes("geometry-question") ? 1 : 0,
    robotics: state.completedActivities.includes("robotics-run") ? 1 : 0,
    coding: state.completedActivities.includes("coding-challenge") ? 1 : 0,
    business: state.completedActivities.includes("business-review") ? 1 : 0
  }[course.id] || 0;

  return Math.min(100, Math.round(((complete + special) / (course.activities.length + 1)) * 100));
}

function setSection(target) {
  elements.sections.forEach(section => section.classList.toggle("active", section.id === target));
  elements.navLinks.forEach(link => link.classList.toggle("active", link.dataset.target === target));
  elements.pageTitle.textContent = target === "labs" ? "3D Labs" : target.charAt(0).toUpperCase() + target.slice(1);
  elements.sidebar.classList.remove("open");

  if (target === "labs") {
    window.setTimeout(resizeLabs, 60);
  }
}

function applyLanguage() {
  const copy = translations[state.language] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    if (copy[key]) node.textContent = copy[key];
  });
  elements.languageSelect.value = state.language;
}

function renderDashboard() {
  const productCount = defaultProducts.length + state.sellerProducts.length;
  elements.walletCoins.textContent = state.coins;
  elements.mobileCoins.textContent = `${state.coins} coins`;
  elements.heroCoins.textContent = state.coins;
  elements.enrolledStat.textContent = state.enrolled.length;
  elements.coinsStat.textContent = state.coins;
  elements.challengeStat.textContent = state.completedActivities.length;
  elements.marketStat.textContent = productCount;

  const suggested = courseCatalog
    .map(course => ({ ...course, progress: courseProgress(course) }))
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 3);

  elements.nextSteps.innerHTML = suggested.map(course => `
    <div class="activity-item">
      <div>
        <strong>${course.title}</strong>
        <div class="activity-meta">${course.subtitle}</div>
      </div>
      <span>${course.progress}%</span>
    </div>
  `).join("");

  elements.badgeList.innerHTML = badgeRules.map(rule => {
    const unlocked = rule.test(state);
    return `<span class="badge ${unlocked ? "" : "locked"}">${unlocked ? "Unlocked" : "Locked"} - ${rule.label}</span>`;
  }).join("");
}

function renderCourses() {
  elements.courseGrid.innerHTML = courseCatalog.map(course => {
    const enrolled = state.enrolled.includes(course.id);
    const progress = courseProgress(course);
    return `
      <article class="course-card">
        <div class="course-visual ${course.visual}">
          <div class="visual-shape"></div>
        </div>
        <div class="course-body">
          <span class="category-pill">+${course.reward} coins per task</span>
          <h3>${course.title}</h3>
          <p class="muted">${course.subtitle}</p>
          <div class="progress-shell" aria-label="${course.title} progress">
            <div class="progress-bar" style="width: ${progress}%"></div>
          </div>
          <strong>${progress}% complete</strong>
          <div class="card-actions">
            <button class="primary-btn hover-invert" data-enroll="${course.id}">${enrolled ? "Continue" : "Enroll"}</button>
            <button class="secondary-btn hover-invert" data-course-action="${course.id}">Complete task</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderMarketplace() {
  const products = [...defaultProducts, ...state.sellerProducts];
  elements.marketGrid.innerHTML = products.map(product => {
    const bought = state.purchases.includes(product.id);
    return `
      <article class="market-card">
        <div class="market-visual">
          <img src="${product.image}" alt="${escapeHtml(product.title)}">
        </div>
        <div class="market-body">
          <span class="category-pill">${escapeHtml(product.category)}</span>
          <h3>${escapeHtml(product.title)}</h3>
          <div class="price-row">
            <strong>${product.price} coins</strong>
            <button class="${bought ? "secondary-btn" : "primary-btn hover-invert"}" data-buy="${product.id}" ${bought ? "disabled" : ""}>${bought ? "Owned" : "Buy"}</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderParent() {
  elements.parentProgress.innerHTML = courseCatalog.map(course => `
    <div class="activity-item">
      <div>
        <strong>${course.title}</strong>
        <div class="activity-meta">${state.enrolled.includes(course.id) ? "Enrolled" : "Not started"}</div>
      </div>
      <span>${courseProgress(course)}%</span>
    </div>
  `).join("");

  const total = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  elements.budgetTotal.textContent = formatRupees(total);
  elements.expenseList.innerHTML = state.expenses.length
    ? state.expenses.map(expense => `
      <div class="expense-item">
        <div>
          <strong>${escapeHtml(expense.title)}</strong>
          <div class="activity-meta">${new Date(expense.createdAt).toLocaleDateString()}</div>
        </div>
        <strong>${formatRupees(expense.amount)}</strong>
      </div>
    `).join("")
    : `<div class="activity-item">No expenses added yet.</div>`;
}

function renderSeller() {
  const listings = state.sellerProducts;
  elements.sellerListings.innerHTML = listings.length
    ? listings.map(product => `
      <div class="activity-item">
        <div>
          <strong>${escapeHtml(product.title)}</strong>
          <div class="activity-meta">${escapeHtml(product.category)}</div>
        </div>
        <span>${product.price} coins</span>
      </div>
    `).join("")
    : `<div class="activity-item">No seller listings yet. Add your first product.</div>`;
}

function renderRoles() {
  elements.roleSwitch.querySelectorAll("button").forEach(button => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
}

function renderAll() {
  applyLanguage();
  renderRoles();
  renderDashboard();
  renderCourses();
  renderMarketplace();
  renderParent();
  renderSeller();
}

function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function enrollCourse(courseId) {
  if (!state.enrolled.includes(courseId)) {
    state.enrolled.push(courseId);
    awardCoins(15, `${courseId}-enroll`, "Course enrolled. You earned 15 coins.");
  } else {
    setSection(courseId === "geometry" || courseId === "robotics" ? "labs" : "courses");
  }
  saveState();
  renderAll();
}

function completeCourseTask(courseId) {
  const course = courseCatalog.find(item => item.id === courseId);
  if (!course) return;

  if (!state.enrolled.includes(courseId)) {
    showToast("Enroll first, then complete the task.");
    return;
  }

  if (courseId === "geometry" || courseId === "robotics") {
    setSection("labs");
    showToast("Open the lab activity to earn progress.");
    return;
  }

  if (courseId === "coding") {
    document.getElementById("codeAnswer").focus();
    showToast("Submit the coding challenge to earn progress.");
    return;
  }

  awardCoins(course.reward, "business-review", "Business task complete. You earned coins.");
}

function buyProduct(productId) {
  const product = [...defaultProducts, ...state.sellerProducts].find(item => item.id === productId);
  if (!product || state.purchases.includes(productId)) return;

  if (state.coins < product.price) {
    showToast("Not enough coins. Complete learning tasks to earn more.");
    return;
  }

  state.coins -= product.price;
  state.purchases.push(productId);
  saveState();
  renderAll();
  showToast(`${product.title} purchased.`);
}

function submitCodeChallenge() {
  const answer = elements.codeAnswer.value.trim();
  const clean = answer.replace(/\s+/g, "");
  const valid = /function\s+doubleNumber|const\s+doubleNumber|let\s+doubleNumber/.test(answer)
    && (clean.includes("returnnum*2") || clean.includes("return2*num") || clean.includes("=>num*2") || clean.includes("=>2*num"));

  if (!valid) {
    elements.codeFeedback.textContent = "Try again: include doubleNumber and return the value multiplied by 2.";
    return;
  }

  elements.codeFeedback.textContent = "Correct. Progress earned.";
  if (!state.enrolled.includes("coding")) state.enrolled.push("coding");
  awardCoins(35, "coding-challenge", "Coding challenge passed. You earned 35 coins.");
}

function explainGeometryQuestion() {
  const question = elements.geometryQuestion.value.trim().toLowerCase();
  const shape = state.currentShape;
  let explanation = `The ${shape} is shown in the viewer. Drag the model to inspect faces, edges, and curved surfaces.`;

  if (question.includes("volume") && question.includes("cylinder")) {
    explanation = "For a cylinder, volume means base area times height. The circular base has area pi times radius squared, so V = pi r squared h.";
    setGeometryShape("cylinder");
  } else if (question.includes("cube")) {
    explanation = "A cube has 6 equal square faces, 12 equal edges, and 8 corners. Volume is side times side times side.";
    setGeometryShape("cube");
  } else if (question.includes("sphere")) {
    explanation = "A sphere is perfectly round. Every point on its surface is the same distance from the center, called the radius.";
    setGeometryShape("sphere");
  } else if (question.includes("cone")) {
    explanation = "A cone has one circular base and one curved surface that meets at a vertex. Its volume is one third of a cylinder with the same base and height.";
    setGeometryShape("cone");
  }

  elements.geometryExplanation.textContent = explanation;
  if (!state.enrolled.includes("geometry")) state.enrolled.push("geometry");
  awardCoins(20, "geometry-question", "Geometry explanation complete. You earned 20 coins.");
}

function addCircuitComponent(component) {
  state.circuitComponents.push(component);
  if (!state.enrolled.includes("robotics")) state.enrolled.push("robotics");
  saveState();
  drawRoboticsScene();
  renderAll();
}

function runCircuit() {
  const required = ["battery", "resistor", "led", "wire"];
  const works = required.every(component => state.circuitComponents.includes(component));
  if (!works) {
    elements.circuitFeedback.textContent = "The circuit is incomplete. Add battery, resistor, LED, and wire.";
    return;
  }

  elements.circuitFeedback.textContent = "Circuit complete. Current can flow safely through the resistor and LED.";
  awardCoins(30, "robotics-run", "Robotics circuit complete. You earned 30 coins.");
}

function addExpense(title, amount) {
  state.expenses.unshift({ id: id(), title, amount, createdAt: new Date().toISOString() });
  saveState();
  renderAll();
  showToast("Expense added.");
}

function addSellerProduct(title, category, price) {
  const imageMap = {
    Stationery: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80",
    Clothes: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    Shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "Learning Kit": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  };

  state.sellerProducts.unshift({
    id: id(),
    title,
    category,
    price,
    image: imageMap[category] || imageMap.Stationery
  });
  awardCoins(10, null, "Listing published. Seller bonus: 10 coins.");
  saveState();
  renderAll();
}

function assistantReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("geometry") || lower.includes("cube") || lower.includes("circle")) {
    return "Open 3D Labs, choose a shape, paste your geometry question, and compare the formula with the model. Start with faces, edges, radius, and height.";
  }
  if (lower.includes("robot") || lower.includes("circuit")) {
    return "Build a basic LED circuit: battery, resistor, LED, and wire. The resistor protects the LED, so add it before running the circuit.";
  }
  if (lower.includes("code")) {
    return "Use a small loop: read the prompt, write one function, test one example, then submit. Good code practice earns coins here.";
  }
  if (lower.includes("sell") || lower.includes("market")) {
    return "List products students need often: notebooks, uniforms, shoes, bags, kits, and practice books. Keep names clear and prices fair.";
  }
  return "Choose one course, complete one task, and spend earned coins only on something that helps your next study session.";
}

function appendChat(text, type) {
  const node = document.createElement("div");
  node.className = `chat-message ${type}`;
  node.textContent = text;
  elements.chatWindow.appendChild(node);
  elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
}

function bindEvents() {
  elements.navLinks.forEach(link => link.addEventListener("click", () => setSection(link.dataset.target)));
  document.querySelectorAll("[data-jump]").forEach(button => button.addEventListener("click", () => setSection(button.dataset.jump)));

  elements.menuToggle.addEventListener("click", () => elements.sidebar.classList.toggle("open"));

  elements.roleSwitch.addEventListener("click", event => {
    const button = event.target.closest("[data-role]");
    if (!button) return;
    state.role = button.dataset.role;
    saveState();
    renderAll();
    setSection(state.role === "student" ? "dashboard" : state.role);
  });

  elements.languageSelect.addEventListener("change", event => {
    state.language = event.target.value;
    saveState();
    renderAll();
  });

  elements.courseGrid.addEventListener("click", event => {
    const enroll = event.target.closest("[data-enroll]");
    const action = event.target.closest("[data-course-action]");
    if (enroll) enrollCourse(enroll.dataset.enroll);
    if (action) completeCourseTask(action.dataset.courseAction);
  });

  elements.marketGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-buy]");
    if (button) buyProduct(button.dataset.buy);
  });

  elements.submitCodeChallenge.addEventListener("click", submitCodeChallenge);
  elements.explainGeometry.addEventListener("click", explainGeometryQuestion);
  elements.runCircuit.addEventListener("click", runCircuit);

  document.querySelectorAll("[data-shape]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-shape]").forEach(item => item.classList.toggle("active", item === button));
      setGeometryShape(button.dataset.shape);
      if (!state.enrolled.includes("geometry")) state.enrolled.push("geometry");
      awardCoins(20, "geometry-1", "Shape explored. You earned 20 coins.");
    });
  });

  document.querySelectorAll("[data-component]").forEach(button => {
    button.addEventListener("click", () => addCircuitComponent(button.dataset.component));
  });

  elements.expenseForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = elements.expenseTitle.value.trim();
    const amount = Number(elements.expenseAmount.value);
    if (!title || !Number.isFinite(amount) || amount <= 0) return;
    addExpense(title, amount);
    elements.expenseForm.reset();
  });

  elements.sellerForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = elements.sellerTitle.value.trim();
    const category = elements.sellerCategory.value;
    const price = Number(elements.sellerPrice.value);
    if (!title || !category || !Number.isFinite(price) || price <= 0) return;
    addSellerProduct(title, category, price);
    elements.sellerForm.reset();
  });

  elements.chatForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = elements.chatInput.value.trim();
    if (!text) return;
    appendChat(text, "user");
    appendChat(assistantReply(text), "bot");
    elements.chatForm.reset();
  });

  document.querySelectorAll("[data-prompt]").forEach(button => {
    button.addEventListener("click", () => {
      elements.chatInput.value = button.dataset.prompt;
      elements.chatInput.focus();
    });
  });

  window.addEventListener("resize", resizeLabs);
}

function resizeLabs() {
  if (geometryRuntime) geometryRuntime.resize();
  if (roboticsRuntime) roboticsRuntime.resize();
  drawGeometryFallback();
  drawRoboticsFallback();
}

function initLabs() {
  if (window.THREE) {
    geometryRuntime = createGeometryThree();
    roboticsRuntime = createRoboticsThree();
  } else {
    drawGeometryFallback();
    drawRoboticsFallback();
  }
}

function createGeometryThree() {
  const canvas = document.getElementById("geometryCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const light = new THREE.DirectionalLight(0xffffff, 1.8);
  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  let mesh = null;
  let dragging = false;
  let lastX = 0;

  camera.position.set(0, 1.4, 5);
  light.position.set(3, 4, 5);
  scene.add(light, ambient);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function setShape(shape) {
    if (mesh) scene.remove(mesh);
    const material = new THREE.MeshStandardMaterial({
      color: shape === "sphere" ? 0x6f4ed8 : shape === "cone" ? 0x9a5b00 : shape === "cylinder" ? 0x166459 : 0x111111,
      roughness: 0.42,
      metalness: 0.08
    });
    const geometryMap = {
      cube: new THREE.BoxGeometry(2, 2, 2),
      sphere: new THREE.SphereGeometry(1.25, 42, 26),
      cone: new THREE.ConeGeometry(1.25, 2.3, 42),
      cylinder: new THREE.CylinderGeometry(1.05, 1.05, 2.35, 42)
    };
    mesh = new THREE.Mesh(geometryMap[shape] || geometryMap.cube, material);
    scene.add(mesh);
    state.currentShape = shape;
    saveState();
  }

  canvas.addEventListener("pointerdown", event => {
    dragging = true;
    lastX = event.clientX;
  });
  canvas.addEventListener("pointerup", () => {
    dragging = false;
  });
  canvas.addEventListener("pointermove", event => {
    if (!dragging || !mesh) return;
    mesh.rotation.y += (event.clientX - lastX) * 0.01;
    lastX = event.clientX;
  });

  function animate() {
    if (mesh && !dragging) {
      mesh.rotation.x += 0.004;
      mesh.rotation.y += 0.006;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  resize();
  setShape(state.currentShape || "cube");
  animate();
  return { resize, setShape };
}

function createRoboticsThree() {
  const canvas = document.getElementById("roboticsCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const light = new THREE.DirectionalLight(0xffffff, 1.7);
  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xdff5ec, roughness: 0.75 });

  camera.position.set(0, 4.6, 6.2);
  camera.lookAt(0, 0, 0);
  light.position.set(4, 6, 5);
  scene.add(light, ambient);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function draw() {
    scene.clear();
    scene.add(light, ambient);
    const board = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 2.7), boardMaterial);
    board.position.y = -0.2;
    scene.add(board);

    state.circuitComponents.slice(-8).forEach((component, index) => {
      const x = -1.8 + (index % 4) * 1.2;
      const z = index > 3 ? 0.55 : -0.55;
      scene.add(createComponentMesh(component, x, z));
    });
  }

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  resize();
  draw();
  animate();
  return { resize, draw };
}

function createComponentMesh(component, x, z) {
  const group = new THREE.Group();
  const colors = {
    battery: 0x111111,
    led: 0x6f4ed8,
    resistor: 0x9a5b00,
    wire: 0x166459
  };
  const material = new THREE.MeshStandardMaterial({ color: colors[component] || 0x111111, roughness: 0.45 });
  let mesh;

  if (component === "wire") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 18), material);
    mesh.rotation.z = Math.PI / 2;
  } else if (component === "led") {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), material);
  } else if (component === "resistor") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.9, 24), material);
    mesh.rotation.z = Math.PI / 2;
  } else {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.36, 0.5), material);
  }

  mesh.position.set(x, 0.18, z);
  group.add(mesh);
  return group;
}

function setGeometryShape(shape) {
  state.currentShape = shape;
  saveState();
  if (geometryRuntime) geometryRuntime.setShape(shape);
  drawGeometryFallback();
  renderAll();
}

function drawRoboticsScene() {
  if (roboticsRuntime) roboticsRuntime.draw();
  drawRoboticsFallback();
}

function drawGeometryFallback() {
  if (window.THREE) return;
  const canvas = document.getElementById("geometryCanvas");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#f7fbf8";
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = "#166459";
  ctx.lineWidth = 4;
  ctx.fillStyle = "rgba(22,100,89,0.12)";
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  if (state.currentShape === "sphere") {
    ctx.beginPath();
    ctx.arc(cx, cy, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (state.currentShape === "cone") {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 100);
    ctx.lineTo(cx - 100, cy + 90);
    ctx.lineTo(cx + 100, cy + 90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (state.currentShape === "cylinder") {
    ctx.strokeRect(cx - 78, cy - 95, 156, 190);
    ctx.beginPath();
    ctx.ellipse(cx, cy - 95, 78, 24, 0, 0, Math.PI * 2);
    ctx.ellipse(cx, cy + 95, 78, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.strokeRect(cx - 88, cy - 88, 176, 176);
    ctx.strokeRect(cx - 52, cy - 124, 176, 176);
    ctx.beginPath();
    ctx.moveTo(cx - 88, cy - 88);
    ctx.lineTo(cx - 52, cy - 124);
    ctx.moveTo(cx + 88, cy - 88);
    ctx.lineTo(cx + 124, cy - 124);
    ctx.moveTo(cx + 88, cy + 88);
    ctx.lineTo(cx + 124, cy + 52);
    ctx.stroke();
  }
}

function drawRoboticsFallback() {
  if (window.THREE) return;
  const canvas = document.getElementById("roboticsCanvas");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#dff5ec";
  ctx.fillRect(24, 42, rect.width - 48, rect.height - 84);
  ctx.strokeStyle = "#166459";
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 42, rect.width - 48, rect.height - 84);
  state.circuitComponents.slice(-8).forEach((component, index) => {
    const x = 70 + (index % 4) * 105;
    const y = index > 3 ? 210 : 120;
    ctx.fillStyle = component === "led" ? "#6f4ed8" : component === "resistor" ? "#9a5b00" : component === "wire" ? "#166459" : "#111";
    ctx.beginPath();
    ctx.roundRect(x, y, 74, 34, 8);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "12px Manrope, sans-serif";
    ctx.fillText(component, x + 8, y + 22);
  });
}

bindEvents();
renderAll();
initLabs();
