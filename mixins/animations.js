import gsap from "gsap";
import SplitText from "~/assets/js/SplitText.js";

export let animations = {
	mounted() {
		gsap.registerPlugin(SplitText);
	},
	methods: {
		titleIn(title, doRevert) {
			const tl = new gsap.timeline({
				onComplete: () => {
					if (doRevert) {
						introText.revert();
					}
					title.classList.add("is-done");
				}
			});

			let introText = new SplitText(title, { type: "lines, chars" });

			tl.set(title, { opacity: 1});

			let i = 0;
			let odd = [];
			let even = [];

			introText.chars.forEach(function(el) {
				if (i % 2 == 0) {
					odd.push(el);
				} else {
					even.push(el);
				}
				i++;
			});

			tl.staggerFromTo(
				odd,
				0.2,
				{ yPercent: 25, opacity: 0 },
				{
					yPercent: 0,
					opacity: 1,
					ease: 'back.out',
					stagger: { each: 0.03, from: "center" }
				},
				null,
				0
			);

			tl.staggerFromTo(
				even,
				0.2,
				{ yPercent: 25, opacity: 0 },
				{
					yPercent: 0,
					opacity: 1,
					ease: 'back.out',
					stagger: { each: 0.03, from: "center" }
				},
				null,
				0.1
			);

			return tl;
		},
		paragIn(title, doRevert) {
			const tl = new gsap.timeline({
				onComplete: () => {
					if (doRevert) {
						introText.revert();
					}
					
					title.classList.add("is-done")
				}
			});

			let introText = new SplitText(title, { type: "lines, words" });

			tl.set(title, { opacity: 1});

			let i = 0;
			let odd = [];
			let even = [];

			introText.words.forEach(function(el) {
				if (i % 2 == 0) {
					odd.push(el);
				} else {
					even.push(el);
				}
				i++;
			});
			
			if (odd.length > 0) {
				tl.staggerFromTo(
					odd,
					0.3,
					{ yPercent: 40, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						ease: 'back.out',
						stagger: { each: 0.03, from: "center" }
					},
					null,
					0
				);
			}

			if (even.length > 0) {
				tl.staggerFromTo(
					even,
					0.3,
					{ yPercent: 40, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						ease: 'back.out',
						stagger: { each: 0.03, from: "center" }
					},
					null,
					0.1
				);
			}

			return tl;
		},
		titleOut(title, doRevert) {
			const tl = new gsap.timeline({
				onComplete: () => {
					if (doRevert) {
						introText.revert();
					}
				
					title.classList.add("is-out");
				}
			});

			let introText = new SplitText(title, { type: "lines, chars" });
			let charsFinal = [];

			tl.set(title, { opacity: 1}, 0);

			introText.chars.forEach(element => {
				let text = new SplitText(element, { type: "chars" });
				tl.set(element, { overflow: "hidden", opacity: 1 }, 0);
				charsFinal.push(text.chars[0]);
			});

			tl.staggerFromTo(
				charsFinal,
				0.7,
				{ opacity: 1, xPercent: 0 },
				{
					opacity: 0,
					xPercent: -100,
					ease: 'sine.out',
					stagger: { each: 0.07, ease: Sine.easeIn }
				},
				null,
				0
			);

			return tl;
		},
		pageOut(page, $device) {
			const tl = new gsap.timeline({ onComplete: () => {} });

			let duration = 2;
			let percent = -50;
			if ($device.isMobile) {
				duration = 1;
				percent = -25;
			}

			//console.log("diocane out", page)

			gsap.set(page, { overflow: "hidden" });
			gsap.to(page, duration, { yPercent: percent, ease: 'sine.out' });
			tl.to(page, 0.5, { opacity: 0, ease: 'sine.out' }, 0).to(
				"#footer",
				0.4,
				{ opacity: 0, ease: 'sine.out' },
				0
			);

			return tl;
		},
		btnHover(target, child, value) {
			const tl = new gsap.timeline();
			let chars = child.querySelectorAll("div");
			let dash = target.querySelector(".dash");

			if (value == true) {
				tl.to(
					chars,
					0.15,
					{
						opacity: 0,
						ease: 'sine.out',
						onComplete: () => {
							gsap.set(chars, { y: 10 });
						}
					},
					0
				).staggerTo(
					chars,
					0.4,
					{ y: 0, opacity: 1, stagger: 0.02, ease: 'sine.out' },
					0.18
				);

				if (dash) {
					tl.to(dash, { duration: 0.7,  width: 40, ease: 'sine.out' }, 0.1);
				}
			} else {
				if (dash) {
					tl.to(dash, { duration: 0.7,  width: 30, ease: 'sine.out' }, 0.1);
				}
			}

			return tl;
		}
	}
};
