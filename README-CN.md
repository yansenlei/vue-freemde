# vue-freemde

[![npm version](https://badge.fury.io/js/vue-freemde.svg)](https://badge.fury.io/js/vue-freemde)
[![Build Status](https://travis-ci.org/yansenlei/vue-freemde.svg?branch=master)](https://travis-ci.org/yansenlei/vue-freemde)
[![license](https://img.shields.io/npm/l/express.svg)](https://github.com/yansenlei/vue-freemde/blob/master/LICENSE)

中文文档 | [English](./README.md)

## What it is

> 一个可以自定义编辑和渲染的Vue-Markdown组件, 基于simplemde

Github: https://github.com/yansenlei/vue-freemde

Demo: https://jsfiddle.net/leiys/s2jw8ode/

![2018-12-15 23.56.19.gif](https://user-gold-cdn.xitu.io/2018/12/17/167ba1c46c48469d?w=796&h=808&f=gif&s=335100)

## 安装
```bash
$ npm i vue-freemde -S
```

## 使用

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
      configs: { // 自定义配置你的Markdown编辑器
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
      }],
      markdown () {
          // 自定义渲染器
          return render('# title')
      },
      inlineAttachmentOptions: {
        onFileReceived (file) {
          // 上传到你的文件服务器，得到图片URL
          this.settings.setAttachmentUrl(url, this)
        }
      }
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

### Configs 配置信息

- **markdown**: 自定义渲染器钩子，默认为`marked`
- **view**: 渲染结束的钩子，用于绑定事件或基于元素的渲染
- **inlineAttachmentOptions**: 粘贴/拖拽 图片参数
  - **onFileReceived**: 接收图片的钩子, 参数: `file`.
  - **progressText**: default `'![uploading file...]()'`
  - **urlText**: `'![]({filename})'`.
  - **errorText**: `'Error uploading file'`.

更多配置信息参见: [freemde configuration](https://github.com/yansenlei/free-markdown-editor#configuration)

## License

欢迎提交Issues、PR

MIT - [yansenlei](https://github.com/yansenlei)
