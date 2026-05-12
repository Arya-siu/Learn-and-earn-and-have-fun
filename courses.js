const STORAGE_KEY = "brainosaur_app_state_v1";
const USER_KEY = "brainosaur_user_v1";

const loginGate = document.getElementById("loginGate");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");

const navButtons = document.querySelectorAll("#sectionNav button");
const appSections = document.querySelectorAll(".app-section");

const walletMoney = document.getElementById("walletMoney");
const walletCoins = document.getElementById("walletCoins");
const welcomeText = document.getElementById("welcomeText");

const coinsEarnedStat = document.getElementById("coinsEarnedStat");
const geometryQuestionStat = document.getElementById("geometryQuestionStat");
const roboticsBuildStat = document.getElementById("roboticsBuildStat");
const purchaseStat = document.getElementById("purchaseStat");

const moneyForm = document.getElementById("moneyForm");
const moneyInput = document.getElementById("moneyInput");

const testimonialBox = document.getElementById("testimonialBox");
const toast = document.getElementById("toast");
const coinBurst = document.getElementById("coinBurst");

const shapeSelect = document.getElementById("shapeSelect");
const topicButtons = document.querySelectorAll(".topic-btn");
const topicExplanation = document.getElementById("topicExplanation");
const geometryCanvas = document.getElementById("geometryCanvas");
const geometryQuestionInput = document.getElementById("geometryQuestionInput");
const askGeometryBtn = document.getElementById("askGeometryBtn");
const geometryAnswer = document.getElementById("geometryAnswer");

const roboticsCanvas = document.getElementById("roboticsCanvas");
const componentButtons = document.querySelectorAll(".comp-btn");
const runCircuitBtn = document.getElementById("runCircuitBtn");
const resetCircuitBtn = document.getElementById("resetCircuitBtn");
const askRoboticsBtn = document.getElementById("askRoboticsBtn");
const roboticsPromptInput = document.getElementById("roboticsPromptInput");
const roboticsAnswer = document.getElementById("roboticsAnswer");
const circuitStatus = document.getElementById("circuitStatus");

const codingInput = document.getElementById("codingInput");
const submitCodeBtn = document.getElementById("submitCodeBtn");
const codingFeedback = document.getElementById("codingFeedback");

const marketGrid = document.getElementById("marketGrid");

const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");
const chatWindow = document.getElementById("chatWindow");

const testimonials = [
  { text: "My daughter finally understands circles and area visually.", by: "Parent - Meera" },
  { text: "Cashback coins made me buy my geometry kit faster.", by: "Student - Aarav" },
  { text: "Robotics AI gave clear wiring steps before school practical.", by: "Parent - Vikram" },
  { text: "Triangle and coordinate topics are now easy for me.", by: "Student - Siya" },
  { text: "Parent wallet top-up is simple and transparent.", by: "Parent - Kavya" },
  { text: "I solved coding tasks and got coins instantly.", by: "Student - Reyansh" }
];

const marketItems = [
  {
    id: "geo-kit",
    title: "Geometry Box",
    description: "Compass, ruler, divider, protector, pencil set.",
    coinPrice: 50,
    moneyPrice: 150,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "robot-kit",
    title: "Mini Robotics Kit",
    description: "Breadboard, LEDs, wires, resistor pack.",
    coinPrice: 90,
    moneyPrice: 450,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "study-shoes",
    title: "Student Sports Shoes",
    description: "Comfortable school and activity wear shoes.",
    coinPrice: 120,
    moneyPrice: 900,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "notebook-pack",
    title: "Notebook Mega Pack",
    description: "10 premium notebooks for daily class notes.",
    coinPrice: 70,
    moneyPrice: 350,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "uniform-shirt",
    title: "Uniform Shirt",
    description: "Breathable school uniform shirt for daily wear.",
    coinPrice: 80,
    moneyPrice: 420,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "coding-book",
    title: "Beginner Coding Book",
    description: "Hands-on JavaScript logic workbook for students.",
    coinPrice: 60,
    moneyPrice: 280,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
  }
];

const topicExplainMap = {
  points: "Points, lines, rays, and planes: drag endpoints mentally to understand intersections. Parallel lines never meet, perpendicular lines meet at 90 degrees.",
  angles: "Use rotating arms to classify acute, obtuse, right, and straight angles. Complementary pairs sum to 90 and supplementary pairs sum to 180.",
  triangles: "Triangle angle sum is always 180 degrees. For right triangles, a^2 + b^2 = c^2. For a=15 and b=15, c is about 21.21.",
  quadrilaterals: "Compare side lengths and angle properties dynamically. Squares and rectangles are special parallelograms with right angles.",
  circles: "Radius is center to edge, diameter is twice radius. Area A=pi*r^2 and circumference C=2*pi*r. For r=3, A about 28.27 and C about 18.85.",
  transform: "Reflection flips shape across mirror line, rotation spins shape around a point, translation slides shape with no rotation.",
  coordinate: "Plot points on Cartesian plane, then measure distance and midpoint between two points using formulas.",
  volume: "Perimeter outlines boundaries, area covers surfaces, surface area covers all faces, and volume fills 3D space."
};

let state = loadState();
let user = loadUser();

let geometryRuntime = null;
let roboticsRuntime = {
  parts: [],
  dragging: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  bulbLit: false
};

const queryCourse = new URLSearchParams(window.location.search).get("course");

init();

function init() {
  if (user) {
    showApp();
    if (queryCourse) openCourseFromQuery(queryCourse);
  } else {
    showLogin();
  }

  bindBaseEvents();
}

function showLogin() {
  loginGate.classList.remove("hidden");
  appShell.classList.add("hidden");
}

function showApp() {
  loginGate.classList.add("hidden");
  appShell.classList.remove("hidden");
  welcomeText.textContent = `Hi ${user.name} (Grade ${user.grade})`;
  renderAll();
  initGeometry();
  initRobotics();
  spawnFeedback();
  window.setInterval(spawnFeedback, 2200);
}

function loadState() {
  const fallback = {
    coins: 120,
    money: 0,
    coinsEarned: 0,
    geometryQuestions: 0,
    roboticsBuilds: 0,
    purchases: 0,
    purchasedIds: []
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...fallback, ...saved } : fallback;
  } catch {
    return fallback;
  }
}

function loadUser() {
  try {
    const saved = JSON.parse(localStorage.getItem(USER_KEY));
    return saved || null;
  } catch {
    return null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveUser() {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function bindBaseEvents() {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    user = {
      name: document.getElementById("nameInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      password: document.getElementById("passwordInput").value,
      grade: document.getElementById("gradeInput").value.trim(),
      parentEmail: document.getElementById("parentEmailInput").value.trim()
    };
    saveUser();
    showToast("Login successful. Welcome to Brainosaur.");
    showApp();
    if (queryCourse) openCourseFromQuery(queryCourse);
  });

  navButtons.forEach(button => {
    button.addEventListener("click", () => switchSection(button.dataset.section));
  });

  moneyForm.addEventListener("submit", event => {
    event.preventDefault();
    const amount = Number(moneyInput.value);
    if (!Number.isFinite(amount) || amount <= 0) return;
    state.money += amount;
    saveState();
    renderWallet();
    showToast(`₹${amount} added by parent wallet.`);
    moneyForm.reset();
  });

  topicButtons.forEach(button => {
    button.addEventListener("click", () => {
      topicButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const topic = button.dataset.topic;
      topicExplanation.textContent = topicExplainMap[topic] || "Topic guidance will appear here.";
      const map = {
        points: "point-line",
        angles: "angles",
        triangles: "triangle",
        quadrilaterals: "quad",
        circles: "circle",
        transform: "symmetry",
        coordinate: "cartesian",
        volume: "area-volume"
      };
      shapeSelect.value = map[topic] || "cube";
      setGeometryVisual(shapeSelect.value);
    });
  });

  shapeSelect.addEventListener("change", () => {
    setGeometryVisual(shapeSelect.value);
  });

  askGeometryBtn.addEventListener("click", askGeometryQuestion);

  componentButtons.forEach(button => {
    button.addEventListener("click", () => addComponent(button.dataset.component));
  });

  runCircuitBtn.addEventListener("click", runCircuitSimulation);
  resetCircuitBtn.addEventListener("click", resetCircuit);
  askRoboticsBtn.addEventListener("click", askRoboticsAI);

  submitCodeBtn.addEventListener("click", submitCodingTask);

  assistantForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = assistantInput.value.trim();
    if (!text) return;
    appendChat(text, "user");
    appendChat(aiReply(text), "bot");
    assistantForm.reset();
  });

  window.addEventListener("resize", () => {
    if (geometryRuntime && geometryRuntime.resize) geometryRuntime.resize();
    drawRoboticsCanvas();
  });
}

function switchSection(id) {
  appSections.forEach(section => section.classList.toggle("active", section.id === id));
  navButtons.forEach(button => button.classList.toggle("active", button.dataset.section === id));
}

function openCourseFromQuery(course) {
  const supported = ["geometry", "robotics", "coding"];
  if (supported.includes(course)) switchSection(course);
}

function renderAll() {
  renderWallet();
  renderStats();
  renderMarket();
}

function renderWallet() {
  walletMoney.textContent = `₹${state.money}`;
  walletCoins.textContent = `${state.coins} Coins`;
}

function renderStats() {
  coinsEarnedStat.textContent = String(state.coinsEarned);
  geometryQuestionStat.textContent = String(state.geometryQuestions);
  roboticsBuildStat.textContent = String(state.roboticsBuilds);
  purchaseStat.textContent = String(state.purchases);
}

function addCoins(amount, reason) {
  state.coins += amount;
  state.coinsEarned += amount;
  saveState();
  renderWallet();
  renderStats();
  showToast(`${reason} +${amount} coins`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function burstCashback() {
  coinBurst.classList.remove("hidden");
  coinBurst.classList.remove("animate");
  void coinBurst.offsetWidth;
  coinBurst.classList.add("animate");
  window.setTimeout(() => coinBurst.classList.add("hidden"), 1500);
}

function spawnFeedback() {
  if (!testimonialBox) return;
  const item = testimonials[Math.floor(Math.random() * testimonials.length)];
  const node = document.createElement("div");
  node.className = "feedback-note";
  node.innerHTML = `<p>${item.text}</p><span>${item.by}</span>`;
  node.style.top = `${Math.random() * 68 + 8}%`;
  node.style.left = `${Math.random() * 65 + 4}%`;
  testimonialBox.appendChild(node);
  window.setTimeout(() => node.remove(), 5000);
}

function renderMarket() {
  marketGrid.innerHTML = marketItems.map(item => `
    <article class="market-card">
      <img src="${item.image}" alt="${escapeHtml(item.title)}">
      <div class="market-body">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="price-row">
          <strong>${item.coinPrice} coins</strong>
          <span>₹${item.moneyPrice}</span>
        </div>
        <div class="pay-buttons">
          <button class="cta-btn" data-buy-coin="${item.id}">Buy with Coins</button>
          <button class="outline-btn" data-buy-money="${item.id}">Buy with Money</button>
        </div>
      </div>
    </article>
  `).join("");

  marketGrid.querySelectorAll("[data-buy-coin]").forEach(button => {
    button.addEventListener("click", () => buyItem(button.dataset.buyCoin, "coins"));
  });
  marketGrid.querySelectorAll("[data-buy-money]").forEach(button => {
    button.addEventListener("click", () => buyItem(button.dataset.buyMoney, "money"));
  });
}

function buyItem(id, mode) {
  const item = marketItems.find(product => product.id === id);
  if (!item) return;

  if (mode === "coins") {
    if (state.coins < item.coinPrice) {
      showToast("Not enough coins for this purchase.");
      return;
    }
    state.coins -= item.coinPrice;
  } else {
    if (state.money < item.moneyPrice) {
      showToast("Not enough wallet money. Ask parent to top up.");
      return;
    }
    state.money -= item.moneyPrice;
  }

  state.purchases += 1;
  if (item.coinPrice >= 50) {
    state.coins += 30;
    state.coinsEarned += 30;
    burstCashback();
    showToast("Purchase complete. Cashback +30 coins added.");
  } else {
    showToast("Purchase complete.");
  }

  saveState();
  renderWallet();
  renderStats();
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

function askGeometryQuestion() {
  const text = geometryQuestionInput.value.trim();
  if (!text) return;
  state.geometryQuestions += 1;
  addCoins(5, "Geometry question reward.");
  const answer = geometryReply(text);
  geometryAnswer.textContent = answer;
  saveState();
  renderStats();
}

function geometryReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("pythagorean")) {
    return "Pythagorean Theorem: a^2 + b^2 = c^2 for right triangles. If a=15 and b=15, c = sqrt(450) = 21.21 approx. This works because square areas rearrange perfectly.";
  }
  if (lower.includes("circle") || lower.includes("radius")) {
    return "Circle visuals: radius is center to boundary, diameter is 2r, circumference C=2*pi*r, area A=pi*r^2. For r=3, A=28.27 and C=18.85 approx.";
  }
  if (lower.includes("angle")) {
    return "Use a rotating angle arm. Acute < 90, Right = 90, Obtuse between 90 and 180, Straight = 180. Complementary sum to 90 and supplementary sum to 180.";
  }
  if (lower.includes("triangle")) {
    return "Triangle angle sum is always 180 degrees. Try dragging one vertex and observe the other two angles adjust to keep the total constant.";
  }
  if (lower.includes("midpoint") || lower.includes("distance")) {
    return "Coordinate formulas: midpoint of (x1,y1) and (x2,y2) is ((x1+x2)/2, (y1+y2)/2). Distance is sqrt((x2-x1)^2 + (y2-y1)^2).";
  }
  return "Great question. Visual strategy: identify the shape, list known values, mark unknowns, then use formula and transformation checks. Try selecting a related topic button for guided visual.";
}

function initGeometry() {
  if (!geometryCanvas) return;
  if (window.THREE) {
    geometryRuntime = createThreeGeometryRuntime(geometryCanvas);
    setGeometryVisual(shapeSelect.value);
  } else {
    geometryRuntime = createFallbackGeometryRuntime(geometryCanvas);
    setGeometryVisual(shapeSelect.value);
  }
}

function setGeometryVisual(mode) {
  if (geometryRuntime && geometryRuntime.setMode) geometryRuntime.setMode(mode);
}

function createThreeGeometryRuntime(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f5ff);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const ambient = new THREE.AmbientLight(0xffffff, 1.1);
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 5, 6);
  scene.add(ambient, key);
  camera.position.set(0, 1.6, 6);

  const orbit = { dragging: false, lastX: 0, lastY: 0 };
  let group = new THREE.Group();
  scene.add(group);

  canvas.addEventListener("pointerdown", event => {
    orbit.dragging = true;
    orbit.lastX = event.clientX;
    orbit.lastY = event.clientY;
  });
  canvas.addEventListener("pointerup", () => {
    orbit.dragging = false;
  });
  canvas.addEventListener("pointermove", event => {
    if (!orbit.dragging) return;
    const dx = event.clientX - orbit.lastX;
    const dy = event.clientY - orbit.lastY;
    group.rotation.y += dx * 0.01;
    group.rotation.x += dy * 0.01;
    orbit.lastX = event.clientX;
    orbit.lastY = event.clientY;
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function clearGroup() {
    scene.remove(group);
    group = new THREE.Group();
    scene.add(group);
  }

  function material(color) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0.08 });
  }

  function setMode(mode) {
    clearGroup();
    if (mode === "cube") {
      group.add(new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 2.1), material(0x3a67ef)));
    } else if (mode === "sphere") {
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.3, 40, 28), material(0x6a58de)));
    } else if (mode === "cone") {
      group.add(new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.5, 40), material(0x20cda0)));
    } else if (mode === "cylinder") {
      group.add(new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2.5, 36), material(0xff8f4f)));
    } else if (mode === "pyramid") {
      group.add(new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.4, 4), material(0x3a67ef)));
    } else if (mode === "prism") {
      group.add(new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.3, 1.6), material(0x6958de)));
    } else if (mode === "point-line") {
      const points = [
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, -2, 0),
        new THREE.Vector3(0, 2, 0)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0x3a67ef }));
      group.add(line);
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 14), material(0x20cda0)));
    } else if (mode === "angles") {
      const armA = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.4, 0, 0)]);
      const armB = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.4, 1.6, 0)]);
      group.add(new THREE.Line(armA, new THREE.LineBasicMaterial({ color: 0x3a67ef })));
      group.add(new THREE.Line(armB, new THREE.LineBasicMaterial({ color: 0xff8f4f })));
      group.add(new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.04, 12, 50, Math.PI / 2), material(0x20cda0)));
    } else if (mode === "triangle") {
      const shape = new THREE.Shape();
      shape.moveTo(-1.4, -1.2);
      shape.lineTo(1.6, -1.2);
      shape.lineTo(-0.2, 1.5);
      shape.lineTo(-1.4, -1.2);
      group.add(new THREE.Mesh(new THREE.ShapeGeometry(shape), material(0x3a67ef)));
    } else if (mode === "quad") {
      const quad = new THREE.Shape();
      quad.moveTo(-1.6, -1.2);
      quad.lineTo(1.6, -1.2);
      quad.lineTo(1.1, 1.2);
      quad.lineTo(-2.1, 1.2);
      quad.lineTo(-1.6, -1.2);
      group.add(new THREE.Mesh(new THREE.ShapeGeometry(quad), material(0x6958de)));
    } else if (mode === "circle") {
      group.add(new THREE.Mesh(new THREE.CircleGeometry(1.6, 48), material(0x20cda0)));
      group.add(new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.03, 8, 54), material(0x3a67ef)));
    } else if (mode === "symmetry") {
      const left = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.8), material(0x3a67ef));
      left.position.x = -1.1;
      const right = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.8), material(0x3a67ef));
      right.position.x = 1.1;
      const mirror = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 2.4), material(0xff8f4f));
      group.add(left, right, mirror);
    } else if (mode === "cartesian") {
      group.add(new THREE.GridHelper(4, 8, 0x3a67ef, 0xbdd0ff));
      const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), material(0x20cda0));
      p1.position.set(-0.8, 0.8, 0);
      const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), material(0xff8f4f));
      p2.position.set(1, -0.4, 0);
      group.add(p1, p2);
    } else if (mode === "area-volume") {
      for (let x = -1; x <= 1; x += 1) {
        for (let y = -1; y <= 1; y += 1) {
          const cell = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), material(0x3a67ef));
          cell.position.set(x * 0.62, y * 0.62, (x + y) % 2 === 0 ? 0.2 : -0.2);
          group.add(cell);
        }
      }
    }
  }

  function animate() {
    if (!orbit.dragging) group.rotation.y += 0.004;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  resize();
  animate();
  return { resize, setMode };
}

function createFallbackGeometryRuntime(canvas) {
  const ctx = canvas.getContext("2d");
  let mode = "cube";

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    draw();
  }

  function setMode(next) {
    mode = next;
    draw();
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#edf3ff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "#3a67ef";
    ctx.lineWidth = 3;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (mode === "circle") {
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.stroke();
    } else if (mode === "triangle") {
      ctx.beginPath();
      ctx.moveTo(cx, cy - 110);
      ctx.lineTo(cx - 110, cy + 90);
      ctx.lineTo(cx + 110, cy + 90);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeRect(cx - 96, cy - 96, 192, 192);
    }
  }

  resize();
  return { resize, setMode };
}

function initRobotics() {
  if (!roboticsCanvas) return;
  const rect = roboticsCanvas.getBoundingClientRect();
  roboticsCanvas.width = rect.width * window.devicePixelRatio;
  roboticsCanvas.height = rect.height * window.devicePixelRatio;
  roboticsRuntime.ctx = roboticsCanvas.getContext("2d");
  roboticsRuntime.ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  roboticsCanvas.addEventListener("pointerdown", onRobotDown);
  roboticsCanvas.addEventListener("pointermove", onRobotMove);
  roboticsCanvas.addEventListener("pointerup", onRobotUp);
  roboticsCanvas.addEventListener("pointerleave", onRobotUp);
  drawRoboticsCanvas();
}

function drawRoboticsCanvas() {
  const ctx = roboticsRuntime.ctx;
  if (!ctx) return;
  const rect = roboticsCanvas.getBoundingClientRect();
  roboticsCanvas.width = rect.width * window.devicePixelRatio;
  roboticsCanvas.height = rect.height * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  ctx.fillStyle = "#f0f5ff";
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#cfdbfb";
  ctx.lineWidth = 2;
  ctx.fillRect(18, 18, rect.width - 36, rect.height - 36);
  ctx.strokeRect(18, 18, rect.width - 36, rect.height - 36);

  roboticsRuntime.parts.forEach(part => drawComponent(ctx, part));
}

function drawComponent(ctx, part) {
  ctx.save();
  ctx.translate(part.x, part.y);
  if (part.type === "battery") {
    ctx.fillStyle = "#3a67ef";
    ctx.fillRect(-40, -16, 80, 32);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Poppins";
    ctx.fillText("+  -", -15, 5);
  } else if (part.type === "resistor") {
    ctx.strokeStyle = "#ff8f4f";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-42, 0);
    ctx.lineTo(-20, 0);
    ctx.lineTo(-12, -10);
    ctx.lineTo(0, 10);
    ctx.lineTo(12, -10);
    ctx.lineTo(24, 10);
    ctx.lineTo(34, 0);
    ctx.lineTo(42, 0);
    ctx.stroke();
  } else if (part.type === "bulb") {
    ctx.fillStyle = roboticsRuntime.bulbLit ? "#ffd55c" : "#f7f0c8";
    ctx.strokeStyle = "#ae8a2d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -6, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#6c6c6c";
    ctx.fillRect(-8, 10, 16, 16);
  } else if (part.type === "wire") {
    ctx.strokeStyle = "#20cda0";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-42, 0);
    ctx.lineTo(42, 0);
    ctx.stroke();
  } else if (part.type === "switch") {
    ctx.strokeStyle = "#2a3d69";
    ctx.lineWidth = 3;
    ctx.strokeRect(-34, -12, 68, 24);
    ctx.beginPath();
    ctx.moveTo(-12, 6);
    ctx.lineTo(18, -6);
    ctx.stroke();
  }
  ctx.restore();
}

function addComponent(type) {
  const index = roboticsRuntime.parts.length;
  roboticsRuntime.parts.push({
    type,
    x: 90 + (index % 4) * 120,
    y: 100 + Math.floor(index / 4) * 90
  });
  drawRoboticsCanvas();
}

function hitPart(x, y) {
  for (let index = roboticsRuntime.parts.length - 1; index >= 0; index -= 1) {
    const part = roboticsRuntime.parts[index];
    if (Math.abs(x - part.x) <= 45 && Math.abs(y - part.y) <= 30) return { part, index };
  }
  return null;
}

function onRobotDown(event) {
  const rect = roboticsCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const hit = hitPart(x, y);
  if (!hit) return;
  roboticsRuntime.dragging = hit.part;
  roboticsRuntime.dragOffsetX = x - hit.part.x;
  roboticsRuntime.dragOffsetY = y - hit.part.y;
}

function onRobotMove(event) {
  if (!roboticsRuntime.dragging) return;
  const rect = roboticsCanvas.getBoundingClientRect();
  roboticsRuntime.dragging.x = event.clientX - rect.left - roboticsRuntime.dragOffsetX;
  roboticsRuntime.dragging.y = event.clientY - rect.top - roboticsRuntime.dragOffsetY;
  drawRoboticsCanvas();
}

function onRobotUp() {
  roboticsRuntime.dragging = null;
}

function runCircuitSimulation() {
  const types = roboticsRuntime.parts.map(part => part.type);
  const valid = ["battery", "resistor", "bulb", "wire"].every(type => types.includes(type));
  if (!valid) {
    roboticsRuntime.bulbLit = false;
    drawRoboticsCanvas();
    circuitStatus.textContent = "Circuit incomplete. Add battery, resistor, bulb, and wire.";
    showToast("Circuit incomplete.");
    return;
  }
  roboticsRuntime.bulbLit = true;
  state.roboticsBuilds += 1;
  addCoins(30, "Robotics simulation success.");
  saveState();
  renderStats();
  drawRoboticsCanvas();
  circuitStatus.textContent = "Circuit successful. Current flows battery -> resistor -> bulb -> wire return path.";
}

function resetCircuit() {
  roboticsRuntime.parts = [];
  roboticsRuntime.bulbLit = false;
  drawRoboticsCanvas();
  circuitStatus.textContent = "Board reset. Add components to build again.";
}

function askRoboticsAI() {
  const text = roboticsPromptInput.value.trim();
  if (!text) return;
  roboticsAnswer.textContent = roboticsReply(text);
  addCoins(5, "Robotics AI question reward.");
}

function roboticsReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("battery") && lower.includes("bulb")) {
    return "Start with battery positive terminal. Connect wire to resistor first, then from resistor to bulb positive leg, then bulb negative leg back to battery negative terminal.";
  }
  if (lower.includes("resistor")) {
    return "Resistor protects components by limiting current. Put it in series with the bulb or LED to avoid burnout.";
  }
  if (lower.includes("switch")) {
    return "Place switch in series between battery and resistor so opening switch breaks current and closes circuit safely.";
  }
  return "Build sequence: battery -> wire -> resistor -> bulb -> wire back to battery. Keep components in series for this basic circuit.";
}

function submitCodingTask() {
  const code = codingInput.value.trim();
  const normalized = code.replace(/\s+/g, "");
  const hasDouble = /doubleNumber/.test(code) && (normalized.includes("returnnum*2") || normalized.includes("return2*num"));
  const hasArea = /triangleArea/.test(code) && (normalized.includes("base*height/2") || normalized.includes("(base*height)/2"));
  if (!hasDouble || !hasArea) {
    codingFeedback.textContent = "Please include both functions: doubleNumber and triangleArea with correct formulas.";
    return;
  }
  codingFeedback.textContent = "Great work. Both functions are correct and accepted.";
  addCoins(20, "Coding challenge completed.");
}

function appendChat(text, type) {
  const node = document.createElement("div");
  node.className = `chat ${type}`;
  node.textContent = text;
  chatWindow.appendChild(node);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function aiReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("geometry")) {
    return "Geometry plan: pick one topic, identify known values, draw shape, apply formula, then verify with transformations. I can explain each step with an example.";
  }
  if (lower.includes("robot")) {
    return "Robotics plan: start with component roles, build a simple series circuit, test continuity, then add switch logic. Ask me for the next circuit level.";
  }
  if (lower.includes("code")) {
    return "Coding plan: understand input-output first, write smallest function, test with sample values, then refactor for clarity.";
  }
  if (lower.includes("coins") || lower.includes("wallet")) {
    return "You earn coins from geometry questions, robotics runs, coding tasks, and cashback purchases above 50 coins.";
  }
  return "I can help with Geometry, Robotics, Coding, wallet planning, and course roadmap. Ask your next specific question.";
}
