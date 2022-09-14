<!-- Please remove this file from your project -->
<template>
  <div
    class="bg-white"
    id="index"
    v-loading="load"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="
          mt-6
          grid grid-cols-1
          gap-y-10 gap-x-6
          sm:grid-cols-2
          lg:grid-cols-4
          xl:gap-x-8
        "
      >
        <div
          class="group relative"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <div
            class="
              min-h-80
              aspect-w-1 aspect-h-1
              w-full
              overflow-hidden
              rounded-md
              bg-gray-200
              lg:aspect-none lg:h-80
            "
          >
            <img
              :src="item.image"
              alt="Front of men&#039;s Basic Tee in black."
              class="
                h-full
                w-full
                object-cover object-center
                lg:h-full lg:w-full
              "
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ item.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">￥{{ item.price }}</p>
          </div>
        </div>
        <!-- More products... -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      load: true,
      categoryId: "", // 商品类型
      goodsList: [], // 商品列表
    };
  },
  methods: {
    async getGoodsList() {
      try {
        this.load = true;
        let res = await this.$axios.get("/api/products", {
          params: { category: this.categoryId || undefined },
        });
        if (res.status == 200) {
          this.goodsList = res.data.data;
        }
      } catch (error) {
        console.error("获取商品列表失败：" + error);
      } finally {
        this.load = false;
      }
    },
  },
  mounted() {
    this.getGoodsList();
    this.$nuxt.$on("init", (index) => {
      this.categoryId = index;
      this.getGoodsList();
    });
  },
};
</script>

