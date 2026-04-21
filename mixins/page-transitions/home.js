import { animations } from "~/mixins/animations.js";
import gsap from "gsap";

//home transitions
export let home = {
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
				{ opacity: 0, duration: 0.7 },
				{ opacity: 1, ease: 'sine.out' },
				delay
			)
				.add(animations.methods.titleIn(title, false), delay + 0.5)
				.add(animations.methods.paragIn(parag, false), delay + 1.25)
				.add(animations.methods.paragIn(mailto, false), delay + 1.75);
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
				".home-title",
			
				{ opacity: 0, yPercent: -30, duration: 0.7, ease: 'power4.out' },
				0
			).to(".canvas-wrap", { opacity: 0, duration: 0.7, ease: 'power4.out' }, 0.1);
		}
	}
};
