<template>
  <div id="app">
    <transition name="router-fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <tab></tab>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import tab from 'base/tab/tab'
export default {
  name: 'app',
  created () {
    this.INIT_USER()
    this.INIT_LOCATION_DATA()
  },
  methods: {
    ...mapMutations([
      'INIT_USER',
      'INIT_LOCATION_DATA'
    ])
  },
  components: {
    tab
  }
}
</script>
<style>
.router-fade-enter-active, .router-fade-leave-active {
  transition: all 0.2s linear
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0.2;
}
</style>
