<template>
  <div class="md-container">
    <mavon-editor
      ref="md"
      :value="bindContent || ''"
      :subfield="isMobile? false : true"
      :defaultOpen="isMobile ? 'edit' : ''"
      :transition="false"
      codeStyle="xcode"
      :tabSize="4"
      :toolbars="toolbars"
      :autofocus="false"
      @save="handleSave"
      @change="handleContentChange"
      @imgAdd="$imgAdd"
    />

    <!-- <el-button v-for="theme in themes" :key="theme" @click="handleChoose(theme)">{{theme}}</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import highLight from "./hightligt-theme";
import { toolbarPC, toolbarMobile } from "./toobars";
import http from '@/utils/common/http'

export default {
  props: {
    // 内容的双向绑定
    bindContent: {
      default: ""
    }
  },
  data() {
    return {
      content: "",
      theme: ""
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    isMobile() {
      return this.baseInfo.isMobile;
    },
    themes() {
      return Object.keys(highLight);
    },
    toolbars() {
      this.isMobile ? toolbarMobile : toolbarPC;
    }
  },
  methods: {
    handleChoose(val) {
      this.theme = val;
    },
    // 触发保存事件
    handleSave() {
      this.$emit("save");
    },
    // 编辑区发生变化
    handleContentChange(val) {
      this.$emit("update:bindContent", val);
    },
    // 上传图像
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      http.post('/upload/img/', {
          data: formdata
      })
      .then(data => {
          this.$refs.md.$img2Url(pos, data.data.url)
      })
      .catch(err => this.$message.error({message: err.msg || err}))
    //   axios({
    //     url: "/upload/img",
    //     method: "post",
    //     data: formdata,
    //     headers: { "Content-Type": "multipart/form-data" }
    //   }).then(url => {
    //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     /**
    //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
    //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
    //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
    //      */
    //     $vm.$img2Url(pos, url);
    //   });
    }
  }
};
</script>

<style lang="less">
.md-container {
  .v-note-wrapper {
    min-height: 600px;
    margin-bottom: 100px;
  }
}
</style>