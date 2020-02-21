<template>
  <div :class="{
      container: true,
      pc: !isMobile,
      mobile: isMobile
  }">
    <div class="op-group">
      <el-button
        :type="isEdit ? 'warning' : 'success'"
        @click="submit"
      >{{ isEdit ? "完成更改" : "提交发布"}}</el-button>
      <el-button @click="handleSave">保存本地</el-button>
    </div>

    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="博客标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="标签">
        <TagSelector @change="handleTagChange" ref="tagSelector" />
      </el-form-item>

      <el-form-item label="专辑">
        <AlbumSelector @change="handleAlbumChange" ref="albumSelector" />
      </el-form-item>

      <el-form-item label="介绍">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          :action="`${baseUrl}/upload/img`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="form.coverImage" :src="form.coverImage" class="avatar" style="maxWidth:400px;maxHeight:300px;"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <span>比例最好3:2！ </span> <el-button type="text" @click="form.coverImage=''">清空图片</el-button>
      </el-form-item>

      <el-form-item :label="`排序${form.orderFactor}`">
        <el-slider v-model="form.orderFactor"></el-slider>
      </el-form-item>
    </el-form>
    <MDEditor @save="handleSave" :bindContent.sync="form.body" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TagSelector from "@/components/Tags/TagSelector";
import AlbumSelector from "@/components/Album/AlbumSelector";
import MDEditor from "@/components/MDEditor";
import myconfig from '@/myconfig'

export default {
  data() {
    return {
      form: {
        id: null,
        title: "",
        tags: "",
        album: "",
        body: "",
        description: "",
        coverImage: "",
        orderFactor: 50
      },
      leaveLock: true // 离开锁,页面修改时锁上,正常提交后解锁
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    baseUrl(){
      return myconfig.baseUrl
    },
    isMobile() {
      return this.baseInfo.isMobile;
    },
    isEdit() {
      return !!this.form.id;
    }
  },
  mounted() {
    if (this.$route.query) {
      this.form.id = this.$route.query.id;
    }
    if (localStorage && localStorage.blogContent) {
      // 如果本地库里有内容 提示是否要覆盖
      this.$confirm("您有未提交内容，是否覆盖？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "不要了",
        type: "warning"
      })
        .then(() => {
          const blogContent = JSON.parse(localStorage.blogContent);
          const {
            title,
            body = "",
            tags = "",
            album = "",
            description = "",
            coverImage = "",
            orderFactor
          } = blogContent;
          Object.assign(this.form, {
            title,
            body,
            tags,
            album,
            description,
            coverImage,
            orderFactor
          });
          this.$refs["tagSelector"].refreshChoosenListWithIds(tags);
          this.$refs["albumSelector"].refreshChoosenListWithIds(album);
        })
        .catch(() => {
          delete localStorage.blogContent;
          this.setInitData();
        });
    } else {
      if (this.isEdit) {
        this.setInitData();
      }
    }
  },
  methods: {
    ...mapActions("content/blogs", [
      "createBlog",
      "updateBlog",
      "getSingleBlog"
    ]),
    handleTagChange(tagIds) {
      this.form.tags = tagIds;
    },
    handleAlbumChange(albumId) {
      this.form.album = albumId;
    },
    handleAvatarSuccess(res){
      // 图片上传成功回调
      this.form.coverImage = res.url
    },
    /**
     * 由于博客内容如果有单引号会和sql语句冲突，所以得过滤 加上转义字符
     */
    dealWithBody() {
      const reg = /\'/g;
      this.form.body = this.form.body.replace(reg, "\\'");
    },
    /**
     * 触发了保存按钮后,不储存id
     */
    handleSave() {
      if (localStorage) {
        const { id, ...others } = this.form;
        localStorage.blogContent = JSON.stringify(others);
        this.$notify.success({
          title: "成功",
          message: "已经保存至本地",
          duration: "1000"
        });
      }
    },
    setInitData() {
      if (this.isEdit) {
        const { id } = this.form;
        this.getSingleBlog({ id, type: 4 })
          .then(res => {
            const blog = res.data && res.data.data[0];
            if (blog) {
              let {
                title,
                body = "",
                tags = "",
                album,
                orderFactor,
                coverImage,
                description
              } = blog;
              body = body === null ? "" : body;
              Object.assign(this.form, {
                title,
                body,
                tags,
                album,
                orderFactor,
                coverImage,
                description
              });
              this.$refs["tagSelector"].refreshChoosenListWithIds(tags);
              this.$refs["albumSelector"].refreshChoosenListWithIds(album);
            }
          })
          .catch(err => this.$message.error({ message: err }));
      }
    },
    submit() {
      const f = this.isEdit ? this.updateBlog : this.createBlog;
      // 空名检查
      if (!this.form.title) {
        this.$message.error({ message: "博客标题不能为空" });
      } else {
        // body预处理
        this.dealWithBody();
        f(this.form)
          .then(() => {
            this.$message.success({ message: "提交成功" });
            this.leaveLock = false;
            if (localStorage) delete localStorage.blogContent;
            this.$router.push("/management");
          })
          .catch(err => this.$message.error({ message: err.msg || err }));
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 如果锁未锁住
    if (!this.leaveLock) {
      next();
    } else {
      this.$confirm("您即将离开此页面, 是否确认已经保存?", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "我再想想",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    }
  },
  components: {
    TagSelector,
    AlbumSelector,
    MDEditor
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .op-group {
    margin: 20px 0;
    text-align: right;
  }

  .submit-wrapper {
    position: fixed;
    right: 150px;
    top: 100px;
    z-index: 20000;
  }
}

.pc {
  width: 80%;
  padding: 10px 0;
  .form {
    width: 80%;
  }

  .welcome-title {
    text-align: center;
  }
}

.mobile {
  width: 80%;
}
</style>


<style lang="less">
// 图片上传器的样式
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


