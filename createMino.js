const MINO_COLOR_I = 0x92D7E7;
const MINO_COLOR_O = 0xE8C473;
const MINO_COLOR_J = 0x1E90FF;
const MINO_COLOR_L = 0xffa500;
const MINO_COLOR_S = 0x008000;
const MINO_COLOR_Z = 0xE45653;
const MINO_COLOR_T = 0xa260bf;

const CUBE_SIZE = 1;


class createMino {
  constructor(mino_type) {
    console.log(mino_type);
    switch(mino_type) {
      case 0:
        this.cubes = this.createMinoI();
        break;
      case 1:
        this.cubes = this.createMinoJ();
        break;
      case 2:
        this.cubes = this.createMinoL();
        break;
      case 3:
        this.cubes = this.createMinoO();
        break;
      case 4:
        this.cubes = this.createMinoS();
        break;
      case 5:
        this.cubes = this.createMinoT();
        break;
      case 6:
        this.cubes = this.createMinoZ();
        break;
    }
  }
  
  createMinoI() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 4; ++x) {
      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_I } ) );
      line.position.set((x - 2) * CUBE_SIZE, 0, 0);
      group.add(line);
    }

    return group;
  }

  createMinoO() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 2; ++x) for(var y = 0; y < 1; ++y) for(var z = 0; z < 2; ++z) {
      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_O } ) );
      line.position.set((x - 1) * CUBE_SIZE, (y - 1) * CUBE_SIZE, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }

  createMinoJ() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 1 && z == 0) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_J } ) );
      line.position.set((x - 1) * CUBE_SIZE, 0, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }

  createMinoL() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 1 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_L } ) );
      line.position.set((x - 1) * CUBE_SIZE, 0, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }

  createMinoS() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 2 && z == 1) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_S } ) );
      line.position.set((x - 1) * CUBE_SIZE, 0, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }

  createMinoZ() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 1) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_Z } ) );
      line.position.set((x - 1) * CUBE_SIZE, 0, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }

  createMinoT() {
    var group = new THREE.Object3D();

    for (var x = 0; x < 3; ++x) for(var z = 0; z < 2; ++z) {
      if(x == 0 && z == 0) continue;
      if(x == 2 && z == 0) continue;

      var geometry = new THREE.BoxBufferGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: MINO_COLOR_T } ) );
      line.position.set((x - 1) * CUBE_SIZE, 0, (z - 1) * CUBE_SIZE);
      group.add(line);
    }

    return group;
  }
}
export default createMino;