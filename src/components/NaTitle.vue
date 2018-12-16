<template>
  <transition name="slideTop">
    <div v-show="isShow" class="v-note-navigation-wrapper">
      <div class="v-note-navigation-title">
          Navigation Title<i @click="isShow = !isShow"
                               navigationContent           class="fa fa-mavon-times v-note-navigation-close"
                                          aria-hidden="true"></i>
      </div>
      <div ref="navigationContent" class="v-note-navigation-content scroll-style">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    data: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    },
    simplemde: {
    }
  },
  methods: {
    getNavigation () {
      let navigationContent

      navigationContent = this.$refs.navigationContent

      navigationContent.innerHTML = this.html
      let nodes = navigationContent.children
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          this.judageH(nodes[i], i, nodes)
        }
      }
    },
    judageH (node, i, nodes) {
      let reg = /^H[1-6]{1}$/
      if (!reg.exec(node.tagName)) {
        node.style.display = 'none'
      } else {
        node.onclick = () => {
          setTimeout(() => {
            console.log(this.simplemde.gui.sideBySide)
            let vShowContent = this.simplemde.gui.sideBySide
            let vNoteEdit = this.simplemde.codemirror
            vNoteEdit.scrollTo(0, 1000)
            console.log(vNoteEdit.getScrollerElement().style, vNoteEdit.getScrollInfo(), vShowContent.children[i].offsetTop)
            vNoteEdit.scrollTo(0, vShowContent.children[i].offsetTop *
            (vNoteEdit.getScrollInfo().height - vNoteEdit.getScrollInfo().clientHeight) /
            (vShowContent.scrollHeight - vShowContent.offsetHeight))
          }, 2000)
          // let vNoteEdit = this.$refs.vNoteEdit
          // vNoteEdit.scrollTop =
          //   vShowContent.children[i].offsetTop *
          //   (vNoteEdit.scrollHeight - vNoteEdit.offsetHeight) /
          //   (vShowContent.scrollHeight - vShowContent.offsetHeight)
        }
      }
    }
  },
  watch: {
    data (newValue, oldValue) {
      this.getNavigation()
    },
    isShow (value) {
      console.log(value)
    }
  }
}

</script>

<style scoped>
.v-note-navigation-wrapper {
  position: absolute;
  width: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.98);
  border: border-color;
  transition: all 0.1s linear 0s;
}
.v-note-navigation-wrapper.shadow {
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
  border: none;
}
@media only screen and (max-width: 768px) {
  .v-note-navigation-wrapper {
    width: 50%;
  }
}
.v-note-navigation-wrapper.slideTop-enter-active,
.v-note-navigation-wrapper.slideTop-leave-active {
  bottom: 0;
}
.v-note-navigation-wrapper.slideTop-enter,
.v-note-navigation-wrapper.slideTop-leave-active {
  bottom: 100%;
}
.v-note-navigation-wrapper .v-note-navigation-title {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eeece8;
  flex: none;
  line-height: 50px;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  padding: 0 12px;
}
.v-note-navigation-wrapper .v-note-navigation-title.shadow {
  box-shadow: 0 0px 1px rgba(0,0,0,0.157), 0 0px 1px rgba(0,0,0,0.227);
}
.v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close {
  float: right;
  color: #757575;
  font-size: 20px;
  cursor: pointer;
}
.v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close:hover {
  color: #696969;
}
.v-note-navigation-wrapper .v-note-navigation-content {
  overflow-y: auto;
  flex: 1;
  padding: 8px 0;
}
.v-note-navigation-wrapper .v-note-navigation-content h1,
.v-note-navigation-wrapper .v-note-navigation-content h2,
.v-note-navigation-wrapper .v-note-navigation-content h3,
.v-note-navigation-wrapper .v-note-navigation-content h4,
.v-note-navigation-wrapper .v-note-navigation-content h5,
.v-note-navigation-wrapper .v-note-navigation-content h6 {
  margin: 2px 0;
  font-weight: 500;
  font-size: 17px;
  color: #2185d0;
  cursor: pointer;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px;
  border-bottom: none;
}
.v-note-navigation-wrapper .v-note-navigation-content h1:hover,
.v-note-navigation-wrapper .v-note-navigation-content h2:hover,
.v-note-navigation-wrapper .v-note-navigation-content h3:hover,
.v-note-navigation-wrapper .v-note-navigation-content h4:hover,
.v-note-navigation-wrapper .v-note-navigation-content h5:hover,
.v-note-navigation-wrapper .v-note-navigation-content h6:hover {
  color: #483d8b;
  text-decoration-line: underline;
}
.v-note-navigation-wrapper .v-note-navigation-content h2 {
  padding-left: 27px;
  font-size: 17px;
}
.v-note-navigation-wrapper .v-note-navigation-content h3 {
  padding-left: 42px;
  font-size: 17px;
}
.v-note-navigation-wrapper .v-note-navigation-content h4 {
  padding-left: 58px;
  font-size: 15px;
}
.v-note-navigation-wrapper .v-note-navigation-content h5 {
  padding-left: 72px;
  font-size: 15px;
}
.v-note-navigation-wrapper .v-note-navigation-content h6 {
  padding-left: 87px;
  font-size: 15px;
}

</style>
