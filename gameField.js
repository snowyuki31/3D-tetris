const MARGIN = 30;
const AREA_SIZE = 50 + MARGIN;

class gameField {
  constructor() {
    this.field = [...Array(AREA_SIZE)].map(k=>[...Array(AREA_SIZE)].map(k=>[...Array(AREA_SIZE)].map(k=>null)));
  }

  initialize(scene) {
    // Make field null
    for(var x = 0; x < AREA_SIZE; ++x) 
      for(var y = 0; y < AREA_SIZE; ++y)
        for(var z = 0; z < AREA_SIZE; ++z){
          if(this.field[x][y][z] != null && this.field[x][y][z] != false){
            scene.remove(this.field[x][y][z]);
            this.field[x][y][z] = null;
          }
    }

    // Put Obstacles
    // TODO: Current settings are only for (10, 10, AREA_SIZE) size field. Make coords flexible!!
    for(var x = -12; x <= 12; ++x) {
      for(var z = -12; z <= 12; ++z) {
        this.putObject(new THREE.Vector3(x, -1, z), false);
        if(x <= -5 || x >= 6 || z <= -5 || z >= 6) {
          for(var y = -1; y < AREA_SIZE - MARGIN; ++y) {
            this.putObject(new THREE.Vector3(x, y, z), false);
          }
        }
      }
    }
  }

  putObject(vector, object) {
    this.field[vector.x + MARGIN][vector.y + MARGIN][vector.z + MARGIN] = object;
  }

  getObject(vector) {
    return this.field[vector.x + MARGIN][vector.y + MARGIN][vector.z + MARGIN];
  }

  doesObjectExist(vector) {
    return this.field[vector.x + MARGIN][vector.y + MARGIN][vector.z + MARGIN] != null;
  }


  // flush objects when the conditions are met.
  // TODO: Current settings are only for (10, 10, AREA_SIZE) size field. Make coords flexible!!
  flushObjects(scene) {
    for (var y = 0; y <= 20; ++y) {
      // 面揃い
      var flag_surface = true;
      for(var x = -4; x <= 5; ++x) {
        for(var z = -4; z <= 5; ++z) {
          if(!this.doesObjectExist(new THREE.Vector3(x, y, z))) flag_surface = false;
        }
      }
      if(flag_surface) {
        for(var x = -4; x <= 5; ++x) for(var z = -4; z <= 5; ++z) {
          scene.remove(this.getObject(new THREE.Vector3(x, y, z)));
          this.putObject(new THREE.Vector3(x, y, z), null);
        }
      }

      // 行揃い
      for(var x = -4; x <= 5; ++x) {
        var flag_col = true;
        for(var z = -4; z <= 5; ++z) {
          if(!this.doesObjectExist(new THREE.Vector3(x, y, z))) flag_col = false;
        }
        if(flag_col) {
          for(var z = -4; z <= 5; ++z) {
            scene.remove(this.getObject(new THREE.Vector3(x, y, z)));
            this.putObject(new THREE.Vector3(x, y, z), null);
          }
        }
      }

      // 列揃い
      for(var z = -4; z <= 5; ++z) {
        var flag_row = true;
        for(var x = -4; x <= 5; ++x) {
          if(!this.doesObjectExist(new THREE.Vector3(x, y, z))) flag_row = false;
        }
        if(flag_row) {
          for(var x = -4; x <= 5; ++x) {
            scene.remove(this.getObject(new THREE.Vector3(x, y, z)));
            this.putObject(new THREE.Vector3(x, y, z), null);
          }
        }
      }
    }
  }

}
export default gameField;