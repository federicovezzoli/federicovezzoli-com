<template>
	<div>
		<main>
			<nuxt />
		</main>

		<div
			id="mouse-follower"
			:class="this.$ua.browser()"
			ref="follower"
			class="d-none d-md-block"
		>
			<div class="mouse-follower--dot" ref="dot">🍕</div>
		</div>
	</div>
</template>

<script>
import { cursor } from "~/mixins/utils.js";
import { mapGetters } from "vuex";
import gsap from "gsap";

export default {
	components: {},
	data() {
		return {
			lastScroll: 0,
			links: []
		};
	},
	mixins: [cursor],
	computed: {
		...mapGetters(["options", "isLoaded", "isHome"])
	},
	watch: {},
	mounted() {
		//follower
		if (this.$device.isDesktop) {
			let { follower } = this.$refs;

			document.addEventListener("mousemove", ev => {
				gsap.to(follower,  {
					x: ev.clientX,
					opacity: 1,
					duration: 0.1,
					y: ev.clientY,
					ease: 'sine.out',
					overwrite: true
				});
			});
		}

		//media queries changes
		if (process.client) {
			let enquire = require("enquire.js");

			enquire.register("screen and (max-width:767px)", {
				unmatch: function() {
					window.location.reload();
				}
			});

			enquire.register("screen and (max-width:991px)", {
				unmatch: function() {
					window.location.reload();
				}
			});

			enquire.register("screen and (max-width:1199px)", {
				unmatch: function() {
					window.location.reload();
				}
			});
		}
	},
	methods: {
		getLink(link) {
			return link;
		}
	}
};
</script>

<style lang="scss" scoped>
#mouse-follower {
	display: none;
	pointer-events: none;
	z-index: 15000;
	opacity: 0;
	//background: red;

	@include media-breakpoint-up(lg) {
		display: block;
		width: 6px;
		height: 6px;
		position: fixed;
		top: 0%;
		left: 0%;
	}

	.mouse-follower--dot {
		opacity: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: center center;
		transform: translate(-50%, -50%) rotate(-185deg);
		font-size: 2rem;
	}
}
</style>
