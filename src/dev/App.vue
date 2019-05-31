<template>
  <div id="app">
    <vue-freemde v-model="data" ref="Markdown" :configs="configs">
      <!-- <div ref="markBox" slot="markdown-body"></div> -->
    </vue-freemde>
  </div>
</template>

<script>
import VueFreemde from '../Freemde'
// import marked from 'marked'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      data: '',
      zoomValue: 50,
      configs: {
        toolbar: ['bold', 'italic', 'strikethrough', '|', 'link', 'image', '|', 'preview', 'fullscreen', 'side-by-side', '|', {
          name: 'custom',
          action: () => {
            alert('Save')
          },
          className: 'fa fa-save',
          title: 'Save'
        }, {
          name: 'link',
          action: 'https://github.com/yansenlei',
          className: 'fa fa-question-circle',
          title: 'link'
        }],
        // markdown (text, side) {
        //   // return marked(text)
        //   return `<div class="markdown-body">${mdr.render(text)}</div>`
        // },
        // view (text, side) {
        //   console.log(side)
        //   mdr.view(text, side)
        //   // custom open_link
        //   document.querySelectorAll('.custom_link_open').forEach(element => {
        //     element.addEventListener('click', (e) => {
        //       console.log(e.target)
        //       window.open(e.target.getAttribute('_href'))
        //     })
        //   })
        // },
        syncSideBySidePreviewScroll: true,
        inlineAttachmentOptions: {
          onFileReceived (file) {
            const formData = new FormData()
            formData.append('smfile', file)
            axios({
              method: 'post',
              url: 'https://sm.ms/api/upload',
              data: formData
            }).then(res => {
              let data = res.data.data
              this.settings.setAttachmentUrl(data.url, this)
            }).catch(error => {
              console.error(error)
            })
          }
        }
      }
    }
  },
  created () {
    // // Remember old renderer, if overriden, or proxy to default renderer
    // var defaultRender = mdr.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    //   return self.renderToken(tokens, idx, options)
    // }
    // mdr.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    //   // If you are sure other plugins can't add `target` - drop check below
    //   if (tokens[idx] && typeof tokens[idx].attrIndex === 'function') {
    //     var aIndex = tokens[idx].attrIndex('target')
    //     console.log(tokens[idx].attrGet('href'), tokens[idx].attrGet('_href'))
    //     if (aIndex < 0) {
    //       tokens[idx].attrPush(['target', '_blank']) // add new attribute
    //       tokens[idx].attrSet('_href', tokens[idx].attrGet('href'))
    //       tokens[idx].attrSet('href', 'javascript:void(0);')
    //       tokens[idx].attrSet('class', 'custom_link_open')
    //     } else {
    //       tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
    //     }
    //   }

    //   // pass token to default renderer.
    //   return defaultRender(tokens, idx, options, env, self)
    // }
  },
  components: {
    VueFreemde
  }
}
</script>

<style scoped>
/* @import '/Users/leiys/gitspace/markdown-core/dist/mdr.min.css'; */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
