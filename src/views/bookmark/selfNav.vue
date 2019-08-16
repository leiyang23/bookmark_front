<template>
    <div class="page">

        <el-row>
            <el-col :span="16" :offset="4">

                <div v-for="(item,index_1) in self_bookmarks">
                    <div class="category-title">
                        <div><h3>{{item.category_name}}</h3></div>
                        <div title="删除分类" @click="delCategory(item.category_id,index_1)">
                            <span class="fa fa-minus"></span>
                        </div>
                    </div>
                    <div class="category">
                        <Bookmark v-for="(bookmark,index_2) in item.bookmarks" @close="delBookmark(index_1,index_2)"
                                  :title="bookmark.title" :url="bookmark.url"/>
                        <div class="add-btn" @click="showDialog(item.category_id,index_1)" title="添加书签">
                            <span class="fa fa-plus"></span>
                        </div>
                    </div>
                </div>

                <div class="add-category-bar" title="添加分类" @click="dialogFormVisible_2 = true"><span
                        class="fa fa-plus"></span></div>


            </el-col>
        </el-row>

        <el-dialog title="添加书签" :visible.sync="dialogFormVisible">
            <el-form :model="bookmarkForm">
                <el-form-item label="标题">
                    <el-input v-model="bookmarkForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="bookmarkForm.url" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBookmark">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加分类" :visible.sync="dialogFormVisible_2">
            <el-form :model="categoryForm">
                <el-form-item label="分类名称">
                    <el-input v-model="categoryForm.category_name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_2 = false">取 消</el-button>
                <el-button type="primary" @click="subCategory">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import Bookmark from '../../components/Bookmark.vue'

  export default {
    name: "selfNav",
    components: {
      Bookmark: Bookmark,
    },
    data() {
      return {
        index: 1,
        bookmarkForm: {
          category_id: ''
        },
        dialogFormVisible: false,
        self_bookmarks: [],

        dialogFormVisible_2: false,
        categoryForm: {
          category_name: ''
        },
      }
    },
    mounted() {
      this.get_self_bookmark()
    },
    methods: {
      get_self_bookmark() {
        let that = this;
        that.$http({
          url: "/bookmark/self_bookmark",
          params: {
            github_id: JSON.parse(localStorage.getItem("user")).github_id
          }
        }).then(res => {
          if (res.data.errcode === 0) {
            that.self_bookmarks = res.data.data
          }
        })
      },
      showDialog(category_id, index) {
        this.dialogFormVisible = true;
        this.bookmarkForm.category_id = category_id;
        this.index = index
      },
      delBookmark(index_1, index_2) {
        // 删除书签
        let that = this;
        let u = JSON.parse(localStorage.getItem("user"));
        that.$http({
          url: '/bookmark/del_bookmark',
          method: "POST",
          data: {
            github_id: u.github_id,
            token: u.token,
            category_id: that.self_bookmarks[index_1],
            bookmark_id: that.self_bookmarks[index_1].bookmarks[index_2].bookmark_id,
          }
        }).then(res => {
          if (res.data.errcode == 0) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            this.self_bookmarks[index_1].bookmarks.splice(index_2, 1);
          } else {
            that.$message({
              message: res.data.msg,
              type: "error"
            })
          }
        })

      },
      addBookmark() {
        // 添加书签
        let that = this;
        let u = JSON.parse(localStorage.getItem("user"));
        that.$http({
          url: "/bookmark/add_bookmark",
          method: "POST",
          data: {
            github_id: u.github_id,
            token: u.token,
            category_id: that.self_bookmarks[this.index].category_id,
            title: that.bookmarkForm.title,
            url: that.bookmarkForm.url,
          }
        }).then(res => {
          if (res.data.errcode == 0) {
            that.$message({
              message: "添加成功",
              type: "success"
            });
            that.self_bookmarks[that.index].bookmarks.push(that.bookmarkForm);
            that.bookmarkForm = {};
            that.dialogFormVisible = false
          } else {
            that.$message({
              message: res.data.msg,
              type: "error"
            })
          }
        })
      },
      subCategory() {
        let that = this;
        let u = JSON.parse(localStorage.getItem("user"));
        that.$http({
          url: "/bookmark/add_category",
          method: "POST",
          data: {
            github_id: u.github_id,
            token: u.token,
            category_name: that.categoryForm.category_name
          }
        }).then(res => {
          if (res.data.errcode == 0) {
            that.self_bookmarks.push({
              category_id: res.data.data.category_id,
              category_name: res.data.data.category_name,
              self_bookmarks: []
            });
            that.dialogFormVisible_2 = false;
          }
        })
      },
      delCategory(category_id, index) {
        let that = this;
        let u = JSON.parse(localStorage.getItem("user"));
        that.$http({
          url: "/bookmark/del_category",
          method: "POST",
          data: {
            github_id: u.github_id,
            token: u.token,
            category_id: category_id
          }
        }).then(res => {
          if (res.data.errcode == 0) {
            that.$message({
              message: "已删除",
              type: "success"
            });
            that.self_bookmarks.splice(index, 1);
          }
        })
      }
    }

  }
</script>

<style scoped lang="less">
    .page {
        background-image: url("");
        background-position: 100% 100%;

        .category-title {
            display: flex;
            flex-direction: row;
            align-items: center;

            div {
                margin-right: 15px;

            }

            div:last-child {
                display: none;
                cursor: pointer;
            }

            &:hover {
                div:last-child {
                    display: block;
                    color: red;
                }
            }
        }

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

            font-size: 24px;
            color: #ccc;

        }

        .add-category-bar {
            height: 30px;
            line-height: 30px;
            background-color: #f1f1f1;
            text-align: center;
            color: #bbb;
            cursor: pointer;
            transition: all ease-in-out .5s;

            &:hover {
                color: #f7f7f7;
                background-color: #42b983;
            }
        }
    }
</style>