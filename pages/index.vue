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
//import throttle from "lodash.throttle";

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
			canvasReady: false,
			gallery: [
				{ id: 0, src: "" },
				{ id: 1, src: "" },
				{ id: 2, src: "" }
			],
			words: ["Frontend Developer", "Maker", "Windsurfer"],
			mainContainer: null,
			images: {},
			isMouseMoved: false,
			currentTexture: null,
			autoPlaySpeed: [0.75, 0.75]
		};
	},
	watch: {
		currentTexture(value) {
			//console.log("change texture", value)

			let delay = 0;
			if (!this.isLoaded) {
				delay = 2.5;
			}

			//only on mobile, alter the displacement
			if (this.displacementFilter) {
				TweenMax.to(this.displacementFilter, 0.5, {
					pixi: { scaleX: 70, scaleY: 70 },
					ease: Back.easeOut,
					delay: delay,
					onComplete: () => {
						TweenMax.to(this.displacementFilter, 1.5, {
							pixi: { scaleX: 0, scaleY: 0 },
							ease: Elastic.easeOut
						});
					}
				});
			}

			Object.keys(this.images).forEach(key => {
				//console.log(this.images[key], key, value)

				if (value === null) {
					TweenMax.to(this.images[key], 1, { alpha: 0, ease: Sine.easeOut });
				} else {
					if (key === this.gallery[value].id.toString()) {
						//console.log("show", key)
						TweenMax.to(this.images[key], 1, { alpha: 1, ease: Sine.easeOut });
					} else {
						//console.log("hide", key)
						TweenMax.to(this.images[key], 1, { alpha: 0, ease: Sine.easeOut });
					}
				}
			});
		}
	},
	mounted() {
		//init pixi
		//if (process.client && this.gallery.length > 0) {
		//	global.PIXI = require("~/plugins/pixi.js");
		//this.initPixi()
		//}
	},
	methods: {
		initPixi() {
			const { canvas } = this.$refs;

			this.app = new PIXI.Application();
			this.app.renderer = PIXI.autoDetectRenderer({
				width: window.innerWidth,
				height: window.innerHeight,
				resolution: window.devicePixelRatio,
				transparent: true,
				autoResize: true,
				antialias: false
			});

			this.app.view.id = "pixi-canvas";

			canvas.appendChild(this.app.view);
			this.mainContainer = new PIXI.Container();
			this.app.stage.addChild(this.mainContainer);
			this.textureContainer = new PIXI.Container();
			this.mainContainer.addChild(this.textureContainer);

			PIXI.utils.clearTextureCache();
			PIXI.utils.destroyTextureCache();

			//add stuff to the loadig queue
			this.app.loader.add("map", "/img/fibers-rotated-small.jpg");
			this.gallery.forEach((item, index) => {
				//console.log(item.id, item.sizes.l)
				this.app.loader.add(item.id.toString(), item.src);
			});

			//loading the assets
			this.app.loader.load((loader, resources) => {
				this.setTextures(resources);

				//if (this.$ua.browser() !== "Safari") {
				this.setDisplacementMap(resources);
				//}
			});

			//mouse click
			//window.addEventListener("click", this.clickCanvas)

			//mouse move
			if (this.$device.isDesktop) {
				this.debouncedMouseMove = throttle(this.mouseMoveCanvas, 300, {
					leading: true,
					trailing: false
				});
				this.$refs.title.addEventListener("mousemove", this.debouncedMouseMove);
			}

			//mobile timing
			if (this.$device.isMobileOrTablet) {
				setInterval(() => {
					this.currentTexture++;
					if (this.currentTexture > this.gallery.length - 1) {
						this.currentTexture = 0;
					}
				}, 4000);
			}

			//resizer
			window.addEventListener("resize", this.resizeHandler, false);
			this.resizeHandler();
		},

		setDisplacementMap(resources) {
			//distortion basic
			this.displacementSprite = new PIXI.Sprite(resources.map.texture);
			this.mainContainer.addChild(this.displacementSprite);
			this.displacementFilter = new PIXI.filters.DisplacementFilter(
				this.displacementSprite
			);
			this.displacementFilter.resolution = window.devicePixelRatio;
			this.displacementSprite.texture.baseTexture.wrapMode =
				PIXI.WRAP_MODES.REPEAT;
			this.displacementFilter.padding = 1;

			TweenMax.set(this.displacementSprite, {
				pixi: {
					anchor: 0.5,
					scale: 4,
					x: this.app.screen.width / 2,
					y: this.app.screen.height / 2
				}
			});

			this.mainContainer.filterArea = this.app.screen;
			this.mainContainer.filters = [this.displacementFilter];

			//ticker
			this.app.ticker.add(delta => {
				//console.log("ticker", delta)
				this.displacementSprite.x += this.autoPlaySpeed[0] * delta;
				//this.displacementSprite.y += this.autoPlaySpeed[1] * delta;
			});
		},
		setTextures(resources) {
			let appRatio = this.app.screen.width / this.app.screen.height;
			this.textureContainer.alpha = 0;
			let i = 0;

			//console.log(resources)

			let texturesLoaded = new Promise((resolve, reject) => {
				Object.keys(resources).forEach(key => {
					this.images[key] = new PIXI.Sprite(resources[key].texture);
					this.images[key].ratio =
						this.images[key].width / this.images[key].height;
					this.textureContainer.addChild(this.images[key]);
					//console.log("screen", this.app.screen.width, this.app.screen.height)
					//console.log(appRatio, this.images[key].ratio, window.devicePixelRatio)

					let imgHeight = this.app.screen.width / this.images[key].ratio;
					let imgWidth = this.app.screen.width;

					if (imgHeight < this.app.screen.height) {
						imgHeight = this.app.screen.height;
						imgWidth = this.app.screen.height * this.images[key].ratio;
					}

					//console.log(imgWidth, imgHeight)

					TweenMax.set(this.images[key], {
						width: imgWidth,
						height: imgHeight,
						pixi: {
							alpha: 0,
							anchor: 0.5,
							x: this.app.screen.width / 2,
							y: this.app.screen.height / 2
						}
					});

					i++;

					if (i >= Object.keys(resources).length - 1) {
						resolve();
					}
				});
			});

			texturesLoaded.then(() => {
				//console.log("textures loaded")
				TweenMax.set(this.textureContainer, {
					pixi: {
						alpha: 1
					}
				});

				//set the current texture
				setTimeout(() => {
					this.currentTexture = 0;
					this.canvasReady = true;
				}, 500);
			});
		},

		mouseMoveCanvas($event) {
			let index = parseInt(
				($event.clientX * this.gallery.length) / window.outerWidth
			);
			this.currentTexture = index;
		},

		resizeHandler() {
			//console.log("resize", window)
		}
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
