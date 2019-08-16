<template>
    <div class="page">

        <el-row>
            <el-col :span="16" :offset="4">

                <div v-for="(item,index_1) in common_bookmarks">
                    <h2>{{item.category_name}}</h2>
                    <div class="category">
                        <Bookmark v-for="(bookmark,index_2) in item.bookmarks" @close="delBookmark(index_1,index_2)"
                                  :title="bookmark.title" :url="bookmark.url" :can-close="false"/>
                    </div>
                </div>


            </el-col>
        </el-row>

    </div>
</template>

<script>
  import Bookmark from '../../components/Bookmark.vue'

  export default {
    name: "commonNav",
    components: {
      Bookmark: Bookmark,
    },
    data() {
      return {
        common_bookmarks: []
      }
    },
    mounted() {
        this.get_common_bookmark()
    },
    methods: {
      get_common_bookmark() {
        let that = this;
        that.$http({
          url: "/bookmark/common_bookmark"
        }).then(res => {
          if (res.data.errcode == 0) {
            that.common_bookmarks = res.data.data
          }
        })
      },
    }

  }
</script>

<style scoped lang="less">
    .page {
        background-image: url("");
        background-position: 100% 100%;

        .category {
            display: flex;
            flex-direction: row;
            flex-flow: wrap;

            div {
                margin-right: 20px;
            }

        }

        .add-btn {
            width: 150px;
            height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 5px;

            &:hover {
                background-color: rgba(200, 200, 200, .3);
                cursor: pointer;
                color: #42b983;
            }

            font-size: 60px;
            color: #aaa;

        }
    }
</style>