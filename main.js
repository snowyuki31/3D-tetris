import createMino from './createMino.js';
import gameField from './gameField.js';
import { getRandomInt, shuffle } from './utils.js';

// Vals
var camera;
var scene;
var renderer;
var controls;
var target;
var field = new gameField();
var is_game_started = false;

var clock = new THREE.Clock();
clock.start();

// GAME SETTINGS
const MAX_HEIGHT = 5;
const CUBE_SIZE = 1;

// UA
var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {
    var sp = true;
}else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
    var sp = true;
}


// Logic
var bag = [];
function randomGenerator() {
  if (bag.length == 0) {
    bag = [0, 1, 2, 3, 4, 5, 6];
    shuffle(bag);
  }
  return bag.pop();
}

function generateNewMino() {
  let val = randomGenerator();
  let tar = new createMino(val).cubes;

  let valy = Math.floor(Math.random() * 4);
  tar.rotation.y = valy * (Math.PI / 2);

  for(var _ = 0; _ < 200; ++_) {
    tar.position.set(getRandomInt(-4, 6), CUBE_SIZE * MAX_HEIGHT, getRandomInt(-4, 6));
    if (checkReachable(tar)) break;
  }

  scene.add(tar);

  return tar;
}

function checkReachable(target) {
  var flag = true;  
  target.children.forEach(element => {
    scene.updateMatrixWorld();
    target.updateMatrixWorld();        
    var curPosition = new THREE.Vector3();
    curPosition.setFromMatrixPosition(element.matrixWorld);

    if (field.doesObjectExist(curPosition)) flag = false;
  });

  return flag;
}

function alterObject(object) {
  object.children.forEach(element => {
    scene.updateMatrixWorld();
    target.updateMatrixWorld();
    var curPosition = new THREE.Vector3();
    curPosition.setFromMatrixPosition(element.matrixWorld);

    var cubeGeom = new THREE.CubeGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    var material = new THREE.MeshLambertMaterial({color: element.material.color });
    var cube = new THREE.Mesh(cubeGeom, material);
    cube.position.set(curPosition.x, curPosition.y, curPosition.z);
    scene.add(cube);
    
    field.putObject(cube.position, cube);
  });
}

function createGrid() {
  var grid_count = 10;
  var grid_size = grid_count * CUBE_SIZE;
  var grid = new THREE.GridHelper(grid_size, grid_count);
  grid.material.color = new THREE.Color(0xaaaaaa);
  grid.position.set(0.5, -0.5, 0.5);
  return grid;
}

function load_field() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Grid Setting.
  var grid = createGrid();
  scene.add(grid);

  // Camera Setting.
  camera.position.set(0.5, 5, 20);
  controls = new THREE.OrbitControls(camera, document.body);
  controls.enables = false;
  controls.keys = {LEFT: null, UP: null, RIGHT: null, BOTTOM: null};

  // SpotLight setting.
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 50, -20);
  scene.add(spotLight);

  // 全方向から色が見えるよう4つのライトを向かい合わせで配置
  var bright = 0.8
  var add_light = (x, y, z) => {
    var directionalLight = new THREE.DirectionalLight('#ffffff', bright);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);
  }
  add_light(10, 10, 10);
  add_light(-10, -10, -10);
  add_light(-10, 10, 10);
  add_light(10, -10, -10);

  // Render
  renderer.render(scene, camera);
}

function initialize() {
  scene.remove(target);
  field.initialize(scene);
  target = generateNewMino();
}

function lp() {
  load_field();
  initialize();
  var time = 0;
  
  function animate() {
    if(is_game_started) return;

    window.requestAnimationFrame( animate );
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    
    var curTime = Math.trunc(clock.getElapsedTime());
    if (curTime > time) {
      time = curTime;

      target.translateY(-CUBE_SIZE);

      if (!checkReachable(target)){
        target.translateY(CUBE_SIZE);

        alterObject(target);
        scene.remove(target);
        field.flushObjects(scene);
        target = generateNewMino();

        // GemeOver判定
        if(!checkReachable(target)) initialize();
      }
    }

    var elapsed_time = clock.getElapsedTime();
    camera.position.set(20 * Math.sin(elapsed_time * 0.1), 5, 20 * Math.cos(elapsed_time * 0.1));
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Render again.
    renderer.render(scene, camera);
  }
  animate();
}

// Start Game
let button = document.getElementById('start_button');
let explain = document.getElementsByClassName('explain')[0];
button.addEventListener('click', ()=>{ explain.style.display='none'; });
button.addEventListener('click', main);

function main() {
  is_game_started = true;

  initialize();

  // Clock
  var time = 0;

  function render() {
    controls.update();
    renderer.render(scene, camera);
  }
        
  function animate() {
    window.requestAnimationFrame( animate );
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    var curTime = Math.trunc(clock.getElapsedTime());

    if (curTime > time) {
      time = curTime;

      target.translateY(-CUBE_SIZE);

      if (!checkReachable(target)){
        target.translateY(CUBE_SIZE);

        alterObject(target);
        scene.remove(target);
        field.flushObjects(scene);
        target = generateNewMino();

        // GemeOver判定
        if(!checkReachable(target)) initialize();
      }
    }
    // Render again.
    render();
  }
  animate();
}


// Key Event
var prev_keycode = -999;
var prev_keytime = -999;
window.addEventListener("keydown", handleKeydown);
function handleKeydown(event){
  var keyCode = event.keyCode;
  // 条件文で制御する
  if (keyCode == 39){
    target.position.x += CUBE_SIZE// Right
    if(!checkReachable(target)) target.position.x -= CUBE_SIZE;
  }
  if (keyCode == 37){
    target.position.x -= CUBE_SIZE// Left
    if(!checkReachable(target)) target.position.x += CUBE_SIZE;
  }
  if (keyCode == 38) {
    target.position.z -= CUBE_SIZE// Up
    if(!checkReachable(target)) target.position.z += CUBE_SIZE;
  }
  if (keyCode == 40){
    target.position.z += CUBE_SIZE// Up
    if(!checkReachable(target)) target.position.z -= CUBE_SIZE;
  }
  if (keyCode == 32){
    if (prev_keycode == 32 && (clock.getElapsedTime() - prev_keytime <= 0.3)) {
      while(checkReachable(target)) target.position.y -= CUBE_SIZE;
      target.position.y += CUBE_SIZE;
      prev_keycode = -999;
    }
    else {
      target.position.y -= CUBE_SIZE; // Space
      if(!checkReachable(target)) target.position.y += CUBE_SIZE;
    }
  }


  // if (keyCode == 81){
  //   // target.rotation.x += (Math.PI / 2); // Q
  //   // if(!checkReachable()) target.rotation.x -= (Math.PI / 2);

  //   target.rotateX(Math.PI / 2);
  //   if(!checkReachable()) target.rotateX(-Math.PI / 2);

  //   scene.updateMatrixWorld();
  //   target.updateMatrixWorld();
  // }
  // if (keyCode == 87){
  //   target.rotation.x -= (Math.PI / 2); // W
  //   if(!checkReachable()) target.rotation.x += (Math.PI / 2);
  // }

  // if (keyCode == 65){
  //   target.rotation.z += (Math.PI / 2); // A
  //   if(!checkReachable()) target.rotation.z -= (Math.PI / 2);
  // }
  // if (keyCode == 83){
  //   target.rotation.z -= (Math.PI / 2); // S
  //   if(!checkReachable()) target.rotation.z += (Math.PI / 2);
  // }

  // if (keyCode == 90){
  //   target.rotation.y += (Math.PI / 2); // Z
  //   if(!checkReachable()) target.rotation.y -= (Math.PI / 2);
  // }
  // if (keyCode == 88){
  //   target.rotation.y -= (Math.PI / 2); // X
  //   if(!checkReachable()) target.rotation.y += (Math.PI / 2);
  // }

    prev_keycode = keyCode;
    prev_keytime = clock.getElapsedTime();
}

// For resizing.
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);


// onload
if (is_game_started) window.onload = main;
else window.onload = lp;
