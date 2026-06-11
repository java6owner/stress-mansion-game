import * as THREE from "../node_modules/three/build/three.module.js";

window.__stressGameLoaded = true;

const T = {
  score: "\uC810\uC218",
  money: "\uB3C8",
  weapon: "\uBB34\uAE30",
  shop: "\uC0C1\uC810",
  title: "\uC2A4\uD2B8\uB808\uC2A4 \uD574\uC18C \uC800\uD0DD",
  copy: "\uC88C\uD074\uB9AD\uC740 \uBD80\uC218\uAE30, \uC6B0\uD074\uB9AD\uC740 \uC7A1\uACE0 \uB358\uC9C0\uAE30, E\uB294 \uBB38 \uC5F4\uAE30, B\uB294 \uB9C8\uC6B0\uC2A4 \uC7A0\uAE08 \uD574\uC81C.",
  start: "\uAC8C\uC784 \uC2DC\uC791",
  respawn: "\uBB3C\uAC74 \uB2E4\uC2DC \uC0DD\uC131",
  attack: "\uACF5\uACA9",
  buy: "\uAD6C\uB9E4",
  equip: "\uC7A5\uCC29",
  equipped: "\uC7A5\uCC29\uC911",
  damage: "\uD53C\uD574",
  range: "\uC0AC\uAC70\uB9AC",
  price: "\uC6D0",
  fist: "\uC8FC\uBA39",
  hammer: "\uB9DD\uCE58",
  bat: "\uC57C\uAD6C\uBC29\uB9DD\uC774",
  pipe: "\uC1E0\uD30C\uC774\uD504",
};

const HOUSE = {
  width: 30,
  depth: 36,
  floorHeight: 3.4,
  wallThickness: 0.22,
  yardWidth: 44,
  yardDepth: 54,
};

const PLAYER = {
  eyeHeight: 1.75,
  speed: 4.8,
  sprint: 7.8,
  radius: 0.72,
};

const WEAPON_DEFS = [
  { id: "fist", name: T.fist, price: 0, damage: 18, range: 3.0, owned: true },
  { id: "hammer", name: T.hammer, price: 80, damage: 34, range: 3.4, owned: false },
  { id: "bat", name: T.bat, price: 150, damage: 48, range: 4.1, owned: false },
  { id: "pipe", name: T.pipe, price: 230, damage: 64, range: 4.8, owned: false },
  { id: "salt", name: "\uC18C\uAE08", price: 320, damage: 22, range: 26, owned: false, throwable: true },
  { id: "poop", name: "\uB625", price: 450, damage: 34, range: 24, owned: false, throwable: true },
  { id: "narangd", name: "\uB098\uB791\uB4DC \uC0AC\uC774\uB2E4", price: 6974, damage: 9999, range: 32, owned: false, throwable: true },
];

const OBJECT_DEFS = [
  { id: "living-sofa", name: "\uC18C\uD30C", hp: 135, score: 120, money: 36, color: 0x7b584b, geometry: "sofa", position: [-8.5, 0, 8.8], rotation: [0, 1.55, 0], scale: [1.35, 1, 1] },
  { id: "living-tv", name: "TV", hp: 76, score: 100, money: 36, color: 0x101010, geometry: "tv", kind: "electronic", position: [-1.6, 1.25, 13.7], rotation: [0, 3.14, 0], scale: [1.25, 1.25, 1.25] },
  { id: "coffee-table", name: "\uD2F0\uD14C\uC774\uBE14", hp: 72, score: 70, money: 20, color: 0x6b442e, geometry: "table", position: [-5.0, 0, 8.8], rotation: [0, 0.1, 0], scale: [1.4, 1, 1] },
  { id: "jukebox", name: "\uC8FC\uD06C\uBC15\uC2A4", hp: 115, score: 135, money: 48, color: 0x8f2432, geometry: "jukebox", kind: "electronic", position: [-12.2, 0, 3.0], rotation: [0, 1.57, 0], scale: [1, 1, 1] },
  { id: "speaker-l", name: "\uC2A4\uD53C\uCEE4", hp: 64, score: 70, money: 20, color: 0x202020, geometry: "speaker", kind: "electronic", position: [-2.9, 0, 13.9], rotation: [0, 3.14, 0], scale: [1, 1, 1] },
  { id: "speaker-r", name: "\uC2A4\uD53C\uCEE4", hp: 64, score: 70, money: 20, color: 0x202020, geometry: "speaker", kind: "electronic", position: [-0.3, 0, 13.9], rotation: [0, 3.14, 0], scale: [1, 1, 1] },
  { id: "kitchen-island", name: "\uC8FC\uBC29 \uC544\uC77C\uB79C\uB4DC", hp: 140, score: 120, money: 38, color: 0xd7d1c4, geometry: "island", position: [8.0, 0, 7.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "fridge", name: "\uB0C9\uC7A5\uACE0", hp: 125, score: 125, money: 42, color: 0xbfc9d1, geometry: "fridge", position: [13.2, 0, 10.8], rotation: [0, -1.57, 0], scale: [1, 1, 1] },
  { id: "microwave", name: "\uC804\uC790\uB808\uC778\uC9C0", hp: 74, score: 95, money: 30, color: 0x9ea7ad, geometry: "microwave", kind: "electronic", position: [9.2, 1.45, 14.3], rotation: [0, 3.14, 0], scale: [1, 1, 1] },
  { id: "dining-table", name: "\uC2DD\uD0C1", hp: 95, score: 90, money: 26, color: 0x70492f, geometry: "table", position: [6.0, 0, -2.8], rotation: [0, 0.2, 0], scale: [1.75, 1.1, 1.35] },
  { id: "dining-chair-a", name: "\uC758\uC790", hp: 55, score: 55, money: 15, color: 0x59646a, geometry: "chair", position: [4.2, 0, -2.8], rotation: [0, 1.4, 0], scale: [1, 1, 1] },
  { id: "dining-chair-b", name: "\uC758\uC790", hp: 55, score: 55, money: 15, color: 0x59646a, geometry: "chair", position: [7.8, 0, -2.8], rotation: [0, -1.4, 0], scale: [1, 1, 1] },
  { id: "office-desk", name: "\uCC45\uC0C1", hp: 90, score: 90, money: 28, color: 0x5d4037, geometry: "desk", position: [-10.8, 0, -8.8], rotation: [0, 0, 0], scale: [1.25, 1, 1] },
  { id: "office-computer", name: "\uCEF4\uD4E8\uD130", hp: 80, score: 110, money: 40, color: 0x263238, geometry: "computer", kind: "electronic", position: [-10.8, 2.02, -8.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "office-chair", name: "\uC758\uC790", hp: 58, score: 60, money: 18, color: 0x455a64, geometry: "chair", position: [-10.8, 0, -6.8], rotation: [0, 3.14, 0], scale: [1, 1, 1] },
  { id: "bath-sink", name: "\uC138\uBA74\uB300", hp: 78, score: 85, money: 22, color: 0xf7f3ea, geometry: "sink", position: [11.5, 0, -10.0], rotation: [0, -1.57, 0], scale: [1, 1, 1] },
  { id: "bath-toilet", name: "\uC88C\uBCC0\uAE30", hp: 92, score: 100, money: 24, color: 0xf5f7f7, geometry: "toilet", position: [7.9, 0, -13.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "bath-shower", name: "\uC0E4\uC6CC\uBD80\uC2A4", hp: 105, score: 120, money: 34, color: 0xbfe5ee, geometry: "shower", kind: "glass", position: [12.4, 0, -14.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "bed-main", name: "\uCE68\uB300", hp: 160, score: 140, money: 42, color: 0x52749f, geometry: "bed", position: [-8.5, HOUSE.floorHeight, -9.8], rotation: [0, 1.57, 0], scale: [1.25, 1, 1.15] },
  { id: "nightstand-main", name: "\uD611\uD0C1", hp: 52, score: 50, money: 14, color: 0x6a4f3a, geometry: "cabinet", position: [-12.4, HOUSE.floorHeight, -12.2], rotation: [0, 0, 0], scale: [0.75, 0.7, 0.75] },
  { id: "lamp-main", name: "\uC2A4\uD0E0\uB4DC", hp: 45, score: 55, money: 16, color: 0xf0d294, geometry: "lamp", position: [-12.4, HOUSE.floorHeight + 1.1, -12.2], rotation: [0, 0, 0], scale: [0.8, 0.8, 0.8] },
  { id: "dresser-main", name: "\uC11C\uB78D\uC7A5", hp: 105, score: 100, money: 30, color: 0x6a4f3a, geometry: "dresser", position: [-3.0, HOUSE.floorHeight, -14.0], rotation: [0, 3.14, 0], scale: [1.1, 1, 1] },
  { id: "bed-guest", name: "\uAC8C\uC2A4\uD2B8 \uCE68\uB300", hp: 145, score: 130, money: 36, color: 0x7d5d8c, geometry: "bed", position: [9.0, HOUSE.floorHeight, -10.0], rotation: [0, -1.57, 0], scale: [1.1, 1, 1] },
  { id: "bookshelf-up", name: "\uCC45\uC7A5", hp: 110, score: 105, money: 28, color: 0x4e342e, geometry: "shelf", position: [13.0, HOUSE.floorHeight, -4.8], rotation: [0, -1.57, 0], scale: [1, 1, 1] },
  { id: "upstairs-sofa", name: "\uC2A4\uD130\uB514 \uC18C\uD30C", hp: 120, score: 110, money: 32, color: 0x5f7f73, geometry: "sofa", position: [-8.8, HOUSE.floorHeight, 7.5], rotation: [0, 1.57, 0], scale: [1.05, 0.95, 0.9] },
  { id: "upstairs-desk", name: "2\uCE35 \uCC45\uC0C1", hp: 88, score: 90, money: 27, color: 0x7a5637, geometry: "desk", position: [8.7, HOUSE.floorHeight, 7.6], rotation: [0, 3.14, 0], scale: [1.1, 1, 1] },
  { id: "upstairs-chair", name: "2\uCE35 \uC758\uC790", hp: 55, score: 55, money: 15, color: 0x4f5960, geometry: "chair", position: [8.8, HOUSE.floorHeight, 5.7], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "upstairs-plant", name: "\uD654\uBD84", hp: 44, score: 45, money: 12, color: 0x4f7c44, geometry: "plant", position: [-1.4, HOUSE.floorHeight, 6.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "upstairs-side-table", name: "2\uCE35 \uD611\uD0C1", hp: 52, score: 52, money: 14, color: 0x6a4f3a, geometry: "cabinet", position: [-5.5, HOUSE.floorHeight, 5.4], rotation: [0, 0.2, 0], scale: [0.8, 0.72, 0.8] },
  { id: "game-console", name: "\uAC8C\uC784\uAE30", hp: 55, score: 82, money: 28, color: 0x1d2630, geometry: "console", kind: "electronic", position: [2.0, HOUSE.floorHeight + 0.8, 8.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: "upstairs-monitor", name: "\uBAA8\uB2C8\uD130", hp: 52, score: 80, money: 25, color: 0x101820, geometry: "monitor", kind: "electronic", position: [1.0, HOUSE.floorHeight + 1.3, 8.0], rotation: [0, 0.15, 0], scale: [0.9, 0.9, 0.9] },
  { id: "bbq-grill", name: "\uBC14\uBCA0\uD050 \uADF8\uB9B4", hp: 120, score: 125, money: 35, color: 0x222222, geometry: "grill", position: [-11.0, 0, 25.0], rotation: [0, 0.2, 0], scale: [1, 1, 1] },
  { id: "patio-chair-a", name: "\uB9C8\uB2F9 \uC758\uC790", hp: 55, score: 55, money: 15, color: 0x315b5c, geometry: "chair", position: [-6.7, 0, 24.0], rotation: [0, -0.6, 0], scale: [1, 1, 1] },
  { id: "patio-table", name: "\uB9C8\uB2F9 \uD14C\uC774\uBE14", hp: 75, score: 75, money: 20, color: 0x8d6e63, geometry: "table", position: [-4.5, 0, 25.7], rotation: [0, 0, 0], scale: [1, 0.85, 1] },
  { id: "pool-float", name: "\uD480 \uD29C\uBE0C", hp: 38, score: 45, money: 12, color: 0xffd36d, geometry: "float", position: [7.0, 0.18, 25.0], rotation: [0, 0.2, 0], scale: [1, 1, 1] },
  { id: "vase-foyer", name: "\uC720\uB9AC\uC7A5\uC2DD", hp: 1, score: 62, money: 18, color: 0xffd7ee, geometry: "glass", kind: "glass", position: [0.2, 0, -2.4], rotation: [0, 0, 0], scale: [1, 1, 1] },
];

const GLASS_DEFS = [
  { id: "front-window-a", position: [-8.5, 1.85, -18.08], scale: [3.2, 1.75, 0.06], rotation: [0, 0, 0] },
  { id: "front-window-b", position: [8.5, 1.85, -18.08], scale: [3.2, 1.75, 0.06], rotation: [0, 0, 0] },
  { id: "living-window", position: [-15.08, 1.9, 7.5], scale: [0.06, 1.9, 4.2], rotation: [0, 0, 0] },
  { id: "kitchen-window", position: [15.08, 1.75, 8.5], scale: [0.06, 1.55, 3.2], rotation: [0, 0, 0] },
  { id: "patio-glass-left", position: [-2.2, 1.8, 18.08], scale: [3.6, 2.4, 0.07], rotation: [0, 0, 0] },
  { id: "patio-glass-right", position: [2.2, 1.8, 18.08], scale: [3.6, 2.4, 0.07], rotation: [0, 0, 0] },
  { id: "main-bedroom-window", position: [-8.5, HOUSE.floorHeight + 1.8, -18.08], scale: [3.2, 1.6, 0.06], rotation: [0, 0, 0] },
  { id: "guest-bedroom-window", position: [9.0, HOUSE.floorHeight + 1.8, -18.08], scale: [3.2, 1.6, 0.06], rotation: [0, 0, 0] },
  { id: "main-bedroom-side-window", position: [-15.08, HOUSE.floorHeight + 1.8, -11.5], scale: [0.06, 1.55, 3.0], rotation: [0, 0, 0] },
  { id: "guest-bedroom-side-window", position: [15.08, HOUSE.floorHeight + 1.8, -11.5], scale: [0.06, 1.55, 3.0], rotation: [0, 0, 0] },
];

const DOOR_DEFS = [
  { id: "front-door", position: [0, 0, -18.02], rotation: [0, 0, 0], width: 1.55, height: 2.45, color: 0x784d30, hinge: -1 },
  { id: "bath-door", position: [5.0, 0, -8.7], rotation: [0, 1.57, 0], width: 1.2, height: 2.2, color: 0x7b5a3a, hinge: 1 },
  { id: "office-door", position: [-5.0, 0, -6.0], rotation: [0, 1.57, 0], width: 1.2, height: 2.2, color: 0x7b5a3a, hinge: -1 },
  { id: "main-bedroom-door", position: [-4.2, HOUSE.floorHeight, -5.0], rotation: [0, 1.57, 0], width: 1.25, height: 2.2, color: 0x745238, hinge: 1 },
  { id: "guest-bedroom-door", position: [4.2, HOUSE.floorHeight, -5.0], rotation: [0, 1.57, 0], width: 1.25, height: 2.2, color: 0x745238, hinge: -1 },
  { id: "patio-door", position: [0, 0, 18.04], rotation: [0, 0, 0], width: 1.35, height: 2.35, color: 0x49606a, hinge: 1 },
];

const canvas = document.querySelector("#game-canvas");
const scoreValue = document.querySelector("#score-value");
const moneyValue = document.querySelector("#money-value");
const weaponValue = document.querySelector("#weapon-value");
const shopList = document.querySelector("#shop-list");
const startPanel = document.querySelector("#start-panel");
const startButton = document.querySelector("#start-button");
const respawnButton = document.querySelector("#respawn-button");
const mobileAttackButton = document.querySelector("#mobile-attack");
const loadError = document.querySelector("#load-error");
const cheatChat = document.querySelector("#cheat-chat");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf6a45f);
scene.fog = new THREE.Fog(0xf6a45f, 42, 95);

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 120);
camera.position.set(0, PLAYER.eyeHeight, 5.5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();
const breakables = [];
const fragments = [];
const projectiles = [];
const doors = [];
const colliders = [];
const keys = new Set();
const mobileKeys = new Set();
const weapons = WEAPON_DEFS.map((weapon) => ({ ...weapon }));
const objectBox = new THREE.Box3();
const otherBox = new THREE.Box3();
const tempVector = new THREE.Vector3();
const heldTarget = new THREE.Vector3();
const weaponRig = new THREE.Group();
const weaponModels = new Map();
const weaponBasePosition = new THREE.Vector3(0.44, -0.42, -0.82);
const weaponBaseRotation = new THREE.Euler(-0.16, -0.22, 0.08, "XYZ");
const WEAPON_TEXTURES = {
  fist: "/assets/fist.webp",
  hammer: "/assets/hammer.webp",
  bat: "/assets/bat.webp",
  pipe: "/assets/pipe.webp",
  salt: "/assets/salt.webp",
  poop: "/assets/poop.webp",
  narangd: "/assets/narangd.webp",
};

let score = 0;
let money = 0;
let currentWeapon = weapons[0];
let yaw = 0;
let pitch = 0;
let started = false;
let shakeTime = 0;
let shakePower = 0;
let audioContext = null;
let heldObject = null;
let playerBaseY = 0;
let weaponSwingTime = 0;
let weaponSwingDuration = 0.24;
let weaponBobTime = 0;
let cheatMode = false;

init();
animate();

function init() {
  applyKoreanText();
  createEstate();
  createLights();
  createWeaponView();
  spawnBreakables();
  renderShop();
  updateHud();

  window.addEventListener("resize", handleResize);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", (event) => keys.delete(event.code));
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  canvas.addEventListener("mousedown", handleMouseDown);
  startButton.addEventListener("click", startGame);
  respawnButton.addEventListener("click", respawnObjects);
  mobileAttackButton.addEventListener("click", attack);
  cheatChat.addEventListener("keydown", handleCheatChatKeyDown);

  document.querySelectorAll("[data-mobile]").forEach((button) => {
    const key = button.dataset.mobile;
    button.addEventListener("pointerdown", () => mobileKeys.add(key));
    button.addEventListener("pointerup", () => mobileKeys.delete(key));
    button.addEventListener("pointerleave", () => mobileKeys.delete(key));
    button.addEventListener("pointercancel", () => mobileKeys.delete(key));
  });
}

function createWeaponView() {
  weaponRig.position.copy(weaponBasePosition);
  weaponRig.rotation.copy(weaponBaseRotation);
  weaponRig.renderOrder = 10;
  camera.add(weaponRig);
  scene.add(camera);

  for (const weapon of weapons) {
    const model = createWeaponModel(weapon.id);
    model.visible = weapon.id === currentWeapon.id;
    weaponModels.set(weapon.id, model);
    weaponRig.add(model);
  }
}

function createWeaponModel(weaponId) {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xd49a6a, roughness: 0.78, map: weaponId === "fist" ? getTexture("fist") : null });
  const sleeve = new THREE.MeshStandardMaterial({ color: 0x26364a, roughness: 0.82 });

  const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.62, 8, 14), sleeve);
  forearm.position.set(0.02, -0.08, 0.25);
  forearm.rotation.set(1.18, 0.08, -0.18);
  group.add(forearm);

  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), skin);
  hand.scale.set(1.0, 0.76, 1.18);
  hand.position.set(0, 0.05, -0.12);
  hand.rotation.set(0.2, 0, -0.1);
  group.add(hand);

  if (weaponId === "fist") {
    addFinger(group, skin, [-0.12, 0.04, -0.24], 0.55);
    addFinger(group, skin, [-0.04, 0.08, -0.27], 0.35);
    addFinger(group, skin, [0.04, 0.08, -0.27], 0.18);
    addFinger(group, skin, [0.12, 0.04, -0.24], -0.03);
    return group;
  }

  addFinger(group, skin, [-0.09, 0.02, -0.19], 1.15);
  addFinger(group, skin, [-0.02, 0.04, -0.2], 1.0);
  addFinger(group, skin, [0.05, 0.04, -0.19], 0.85);
  addFinger(group, skin, [0.12, 0.01, -0.16], 0.68);

  if (weaponId === "hammer") addHammerModel(group);
  if (weaponId === "bat") addBatModel(group);
  if (weaponId === "pipe") addPipeModel(group);
  if (weaponId === "salt") addSaltModel(group);
  if (weaponId === "poop") addPoopModel(group);
  if (weaponId === "narangd") addNarangdModel(group);
  return group;
}

function getTexture(id) {
  if (!textureCache.has(id)) {
    const texture = textureLoader.load(WEAPON_TEXTURES[id]);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textureCache.set(id, texture);
  }
  return textureCache.get(id);
}

function addTextureCard(group, id, position, size, rotation = [0, 0, 0]) {
  const card = new THREE.Mesh(
    new THREE.PlaneGeometry(size[0], size[1]),
    new THREE.MeshBasicMaterial({ map: getTexture(id), transparent: true, side: THREE.DoubleSide }),
  );
  card.position.fromArray(position);
  card.rotation.set(...rotation);
  group.add(card);
  return card;
}

function addFinger(group, material, position, angle) {
  const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.16, 6, 8), material);
  finger.position.fromArray(position);
  finger.rotation.set(1.18, 0.15, angle);
  group.add(finger);
}

function addHammerModel(group) {
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.95, 14),
    new THREE.MeshStandardMaterial({ color: 0x6a4329, roughness: 0.7, map: getTexture("hammer") }),
  );
  handle.position.set(0.05, 0.1, -0.48);
  handle.rotation.set(0.3, 0.06, -0.12);
  group.add(handle);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.18, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x8d969b, metalness: 0.45, roughness: 0.32 }),
  );
  head.position.set(0.05, 0.42, -0.88);
  head.rotation.set(0.3, 0.06, -0.12);
  group.add(head);
  addTextureCard(group, "hammer", [0.12, 0.34, -0.8], [0.62, 0.26], [-0.2, 0.15, -0.2]);
}

function addBatModel(group) {
  const bat = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.08, 1.25, 12, 20),
    new THREE.MeshStandardMaterial({ color: 0xa96f3c, roughness: 0.58, map: getTexture("bat") }),
  );
  bat.position.set(0.08, 0.24, -0.68);
  bat.rotation.set(0.5, -0.04, -0.18);
  bat.scale.set(0.78, 1.0, 0.78);
  group.add(bat);

  const knob = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 10),
    new THREE.MeshStandardMaterial({ color: 0x704421, roughness: 0.62 }),
  );
  knob.position.set(0.01, -0.34, -0.2);
  group.add(knob);
  addTextureCard(group, "bat", [0.17, 0.32, -0.74], [0.58, 0.22], [-0.18, 0.3, -0.22]);
}

function addPipeModel(group) {
  const pipe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 1.25, 18),
    new THREE.MeshStandardMaterial({ color: 0x9aa5a8, metalness: 0.65, roughness: 0.24, map: getTexture("pipe") }),
  );
  pipe.position.set(0.08, 0.22, -0.68);
  pipe.rotation.set(0.52, -0.03, -0.18);
  group.add(pipe);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.06, 18),
    new THREE.MeshStandardMaterial({ color: 0xc0c8ca, metalness: 0.7, roughness: 0.2 }),
  );
  cap.position.set(0.18, 0.72, -1.18);
  cap.rotation.copy(pipe.rotation);
  group.add(cap);
  addTextureCard(group, "pipe", [0.15, 0.3, -0.76], [0.58, 0.22], [-0.18, 0.3, -0.22]);
}

function addSaltModel(group) {
  const pack = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.56, 0.12),
    new THREE.MeshStandardMaterial({ color: 0xf4eadc, roughness: 0.65, map: getTexture("salt") }),
  );
  pack.position.set(0.08, 0.14, -0.42);
  pack.rotation.set(-0.1, -0.18, 0.08);
  group.add(pack);
  addTextureCard(group, "salt", [0.08, 0.14, -0.49], [0.38, 0.56], [-0.1, -0.18, 0.08]);
}

function addPoopModel(group) {
  const mat = new THREE.MeshStandardMaterial({ color: 0x7a3f15, roughness: 0.82, map: getTexture("poop") });
  for (let i = 0; i < 3; i += 1) {
    const lump = new THREE.Mesh(new THREE.SphereGeometry(0.17 - i * 0.035, 18, 12), mat);
    lump.position.set(0.06, 0.02 + i * 0.13, -0.42);
    lump.scale.set(1.45 - i * 0.12, 0.55, 0.92);
    group.add(lump);
  }
  addTextureCard(group, "poop", [0.08, 0.16, -0.58], [0.42, 0.34], [-0.08, -0.18, 0.05]);
}

function addNarangdModel(group) {
  const bottle = new THREE.Group();
  const plastic = new THREE.MeshPhysicalMaterial({ color: 0xddefff, roughness: 0.12, transparent: true, opacity: 0.76, transmission: 0.25 });
  const label = new THREE.MeshStandardMaterial({ color: 0x1d8fd3, roughness: 0.46, map: getTexture("narangd") });
  bottle.add(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.7, 22), plastic));
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.22, 18), plastic);
  neck.position.y = 0.46;
  bottle.add(neck);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 18), new THREE.MeshStandardMaterial({ color: 0x1e7dd8, roughness: 0.42 }));
  cap.position.y = 0.61;
  bottle.add(cap);
  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.151, 0.151, 0.24, 22, 1, true), label);
  wrap.position.y = -0.02;
  bottle.add(wrap);
  bottle.position.set(0.08, 0.1, -0.45);
  bottle.rotation.set(-0.18, -0.08, 0.16);
  group.add(bottle);
  addTextureCard(group, "narangd", [0.1, 0.1, -0.66], [0.32, 0.6], [-0.1, -0.2, 0.08]);
}

function applyKoreanText() {
  document.querySelector('[data-label="score"]').textContent = T.score;
  document.querySelector('[data-label="money"]').textContent = T.money;
  document.querySelector('[data-label="weapon"]').textContent = T.weapon;
  document.querySelector("#shop-title").textContent = T.shop;
  document.querySelector("#game-title").textContent = T.title;
  document.querySelector("#game-copy").textContent = T.copy;
  startButton.textContent = T.start;
  respawnButton.textContent = T.respawn;
  mobileAttackButton.textContent = T.attack;
  loadError.classList.add("hidden");
}

function createEstate() {
  const yardMaterial = new THREE.MeshStandardMaterial({ color: 0x477a43, roughness: 0.95 });
  const patioMaterial = new THREE.MeshStandardMaterial({ color: 0xcbb79b, roughness: 0.86 });
  const woodFloor = new THREE.MeshStandardMaterial({ color: 0xb78354, roughness: 0.72 });
  const tileFloor = new THREE.MeshStandardMaterial({ color: 0xd9e2df, roughness: 0.68 });
  const upstairsCarpet = new THREE.MeshStandardMaterial({ color: 0x8d6f74, roughness: 0.92 });
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf2dfc6, roughness: 0.82 });
  const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55 });
  const exteriorWall = new THREE.MeshStandardMaterial({ color: 0xead7bf, roughness: 0.78 });

  addStaticBox([0, -0.08, 8], [HOUSE.yardWidth, 0.16, HOUSE.yardDepth], yardMaterial);
  addStaticBox([0, 0.02, 20.8], [16, 0.08, 8.2], patioMaterial);
  addPool();
  addSunsetBackdrop();

  addStaticBox([0, -0.03, 0], [HOUSE.width, 0.18, HOUSE.depth], woodFloor);
  addSecondFloorSlabs(upstairsCarpet);
  addStaticBox([0, HOUSE.floorHeight * 2 + 0.02, 0], [HOUSE.width, 0.18, HOUSE.depth], new THREE.MeshStandardMaterial({ color: 0xf8efe3, roughness: 0.8 }));

  addStaticBox([9.7, 0.1, -12.0], [9.8, 0.08, 8.8], tileFloor);
  addStaticBox([8.5, 0.1, 8.5], [13.0, 0.08, 13.5], tileFloor);

  createExteriorWalls(exteriorWall, trimMaterial);
  createInteriorWalls(wallMaterial, trimMaterial);
  createStairs();
  createRoof();
  addRoomFinishes();
  createDoors();
  addWallpaperBands();
}

function addSecondFloorSlabs(material) {
  addStaticBox([-4.0, HOUSE.floorHeight - 0.04, 0], [22.0, 0.22, HOUSE.depth], material);
  addStaticBox([12.9, HOUSE.floorHeight - 0.04, -16.0], [4.2, 0.22, 4.0], material);
  addStaticBox([12.9, HOUSE.floorHeight - 0.04, 4.8], [4.2, 0.22, 26.4], material);
  addStaticBox([10.2, HOUSE.floorHeight - 0.04, -7.2], [1.2, 0.22, 13.6], material);
}

function createRoof() {
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x5f4032, roughness: 0.74 });
  const ridgeMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2a22, roughness: 0.78 });
  const left = addStaticBox([-7.55, HOUSE.floorHeight * 2 + 1.0, 0], [17.2, 0.28, 38.0], roofMaterial);
  left.rotation.z = -0.34;
  const right = addStaticBox([7.55, HOUSE.floorHeight * 2 + 1.0, 0], [17.2, 0.28, 38.0], roofMaterial);
  right.rotation.z = 0.34;
  addStaticBox([0, HOUSE.floorHeight * 2 + 1.95, 0], [0.42, 0.36, 38.6], ridgeMaterial);
  addStaticBox([0, HOUSE.floorHeight + 0.1, -18.25], [31, 0.24, 0.28], new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
  addStaticBox([0, HOUSE.floorHeight * 2 - 0.18, -18.24], [31, 0.28, 0.34], new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
}

function addRoomFinishes() {
  const bathWall = new THREE.MeshStandardMaterial({ color: 0xbfd7dc, roughness: 0.82 });
  const mainBedWall = new THREE.MeshStandardMaterial({ color: 0xd8c4e6, roughness: 0.86 });
  const guestBedWall = new THREE.MeshStandardMaterial({ color: 0xcbd9b2, roughness: 0.86 });
  const bathFloor = new THREE.MeshStandardMaterial({ color: 0xbed7da, roughness: 0.72 });
  const bedFloor = new THREE.MeshStandardMaterial({ color: 0x9a7864, roughness: 0.9 });

  addStaticBox([10.0, 0.18, -12.0], [8.8, 0.07, 8.2], bathFloor);
  addStaticBox([10.02, 1.65, -16.86], [8.9, 3.0, 0.04], bathWall);
  addStaticBox([14.86, 1.65, -12.0], [0.04, 3.0, 8.4], bathWall);
  addStaticBox([5.14, 1.65, -12.0], [0.04, 3.0, 8.4], bathWall);

  addStaticBox([-9.0, HOUSE.floorHeight + 0.14, -11.5], [10.4, 0.06, 12.2], bedFloor);
  addStaticBox([9.0, HOUSE.floorHeight + 0.14, -11.5], [10.4, 0.06, 12.2], bedFloor);
  addStaticBox([-9.0, HOUSE.floorHeight + 1.55, -17.84], [10.8, 2.85, 0.04], mainBedWall);
  addStaticBox([-14.84, HOUSE.floorHeight + 1.55, -11.5], [0.04, 2.85, 12.4], mainBedWall);
  addStaticBox([9.0, HOUSE.floorHeight + 1.55, -17.84], [10.8, 2.85, 0.04], guestBedWall);
  addStaticBox([14.84, HOUSE.floorHeight + 1.55, -11.5], [0.04, 2.85, 12.4], guestBedWall);
}

function createExteriorWalls(material, trimMaterial) {
  const h = HOUSE.floorHeight * 2;
  addWallWithOpenings("front", -HOUSE.depth / 2, h, [
    { center: -8.5, width: 3.5, bottom: 1.05, top: 2.9 },
    { center: 0, width: 1.8, bottom: 0, top: 2.55 },
    { center: 8.5, width: 3.5, bottom: 1.05, top: 2.9 },
    { center: -8.5, width: 3.5, bottom: HOUSE.floorHeight + 1.05, top: HOUSE.floorHeight + 2.8 },
    { center: 9.0, width: 3.5, bottom: HOUSE.floorHeight + 1.05, top: HOUSE.floorHeight + 2.8 },
  ], material);
  addWallWithOpenings("back", HOUSE.depth / 2, h, [
    { center: -2.2, width: 3.9, bottom: 0.45, top: 3.0 },
    { center: 0, width: 1.6, bottom: 0, top: 2.55 },
    { center: 2.2, width: 3.9, bottom: 0.45, top: 3.0 },
  ], material);
  addWallWithOpenings("left", -HOUSE.width / 2, h, [
    { center: 7.5, width: 4.5, bottom: 0.9, top: 3.0 },
    { center: -11.5, width: 3.3, bottom: HOUSE.floorHeight + 1.0, top: HOUSE.floorHeight + 2.7 },
  ], material);
  addWallWithOpenings("right", HOUSE.width / 2, h, [
    { center: 8.5, width: 3.5, bottom: 1.0, top: 2.7 },
    { center: -11.5, width: 3.3, bottom: HOUSE.floorHeight + 1.0, top: HOUSE.floorHeight + 2.7 },
  ], material);

  for (const glass of GLASS_DEFS) addWindowFrame(glass.position, glass.scale, trimMaterial);
}

function createInteriorWalls(material, trimMaterial) {
  addWallXWithDoor(-5, -17.8, -3.6, -6.0, 0, material);
  addWallXWithDoor(5, -17.8, -7.0, -8.7, 0, material);
  addWallZWithDoor(-3.6, -15.0, -5.0, -10.8, 0, material);
  addStaticBox([10, HOUSE.floorHeight / 2, -7.0], [10.0, HOUSE.floorHeight, 0.18], material);
  addStaticBox([4.9, HOUSE.floorHeight / 2, 1.8], [0.18, HOUSE.floorHeight, 13.8], material);
  addWallZWithDoors(-5.0, -15.0, 15.0, [-4.2, 4.2], HOUSE.floorHeight, material);
  addStaticBox([0, HOUSE.floorHeight + HOUSE.floorHeight / 2, 4.2], [0.18, HOUSE.floorHeight, 18.0], material);
  addStaticBox([-4.2, HOUSE.floorHeight + HOUSE.floorHeight / 2, -11.5], [0.18, HOUSE.floorHeight, 13.0], material);
  addStaticBox([4.2, HOUSE.floorHeight + HOUSE.floorHeight / 2, -11.5], [0.18, HOUSE.floorHeight, 13.0], material);

  addStaticBox([0, 0.05, -18.0], [HOUSE.width, 0.1, 0.5], trimMaterial);
  addStaticBox([0, HOUSE.floorHeight + 0.05, -18.0], [HOUSE.width, 0.1, 0.5], trimMaterial);
}

function addWallXWithDoor(x, zMin, zMax, doorZ, yBase, material) {
  const height = HOUSE.floorHeight;
  const doorWidth = 1.55;
  const gapMin = doorZ - doorWidth / 2;
  const gapMax = doorZ + doorWidth / 2;
  if (gapMin > zMin) addStaticBox([x, yBase + height / 2, (zMin + gapMin) / 2], [0.18, height, gapMin - zMin], material);
  if (gapMax < zMax) addStaticBox([x, yBase + height / 2, (gapMax + zMax) / 2], [0.18, height, zMax - gapMax], material);
  addStaticBox([x, yBase + 2.75, doorZ], [0.2, 0.42, doorWidth + 0.18], material);
}

function addWallZWithDoor(z, xMin, xMax, doorX, yBase, material) {
  const height = HOUSE.floorHeight;
  const doorWidth = 1.55;
  const gapMin = doorX - doorWidth / 2;
  const gapMax = doorX + doorWidth / 2;
  if (gapMin > xMin) addStaticBox([(xMin + gapMin) / 2, yBase + height / 2, z], [gapMin - xMin, height, 0.18], material);
  if (gapMax < xMax) addStaticBox([(gapMax + xMax) / 2, yBase + height / 2, z], [xMax - gapMax, height, 0.18], material);
  addStaticBox([doorX, yBase + 2.75, z], [doorWidth + 0.18, 0.42, 0.2], material);
}

function addWallZWithDoors(z, xMin, xMax, doorXs, yBase, material) {
  const height = HOUSE.floorHeight;
  const doorWidth = 1.55;
  let cursor = xMin;
  for (const doorX of [...doorXs].sort((a, b) => a - b)) {
    const gapMin = doorX - doorWidth / 2;
    const gapMax = doorX + doorWidth / 2;
    if (gapMin > cursor) addStaticBox([(cursor + gapMin) / 2, yBase + height / 2, z], [gapMin - cursor, height, 0.18], material);
    addStaticBox([doorX, yBase + 2.75, z], [doorWidth + 0.18, 0.42, 0.2], material);
    cursor = gapMax;
  }
  if (cursor < xMax) addStaticBox([(cursor + xMax) / 2, yBase + height / 2, z], [xMax - cursor, height, 0.18], material);
}

function addWallWithOpenings(axis, fixed, height, openings, material) {
  const length = axis === "front" || axis === "back" ? HOUSE.width : HOUSE.depth;
  const thickness = HOUSE.wallThickness;
  const xAxis = axis === "front" || axis === "back";
  const sorted = [...openings].sort((a, b) => a.center - b.center);
  const ySpans = [[0, height]];

  let cursor = -length / 2;
  for (const opening of sorted) {
    const left = opening.center - opening.width / 2;
    const right = opening.center + opening.width / 2;
    if (left > cursor) addWallSegment(axis, fixed, (cursor + left) / 2, left - cursor, height / 2, height, material);
    if (opening.bottom > 0) addWallSegment(axis, fixed, opening.center, opening.width, opening.bottom / 2, opening.bottom, material);
    if (opening.top < height) addWallSegment(axis, fixed, opening.center, opening.width, (opening.top + height) / 2, height - opening.top, material);
    cursor = right;
  }
  if (cursor < length / 2) addWallSegment(axis, fixed, (cursor + length / 2) / 2, length / 2 - cursor, height / 2, height, material);

  function addWallSegment(localAxis, localFixed, center, size, y, ySize, mat) {
    if (xAxis) addStaticBox([center, y, localFixed], [size, ySize, thickness], mat);
    else addStaticBox([localFixed, y, center], [thickness, ySize, size], mat);
  }
}

function addWindowFrame(position, scale, material) {
  const [x, y, z] = position;
  const [sx, sy, sz] = scale;
  const horizontal = sx > sz;
  if (horizontal) {
    addStaticBox([x, y + sy / 2 + 0.08, z], [sx + 0.25, 0.12, 0.12], material);
    addStaticBox([x, y - sy / 2 - 0.08, z], [sx + 0.25, 0.12, 0.12], material);
    addStaticBox([x - sx / 2 - 0.08, y, z], [0.12, sy + 0.28, 0.12], material);
    addStaticBox([x + sx / 2 + 0.08, y, z], [0.12, sy + 0.28, 0.12], material);
  } else {
    addStaticBox([x, y + sy / 2 + 0.08, z], [0.12, 0.12, sz + 0.25], material);
    addStaticBox([x, y - sy / 2 - 0.08, z], [0.12, 0.12, sz + 0.25], material);
    addStaticBox([x, y, z - sz / 2 - 0.08], [0.12, sy + 0.28, 0.12], material);
    addStaticBox([x, y, z + sz / 2 + 0.08], [0.12, sy + 0.28, 0.12], material);
  }
}

function addWallpaperBands() {
  const bandMaterial = new THREE.MeshStandardMaterial({ color: 0xd69b83, roughness: 0.88 });
  for (const y of [1.25, HOUSE.floorHeight + 1.25]) {
    addStaticBox([0, y, -17.86], [29.4, 0.18, 0.035], bandMaterial);
    addStaticBox([0, y, 17.86], [29.4, 0.18, 0.035], bandMaterial);
    addStaticBox([-14.86, y, 0], [0.035, 0.18, 35.4], bandMaterial);
    addStaticBox([14.86, y, 0], [0.035, 0.18, 35.4], bandMaterial);
  }
}

function createStairs() {
  const wood = new THREE.MeshStandardMaterial({ color: 0x9a6a42, roughness: 0.72 });
  const steps = 18;
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    addStaticBox([12.2, t * HOUSE.floorHeight, -15.0 + i * 0.58], [3.1, 0.18, 0.62], wood);
  }
  addStaticBox([10.45, 1.55, -10.0], [0.14, 1.6, 10.4], new THREE.MeshStandardMaterial({ color: 0x5a3824, roughness: 0.6 }));
  addStaticBox([13.95, 1.55, -10.0], [0.14, 1.6, 10.4], new THREE.MeshStandardMaterial({ color: 0x5a3824, roughness: 0.6 }));
}

function createDoors() {
  for (const def of DOOR_DEFS) {
    const pivot = new THREE.Group();
    pivot.position.fromArray(def.position);
    pivot.rotation.set(...def.rotation);
    const material = new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.68 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(def.width, def.height, 0.12), material);
    door.position.set((def.width / 2) * def.hinge, def.height / 2, 0);
    door.castShadow = true;
    door.receiveShadow = true;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), new THREE.MeshStandardMaterial({ color: 0xd0b070, metalness: 0.45, roughness: 0.35 }));
    knob.position.set(-def.width * 0.35 * def.hinge, def.height * 0.52, 0.08);
    door.add(knob);
    pivot.add(door);
    pivot.userData = { def, open: false, angle: 0, target: 0, interactable: true, doorMesh: door };
    doors.push(pivot);
    scene.add(pivot);
  }
}

function addPool() {
  const water = new THREE.MeshStandardMaterial({ color: 0x3aa7c9, roughness: 0.08, metalness: 0.05, transparent: true, opacity: 0.82 });
  const rim = new THREE.MeshStandardMaterial({ color: 0xe0d1bf, roughness: 0.75 });
  addStaticBox([8.5, 0.04, 26.8], [10.8, 0.08, 6.0], rim);
  addStaticBox([8.5, 0.1, 26.8], [9.6, 0.08, 4.8], water);
}

function addSunsetBackdrop() {
  const sky = new THREE.Group();
  const colors = [0xffb25f, 0xf07d63, 0x6b6fb4];
  for (let i = 0; i < colors.length; i += 1) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 16),
      new THREE.MeshBasicMaterial({ color: colors[i], side: THREE.DoubleSide }),
    );
    panel.position.set(0, 14 + i * 12, -48);
    sky.add(panel);
  }
  const sun = new THREE.Mesh(new THREE.CircleGeometry(4.8, 48), new THREE.MeshBasicMaterial({ color: 0xffe6a3, side: THREE.DoubleSide }));
  sun.position.set(-14, 10, -47.6);
  sky.add(sun);
  scene.add(sky);
}

function createLights() {
  scene.add(new THREE.HemisphereLight(0xfff2dc, 0x4b5d7c, 1.7));

  const sunset = new THREE.DirectionalLight(0xffaa68, 4.2);
  sunset.position.set(-16, 8, -22);
  sunset.castShadow = true;
  sunset.shadow.mapSize.set(2048, 2048);
  sunset.shadow.camera.left = -30;
  sunset.shadow.camera.right = 30;
  sunset.shadow.camera.top = 30;
  sunset.shadow.camera.bottom = -30;
  scene.add(sunset);

  const windowGlow = new THREE.PointLight(0xff9a55, 3.2, 22, 1.6);
  windowGlow.position.set(0, 2.2, -13.5);
  scene.add(windowGlow);

  for (const pos of [[-8, 2.9, 8], [8, 2.9, 7], [-7, HOUSE.floorHeight + 2.6, -10], [8, HOUSE.floorHeight + 2.6, -8]]) {
    const light = new THREE.PointLight(0xfff3d1, 1.35, 13, 1.8);
    light.position.set(...pos);
    scene.add(light);
  }
}

function spawnBreakables() {
  clearBreakables();
  for (const def of [...OBJECT_DEFS, ...GLASS_DEFS.map(makeGlassDef)]) {
    const group = createBreakableObject(def);
    group.position.fromArray(def.position);
    group.rotation.set(...def.rotation);
    group.scale.set(...def.scale);
    group.userData = {
      def,
      hp: def.hp,
      maxHp: def.hp,
      breakable: true,
      velocity: new THREE.Vector3(),
      angular: new THREE.Vector3(),
      falling: false,
      held: false,
    };
    scene.add(group);
    breakables.push(group);
  }
  respawnButton.classList.add("hidden");
  respawnButton.hidden = true;
}

function makeGlassDef(def) {
  return {
    ...def,
    name: "\uCC3D\uBB38 \uC720\uB9AC",
    hp: 1,
    score: 45,
    money: 10,
    color: 0xbfefff,
    geometry: "windowGlass",
    kind: "glass",
    static: true,
  };
}

function clearBreakables() {
  if (heldObject) heldObject = null;
  for (const object of breakables.splice(0)) {
    scene.remove(object);
    disposeObject(object);
  }
}

function createBreakableObject(def) {
  if (def.geometry === "desk") return createDesk(def.color);
  if (def.geometry === "chair") return createChair(def.color);
  if (def.geometry === "tv") return createTv(def.color);
  if (def.geometry === "computer") return createComputer(def.color);
  if (def.geometry === "sofa") return createSofa(def.color);
  if (def.geometry === "shelf") return createShelf(def.color);
  if (def.geometry === "cabinet") return createCabinet(def.color);
  if (def.geometry === "lamp") return createLamp(def.color);
  if (def.geometry === "speaker") return createSpeaker(def.color);
  if (def.geometry === "console") return createConsole(def.color);
  if (def.geometry === "microwave") return createMicrowave(def.color);
  if (def.geometry === "monitor") return createMonitor(def.color);
  if (def.geometry === "bed") return createBed(def.color);
  if (def.geometry === "table") return createTable(def.color);
  if (def.geometry === "jukebox") return createJukebox(def.color);
  if (def.geometry === "island") return createKitchenIsland(def.color);
  if (def.geometry === "fridge") return createFridge(def.color);
  if (def.geometry === "sink") return createSink(def.color);
  if (def.geometry === "toilet") return createToilet(def.color);
  if (def.geometry === "shower") return createShower(def.color);
  if (def.geometry === "dresser") return createDresser(def.color);
  if (def.geometry === "grill") return createGrill(def.color);
  if (def.geometry === "float") return createPoolFloat(def.color);
  if (def.geometry === "plant") return createPlant(def.color);
  if (def.geometry === "glass") return createGlassObject(def.color);
  if (def.geometry === "windowGlass") return createWindowGlass(def.color);
  return createBox(def.color);
}

function createDesk(color) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
  addPart(group, new THREE.BoxGeometry(2.8, 0.24, 1.35), material, [0, 1.45, 0]);
  for (const x of [-1.16, 1.16]) for (const z of [-0.5, 0.5]) addPart(group, new THREE.BoxGeometry(0.18, 1.35, 0.18), material, [x, 0.72, z]);
  return group;
}

function createChair(color) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.78 });
  addPart(group, new THREE.BoxGeometry(1.1, 0.18, 1.1), material, [0, 0.95, 0]);
  addPart(group, new THREE.BoxGeometry(1.1, 1.25, 0.16), material, [0, 1.62, 0.47]);
  for (const x of [-0.43, 0.43]) for (const z of [-0.38, 0.38]) addPart(group, new THREE.BoxGeometry(0.12, 0.95, 0.12), material, [x, 0.46, z]);
  return group;
}

function createTv(color) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.35 });
  const screen = new THREE.MeshStandardMaterial({ color: 0x253a52, emissive: 0x18365f, emissiveIntensity: 0.55, roughness: 0.22 });
  addPart(group, new THREE.BoxGeometry(2.8, 1.55, 0.16), body, [0, 0, 0]);
  addPart(group, new THREE.BoxGeometry(2.52, 1.27, 0.04), screen, [0, 0, 0.105]);
  addPart(group, new THREE.BoxGeometry(0.34, 0.7, 0.24), body, [0, -1.02, 0]);
  addPart(group, new THREE.BoxGeometry(1.35, 0.12, 0.65), body, [0, -1.42, 0]);
  return group;
}

function createComputer(color) {
  const group = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x2b4054, emissive: 0x1b5588, emissiveIntensity: 0.5, roughness: 0.25 });
  addPart(group, new THREE.BoxGeometry(1.25, 0.82, 0.12), dark, [0, 0.28, 0]);
  addPart(group, new THREE.BoxGeometry(1.05, 0.62, 0.04), glow, [0, 0.28, 0.08]);
  addPart(group, new THREE.BoxGeometry(0.16, 0.48, 0.16), dark, [0, -0.36, 0]);
  addPart(group, new THREE.BoxGeometry(0.75, 0.08, 0.38), dark, [0, -0.63, 0]);
  return group;
}

function createBox(color) {
  const group = new THREE.Group();
  addPart(group, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color, roughness: 0.95 }), [0, 0.5, 0]);
  return group;
}

function createSofa(color) {
  const group = new THREE.Group();
  const fabric = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
  addPart(group, new THREE.BoxGeometry(3.4, 0.7, 1.25), fabric, [0, 0.45, 0]);
  addPart(group, new THREE.BoxGeometry(3.55, 1.25, 0.35), fabric, [0, 1.0, 0.55]);
  addPart(group, new THREE.BoxGeometry(0.35, 0.9, 1.25), fabric, [-1.85, 0.65, 0]);
  addPart(group, new THREE.BoxGeometry(0.35, 0.9, 1.25), fabric, [1.85, 0.65, 0]);
  return group;
}

function createShelf(color) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color, roughness: 0.78 });
  for (const y of [0.45, 1.15, 1.85, 2.55]) addPart(group, new THREE.BoxGeometry(1.45, 0.12, 0.42), wood, [0, y, 0]);
  addPart(group, new THREE.BoxGeometry(0.12, 2.35, 0.42), wood, [-0.72, 1.45, 0]);
  addPart(group, new THREE.BoxGeometry(0.12, 2.35, 0.42), wood, [0.72, 1.45, 0]);
  return group;
}

function createCabinet(color) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color, roughness: 0.82 });
  addPart(group, new THREE.BoxGeometry(1.35, 1.2, 0.7), wood, [0, 0.6, 0]);
  addPart(group, new THREE.BoxGeometry(0.08, 0.8, 0.04), new THREE.MeshStandardMaterial({ color: 0xb0a08a, metalness: 0.3, roughness: 0.42 }), [-0.23, 0.6, 0.37]);
  addPart(group, new THREE.BoxGeometry(0.08, 0.8, 0.04), new THREE.MeshStandardMaterial({ color: 0xb0a08a, metalness: 0.3, roughness: 0.42 }), [0.23, 0.6, 0.37]);
  return group;
}

function createLamp(color) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.45, roughness: 0.36 });
  const shade = new THREE.MeshStandardMaterial({ color, emissive: 0xffc27a, emissiveIntensity: 0.35, roughness: 0.6 });
  addPart(group, new THREE.CylinderGeometry(0.12, 0.22, 0.12, 16), metal, [0, 0.06, 0]);
  addPart(group, new THREE.CylinderGeometry(0.04, 0.04, 1.55, 12), metal, [0, 0.84, 0]);
  addPart(group, new THREE.CylinderGeometry(0.42, 0.32, 0.55, 18), shade, [0, 1.72, 0]);
  return group;
}

function createSpeaker(color) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.55 });
  const cone = new THREE.MeshStandardMaterial({ color: 0x070707, roughness: 0.35 });
  addPart(group, new THREE.BoxGeometry(0.75, 1.65, 0.55), body, [0, 0.82, 0]);
  addPart(group, new THREE.CylinderGeometry(0.22, 0.22, 0.05, 24), cone, [0, 1.08, 0.3]).rotation.x = Math.PI / 2;
  addPart(group, new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24), cone, [0, 0.5, 0.3]).rotation.x = Math.PI / 2;
  return group;
}

function createConsole(color) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.38 });
  const light = new THREE.MeshStandardMaterial({ color: 0x59ff9a, emissive: 0x24ff72, emissiveIntensity: 0.6 });
  addPart(group, new THREE.BoxGeometry(1.25, 0.22, 0.7), body, [0, 0, 0]);
  addPart(group, new THREE.BoxGeometry(0.15, 0.04, 0.04), light, [0.42, 0.14, 0.36]);
  return group;
}

function createMicrowave(color) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.35 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x1a2b35, emissive: 0x112844, emissiveIntensity: 0.25 });
  addPart(group, new THREE.BoxGeometry(1.25, 0.75, 0.72), body, [0, 0, 0]);
  addPart(group, new THREE.BoxGeometry(0.75, 0.45, 0.04), glass, [-0.15, 0.02, 0.38]);
  addPart(group, new THREE.BoxGeometry(0.18, 0.5, 0.05), body, [0.48, 0.02, 0.39]);
  return group;
}

function createMonitor(color) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.35 });
  const screen = new THREE.MeshStandardMaterial({ color: 0x243647, emissive: 0x134a76, emissiveIntensity: 0.42 });
  addPart(group, new THREE.BoxGeometry(1.45, 0.85, 0.11), body, [0, 0.25, 0]);
  addPart(group, new THREE.BoxGeometry(1.25, 0.65, 0.04), screen, [0, 0.25, 0.08]);
  addPart(group, new THREE.BoxGeometry(0.13, 0.4, 0.13), body, [0, -0.38, 0]);
  addPart(group, new THREE.BoxGeometry(0.65, 0.08, 0.35), body, [0, -0.6, 0]);
  return group;
}

function createGlassObject(color) {
  const group = new THREE.Group();
  const material = new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.52, roughness: 0.02, transmission: 0.35 });
  addPart(group, new THREE.CylinderGeometry(0.32, 0.22, 0.75, 20), material, [0, 0.38, 0]);
  addPart(group, new THREE.SphereGeometry(0.28, 20, 12), material, [0, 0.82, 0]);
  return group;
}

function createWindowGlass(color) {
  const group = new THREE.Group();
  const material = new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.36, roughness: 0.01, transmission: 0.55, side: THREE.DoubleSide });
  addPart(group, new THREE.BoxGeometry(1, 1, 1), material, [0, 0, 0]);
  return group;
}

function createBed(color) {
  const group = new THREE.Group();
  const fabric = new THREE.MeshStandardMaterial({ color, roughness: 0.88 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b442e, roughness: 0.7 });
  addPart(group, new THREE.BoxGeometry(2.4, 0.45, 3.4), fabric, [0, 0.55, 0]);
  addPart(group, new THREE.BoxGeometry(2.5, 0.5, 0.22), wood, [0, 0.95, -1.8]);
  addPart(group, new THREE.BoxGeometry(1.0, 0.16, 0.7), new THREE.MeshStandardMaterial({ color: 0xf2eadc, roughness: 0.9 }), [-0.55, 0.88, -1.15]);
  addPart(group, new THREE.BoxGeometry(1.0, 0.16, 0.7), new THREE.MeshStandardMaterial({ color: 0xf2eadc, roughness: 0.9 }), [0.55, 0.88, -1.15]);
  return group;
}

function createTable(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.76 });
  addPart(group, new THREE.BoxGeometry(2.2, 0.18, 1.35), mat, [0, 0.95, 0]);
  for (const x of [-0.85, 0.85]) for (const z of [-0.45, 0.45]) addPart(group, new THREE.BoxGeometry(0.15, 0.9, 0.15), mat, [x, 0.45, z]);
  return group;
}

function createJukebox(color) {
  const group = new THREE.Group();
  const red = new THREE.MeshStandardMaterial({ color, roughness: 0.42 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xffd36d, emissive: 0xff7a2f, emissiveIntensity: 0.7, roughness: 0.25 });
  addPart(group, new THREE.BoxGeometry(1.25, 1.8, 0.65), red, [0, 0.9, 0]);
  addPart(group, new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32, 1, false, 0, Math.PI), glow, [0, 1.45, 0.36]).rotation.x = Math.PI / 2;
  addPart(group, new THREE.BoxGeometry(0.85, 0.45, 0.05), glow, [0, 0.75, 0.36]);
  return group;
}

function createKitchenIsland(color) {
  const group = new THREE.Group();
  addPart(group, new THREE.BoxGeometry(3.6, 1.05, 1.6), new THREE.MeshStandardMaterial({ color, roughness: 0.65 }), [0, 0.53, 0]);
  addPart(group, new THREE.BoxGeometry(3.8, 0.16, 1.8), new THREE.MeshStandardMaterial({ color: 0xf4f0e8, roughness: 0.38 }), [0, 1.14, 0]);
  return group;
}

function createFridge(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.35 });
  addPart(group, new THREE.BoxGeometry(1.25, 2.3, 1.0), mat, [0, 1.15, 0]);
  addPart(group, new THREE.BoxGeometry(0.06, 1.6, 0.06), new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.45, roughness: 0.3 }), [0.5, 1.18, 0.53]);
  return group;
}

function createSink(color) {
  const group = new THREE.Group();
  const ceramic = new THREE.MeshStandardMaterial({ color, roughness: 0.34 });
  addPart(group, new THREE.BoxGeometry(1.2, 0.2, 0.72), ceramic, [0, 0.92, 0]);
  addPart(group, new THREE.BoxGeometry(0.72, 0.75, 0.5), ceramic, [0, 0.38, 0]);
  addPart(group, new THREE.CylinderGeometry(0.04, 0.04, 0.38, 12), new THREE.MeshStandardMaterial({ color: 0xa9b0b2, metalness: 0.6, roughness: 0.25 }), [0, 1.18, -0.16]);
  return group;
}

function createToilet(color) {
  const group = new THREE.Group();
  const ceramic = new THREE.MeshStandardMaterial({ color, roughness: 0.3 });
  addPart(group, new THREE.CylinderGeometry(0.43, 0.48, 0.42, 28), ceramic, [0, 0.42, 0.2]);
  addPart(group, new THREE.BoxGeometry(0.85, 0.65, 0.28), ceramic, [0, 0.88, -0.28]);
  addPart(group, new THREE.TorusGeometry(0.36, 0.06, 10, 28), ceramic, [0, 0.68, 0.2]).rotation.x = Math.PI / 2;
  return group;
}

function createShower(color) {
  const group = new THREE.Group();
  const glass = new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.38, roughness: 0.02, transmission: 0.4 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xb7c0c4, metalness: 0.35, roughness: 0.28 });
  addPart(group, new THREE.BoxGeometry(1.6, 0.12, 1.6), metal, [0, 0.08, 0]);
  addPart(group, new THREE.BoxGeometry(0.06, 2.1, 1.6), glass, [-0.8, 1.12, 0]);
  addPart(group, new THREE.BoxGeometry(1.6, 2.1, 0.06), glass, [0, 1.12, -0.8]);
  addPart(group, new THREE.BoxGeometry(0.06, 2.1, 1.6), glass, [0.8, 1.12, 0]);
  return group;
}

function createDresser(color) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color, roughness: 0.76 });
  addPart(group, new THREE.BoxGeometry(2.2, 1.45, 0.72), wood, [0, 0.72, 0]);
  for (const y of [0.35, 0.72, 1.09]) addPart(group, new THREE.BoxGeometry(1.75, 0.06, 0.05), new THREE.MeshStandardMaterial({ color: 0xc4a36b, metalness: 0.3, roughness: 0.35 }), [0, y, 0.39]);
  return group;
}

function createGrill(color) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color, metalness: 0.35, roughness: 0.42 });
  addPart(group, new THREE.BoxGeometry(1.5, 0.7, 0.8), metal, [0, 1.0, 0]);
  addPart(group, new THREE.CylinderGeometry(0.14, 0.14, 1.0, 16), metal, [-0.55, 0.45, -0.25]);
  addPart(group, new THREE.CylinderGeometry(0.14, 0.14, 1.0, 16), metal, [0.55, 0.45, -0.25]);
  addPart(group, new THREE.BoxGeometry(1.7, 0.08, 0.9), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }), [0, 1.42, 0]);
  return group;
}

function createPoolFloat(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.48 });
  addPart(group, new THREE.TorusGeometry(0.7, 0.16, 12, 32), mat, [0, 0.2, 0]).rotation.x = Math.PI / 2;
  return group;
}

function createPlant(color) {
  const group = new THREE.Group();
  const pot = new THREE.MeshStandardMaterial({ color: 0x8b4f32, roughness: 0.82 });
  const leaf = new THREE.MeshStandardMaterial({ color, roughness: 0.75 });
  addPart(group, new THREE.CylinderGeometry(0.32, 0.24, 0.45, 18), pot, [0, 0.23, 0]);
  for (let i = 0; i < 7; i += 1) {
    const blade = addPart(group, new THREE.BoxGeometry(0.08, 0.72, 0.22), leaf, [0, 0.82, 0]);
    blade.rotation.set(THREE.MathUtils.randFloat(-0.55, 0.55), (i / 7) * Math.PI * 2, THREE.MathUtils.randFloat(-0.45, 0.45));
    blade.position.x = Math.cos((i / 7) * Math.PI * 2) * 0.16;
    blade.position.z = Math.sin((i / 7) * Math.PI * 2) * 0.16;
  }
  return group;
}

function addStaticBox(position, size, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.fromArray(position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  colliders.push(mesh);
  return mesh;
}

function addPart(group, geometry, material, position) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.fromArray(position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function startGame() {
  started = true;
  startPanel.classList.add("hidden");
  ensureAudio();
  canvas.requestPointerLock?.();
}

function handleKeyDown(event) {
  if (document.activeElement === cheatChat) return;
  if (event.code === "Tab") event.preventDefault();

  if (event.code === "KeyT") {
    openCheatChat();
    return;
  }

  if (event.code === "KeyB" || event.code === "Tab") {
    togglePointerLock();
    return;
  }

  if (event.code === "KeyE") {
    interact();
    return;
  }

  if (event.code.startsWith("Digit")) {
    const slot = Number(event.code.replace("Digit", "")) - 1;
    if (slot >= 0 && slot < weapons.length) {
      buyOrEquipWeapon(weapons[slot].id);
      return;
    }
  }

  keys.add(event.code);
}

function openCheatChat() {
  if (!started) return;
  document.exitPointerLock?.();
  cheatChat.classList.remove("hidden");
  cheatChat.value = "";
  window.setTimeout(() => cheatChat.focus(), 0);
}

function closeCheatChat() {
  cheatChat.classList.add("hidden");
  cheatChat.blur();
  canvas.requestPointerLock?.();
}

function handleCheatChatKeyDown(event) {
  event.stopPropagation();
  if (event.code === "Escape") {
    closeCheatChat();
    return;
  }
  if (event.code !== "Enter") return;

  const command = cheatChat.value.trim().toLowerCase();
  if (command === "createmod") {
    cheatMode = true;
    money = Number.POSITIVE_INFINITY;
    for (const weapon of weapons) weapon.owned = true;
    updateHud();
    playShopSound();
  }
  closeCheatChat();
}

function togglePointerLock() {
  if (!started) return;
  if (document.pointerLockElement === canvas) document.exitPointerLock?.();
  else canvas.requestPointerLock?.();
}

function handleMouseMove(event) {
  if (!started || document.pointerLockElement !== canvas) return;
  yaw -= event.movementX * 0.0025;
  pitch -= event.movementY * 0.0025;
  pitch = THREE.MathUtils.clamp(pitch, -1.25, 1.25);
}

function handleMouseDown(event) {
  if (!started) return;
  if (event.button === 0) {
    canvas.requestPointerLock?.();
    attack();
  }
  if (event.button === 2) {
    canvas.requestPointerLock?.();
    if (heldObject) throwHeldObject();
    else grabObject();
  }
}

function attack() {
  if (!started) return;

  ensureAudio();
  startWeaponSwing();

  if (currentWeapon.throwable) {
    throwSpecialWeapon(currentWeapon.id);
    return;
  }

  playHitSound(false);
  addShake(0.12, 0.055);

  const hit = getBreakableHit(currentWeapon.range);
  if (!hit) return;

  const target = findBreakableRoot(hit.object);
  if (!target || target === heldObject) return;

  const isGlass = target.userData.def.kind === "glass";
  target.userData.hp -= isGlass ? target.userData.maxHp : currentWeapon.damage;
  if (target.userData.hp <= 0) destroyObject(target, hit.point);
}

function throwSpecialWeapon(type) {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const projectile = createProjectile(type);
  projectile.position.copy(camera.position).addScaledVector(direction, 0.9);
  projectile.position.y -= 0.25;
  projectile.userData = {
    type,
    velocity: direction.multiplyScalar(type === "narangd" ? 18 : 13),
    angular: new THREE.Vector3(THREE.MathUtils.randFloatSpread(7), THREE.MathUtils.randFloatSpread(9), THREE.MathUtils.randFloatSpread(7)),
    life: 3.2,
  };
  projectiles.push(projectile);
  scene.add(projectile);
  playThrowSound(type);
}

function createProjectile(type) {
  const group = new THREE.Group();
  if (type === "salt") {
    const pack = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.56, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xf3eadc, roughness: 0.65, map: getTexture("salt") }),
    );
    group.add(pack);
    return group;
  }
  if (type === "poop") {
    const mat = new THREE.MeshStandardMaterial({ color: 0x6b3512, roughness: 0.86, map: getTexture("poop") });
    for (let i = 0; i < 3; i += 1) {
      const lump = new THREE.Mesh(new THREE.SphereGeometry(0.22 - i * 0.04, 18, 12), mat);
      lump.position.y = i * 0.14;
      lump.scale.set(1.45 - i * 0.12, 0.58, 1);
      group.add(lump);
    }
    return group;
  }
  const plastic = new THREE.MeshPhysicalMaterial({ color: 0xddefff, roughness: 0.12, transparent: true, opacity: 0.78, transmission: 0.25 });
  const label = new THREE.MeshStandardMaterial({ color: 0x1d8fd3, roughness: 0.46, map: getTexture("narangd") });
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.82, 24), plastic));
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.25, 18), plastic);
  neck.position.y = 0.54;
  group.add(neck);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 18), new THREE.MeshStandardMaterial({ color: 0x1e7dd8, roughness: 0.42 }));
  cap.position.y = 0.72;
  group.add(cap);
  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.172, 0.172, 0.28, 24, 1, true), label);
  wrap.position.y = -0.03;
  group.add(wrap);
  return group;
}

function grabObject() {
  const hit = getBreakableHit(4.2);
  if (!hit) return;
  const target = findBreakableRoot(hit.object);
  if (!target || target.userData.def.kind === "glass") return;
  heldObject = target;
  target.userData.held = true;
  target.userData.falling = false;
  target.userData.velocity.set(0, 0, 0);
  target.userData.angular.set(0, 0, 0);
  playPickupSound();
}

function throwHeldObject() {
  if (!heldObject) return;
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  heldObject.userData.held = false;
  heldObject.userData.falling = true;
  heldObject.userData.velocity.copy(direction.multiplyScalar(9.5));
  heldObject.userData.velocity.y += 2.0;
  heldObject.userData.angular.set(THREE.MathUtils.randFloatSpread(7), THREE.MathUtils.randFloatSpread(7), THREE.MathUtils.randFloatSpread(7));
  heldObject = null;
  playHitSound(false);
}

function interact() {
  if (!started) return;
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  raycaster.far = 3.2;
  const meshes = doors.map((door) => door.userData.doorMesh);
  const hits = raycaster.intersectObjects(meshes, false);
  if (!hits.length) return;
  const door = hits[0].object.parent;
  door.userData.open = !door.userData.open;
  door.userData.target = door.userData.open ? door.userData.def.hinge * -1.35 : 0;
  playDoorSound();
}

function getBreakableHit(range) {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  raycaster.far = range;
  const meshes = breakables.flatMap((object) => object.children);
  const hits = raycaster.intersectObjects(meshes, false);
  return hits[0] ?? null;
}

function findBreakableRoot(mesh) {
  let current = mesh;
  while (current) {
    if (current.userData.breakable) return current;
    current = current.parent;
  }
  return null;
}

function destroyObject(object, hitPoint) {
  const { def } = object.userData;
  score += def.score;
  money += def.money;
  updateHud();

  if (def.kind === "glass") {
    playGlassSound();
    addShake(0.16, 0.08);
    createFragments(object, hitPoint, 34, 0.05, 0.18, 1.1);
  } else {
    playHitSound(true);
    addShake(0.22, 0.13);
    createFragments(object, hitPoint);
  }

  if (heldObject === object) heldObject = null;
  breakables.splice(breakables.indexOf(object), 1);
  scene.remove(object);
  disposeObject(object);
  wakeUnsupportedObjects();

  if (breakables.length === 0) {
    respawnButton.classList.remove("hidden");
    respawnButton.hidden = false;
  }
}

function createFragments(object, hitPoint, count = 18, minSize = 0.12, maxSize = 0.36, lifeScale = 1) {
  const center = object.getWorldPosition(new THREE.Vector3());
  const materialColor = object.userData.def.color;

  for (let i = 0; i < count; i += 1) {
    const size = THREE.MathUtils.randFloat(minSize, maxSize);
    const material = new THREE.MeshStandardMaterial({ color: materialColor, roughness: 0.42, transparent: true });
    const fragment = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material);
    const spawn = hitPoint ? hitPoint.clone() : center.clone();
    spawn.x += THREE.MathUtils.randFloatSpread(0.9);
    spawn.y += THREE.MathUtils.randFloat(0.1, 0.8);
    spawn.z += THREE.MathUtils.randFloatSpread(0.9);
    fragment.position.copy(spawn);
    fragment.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    fragment.castShadow = true;

    const direction = spawn.clone().sub(center).normalize();
    if (direction.lengthSq() === 0) direction.set(Math.random() - 0.5, 0.6, Math.random() - 0.5).normalize();

    fragment.userData.velocity = direction.multiplyScalar(THREE.MathUtils.randFloat(2.2, 5.8));
    fragment.userData.velocity.y += THREE.MathUtils.randFloat(2.5, 5.2);
    fragment.userData.angular = new THREE.Vector3(THREE.MathUtils.randFloatSpread(8), THREE.MathUtils.randFloatSpread(8), THREE.MathUtils.randFloatSpread(8));
    fragment.userData.life = THREE.MathUtils.randFloat(0.95, 1.45) * lifeScale;
    fragments.push(fragment);
    scene.add(fragment);
  }
}

function createBurst(position, color, count, minSize, maxSize, power, life = 1.1) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72, transparent: true });
  for (let i = 0; i < count; i += 1) {
    const size = THREE.MathUtils.randFloat(minSize, maxSize);
    const fragment = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material.clone());
    fragment.position.copy(position);
    fragment.position.x += THREE.MathUtils.randFloatSpread(0.45);
    fragment.position.y += THREE.MathUtils.randFloat(0, 0.35);
    fragment.position.z += THREE.MathUtils.randFloatSpread(0.45);
    fragment.userData.velocity = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(power),
      THREE.MathUtils.randFloat(power * 0.25, power),
      THREE.MathUtils.randFloatSpread(power),
    );
    fragment.userData.angular = new THREE.Vector3(THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10));
    fragment.userData.life = THREE.MathUtils.randFloat(life * 0.55, life);
    fragments.push(fragment);
    scene.add(fragment);
  }
}

function createNarangdExplosion(position) {
  createBurst(position, 0xf7f4df, 90, 0.08, 0.28, 13, 1.7);
  createBurst(position, 0xffa142, 70, 0.12, 0.42, 16, 1.4);

  for (let i = 0; i < 3; i += 1) {
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.5 + i * 1.4, 32, 18),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffffd0 : 0xff8f3d, transparent: true, opacity: 0.42 - i * 0.1, wireframe: i === 2 }),
    );
    shell.position.copy(position);
    shell.userData.velocity = new THREE.Vector3();
    shell.userData.angular = new THREE.Vector3();
    shell.userData.life = 0.65 + i * 0.15;
    shell.userData.expanding = true;
    fragments.push(shell);
    scene.add(shell);
  }
}

function detonateProjectile(projectile, target = null) {
  const type = projectile.userData.type;
  const position = projectile.position.clone();

  if (type === "salt") {
    createBurst(position, 0xf7f7ef, 70, 0.035, 0.12, 7.5, 1.25);
    playSaltBurstSound();
    if (target) damageTarget(target, 18, position);
  }

  if (type === "poop") {
    createBurst(position, 0x6b3512, 55, 0.08, 0.24, 6.5, 1.45);
    playPoopSound();
    if (target) damageTarget(target, 32, position);
  }

  if (type === "narangd") {
    createNarangdExplosion(position);
    playNuclearSound();
    addShake(0.75, 0.55);
    destroyAllFurniture(position);
  }

  projectiles.splice(projectiles.indexOf(projectile), 1);
  scene.remove(projectile);
  disposeObject(projectile);
}

function damageTarget(target, amount, position) {
  if (!target || target.userData.def.static) return;
  target.userData.hp -= amount;
  if (target.userData.hp <= 0) destroyObject(target, position);
}

function destroyAllFurniture(position) {
  for (const object of [...breakables]) {
    if (object.userData.def.static) continue;
    destroyObject(object, position);
  }
}

function respawnObjects() {
  spawnBreakables();
  playHitSound(false);
}

function renderShop() {
  shopList.innerHTML = "";

  for (const weapon of weapons) {
    const item = document.createElement("div");
    item.className = "shop-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    const detail = document.createElement("small");
    const slot = weapons.indexOf(weapon) + 1;
    title.textContent = `${slot}. ${weapon.name}`;
    detail.textContent = `${T.damage} ${weapon.damage} / ${T.range} ${weapon.range.toFixed(1)} / ${weapon.price}${T.price}`;
    info.append(title, detail);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = weapon.id === currentWeapon.id ? T.equipped : weapon.owned ? T.equip : T.buy;
    button.disabled = weapon.id === currentWeapon.id || (!weapon.owned && money < weapon.price);
    button.addEventListener("click", () => buyOrEquipWeapon(weapon.id));

    item.append(info, button);
    shopList.append(item);
  }
}

function buyOrEquipWeapon(weaponId) {
  const weapon = weapons.find((item) => item.id === weaponId);
  if (!weapon) return;

  if (!weapon.owned) {
    if (money < weapon.price) return;
    if (!cheatMode) money -= weapon.price;
    weapon.owned = true;
  }

  currentWeapon = weapon;
  setVisibleWeapon(weapon.id);
  updateHud();
  playShopSound();
}

function updateHud() {
  scoreValue.textContent = String(score);
  moneyValue.textContent = cheatMode ? "\u221E" : String(money);
  weaponValue.textContent = currentWeapon.name;
  renderShop();
}

function movePlayer(delta) {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(forward, camera.up).normalize();

  const direction = new THREE.Vector3();
  if (keys.has("KeyW") || mobileKeys.has("forward")) direction.add(forward);
  if (keys.has("KeyS") || mobileKeys.has("backward")) direction.sub(forward);
  if (keys.has("KeyD") || mobileKeys.has("right")) direction.add(right);
  if (keys.has("KeyA") || mobileKeys.has("left")) direction.sub(right);

  if (direction.lengthSq() > 0) {
    direction.normalize();
    const speed = keys.has("ShiftLeft") || keys.has("ShiftRight") ? PLAYER.sprint : PLAYER.speed;
    camera.position.addScaledVector(direction, speed * delta);
    weaponBobTime += delta * speed;
  }

  camera.position.x = THREE.MathUtils.clamp(camera.position.x, -HOUSE.yardWidth / 2 + PLAYER.radius, HOUSE.yardWidth / 2 - PLAYER.radius);
  camera.position.z = THREE.MathUtils.clamp(camera.position.z, -HOUSE.depth / 2 + PLAYER.radius, HOUSE.yardDepth / 2 - PLAYER.radius);
  playerBaseY = getPlayerBaseY();
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, playerBaseY + PLAYER.eyeHeight, Math.min(delta * 8, 1));
}

function setVisibleWeapon(weaponId) {
  for (const [id, model] of weaponModels) model.visible = id === weaponId;
}

function startWeaponSwing() {
  weaponSwingDuration = currentWeapon.throwable ? 0.22 : currentWeapon.id === "fist" ? 0.2 : currentWeapon.id === "hammer" ? 0.32 : 0.28;
  weaponSwingTime = weaponSwingDuration;
}

function updateWeaponView(delta) {
  const moving = keys.has("KeyW") || keys.has("KeyS") || keys.has("KeyA") || keys.has("KeyD") || mobileKeys.size > 0;
  if (!moving) weaponBobTime += delta * 1.2;

  if (weaponSwingTime > 0) weaponSwingTime = Math.max(weaponSwingTime - delta, 0);
  const raw = weaponSwingDuration > 0 ? 1 - weaponSwingTime / weaponSwingDuration : 1;
  const swing = weaponSwingTime > 0 ? Math.sin(raw * Math.PI) : 0;
  const snap = weaponSwingTime > 0 ? Math.sin(raw * Math.PI * 2) : 0;
  const bob = Math.sin(weaponBobTime * 5.2) * 0.018;
  const sideBob = Math.cos(weaponBobTime * 3.8) * 0.012;

  weaponRig.position.set(
    weaponBasePosition.x + sideBob,
    weaponBasePosition.y + bob - swing * 0.04,
    weaponBasePosition.z - swing * 0.08,
  );
  weaponRig.rotation.copy(weaponBaseRotation);

  if (currentWeapon.id === "fist") {
    weaponRig.position.z -= swing * 0.42;
    weaponRig.position.y += swing * 0.05;
    weaponRig.rotation.x += swing * 0.32;
    weaponRig.rotation.y += snap * 0.12;
    weaponRig.rotation.z += swing * 0.18;
    return;
  }

  if (currentWeapon.id === "hammer") {
    weaponRig.position.x += swing * 0.08;
    weaponRig.position.y += Math.sin(raw * Math.PI) * 0.12;
    weaponRig.rotation.x += swing * 1.05 - Math.max(snap, 0) * 0.28;
    weaponRig.rotation.y -= swing * 0.38;
    weaponRig.rotation.z -= swing * 0.62;
    return;
  }

  if (currentWeapon.id === "bat") {
    weaponRig.position.x -= swing * 0.18;
    weaponRig.position.z -= swing * 0.2;
    weaponRig.rotation.x += swing * 0.58;
    weaponRig.rotation.y += swing * 0.95;
    weaponRig.rotation.z -= swing * 1.1;
    return;
  }

  if (currentWeapon.id === "pipe") {
    weaponRig.position.x -= swing * 0.12;
    weaponRig.position.z -= swing * 0.18;
    weaponRig.rotation.x += swing * 0.7;
    weaponRig.rotation.y += swing * 0.62;
    weaponRig.rotation.z -= swing * 0.86;
    return;
  }

  if (currentWeapon.throwable) {
    weaponRig.position.z -= swing * 0.34;
    weaponRig.position.y += swing * 0.1;
    weaponRig.rotation.x += swing * 0.45;
    weaponRig.rotation.z += snap * 0.18;
  }
}

function getPlayerBaseY() {
  const x = camera.position.x;
  const z = camera.position.z;
  if (x > 10.4 && x < 14.2 && z > -15.4 && z < -4.4) {
    return THREE.MathUtils.clamp((z + 15.4) / 11.0, 0, 1) * HOUSE.floorHeight;
  }
  if (camera.position.y > HOUSE.floorHeight + 0.75 && x > -15 && x < 15 && z > -18 && z < 18) return HOUSE.floorHeight;
  return 0;
}

function updateCamera(delta) {
  const shake = new THREE.Vector3();
  if (shakeTime > 0) {
    shakeTime -= delta;
    const amount = shakePower * Math.max(shakeTime / 0.25, 0);
    shake.set(THREE.MathUtils.randFloatSpread(amount), THREE.MathUtils.randFloatSpread(amount), THREE.MathUtils.randFloatSpread(amount));
  } else {
    shakePower = 0;
  }

  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw + shake.x;
  camera.rotation.x = pitch + shake.y;
  camera.rotation.z = shake.z;
}

function updateHeldObject(delta) {
  if (!heldObject) return;
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  heldTarget.copy(camera.position).addScaledVector(direction, 2.6);
  heldTarget.y -= 0.35;
  heldObject.position.lerp(heldTarget, Math.min(delta * 12, 1));
  heldObject.rotation.y += delta * 1.5;
}

function updateDoors(delta) {
  for (const door of doors) {
    door.userData.angle = THREE.MathUtils.damp(door.userData.angle, door.userData.target, 8, delta);
    door.rotation.y = door.userData.def.rotation[1] + door.userData.angle;
  }
}

function updateFragments(delta) {
  for (let i = fragments.length - 1; i >= 0; i -= 1) {
    const fragment = fragments[i];
    fragment.userData.life -= delta;
    if (fragment.userData.expanding) {
      const grow = 1 + delta * 7.5;
      fragment.scale.multiplyScalar(grow);
      fragment.material.opacity = THREE.MathUtils.clamp(fragment.userData.life, 0, 0.5);
      if (fragment.userData.life <= 0) {
        fragments.splice(i, 1);
        scene.remove(fragment);
        disposeObject(fragment);
      }
      continue;
    }
    fragment.userData.velocity.y -= 8.8 * delta;
    fragment.position.addScaledVector(fragment.userData.velocity, delta);
    fragment.rotation.x += fragment.userData.angular.x * delta;
    fragment.rotation.y += fragment.userData.angular.y * delta;
    fragment.rotation.z += fragment.userData.angular.z * delta;
    fragment.material.opacity = THREE.MathUtils.clamp(fragment.userData.life, 0, 1);

    const floorY = fragment.position.y > HOUSE.floorHeight + 0.2 ? HOUSE.floorHeight + 0.08 : 0.08;
    if (fragment.position.y < floorY) {
      fragment.position.y = floorY;
      fragment.userData.velocity.y *= -0.25;
      fragment.userData.velocity.x *= 0.78;
      fragment.userData.velocity.z *= 0.78;
    }

    if (fragment.userData.life <= 0) {
      fragments.splice(i, 1);
      scene.remove(fragment);
      disposeObject(fragment);
    }
  }
}

function updateProjectiles(delta) {
  for (let i = projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = projectiles[i];
    projectile.userData.life -= delta;
    projectile.userData.velocity.y -= 7.5 * delta;
    projectile.position.addScaledVector(projectile.userData.velocity, delta);
    projectile.rotation.x += projectile.userData.angular.x * delta;
    projectile.rotation.y += projectile.userData.angular.y * delta;
    projectile.rotation.z += projectile.userData.angular.z * delta;

    const impact = findProjectileImpact(projectile);
    if (impact.hit || projectile.position.y <= getProjectileFloor(projectile) || projectile.userData.life <= 0) {
      detonateProjectile(projectile, impact.target);
    }
  }
}

function findProjectileImpact(projectile) {
  const projectileBox = objectBox.setFromObject(projectile);
  for (const object of breakables) {
    if (object.userData.held) continue;
    otherBox.setFromObject(object);
    if (projectileBox.intersectsBox(otherBox)) return { hit: true, target: object };
  }

  for (const collider of colliders) {
    otherBox.setFromObject(collider);
    if (projectileBox.intersectsBox(otherBox)) return { hit: true, target: null };
  }

  const outOfBounds =
    projectile.position.x < -HOUSE.yardWidth / 2 ||
    projectile.position.x > HOUSE.yardWidth / 2 ||
    projectile.position.z < -HOUSE.depth / 2 ||
    projectile.position.z > HOUSE.yardDepth / 2;
  return { hit: outOfBounds, target: null };
}

function getProjectileFloor(projectile) {
  return projectile.position.y > HOUSE.floorHeight + 0.25 ? HOUSE.floorHeight + 0.05 : 0.05;
}

function updateBreakablePhysics(delta) {
  for (const object of breakables) {
    if (object.userData.def.static) continue;
    if (object.userData.held) continue;
    objectBox.setFromObject(object);
    const floorY = objectBox.min.y > HOUSE.floorHeight - 0.5 ? HOUSE.floorHeight : 0;
    const bottom = objectBox.min.y;
    const supportTop = findSupportTop(object, objectBox, object.userData.falling, floorY);
    const unsupported = bottom > floorY + 0.04 && supportTop === null;

    if (unsupported && !object.userData.falling) {
      object.userData.falling = true;
      object.userData.velocity.set(THREE.MathUtils.randFloatSpread(0.35), -0.35, THREE.MathUtils.randFloatSpread(0.35));
      object.userData.angular.set(THREE.MathUtils.randFloatSpread(1.4), THREE.MathUtils.randFloatSpread(1.1), THREE.MathUtils.randFloatSpread(1.4));
    }

    if (!object.userData.falling) continue;

    const previousPosition = object.position.clone();
    const impactSpeed = object.userData.velocity.length();
    object.userData.velocity.y -= 12.5 * delta;
    object.userData.velocity.x *= 0.992;
    object.userData.velocity.z *= 0.992;
    object.position.addScaledVector(object.userData.velocity, delta);
    object.rotation.x += object.userData.angular.x * delta;
    object.rotation.y += object.userData.angular.y * delta;
    object.rotation.z += object.userData.angular.z * delta;

    objectBox.setFromObject(object);
    const staticImpact = findStaticImpact(objectBox);
    if (staticImpact) {
      object.position.copy(previousPosition);
      object.userData.velocity.reflect(staticImpact.normal).multiplyScalar(0.58);
      object.userData.angular.add(new THREE.Vector3(THREE.MathUtils.randFloatSpread(5), THREE.MathUtils.randFloatSpread(5), THREE.MathUtils.randFloatSpread(5)));
      damageThrownObject(object, impactSpeed * 4.2, previousPosition);
      continue;
    }

    const landingTop = findSupportTop(object, objectBox, true, floorY) ?? floorY;
    if (objectBox.min.y <= landingTop + 0.02 && object.userData.velocity.y <= 0) {
      object.position.y += landingTop - objectBox.min.y;
      if (impactSpeed > 5) damageThrownObject(object, impactSpeed * 2.1, object.position);
      object.userData.velocity.y *= -0.16;
      object.userData.velocity.x *= 0.62;
      object.userData.velocity.z *= 0.62;
      object.userData.angular.multiplyScalar(0.58);

      if (Math.abs(object.userData.velocity.y) < 0.28) {
        object.userData.velocity.set(0, 0, 0);
        object.userData.angular.multiplyScalar(0.25);
        object.userData.falling = false;
      }
    }
  }
}

function findStaticImpact(box) {
  for (const collider of colliders) {
    otherBox.setFromObject(collider);
    const height = otherBox.max.y - otherBox.min.y;
    const isFloorLike = height <= 0.32 && otherBox.max.y <= HOUSE.floorHeight + 0.22;
    if (isFloorLike) continue;
    if (!box.intersectsBox(otherBox)) continue;

    const overlapX = Math.min(box.max.x - otherBox.min.x, otherBox.max.x - box.min.x);
    const overlapY = Math.min(box.max.y - otherBox.min.y, otherBox.max.y - box.min.y);
    const overlapZ = Math.min(box.max.z - otherBox.min.z, otherBox.max.z - box.min.z);
    if (overlapY <= overlapX && overlapY <= overlapZ) {
      return { normal: new THREE.Vector3(0, box.getCenter(tempVector).y > otherBox.getCenter(new THREE.Vector3()).y ? 1 : -1, 0) };
    }
    if (overlapX <= overlapZ) {
      return { normal: new THREE.Vector3(box.getCenter(tempVector).x > otherBox.getCenter(new THREE.Vector3()).x ? 1 : -1, 0, 0) };
    }
    return { normal: new THREE.Vector3(0, 0, box.getCenter(tempVector).z > otherBox.getCenter(new THREE.Vector3()).z ? 1 : -1) };
  }
  return null;
}

function damageThrownObject(object, amount, position) {
  if (!object.userData?.def || object.userData.def.static) return;
  object.userData.hp -= amount;
  if (object.userData.hp <= 0) destroyObject(object, position);
}

function wakeUnsupportedObjects() {
  for (const object of breakables) {
    objectBox.setFromObject(object);
    const floorY = objectBox.min.y > HOUSE.floorHeight - 0.5 ? HOUSE.floorHeight : 0;
    if (objectBox.min.y <= floorY + 0.04) continue;
    if (findSupportTop(object, objectBox, false, floorY) !== null) continue;
    object.userData.falling = true;
  }
}

function findSupportTop(object, box, moving, floorY) {
  let supportTop = box.min.y <= floorY + 0.22 ? floorY : null;
  const maxGap = moving ? 0.72 : 0.22;

  for (const other of breakables) {
    if (other === object || other.userData.held) continue;
    otherBox.setFromObject(other);
    const gap = box.min.y - otherBox.max.y;
    if (gap < -0.35 || gap > maxGap) continue;
    if (!boxesOverlapXZ(box, otherBox, 0.08)) continue;
    if (supportTop === null || otherBox.max.y > supportTop) supportTop = otherBox.max.y;
  }

  return supportTop;
}

function boxesOverlapXZ(a, b, margin = 0) {
  return a.max.x > b.min.x + margin && a.min.x < b.max.x - margin && a.max.z > b.min.z + margin && a.min.z < b.max.z - margin;
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.04);
  if (started) movePlayer(delta);
  updateCamera(delta);
  updateDoors(delta);
  if (started) {
    updateWeaponView(delta);
    updateHeldObject(delta);
    updateProjectiles(delta);
    updateBreakablePhysics(delta);
  }
  updateFragments(delta);
  renderer.render(scene, camera);
}

function addShake(time, power) {
  shakeTime = Math.max(shakeTime, time);
  shakePower = Math.max(shakePower, power);
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
}

function playHitSound(isBreak) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const now = audioContext.currentTime;
  osc.type = isBreak ? "sawtooth" : "square";
  osc.frequency.setValueAtTime(isBreak ? 82 : 145, now);
  osc.frequency.exponentialRampToValueAtTime(isBreak ? 36 : 70, now + 0.16);
  filter.type = "lowpass";
  filter.frequency.value = isBreak ? 900 : 500;
  gain.gain.setValueAtTime(isBreak ? 0.26 : 0.13, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + (isBreak ? 0.32 : 0.12));
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + (isBreak ? 0.34 : 0.14));
}

function playGlassSound() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  for (let i = 0; i < 7; i += 1) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(THREE.MathUtils.randFloat(900, 2600), now + i * 0.01);
    filter.type = "highpass";
    filter.frequency.value = 760;
    gain.gain.setValueAtTime(0.075, now + i * 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24 + i * 0.018);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now + i * 0.01);
    osc.stop(now + 0.28 + i * 0.018);
  }
}

function playShopSound() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.setValueAtTime(660, now + 0.07);
  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

function playDoorSound() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(95, now + 0.18);
  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

function playPickupSound() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(310, now + 0.08);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.14);
}

function playThrowSound(type) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  osc.type = type === "narangd" ? "sawtooth" : "triangle";
  osc.frequency.setValueAtTime(type === "narangd" ? 180 : 260, now);
  osc.frequency.exponentialRampToValueAtTime(type === "poop" ? 95 : 150, now + 0.14);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.18);
}

function playSaltBurstSound() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  for (let i = 0; i < 4; i += 1) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(THREE.MathUtils.randFloat(900, 1800), now + i * 0.015);
    filter.type = "highpass";
    filter.frequency.value = 1200;
    gain.gain.setValueAtTime(0.04, now + i * 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now + i * 0.015);
    osc.stop(now + 0.2);
  }
}

function playPoopSound() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const now = audioContext.currentTime;
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(95, now);
  osc.frequency.exponentialRampToValueAtTime(38, now + 0.22);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(420, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + 0.22);
  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.32);
}

function playNuclearSound() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(70, now);
  osc.frequency.exponentialRampToValueAtTime(18, now + 0.85);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1800, now);
  filter.frequency.exponentialRampToValueAtTime(90, now + 0.85);
  gain.gain.setValueAtTime(0.55, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 1.1);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function disposeObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
    else child.material?.dispose();
  });
}
