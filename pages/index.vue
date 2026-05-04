<template>
	<div class="home">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 col-md-10 mr-auto ml-auto">
					<h1 class="home-title" ref="title">
						Hi, <br />I'm Federico Vezzoli.
					</h1>
				
					<p class="home-parag">
						I'm Head of Tech at <a href="https://edulia.it" target="_blank">Edulia</a> and I'm also a woodworker wannabe.
					</p>
				
					<ul class="home-list">
						<li><a href="mailto:me@federicovezzoli.com" class="mailto">Get in touch</a></li>
						<li><a href="https://instagram.com/federicovezzoli" class="mailto" target="_blank">Instagram</a></li>
						<li><a href="https://github.com/federicovezzoli" class="mailto" target="_blank">GitHub</a></li>
						<li><a href="https://www.linkedin.com/in/federico-vezzoli-33151531/" class="mailto" target="_blank">LinkedIn</a></li>
					</ul>

					<p class="home-parag">Check my projects:</p>
					<ul class="home-list">
						<li><a href="https://gcode-tools.federicovezzoli.com" class="mailto" target="_blank">GCode Tools</a></li>
					</ul>
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
			{ property: "og:title", content: "Federico Vezzoli" },
			{ name: "description", content: "" },
			{ property: "og:description", content: "" }
		]
	},
	mixins: [home, animations],
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

.home-title {
	color: $white;
	font-size: 7vw;
	width: 100%;
	margin: 0;
	opacity: 0;
	margin-bottom: 3vh;

	@include media-breakpoint-up(md) {
		font-size: 3.0vw;
		margin-bottom: 5vh;
	}

	@include media-breakpoint-up(lg) {
	}

	@include media-breakpoint-up(xl) {
	}
}

.home-parag {
	width: 100%;
	opacity: 0;
	margin-bottom: 3vh;
	font-size: 4.5vw;

	a {
		color: $white;

		&:hover {
			color: $blue;
		}
	}

	@include media-breakpoint-up(md) {
		font-size: 1.0vw;
		width: 70%;
		margin-bottom: 5vh;
	}
}

.home-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 1vw;
	margin-bottom: 4.5vh;

	&:last-child {
		margin-bottom: 0;
	}

	@include media-breakpoint-up(md) {
		flex-direction: row;
		gap: 2vw;
		margin-bottom: 5vh;
	}
}

.mailto {
	color: $white;
	opacity: 0;
	font-size: 3vw;

	&:hover {
		color: $blue;
	}

	@include media-breakpoint-up(md) {
		font-size: 0.75vw;
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
