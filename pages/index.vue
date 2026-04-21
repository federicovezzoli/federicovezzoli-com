<template>
	<div class="home">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 col-md-10 mr-auto ml-auto">
		<h1 class="home-title" ref="title">
			Hi, <br />I'm Federico Vezzoli <br />and I'm Head of Tech at
			<a href="https://edulia.it" target="_blank">Edulia</a>.
		</h1>

		<p class="home-parag">
			I make websites, build furniture, <br />windsurf, travel and drink wine.
		</p>

		<a href="mailto:me@federicovezzoli.com" class="mailto">Get in touch</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { home } from "~/mixins/page-transitions/home.js";
import { animations } from "~/mixins/animations.js";

export default {
	head: {
		title: "Federico Vezzoli",
		meta: [
			{ property: "og:url", content: "https://federicovezzoli.com" },
			/* { property: "og:image", content: "img/og/hp.jpg" }, */
			{ property: "og:title", content: "Federico Vezzoli" },
			{ name: "description", content: "" },
			{ property: "og:description", content: "" }
		]
	},
	mixins: [home, animations],
	data() {
		return {
			words: ["Frontend Developer", "Maker", "Windsurfer"]
		};
	}
};
</script>

<style lang="scss" scoped>
.home {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.ruler {
	position: fixed;
	background: $white;
	opacity: 0;

	&.top {
		top: 4vw;
		left: 4vw;
		width: calc(100% - 8vw);
		height: 0.3rem;
	}

	&.bottom {
		bottom: 4vw;
		left: 4vw;
		width: calc(100% - 8vw);
		height: 0.3rem;
	}

	&.left {
		bottom: 4vw;
		left: 4vw;
		height: calc(100% - 8vw);
		width: 0.3rem;
	}

	&.right {
		bottom: 4vw;
		right: 4vw;
		height: calc(100% - 8vw);
		width: 0.3rem;
	}
}

.home-title {
	color: $white;
	font-size: 5.5vw;
	width: 100%;
	margin: 0;
	opacity: 0;
	margin-bottom: 3vh;

	a {
		color: $white;
		//text-decoration: underline;

		&:hover {
			color: $blue;
		}
	}

	@include media-breakpoint-up(md) {
		font-size: 3.5vw;
		margin-bottom: 5vh;
	}

	@include media-breakpoint-up(lg) {
	}

	@include media-breakpoint-up(xl) {
	}
}

.home-parag {

	width: 84%;
	opacity: 0;
	margin-bottom: 3vh;

	@include media-breakpoint-up(md) {
		width: 70%;
		margin-bottom: 5vh;
	}
}

.mailto {

	color: $white;
	opacity: 0;

	&:hover {
		color: $blue;
	}
}

.home-btn--wrap {
	position: fixed;
	bottom: 60px;
	left: 50%;
	transform: translate(-50%, 0);

	opacity: 0;

	.btn {
		min-width: 200px;

		@include media-breakpoint-up(md) {
			//min-width: 200px;
		}
	}

	@include media-breakpoint-up(md) {
	}
}
</style>

<style lang="scss">
.home-title,
.home-parag {
	& > div {
		//overflow: hidden;

		& > div {
			opacity: 0;
		}
	}
}
</style>
