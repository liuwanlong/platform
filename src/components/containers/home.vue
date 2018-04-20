<template>
  <div>
    <div>
      <el-button type="primary" @click="newProject">新建项目</el-button>
    </div>
    <el-table :data="projects">
      <el-table-column
        prop="id"
        label="项目ID"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getProjects, addProject, delProject } from '@/service/home'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    data () {
      return {
        projects: []
      }
    },
    computed: {
      ...mapGetters([
        'pages'
      ])
    },
    created () {
      this.initData()
    },
    methods: {
      ...mapMutations([
        'initStore'
      ]),
      newProject () {
        addProject({
          store: this.pages
        }, res => {
          if (res.body.code) {
            this.$router.push({name: 'edit', params: {id: res.body.msg}})
          }
        })
      },
      edit (row) {
        this.$router.push({name: 'edit', params: {id: row.id}})
      },
      del (row) {
        delProject({
          id: row.id
        }, res => {
          if (res.body.code) {
            this.initData()
          }
        })
      },
      initData () {
        getProjects((res) => {
          if (res.body.code) {
            this.projects = res.body.msg
          }
        })
      }
    }

  }
</script>
