<template>
  <div class="markdown-editor" id="markdown-editor">
    <textarea :name="name"></textarea>
    <!-- <na-title :data="value" :html="html" :simplemde="editor" ref="NaTitle"></na-title> -->
  </div>
</template>

<script>
import SimpleMDE from 'freemde'
// import SimpleMDE from '/Users/leiys/gitspace/easy-markdown-editor/src/js/freemde.js'
import 'freemde/dist/freemde.min.css'
export default {
  name: 'markdown-editor',
  data () {
    return {
      editor: null,
      html: ''
    }
  },
  // components: { NaTitle },
  props: {
    value: String,
    name: String,
    previewClass: String,
    autoinit: {
      type: Boolean,
      default () {
        return true
      }
    },
    highlight: {
      type: Boolean,
      default () {
        return false
      }
    },
    sanitize: {
      type: Boolean,
      default () {
        return false
      }
    },
    configs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    if (this.autoinit) this.initialize()
  },
  activated () {
    const editor = this.editor
    if (!editor) return
    const isActive = editor.isSideBySideActive() || editor.isPreviewActive()
    if (isActive) editor.toggleFullScreen()
  },
  methods: {
    initialize () {
      // this.configs.toolbar = Object.assign(this.configs.toolbar, this.defaultTools())
      const configs = Object.assign(
        {
          element: this.$el.firstElementChild,
          initialValue: this.value,
          renderingConfig: {}
        },
        this.configs
      )
      // 同步 value 和 initialValue 的值
      if (configs.initialValue) {
        this.$emit('input', configs.initialValue)
      }
      // 判断是否开启代码高亮
      if (this.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = true
      }
      // 设置是否渲染输入的html
      // marked.setOptions({ sanitize: this.sanitize });
      // 实例化编辑器
      if (this.editor) {
        this.editor = null
      }
      this.editor = new SimpleMDE(configs)
      // 添加自定义 previewClass
      const className = this.previewClass || ''
      this.addPreviewClass(className)
      // 绑定事件
      this.bindingEvents()
    },
    defaultTools () {
      // wait fix
      let ef = this
      return [{
        name: 'custom',
        action: () => {
          ef.$refs.NaTitle.isShow = !ef.$refs.NaTitle.isShow
        },
        className: 'fa fa-bars',
        title: 'Title'
      }]
    },
    bindingEvents () {
      this.editor.codemirror.on('change', () => {
        const text = this.editor.value()
        this.$emit('input', text)
        this.html = this.editor.markdown(text)
      })
    },
    addPreviewClass (className) {
      const wrapper = this.editor.codemirror.getWrapperElement()
      const preview = document.createElement('div')
      wrapper.nextSibling.className += ` ${className}`
      preview.className = `editor-preview ${className}`
      wrapper.appendChild(preview)
    }
  },
  destroyed () {
    this.editor = null
  },
  watch: {
    value (val) {
      if (val === this.editor.value()) return
      this.editor.value(val)
    },
    configs () {
      this.initialize()
    }
  }
}

</script>

<style scoped>
.markdown-editor {
  position: relative;
}
.markdown-editor .markdown-body {
  padding: 0.5em
}
.markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
  display: block;
}
</style>
