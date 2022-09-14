<template>
  <div class="categor mt-6 mb-6" :style="{ left: foldNav ? '0' : '-222px' }">
    <div class="categor-nav" :style="{ display: fitWidth ? 'none' : 'block' }">
      <span
        style="color: #fff"
        :class="['iconfont', foldNav ? 'icon-xiangzuojiantou' : 'icon-jiantou']"
        @click="changeFoldNav"
      ></span>
    </div>
    <div class="categor-name" @click="changeSelectChild()">全部</div>
    <div
      class="categor-item"
      v-for="(item, index) in categoryList"
      :key="index"
    >
      <div class="categor-name" @click="changeSelectCategor(item.id)">
        <span>{{ item.name }}</span>
        <span
          style="padding-right: 6px"
          :class="[
            'iconfont',
            selectCategor.indexOf(item.id) != -1
              ? 'icon-xiajiantou'
              : 'icon-jiantou',
          ]"
        ></span>
      </div>
      <ul
        :style="{
          display: selectCategor.indexOf(item.id) != -1 ? 'block' : 'none',
        }"
      >
        <li
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          @click="changeSelectChild(child.id, child.parent_id)"
          :style="{ color: child.id == selectChil ? 'red' : '#000' }"
        >
          {{ child.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorList",
  data() {
    return {
      categoryList: [],
      selectCategor: [],
      selectChil: 0,
      fitWidth: true,
      foldNav: true,
    };
  },
  methods: {
    async getCategor() {
      try {
        let res = await this.$axios.get("/api/categories");
        if (res.status == 200) {
          this.categoryList = res.data.data;
        }
      } catch (error) {
        console.error("获取商品类型失败：" + error);
      }
    },
    changeSelectCategor(index) {
      if (this.selectCategor.indexOf(index) == -1) {
        this.selectCategor.push(index);
      } else {
        this.selectCategor.splice(this.selectCategor.indexOf(index), 1);
      }
    },
    changeFoldNav() {
      this.foldNav = !this.foldNav;
    },
    changeSelectChild(index = 0, parent_id = 0) {
      this.selectChil = index;
      this.$nuxt.$emit("init", parent_id);
    },
  },
  mounted() {
    this.getCategor();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        if (that.screenWidth <= 1262) {
          this.fitWidth = false;
        } else {
          this.fitWidth = true;
          this.foldNav = true;
        }
      })();
    };
  },
};
</script>

<style>
.categor {
  min-width: 220px;
  position: fixed;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  background-color: #fff;
}
.categor-nav {
  cursor: pointer;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  left: 100%;
  top: 50%;
  width: 16px;
  height: 20px;
  line-height: 20px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-50%);
}
.categor-name {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 18px;
  line-height: 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}

.categor-item ul li {
  cursor: pointer;
  padding-left: 20px;
  margin: 4px auto;
}
.categor-item ul li:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0);
}
</style>