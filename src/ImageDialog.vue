<template>
  <div id="img_dialog" v-show="visible" @click="visible = false">
    <div class="content">
      <img :src="src" alt="" srcset="">
      <input type="range" v-model="zoomValue" min="0" max="100">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      src: '',
      length: 0,
      showIndex: 0,
      zoomValue: 50
    }
  },
  methods: {
    init (target) {
      debugger
      const allImg = target.querySelectorAll('img')
      if (allImg.length > 0) {
        allImg.forEach(element => {
          try {
            element.addEventListener('click', (e) => {
              debugger
              this.showIndex = -1
              for (let i = 0; i < allImg.length; i++) {
                if (allImg[i] === element) {
                  this.showIndex = i
                }
              }
              this.length = allImg.length
              this.src = e.srcElement.currentSrc
              console.log(this.length, this.showIndex, this.src)
              this.visible = true
            })
          } catch (e) {
            element.outerHTML = `<pre>Chart.js complains: "${e}"</pre>`
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #img_dialog {
    z-index: 10000;
  }
</style>
