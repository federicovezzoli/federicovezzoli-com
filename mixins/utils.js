export let utils = {
    methods: {
        getSrcset(sizes) {
            let imgSrcset = ''
            //XS
            if (sizes.xs) {
            imgSrcset += sizes.xs + " 545w"
            }

            //S
            if (sizes.medium_large) {
                imgSrcset += ", " + sizes['s'] + " 745w"
            }

            //M
            if (sizes.m) {
                imgSrcset += ", " + sizes['m'] + " 895w"
            }

            //L
            if (sizes.l) {
                imgSrcset += ", " + sizes['m'] + " 1090w"
            }

            //XL
            if (sizes.xl) {
                if (sizes['xl']) {
                imgSrcset += ", " + sizes['m'] + " 1490w"
                } else {
                imgSrcset += ", " + sizes['l'] + " 1490w"
                }
            }
            
            return imgSrcset
        }
    }
}

export let cursor = {
    methods: {
        fetchLinks() {
            let items = document.querySelectorAll(".link")
            return items
        }
    }
}