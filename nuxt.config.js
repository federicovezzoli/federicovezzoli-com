const pkg = require("./package");
const env = require("dotenv").config().parsed;

module.exports = {
	target: "static",
  	components: ["~/components/", "~/components/blocks/", "~/components/atoms/"],

	/*
	 ** Headers of the page
	 */
	head: {
		title: "Federico Vezzoli",
		meta: [
			{
				charset: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "format-detection",
				content: "telephone=no"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Federico Vezzoli"
			},
			{
				name: "msapplication-TileColor",
				content: "#000000"
			},
			{
				name: "theme-color",
				content: "#000000"
			}
		],
		script: [
		],
		link: [
			{
				rel: "preconnect",
				href: "//fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "//www.google-analytics.com"
			}
		]
	},

	dev: process.env.NODE_ENV === "dev",

	/*
	 ** Customize the loader
	 */
	loading: false,

	/*
	 ** Global CSS
	 */
	css: ["~assets/scss/main.scss"],

	/*
	 ** Fonts
	 */
	webfontloader: {
		google: {
			families: ["Roboto+Mono:400,700&display=swap"]
		}
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/dotenv",
		"nuxt-user-agent",
		"nuxt-device-detect",
		"nuxt-webfontloader",
		"@nuxtjs/sitemap"
	],

	buildModules: [
		"@nuxtjs/sanity",
		"@nuxtjs/style-resources",
		/* [
			"@nuxtjs/google-analytics",
			{
				id: "UA-11839860-1"
			}
		] */
	],

	sitemap: {
		hostname: "https://federicovezzoli.com"
	},

	styleResources: {
		scss: [
			"@/assets/scss/bootstrap/_functions.scss",
			"@/assets/scss/bootstrap/_variables.scss",
			"@/assets/scss/bootstrap/mixins/_breakpoints.scss",
			"@/assets/scss/libs/_variables.scss",
			"@/assets/scss/libs/_typography.scss"
		]
	},
	
	router: {
		trailingSlash: true,
	},

	/*
	 ** Build configuration
	 */
	build: {
		//analyze: false,
	}
};
