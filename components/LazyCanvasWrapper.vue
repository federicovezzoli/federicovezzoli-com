<template>
	<div class="canvas-wrapper" ref="canvas"></div>
</template>

<script>
import { mapGetters } from "vuex";
import gsap from "gsap";
//import { utils } from "~/mixins/utils.js";
import * as THREE from "three";
import ScrollTrigger from "~/assets/js/ScrollTrigger.js";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "static/js/model.js";

//console.log(Model);

export default {
	data() {
		return {};
	},
	props: ["item", "index"],
	//mixins: [utils],
	computed: {
		...mapGetters([]),
	},
	watch: {},
	methods: {},
	mounted() {
		//gsap.registerPlugin(ScrollTrigger);

		const canvasWrapperSizes = this.$refs.canvas.getBoundingClientRect();

		/*------------------------------
  Renderer
  -----------------------------*/
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(canvasWrapperSizes.width, canvasWrapperSizes.height);
		this.$refs.canvas.appendChild(renderer.domElement);

		/*------------------------------
  Scene & Camera
  ------------------------------*/
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			50,
			canvasWrapperSizes.width / canvasWrapperSizes.height,
			0.1,
			100
		);
		camera.position.z = 5;
		camera.position.y = 0;

		scene.rotation.set(1, 0, 0);

		/*------------------------------
  Mesh
  ------------------------------*/
		//const geometry = new THREE.BoxGeometry(2, 2, 2);
		//const material = new THREE.MeshBasicMaterial({
		//	color: 0x00ff00,
		//});
		//const cube = new THREE.Mesh(geometry, material);
		//scene.add(cube);

		/*------------------------------
  OrbitControls
  ------------------------------*/
		//const controls = new OrbitControls(camera, renderer.domElement);

		/*------------------------------
  Helpers
  ------------------------------*/
		//const gridHelper = new THREE.GridHelper(10, 10);
		//scene.add(gridHelper);
		//const axesHelper = new THREE.AxesHelper(5);
		//scene.add(axesHelper);

		/*------------------------------
  Model
  ------------------------------*/
		const bone = new Model({
			name: "bone",
			file: "../models/bone.glb",
			scene: scene,
		});

		const light1 = new THREE.PointLight(0xffffff, 2, 12);
		light1.position.set( 5, 5, -4 );
		scene.add(light1);

		const light2 = new THREE.PointLight(0xffffff, 2, 12);
		light2.position.set( -5, 5, 4 );
		scene.add(light2);

		/*------------------------------
  Loop
  ------------------------------*/
		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();

		/*------------------------------
  Resize
  ------------------------------*/
		function onWindowResize() {
			camera.aspect = canvasWrapperSizes.width / canvasWrapperSizes.height;
			camera.updateProjectionMatrix();
			renderer.setSize(canvasWrapperSizes.width, canvasWrapperSizes.height);
		}
		window.addEventListener("resize", onWindowResize, false);

		//
		// animation
		//

		console.log("Scene", scene)

		console.log(scene.children);

		/* gsap.to(scene.children[4].rotation, {
				x: 0,
		}); */
		/* let anim = gsap.to(scene.rotation, {
			x: 0,
			ease: "none",
			paused: true,
		});

		

		const scrub = gsap.to(anim, {
			progress: 1,
			paused: true,
			ease: "sine.out",
			duration: 1.5,
			overwrite: true,
		});

		ScrollTrigger.create({
			toggleActions: "play none reverse none",
			trigger: this.$refs.canvas,
			pin: false,
			start: "top bottom",
			end: "bottom top",
			scrub: true,
			onUpdate: (self) => {
				scrub.vars.progress = self.progress;
				scrub.invalidate().restart();
			},
		}); */
	},
};
</script>

<style lang="scss" scoped>
.canvas-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
