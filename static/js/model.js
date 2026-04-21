import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";

class Model {
  constructor(obj) {
    this.name = obj.name;
    this.file = obj.file;
    this.scene = obj.scene;

    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("./draco/");
    this.loader.setDRACOLoader(this.dracoLoader);

    this.init();
  }

  init() {
    this.loader.load(this.file, (response) => {
      console.log("model loaded", response);
      this.mesh = response.scene.children[1];
      console.log(this.mesh);

      this.material = new THREE.MeshPhongMaterial({
        color: 0xfcfbd7,
        shininess: 10,
      });

      this.mesh.material = this.material;
      this.scene.add(this.mesh);

      this.mesh.rotation.y = 3;
      this.mesh.rotation.x = 0;

      gsap.to(this.mesh.rotation, {
        duration: 4,
        x: Math.PI*2,
        repeat: -1,
        ease: "none",
      })
    });
  }
}

export default Model;
