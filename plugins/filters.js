import Vue from 'vue'

Vue.filter('trimString', function (value) {
    return value.substring(0,3);
})