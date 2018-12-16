<template>
  <div id="main-content">
    <editor ref="Editor" v-model="markValue" :configs="configs"></editor>
  </div>
</template>

<script>
import Editor from './components/Editor' // { MDE }
export default {
  name: 'vue-freemde',
  data () {
    return {
      markValue: '',
      defaultConfigs: {}
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    configs: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Editor
  },
  methods: {
    onRefresh () {
      this.editor.codemirror.refresh()
    }
  },
  mounted () {
    this.markValue = this.value
    this.defaultConfigs = this.configs
  },
  computed: {
    editor () {
      return this.$refs.Editor.editor
    }
  },
  watch: {
    configs () {
      // this.defaultConfigs = Object.assign(this.defaultConfigs, this.configs)
    },
    markValue (value) {
      if (this.value !== value) {
        this.$emit('input', value)
      }
      this.$nextTick(() => {
        this.editor.codemirror.refresh()
      })
    },
    value (value) {
      if (value !== this.markValue) {
        this.markValue = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
