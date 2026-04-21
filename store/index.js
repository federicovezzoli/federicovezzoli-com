//import { stat } from "fs";

export const state = () => ({
  isScrolled: false,
  is404: false,
  isLoaded: false,
  isAnimDone: false,
  privacy: {
    //it: 'https://www.iubenda.com/privacy-policy/75557935',
    //en: 'https://www.iubenda.com/privacy-policy/53981879'
  },
  cookie: {
    //it: 'https://www.iubenda.com/privacy-policy/75557935/cookie-policy',
    //en: 'https://www.iubenda.com/privacy-policy/53981879/cookie-policy'
  },
})

export const getters = {
  isLoaded(state) {
    return state.isLoaded
  },
  isScrolled(state) {
    return state.isScrolled
  },
  is404(state) {
    return state.is404
  },
  cookiePolicy(state) {
    return state.cookie
  },
  privacyPolicy(state) {
    return state.privacy
  }
}

export const mutations = {
  setIsLoaded(state, value) {
    state.isLoaded = value
  },
  setIsScrolled(state, value) {
    state.isScrolled = value
  },
  setIs404(state, value) {
    state.is404 = value
  },
  setPolicyIT(state, value) {
    state.policyIT = value
  },
  setPolicyEN(state, value) {
    state.policyEN = value
  }
}