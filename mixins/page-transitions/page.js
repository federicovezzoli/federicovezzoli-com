import { animations } from "~/mixins/animations.js";
import gsap from "gsap";

//home transitions
export let page = {
	transition: {
		appear: true,
		css: false,
		enter(el, done) {
			let delay = 0.5;
			//console.log("enter home", this.$store.state.isLoaded, el )

			const tl = new gsap.timeline({
				onComplete: () => {
					done();
				}
			});

			let title = el.querySelector(".home-title");
			let parag = el.querySelector(".home-parag");
			let mailto = el.querySelector(".mailto");
			//let rulers = el.querySelectorAll(".ruler")

			tl.fromTo(
				el,
				0.7,
				{ opacity: 0 },
				{ opacity: 1, ease: 'sine.out' },
				delay
			)
			
		},
		beforeLeave(el) {
			//console.log("before leave", this.$route)
		},
		leave(el, done) {
			//console.log("leave home", el, this.$route.name, this.$store.state.menuOpen, this.$store.state.isMenuDone, this.$store.state.bigLink)

			let tl = new gsap.timeline({
				onComplete: function() {
					done();
				}
			});

			//tl.add(animations.methods.pageOut(el, this.$device), 0)
			tl.to(
				el,
				0.7,
				{ opacity: 0, ease: 'sine.out' },
				0
			)
		}
	}
};
