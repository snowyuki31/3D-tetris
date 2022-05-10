import createMino from './mino.js';

let mino = new createMino(0, 0);
console.log(mino.cubes);

var camera;
var scene;
var renderer;
var controls;
var target;

// GAME SETTINGS
const MAX_HEIGHT = 5;


// CUBE SETTINGS;
var CUBE_SIZE = 1;
const REM = 30;
var field = [...Array(100)].map(k=>[...Array(100)].map(k=>[...Array(100)].map(k=>null)));
function getField(vector) {
  return field[vector.x + REM][vector.y + REM][vector.z + REM];
}
function putField(vector, object) {
  field[vector.x + REM][vector.y + REM][vector.z + REM] = object;
}
function doesExist(vector) {
  return field[vector.x + REM][vector.y + REM][vector.z + REM] != null;
}
function checkReachable() {
  var flag = true;

  target.children.forEach(element => {
    scene.updateMatrixWorld();
    target.updateMatrixWorld();        
    var curPosition = new THREE.Vector3();
    curPosition.setFromMatrixPosition(element.matrixWorld);

    if (doesExist(curPosition)) flag = false;
  });

  return flag;
}

// Logic
function generateNewMino() {
  var val = Math.floor(Math.random() * 7);

  var tar;

  if (val == 0) tar = createMinoI();
  else if(val == 1) tar = createMinoS();
  else if(val == 2) tar = createMinoZ();
  else if(val == 3) tar = createMinoT();
  else if(val == 4) tar = createMinoO();
  else if(val == 5) tar = createMinoJ();
  else if(val == 6) tar = createMinoL();

  tar.position.set(getRandomInt(-2, 4), CUBE_SIZE * MAX_HEIGHT, getRandomInt(-2, 4));

  var valy = Math.floor(Math.random() * 4);
  tar.rotation.y = valy * (Math.PI / 2);
  
  scene.add(tar);

  return tar;
}

var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {
    var sp = true;
}else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
    var sp = true;
}

// Utils
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function createField() {
  var grid_count = 10;
  var grid_size = grid_count * CUBE_SIZE;
  var grid = new THREE.GridHelper(grid_size, grid_count);
  grid.material.color = new THREE.Color(0xaaaaaa);
  grid.position.set(0.5, -0.5, 0.5);
  return grid;
}


function createMinoI() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 4; ++x) {
      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x92D7E7} ) );
      line.position.set(x * CUBE_SIZE - 2 * CUBE_SIZE, 0, 0);
      group.add(line);
    }

    return group;
}

function createMinoO() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 2; ++x) for(var y = 0; y < 1; ++y) for(var z = 0; z < 2; ++z) {
      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xE8C473} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, y * CUBE_SIZE - CUBE_SIZE, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}

function createMinoJ() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 1 && z == 0) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x1E90FF} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, 0, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}

function createMinoL() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 1 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffa500} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, 0, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}

function createMinoS() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 2 && z == 1) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x008000} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, 0, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}

function createMinoZ() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 1) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xE45653} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, 0, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}

function createMinoT() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xa260bf} ) );
      line.position.set(x * CUBE_SIZE - CUBE_SIZE, 0, z * CUBE_SIZE - CUBE_SIZE);
      group.add(line);
    }

    return group;
}


function initializer() {
  scene.remove(target);

  // Field
  for(var x = 0; x < 100; ++x) 
    for(var y = 0; y < 100; ++y)
      for(var z = 0; z < 100; ++z){
        if(field[x][y][z] != null && field[x][y][z] != false){
          scene.remove(field[x][y][z]);
          field[x][y][z] = null;
        }
  }

  for(var x = -12; x <= 12; ++x) {
    for(var z = -12; z <= 12; ++z) {
      putField(new THREE.Vector3(x, -1, z), false);

      if(x <= -5 || x >= 6 || z <= -5 || z >= 6) {
        for(var y = -1; y <= 30; ++y) {
          putField(new THREE.Vector3(x, y, z), false);
        }
      }
    }
  }

  target = generateNewMino();
}


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // var axes = new THREE.AxisHelper(25);
    // scene.add(axes);

    // Field Setting.
    var field = createField();
    scene.add(field);

    // Camera Setting.
    camera.position.set(0.5, 5, 20);

    controls = new THREE.OrbitControls(camera, document.body);
    controls.enables = false;
    controls.keys = {LEFT: null, UP: null, RIGHT: null, BOTTOM: null};
    // controls.enabled = false;

    // if(sp){
    //   var gcontrols = new THREE.DeviceOrientationControls(camera, renderer.domElement);
    // }else{
    //   var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // }

    // SpotLight setting.
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 50, -20);
    spotLight.castShadow = true;
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

    initializer();


    // Logic
    // Alter
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
        
        putField(cube.position, cube);
      });
    }

    // Delete
    function flush() {
      for (var y = 0; y <= 20; ++y) {
        // 面揃い
        var flag_surface = true;
        for(var x = -4; x <= 5; ++x) {
          for(var z = -4; z <= 5; ++z) {
            if(!doesExist(new THREE.Vector3(x, y, z))) flag_surface = false;
          }
        }
        if(flag_surface) {
          for(var x = -4; x <= 5; ++x) for(var z = -4; z <= 5; ++z) {
            scene.remove(getField(new THREE.Vector3(x, y, z)));
            putField(new THREE.Vector3(x, y, z), null);
          }
        }

        // 行揃い
        for(var x = -4; x <= 5; ++x) {
          var flag_col = true;
          for(var z = -4; z <= 5; ++z) {
            if(!doesExist(new THREE.Vector3(x, y, z))) flag_col = false;
          }
          if(flag_col) {
            for(var z = -4; z <= 5; ++z) {
              scene.remove(getField(new THREE.Vector3(x, y, z)));
              putField(new THREE.Vector3(x, y, z), null);
            }
          }
        }

        // 列揃い
        for(var z = -4; z <= 5; ++z) {
          var flag_row = true;
          for(var x = -4; x <= 5; ++x) {
            if(!doesExist(new THREE.Vector3(x, y, z))) flag_row = false;
          }
          if(flag_row) {
            for(var x = -4; x <= 5; ++x) {
              scene.remove(getField(new THREE.Vector3(x, y, z)));
              putField(new THREE.Vector3(x, y, z), null);
            }
          }
        }
      }
    }


    // Clock
    var clock = new THREE.Clock();
    clock.start();
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

        if (!checkReachable()){
          target.translateY(CUBE_SIZE);

          alterObject(target);
          scene.remove(target);
          flush();
          target = generateNewMino();

          // GemeOver判定
          if(!checkReachable()) initializer();
        }
      }
      // Render again.
      render();
    }
    animate();
}


// Key Event
window.addEventListener("keydown", handleKeydown);
function handleKeydown(event){
  var keyCode = event.keyCode;
  // 条件文で制御する
  if (keyCode == 39){
    // target.translateX(CUBE_SIZE); // Right
    // if(!checkReachable()) target.translateX(-CUBE_SIZE);

    target.position.x += CUBE_SIZE// Right
    if(!checkReachable()) target.position.x -= CUBE_SIZE;
  }
  if (keyCode == 37){
    target.position.x -= CUBE_SIZE// Left
    if(!checkReachable()) target.position.x += CUBE_SIZE;
  }
  if (keyCode == 38) {
    target.position.z -= CUBE_SIZE// Up
    if(!checkReachable()) target.position.z += CUBE_SIZE;
  }
  if (keyCode == 40){
    target.position.z += CUBE_SIZE// Up
    if(!checkReachable()) target.position.z -= CUBE_SIZE;
  }
  if (keyCode == 32){
    target.position.y -= CUBE_SIZE; // Space
    if(!checkReachable()) target.position.y += CUBE_SIZE;
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

}

// For resizing.
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);
window.onload = init;