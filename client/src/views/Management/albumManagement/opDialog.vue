<template>
  <el-dialog
    title="编辑／新增"
    top="10vh"
    @open="handleOpen"
    :width="baseInfo.isMobile? '90%' : '50%'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="预览">
        <Album :albumData="form" :chooseAble="true" />
      </el-form-item>
      <el-form-item label="专辑名称">
        <el-input v-model="form.albumName"></el-input>
      </el-form-item>

      <el-form-item label="专辑icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="种类">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="小图标">
        <ImgUploader :imageUrl.sync="form.smallCoverImage" />
      </el-form-item>

      <el-form-item label="大图标">
        <ImgUploader :imageUrl.sync="form.coverImage" />
      </el-form-item>

      <el-form-item label="控制">
        <el-switch v-model="form.hide" active-color="#13ce66" inactive-color="#666"></el-switch>
        <span style="margin:0 5px">仅自己可见</span>
        <el-switch v-model="form.notPush" active-color="#13ce66" inactive-color="#666"></el-switch>
        <span style="margin:0 5px">不推荐到主页</span>
      </el-form-item>

      <el-form-item label="排序">
        <el-slider v-model="form.orderFactor"></el-slider>
      </el-form-item>

      <el-form-item label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Album from "@/components/Album";
import ImgUploader from '@/components/ImgUploader'

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
        albumName: "",
        icon: "",
        description: "",
        type: 0,
        hide: false,
        orderFactor: 50,
        color: "#6f93bd",
        smallCoverImage: "",
        coverImage:"",
        notPush: false
      },
      options: [
        {
          value: 0,
          label: "Markdown博客"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    // 是否为编辑状态
    isEdit() {
      return !!this.defaultData;
    }
  },
  watch: {
    // 如果仅自己可见打开，那么不推到主页一定也会打开
    "form.hide": {
      handler: function(val) {
        if (val) {
          this.form.notPush = val;
        }
      }
    }
  },
  methods: {
    ...mapActions("content/albums", ["createAlbum", "updateAlbum"]),
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleOpen() {
      if (this.isEdit) {
        const {
          createdAt,
          updatedAt,
          notPush,
          hide,
          ...others
        } = this.defaultData;
        Object.assign(this.form, others, {
          hide: Boolean(hide),
          notPush: Boolean(notPush)
        });
      } else {
        // 如果是增加新专辑 则初始化表单
        this.form = {
          albumName: "",
          icon: "",
          description: "",
          type: 0,
          hide: false,
          orderFactor: 50,
          color: "#6f93bd",
          notPush: false,
          smallCoverImage: "",
          coverImage: ""
        };
      }
    },
    onSubmit() {
      /**
       * 预处理：专辑名空检查，Boolean值转换为数值
       */
      const { hide, notPush, ...others } = this.form;
      if (!others.albumName) {
        this.$message.error({ message: "专辑名不能为空" });
        return;
      }
      const payload = Object.assign(others, {
        hide: Number(hide),
        // 如果hide为1 那么notPush也强制为1
        notPush: Number(hide) ? 1 : Number(notPush)
      });

      const f = this.isEdit ? this.updateAlbum : this.createAlbum;

      f(payload)
        .then(() => {
          this.$message.success({ message: "操作成功" });
          this.$emit("success");
          this.handleClose();
        })
        .catch(err => this.$message.error({ message: err.msg || err }));
    }
  },
  components: {
    Album,ImgUploader
  }
};
</script>

