<template>
  <div class="log-page">
    <div class="left">
      <el-form label-width="80px">
        <el-form-item label="地址">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            @select="handleSelect"
            :trigger-on-focus="false"
            custom-item="address-item-1"
            icon="circle-cross"
            :on-icon-click="handleIconClick"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
    </div>
    <baidu-map class="map"></baidu-map>
  </div>
</template>

<script>
  import API from '../config/api'
  import Vue from 'vue'

  Vue.component('address-item-1', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', {attrs: {class: 'value'}}, [item.value]),
        h('span', {attrs: {class: 'addr'}}, [`${item.city}${item.district}${item.name}`])
      ]);
    },
    props: {
      item: {type: Object, required: true}
    }
  });
  export default {
    data() {
      return {
        addressArray: [],
        address: '',
      }
    },
    mounted() {
      API.transitDirection({
        origin: '40.056878,116.30815',
        destination: '31.222965,121.505821',
        arr: [{a: 1, b: 'b'}, {c: 2, d: 'd'}],
      });

      API.postJoke({type: 'pic'});
    },
    methods: {
      querySearchAsync(query, cb) {
        API.fetchSuggestionPlace({query: query}).then(res => {
          this.addressArray = res.result.map(item => {
            item.value = item.name;
            return item;
          });
          cb(this.addressArray);
        });
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        this.address = '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .my-autocomplete {
    li {
      .value {
        font-size: 18px;
      }
      .addr {
        color: gray !important;
        font-size: 12px !important;
      }
    }
  }

  .log-page {
    display: flex;

    .el-autocomplete, .el-dropdown {
      width: 100% !important;
    }

    .left {
      padding: 10px;
      flex: 3;
    }
    /* 地图容器必须设置宽和高属性 */
    .map {
      flex: 2;
      height: 400px;
    }
  }
</style>
