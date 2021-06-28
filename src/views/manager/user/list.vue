<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('loginName')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userName')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('gender')" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('phone')" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email')" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('roles')" width="200px" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.roles }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column :label="$t('gmtCreated')" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gmtCreated }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('gmtModified')" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gmtModified }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchUserListWithPage" />
  </div>
</template>

<script>
import { fetchUserListWithPage } from '@/api/user'
// import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        loginName: undefined,
        phone: undefined,
        email: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.fetchUserListWithPage()
  },
  methods: {
    fetchUserListWithPage() {
      this.listLoading = true
      fetchUserListWithPage(this.listQuery).then(response => {
        this.list = response.records
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.listLoading = false
    }
  }
}
</script>

