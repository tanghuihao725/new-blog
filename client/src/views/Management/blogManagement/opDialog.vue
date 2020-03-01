<template>
  <el-dialog
    title="操作"
    top="10vh"
    @open="handleOpen"
    :width="baseInfo.isMobile? '90%' : '50%'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="标签">
        <TagSelector @change="handleTagChange" ref="myTagSelector"/>
      </el-form-item>
      
      <el-form-item label="专辑">
        <AlbumSelector @change="handleAlbumChange" ref="myAlbumSelector"/>
      </el-form-item>

      <el-form-item label="浏览量">
         <el-input-number v-model="form.views" :min="0" :max="99999"></el-input-number>
      </el-form-item>

    <el-form-item label="点赞数">
         <el-input-number v-model="form.likes" :min="0" :max="99999"></el-input-number>
      </el-form-item>

      <el-form-item label="排序">
        <el-slider v-model="form.orderFactor"></el-slider>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TagSelector from "@/components/Tags/TagSelector";
import AlbumSelector from "@/components/Album/AlbumSelector"

export default {
  props: {
    dialogVisible: {
      default: false
    },
    // 是否传数据进来
    defaultData: {
      default: null
    }
  },
  data() {
    return {
      form: {
        title: "",
        views: 0,
        likes: 0,
        orderFactor: 50,
        tags: "",
        album: ""
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"])
  },
  methods: {
    ...mapActions("content/blogs", ["updateBlog"]),
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleOpen() {
      const {
        title,
        views,
        likes,
        orderFactor,
        id,
        tags = "",
        album = "",
        ...others
      } = this.defaultData;
      Object.assign(this.form, { title, views, likes, orderFactor, id, tags, album });
      setTimeout(()=>{
        this.$refs['myTagSelector'].refreshChoosenListWithIds(tags)
        this.$refs['myAlbumSelector'].refreshChoosenListWithIds(album)
      },100)
    },
    // 当选中标签或者专辑后
    handleTagChange(tagIds){
      this.form.tags = tagIds
    },
    handleAlbumChange(albumIds){
      this.form.album = albumIds
    },
    onSubmit() {
      /**
       * 预处理：blog名空检查
       */
      if (!this.form.title) {
        this.$message.error({ message: "博客标题不能为空" });
        return;
      }
      this.updateBlog(this.form)
        .then(() => {
          this.$message.success({ message: "操作成功" });
          this.$emit("success");
          this.handleClose();
        })
        .catch(err => this.$message.error({ message: err.msg || err }));
    }
  },
  components: {
    TagSelector, AlbumSelector
  }
};
</script>