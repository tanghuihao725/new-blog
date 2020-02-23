<template>
  <div class="cloud-config-contianer">
    <div class="title">
      <h1>云控管理</h1>
      <p>注意：现在三级只支持string,二级可以支持数组，对象，字符串，请管理好数据，避免发生不可控事件。</p>
      <p>更改完value值记得按提交</p>
    </div>
    <el-form v-loading="loading">
      <el-form-item class="first-item" v-for="key in objToKeysArray(json)" :key="key" :label="key">
        <!-- 如果是字符串 直接为input输入 -->
        <el-input type="textarea" v-model="json[key]" v-if="typeof json[key] === 'string'"></el-input>

        <el-switch v-else-if="typeof json[key] === 'boolean'" v-model="json[key]"></el-switch>

        <!-- 如果不是数组,不是字符串 那就是对象 -->
        <div class="obj-wrapper" v-else-if="!Array.isArray(json[key])">
          <el-input
            v-model="temp"
            class="small-input"
            :placeholder="`请输入你要操作的JSON.${key}下的二级对象的key值`"
          ></el-input>
          <el-switch v-model="tempBool"></el-switch>{{`  ${tempBool ? "字符串" : "布尔"} `}}
          <el-button type="warning" @click="handleObjAdd(key,temp,tempBool)" :disabled="!temp">二级添加</el-button>
          <el-button type="warning" @click="handleObjRemove(key,temp)" :disabled="!temp">二级移除</el-button>
          <el-form-item
            class="second-item"
            v-for="secondKey in objToKeysArray(json[key])"
            :key="secondKey"
            :label="secondKey"
          >
            <el-input
              type="textarea"
              v-model="json[key][secondKey]"
              v-if="typeof json[key][secondKey]=== 'string'"
            ></el-input>

            <el-switch
              v-else-if="typeof json[key][secondKey] === 'boolean'"
              v-model="json[key][secondKey]"
            ></el-switch>
          </el-form-item>
        </div>

        <!-- 最后只剩下数组 -->
        <div class="arr-wrapper" v-else>
          <el-form-item class="arr-item" v-for="(obj,idx) in json[key]" :key="idx">
            <!-- 对于数组中的每一项又是一个对象 -->
            <el-form-item
              class="third-item"
              v-for="thirdKey in objToKeysArray(obj)"
              :key="thirdKey"
              :label="thirdKey"
            >
              <el-input
                type="textarea"
                v-model="json[key][idx][thirdKey]"
                v-if="typeof json[key][idx][thirdKey] === 'string'"
              ></el-input>

              <el-switch
                v-else-if="typeof json[key][idx][thirdKey] === 'boolean'"
                v-model="json[key][idx][thirdKey]"
              ></el-switch>
            </el-form-item>
            <el-button type="danger" @click="handleArrMin(json[key],idx)">移除该数组项</el-button>
          </el-form-item>
          <el-input
            class="small-input"
            v-model="temp"
            v-if="json[key].length===0"
            placeholder="请输入新数组的key名，请用,隔开"
          ></el-input>
          <el-button
            type="danger"
            @click="handleArrAdd(json[key],temp)"
            :disabled="!temp && json[key].length===0"
          >添加一项数组项</el-button>
        </div>
      </el-form-item>

      <el-input class="small-input" v-model="temp" type="text" placeholder="选择你要操作的JSON的一级key名"></el-input>
      <el-radio v-model="tempType" label="1">普通字符串</el-radio>
      <el-radio v-model="tempType" label="2">二级对象</el-radio>
      <el-radio v-model="tempType" label="3">二级数组</el-radio>
      <el-button type="warning" @click="outerAddObj(temp,tempType)" :disabled="!temp">一级增加</el-button>
      <el-button type="warning" @click="outerRemoveObj(temp,tempType)" :disabled="!temp">一级移除</el-button>

      <el-form-item>
        <el-button type="success" @click="handleSubmit" class="submit">Submit</el-button>
      </el-form-item>
    </el-form>
    JSON预览：
    {{json}}
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      json: {},
      temp: "",
      tempType: "1",
      tempBool: false,
      loading: false
    };
  },
  computed: {},
  methods: {
    ...mapActions("user/userManagement", ["fetchManagerDetails", "updateUser"]),
    objToKeysArray(obj) {
      return Object.keys(obj);
    },
    handleArrAdd(arr, temp) {
      const item = {};
      if (arr.length) {
        Object.keys(arr[arr.length - 1]).forEach(key => {
          item[key] = "";
        });
      } else {
        temp.split(",").forEach(key => {
          item[key] = "";
        });
      }
      arr.push(item);
      this.handleSubmit();
    },
    handleArrMin(arr, index) {
      arr.splice(index, 1);
      this.handleSubmit();
    },
    handleObjAdd(key, newKey, tempBool) {
      this.json[key][newKey] = tempBool ? false : "";
      this.handleSubmit();
    },
    handleObjRemove(key, temp) {
      delete this.json[key][this.temp];
      this.handleSubmit();
    },
    outerAddObj(temp, tempType) {
      if (tempType == "1") {
        this.json[temp] = "请输入新内容";
      } else if (tempType == "2") {
        this.json[temp] = {};
      } else {
        this.json[temp] = [];
      }
      this.handleSubmit();
    },
    outerRemoveObj(temp) {
      delete this.json[temp];
      this.handleSubmit();
    },
    handleSubmit() {
      const params = { id: 1 };
      const data = {
        details: this.jsonAfterProcess()
      };
      this.updateUser({ params, data })
        .then(() => {
          this.$message.success({ message: "更改成功" });
          this.freshFormTable();
        })
        .catch(() => {
          this.$message.error({ message: "更改失败" });
        });
    },
    jsonAfterProcess() {
      const reg = /\\n/g;
      return JSON.stringify(this.json).replace(reg, "\\\\n");
    },
    freshFormTable() {
      this.loading = true;
      this.temp = "";
      this.tempType = "1";
      this.fetchManagerDetails().then(res => {
        this.json = JSON.parse(res.data.data[0].details);
        this.loading = false
      });
    }
  },
  mounted() {
    this.freshFormTable();
  }
};
</script>

<style lang="less">
.first-item {
  border: 2px dotted yellow;
  padding: 20px 20px;
}

.second-item {
  margin: 0 70px;
}

.arr-item {
  margin: 30px 70px;
  border: 2px dotted red;
  padding: 20px 20px;
}

.small-input {
  width: 30%;
  margin-right: 20px;
}
</style>

<style lang="less" scoped>
.title {
  text-align: center;
}
.el-button {
  margin: 10px 10px 10px 0;
}
</style>