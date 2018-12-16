# vue-freemde

> A Vue Markdown Editor for Custom Editing and Rendering

![2018-12-15 23.56.19.gif](https://i.loli.net/2018/12/15/5c1524a6ee897.gif)

## install
```bash
$ npm i vue-freemde -S
```

## How to use

### Import globally

```javascript
import Vue from 'vue';
import VueFreemde from 'vue-freemde';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VueFreemde);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
```

### Import locally

```javascript
import VueFreemde from 'vue-freemde';

export default {
  name: 'app',
  components: {
    VueFreemde,
  },
  data() {
    return {
      data: '',
      configs: {
        spellChecker: false,
        autofocus: true,
        toolbar: ['bold', 'italic', 'strikethrough', '|', 'link', 'image', {
          name: 'custom',
          action: (markdown) => {
            const data = markdown.value()
            this.$emit('save', data)
          },
          className: 'fa fa-save',
          title: 'Save'
      }]
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.Markdown.editor
    }
  }
};
```

### Use in template

```html
<template>
  <div id="app">
    <vue-freemde v-model="data" ref="Markdown" :configs="configs"></vue-freemde>
  </div>
</template>
```

### Configs

- **markdown**: Custom markdown renderer hook. default use marked renderer.
- **view**: The rendered callback hook, Used for binding events or element-based rendering.
- **inlineAttachmentOptions**: Paste Image Parameters.
  - **onFileReceived**: Paste Image Received, param: `file`.
  - **progressText**: default `'![uploading file...]()'`
  - **urlText**: `'![]({filename})'`.
  - **errorText**: `'Error uploading file'`.

and more configs see: [freemde configuration](https://github.com/yansenlei/free-markdown-editor#configuration)

## License

:smiley: if you have any comments or wish to contribute to this project, you are welcome to submit Issues or PR.

MIT - [yansenlei](https://github.com/yansenlei)