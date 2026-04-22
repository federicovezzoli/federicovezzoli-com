import { animations } from "~/mixins/animations.js";
import gsap from "gsap";

//home transitions
export let home = {
	transition: {
		appear: true,
		css: false,
		enter(el, done) {
			let delay = 0.5;

			const tl = new gsap.timeline({
				onComplete: () => {
					done();
				}
			});

			let title = el.querySelector(".home-title");
			let parag = el.querySelectorAll(".home-parag");
			let mailto = el.querySelectorAll(".mailto");

			tl.fromTo(
				el,
				{ opacity: 0, duration: 0.7 },
				{ opacity: 1, ease: 'sine.out' },
				delay
			)
				.add(animations.methods.titleIn(title, false), delay + 0.5)
				.add(animations.methods.paragIn(parag[0], false), delay + 1.25);

			for (let i = 0; i <= 3; i++) {
				tl.add(animations.methods.paragIn(mailto[i], false), delay + 1.7 + i * 0.05);
			}
			
			tl.add(animations.methods.paragIn(parag[1], false), delay + 2.25);

			for (let i = 4; i < mailto.length; i++) {
				tl.add(animations.methods.paragIn(mailto[i], false), delay + 2.25 + i * 0.05);
			}
		},
		beforeLeave(el) {
		},
		leave(el, done) {
		}
	}
};
