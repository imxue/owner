<template>
  <el-container>
    <el-header>
      <baseHeader />
    </el-header>
    <el-main style="overflow: inherit;">
      <el-row :gutter="24" class="flexContainer">
        <el-col>
          <el-card>
            <div>
              <h1>{{ baseBarInfo.online_bar_count }}</h1>
              <p>{{ $t("NumberOfOnlineCafe") }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :lg="{ span: 10 }" :sm="12">
          <el-card>
            <div>
              <h1>{{ baseBarInfo.total_bar_count }}</h1>
              <p>{{ $t("TotalNumberOfInternetCafes") }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="marginTop">
        <el-col :lg="{ span: 6 }" :md="{ span: 6 }" :sm="12">
          <el-card>
            <div>
              <h4>{{ baseBarInfo.trusted_bar_count }}</h4>
              <p>{{ $t("NumberOfInternetCafesAlreadyHosted") }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :lg="{ span: 6 }" :md="{ span: 5 }" :sm="12">
          <el-card>
            <div>
              <h4>{{ baseBarInfo.tobe_trusted_bar_count }}</h4>
              <p>{{ $t("NumberOfInternetCafesToBeHosted") }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :lg="{ span: 6 }" :md="{ span: 6 }" :sm="12">
          <el-card>
            <div>
              <h4>{{ baseBarInfo.online_bar_online_client_count }}</h4>
              <p>{{ $t("NumberOfOnlineTerminalsInOnlineCafes") }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :lg="{ span: 6 }" :md="{ span: 6 }" :sm="12">
          <el-card>
            <div>
              <h4>{{ baseBarInfo.online_bar_client_count }}</h4>
              <p>{{ $t("NumberOfOnlineInternetCafeManagementTerminals") }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-col>
        <el-row class="middle">
          <el-button type="primary" v-on:click="goCreatePage">
            {{ $t("CreateCafe") }}
          </el-button>
          <!-- <el-button plain v-on:click="refrsh">{{ $t("Refresh") }}</el-button> -->
        </el-row>

        <el-col>
          <el-table
            :data="tableData"
            fit
            stripe
            border
            size="mini"
            v-loading="loading"
            :cell-style="objStyle"
          >
            <el-table-column
              prop="state"
              :label="this.$t('Status')"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="bar_id"
              :label="this.$t('CafeID')"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="bar_name"
              :label="this.$t('CafeName')"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address_detail"
              :label="this.$t('Area')"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="online_client_count"
              :label="this.$t('NumberOfOnline/managementTerminals')"
              align="center"
              minWidth="110px"
            ></el-table-column>
            <el-table-column
              prop="agent_name"
              :label="this.$t('Franchisee')"
              min-width="50px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="diskless_expiration"
              :label="this.$t('TheRemainingNumberOfDays')"
              sortable
              min-width="110px"
              align="center"
            >
              <template slot-scope="scope">
                {{ formatTime(scope.row.diskless_expiration) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="enable"
              :label="this.$t('enable')"
              sortable
              min-width="60px"
              align="center"
            >
              <template slot-scope="scope">
                <template v-if="scope.row.enable === 1">
                  <el-tag type="success">{{ $t("enable") }}</el-tag>
                </template>
                <template v-if="scope.row.enable === 0">
                  <el-tag type="danger">{{ $t("disable") }}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="operation"
              :label="this.$t('Operating')"
              min-width="200px"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">
                  {{ $t("Edit") }}
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleClick(scope.row)"
                  :disabled="scope.row.agent_name !== '' || scope.row.enable === 0"
                  >{{ $t("HostedInternetCafe") }}
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  style="marginRight:4px;"
                  @click="handleEnable(scope.row)"
                  :disabled="scope.row.enable === 1"
                  >{{ $t("enable") }}
                </el-button>
                <el-dropdown split-button size="mini">
                  <span size="mini">
                    {{ $t("More") }}
                  </span>
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item
                      :disabled="!scope.row.agent_name"
                      @click.native="handleCancle(scope.row.bar_id)"
                      >{{ $t("CancelInternetCafe") }}</el-dropdown-item
                    >
                    <el-dropdown-item
                      :disabled="!scope.row.enable"
                      @click.native="handleDele(scope.row)"
                    >
                      {{ $t("disable") }}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handlebind(scope.row)">{{
                      $t("Unbind")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="Number(pageinfo.page_index)"
          :page-size="9"
          style=" float:right;"
          :total="Number(pageinfo.count)"
        ></el-pagination>
      </el-col>
    </el-main>
    <!-- 編輯網吧 -->
    <el-dialog
      :title="this.$t('EditCafe')"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :destroy-on-close="trueF"
    >
      <el-form :model="EditFrom" :rules="rules" ref="EditFrom">
        <el-form-item
          :label="this.$t('CafeName')"
          label-width="110px"
          prop="bar_name"
        >
          <el-input v-model="EditFrom.bar_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="area_id"
          :label="this.$t('Area')"
          label-width="110px"
          :placeholder="this.$t('pleaseInputArea')"
        >
          <el-cascader
            :options="Region"
            v-model="EditFrom.area_id"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item
          :label="this.$t('details')"
          label-width="110px"
          prop="address"
        >
          <el-input v-model="EditFrom.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('CafePhone')"
          label-width="110px"
          prop="telphone"
        >
          <el-input v-model="EditFrom.telphone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleEditInfo('EditFrom')">
          {{ $t("Modify") }}
        </el-button>
        <el-button @click="dialogFormVisible = false">{{
          $t("Cancel")
        }}</el-button>
      </div>
      <el-collapse>
        <el-collapse-item
          :title="this.$t('ChangePassWord')"
          label-width="100px"
        >
          <el-form
            :model="pass"
            status-icon
            :label-position="right"
            label-width="130px"
          >
            <el-form-item :label="this.$t('CurrentPassword')" prop="fresh">
              <el-input
                v-model="pass.old"
                type="password"
                :show-password="true"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item :label="this.$t('NewPassword')" prop="fresh">
              <el-input
                v-model="pass.fresh"
                type="password"
                :show-password="true"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item :label="this.$t('ConfireNewPassword')" prop="confirm">
              <el-input
                v-model="pass.confirmPassword"
                type="password"
                autocomplete="off"
                :show-password="true"
              />
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
    <!-- 創建網吧 -->
    <el-dialog
      :title="this.$t('CreateCafe')"
      :visible.sync="CreateCafeVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="CreateCafe" :rules="CreateCaferules" ref="CreateCafe">
        <el-form-item
          :label="this.$t('CafeName')"
          label-width="120px"
          prop="bar_name"
        >
          <el-input
            v-model="CreateCafe.bar_name"
            autocomplete="off"
            :placeholder="this.$t('pleaseBarName')"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="area_id"
          :label="this.$t('Area')"
          label-width="120px"
        >
          <el-cascader
            :placeholder="this.$t('pleaseInputArea')"
            width="200px"
            :options="Region"
            v-model="CreateCafe.area_id"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="this.$t('CafePassword')" label-width="120px">
          <el-input
            v-model="CreateCafe.password"
            type="password"
            :placeholder="this.$t('PleaseEnterYourPassword')"
            auto-complete="new-password"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('Address')"
          label-width="120px"
          prop="address"
        >
          <el-input
            :placeholder="this.$t('pleaseInputAdress')"
            v-model="CreateCafe.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('CafePhone')"
          label-width="120px"
          prop="telphone"
        >
          <el-input
            :placeholder="this.$t('pleaseInputTelphone')"
            v-model="CreateCafe.telphone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleCreate('CreateCafe')">
          {{ $t("Save") }}
        </el-button>
        <el-button @click="HandleCancelCreate('CreateCafe')">
          {{ $t("Cancel") }}</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import {
  getAllBar,
  getBaseBarInfo,
  cancelTrustNetbar,
  disable,
  enable,
  getAddress,
  createBar,
  editBar,
  unbind,
  changePassword
} from "@/api/Default";
import baseHeader from "../components/baseHeader.vue";
export default {
  name: "Detail",
  data() {
    return {
      trueF: true,
      right: "right",
      pass: {
        fresh: "",
        old: "",
        confirmPassword: ""
      },
      ChangePasswordFrom: { password: "" },
      ChangePasswordFromrules: {
        password: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ]
      },
      PassWordVisible: false,
      CreateCafeVisible: false,
      loading: false,
      CreateCafe: {
        bar_name: "",
        password: "",
        area_id: "",
        address: "",
        telphone: ""
      },
      EditFrom: {
        bar_name: "",
        bar_id: "",
        address: "",
        telphone: "",
        area_id: ""
      },
      Region: [],
      dialogFormVisible: false,
      baseBarInfo: {
        online_bar_count: 0,
        online_bar_online_client_count: 0,
        online_bar_client_count: 0,
        total_bar_count: 0,
        trusted_bar_count: 0,
        tobe_trusted_bar_count: 0
      },
      pageinfo: {},
      limit: 10,
      offset: 0,
      tableData: [],
      visible: false,
      rules: {
        bar_name: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        area_id: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ]
      },
      CreateCaferules: {
        bar_name: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        area_id: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: this.$t("NotEmpty"),
            trigger: "blur"
          }
        ]
      },
      temp: {
        id: "",
        temp: ""
      }
    };
  },
  components: {
    baseHeader
  },
  async created() {
    this.loading = true;
    await this.getArea();
    this.getpageinfo({
      offset: this.offset,
      limit: this.limit,
      orderby: "create_time"
    });
  },
  methods: {
    async getArea() {
      try {
        let x = await getAddress();
        let temp = x.data.data;
        this.Region = this.test1(temp);
      } catch (error) {
        this.$message({
          type: "error",
          message: `${error}`
        });
      }
    },
    formatTime(val) {
      const date = new Date(val);
      const Y = `${date.getFullYear()}-`;
      const M = `${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-`;
      const D = `${date.getDate()} `;
      const h = `${date.getHours()}:`;
      const m = `${date.getMinutes()}:`;
      const s = date.getSeconds();
      const str = Y + M + D + h + m + s;
      return str;
    },
    getarea(arr, id) {
      var tempArr = []; // 临时数组
      var lastArr = []; // 最终返回的数组
      const fn = (arr, id, tempArr) => {
        arr.forEach(item => {
          if (!item.children && item.value === id) {
            tempArr.push(item.value);
            lastArr = [].concat(tempArr);
          }
          if (item.children && item.children.length) {
            tempArr.push(item.value);
            fn(item.children, id, tempArr);
            tempArr.pop();
          }
        });
      };
      fn(arr, id, tempArr, lastArr);
      return lastArr;
    },
    test1(array) {
      array.forEach(item => {
        Object.keys(item).forEach(key => {
          if (item[key].constructor === Array) {
            item["children"] = item[key];
            delete item[key];
            this.test1(item["children"]);
          } else {
            if (key === "area_id") {
              item["value"] = item["area_id"];
            } else {
              if (!item["value"]) {
                item["value"] = item[key];
              }
              item["label"] = item[key];
            }
            delete item[key];
          }
        });
      });
      return array;
    },
    pOpen(id) {
      this.$refs[`x-${id}`].doShow();
    },
    pClose(id) {
      this.$refs[`x-${id}`].doClose();
    },
    handleClick(data) {
      let id;
      if (data.bar_id) {
        id = data.bar_id;
      }
      this.$router.push({
        path: "/trustNetbar",
        query: { barid: id, name: data.bar_name }
      });
    },
    handleCancle(id) {
      cancelTrustNetbar(id)
        .then(
          () => {
            this.$message({
              type: "success",
              message: `sucess`
            });
          },
          err => {
            this.$message.error(err.data.error);
          }
        )
        .finally(() => {
          this.getpageinfo({
            offset: this.offset,
            limit: this.limit,
            orderby: "create_time"
          });
        });
    },
    /**
     * 禁用网吧
     */
    handleDele(id) {
      disable({ barid: id.bar_id })
        .then(
          () => {
            this.$message({
              type: "success",
              message: `sucess`
            });
          },
          () => {}
        )
        .finally(() => {
          this.getpageinfo({
            offset: this.offset,
            limit: this.limit,
            orderby: "create_time"
          });
        });
    },
    handlebind(id) {
      unbind({ barid: id.bar_id })
        .then(
          () => {
            this.$message({
              type: "success",
              message: `sucess`
            });
          },
          e => {
            this.$message({
              type: "error",
              message: `${e.error}`
            });
          }
        )
        .finally(() => {
          this.getpageinfo({
            offset: this.offset,
            limit: this.limit,
            orderby: "create_time"
          });
        });
    },
    handleEnable(id) {
      enable({ barid: id.bar_id })
        .then(
          () => {
            this.$message({
              type: "success",
              message: `sucess`
            });
          },
          () => {}
        )
        .finally(() => {
          this.getpageinfo({
            offset: this.offset,
            limit: this.limit,
            orderby: "create_time"
          });
        });
    },
    handleCurrentChange(e) {
      let info = {
        offset: (Number(e) - 1) * this.limit,
        limit: this.limit,
        orderby: "create_time"
      };
      this.offset = info.offset;
      this.handlegetAllBar(info);
    },
    handlegetAllBar(info) {
      getAllBar(info).then(
        e => {
          if (e.data.ok) {
            e.data.data.data.forEach(item => {
              if (item.state === 1) {
                item.state = this.$t("Online");
              } else if (item.state === 0) {
                item.state = this.$t("Offline");
              }
            });
            this.tableData = e.data.data.data;
            e.data.data.pageino.page_index += 1;
            this.pageinfo = e.data.data.pageino;
          }
        },
        () => {}
      );
    },
    getpageinfo(info) {
      getBaseBarInfo()
        .then(e => {
          if (e.data.ok) {
            this.baseBarInfo = e.data.data;
            this.handlegetAllBar(info);
          } else {
            this.$message.info(e.data.data);
          }
        })
        .catch(() => {
          // 发送错误执行
        })
        .finally(() => {
          this.loading = false;
        });
    },
    test() {
      this.centerDialogVisible = true;
    },
    goCreatePage() {
      this.CreateCafeVisible = true;
    },
    handleEdit(data) {
      this.pass = {
        old: "",
        fresh: "",
        confirmPassword: ""
      };
      this.EditFrom = data;
      (this.EditFrom = {
        bar_name: data.bar_name,
        bar_id: data.bar_id,
        address: data.address,
        telphone: data.telphone,
        area_id: data.area_id
      }),
        (this.dialogFormVisible = true);
    },
    objStyle() {
      return {
        "padding-top": "5px",
        "padding-bottom": "5px"
      };
    },
    HandleEditInfo(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let EditBarInfo = {
            id: this.EditFrom.bar_id,
            bar_name: this.EditFrom.bar_name,
            area_id:
              this.EditFrom.area_id instanceof Array
                ? this.EditFrom.area_id.pop()
                : this.EditFrom.area_id,
            address: this.EditFrom.address,
            telphone: this.EditFrom.telphone
          };
          editBar(EditBarInfo)
            .then(() => {
              this.$message({
                type: "success",
                message: this.$t("EditSucess")
              });
            })
            .finally(() => {
              this.dialogFormVisible = false;
              this.getpageinfo({
                offset: 0,
                limit: 10,
                orderby: "create_time"
              });
            });
        }
        if (
          this.pass.old &&
          this.pass.fresh &&
          this.pass.fresh === this.pass.confirmPassword
        ) {
          changePassword({
            barid: this.EditFrom.bar_id,
            password: this.pass.old,
            newpassword: this.pass.fresh
          }).then(
            () => {},
            e => {
              this.$message({
                type: "error",
                message: this.$t(`${e.data.error}`)
              });
            }
          );
        }
      });
    },
    HandleCreate(name) {
      this.$refs[name].validate(valid => {
        this.CreateCafe.area_id = this.CreateCafe.area_id.pop();
        if (valid) {
          createBar(this.CreateCafe)
            .then(
              () => {
                this.$message({
                  type: "success",
                  message: this.$t("CreateSucess")
                });
              },
              () => {
                this.$message({
                  type: "error",
                  message: `e.data.error`
                });
              }
            )
            .finally(() => {
              this.CreateCafeVisible = false;
              this.getpageinfo({
                offset: 0,
                limit: 10,
                orderby: "create_time"
              });
            });
        }
      });
    },
    HandleCancelCreate(name) {
      this.CreateCafeVisible = false;
      this.$refs[name].resetFields();
    }
  }
};</script
>>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .middle {
    margin: 10px 0;
  }
  .el-main {
    max-width: 1400px;
    margin: auto;
    width: 1400px;
  }
}
.el-header {
  border-bottom: 1px solid #3aa79d;
}
.headerF {
  border: 1px solid #cccccc;
  text-align: center;
}
.addBorder {
  border: 1px solid #cccccc;
}
.el-pagination {
  margin-top: 10px;
}
.el-card {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.marginTop {
  margin-top: 10px;
}
.flexContainer {
  display: flex;
  align-items: stretch;
}
.is-hidden {
  // display: none;
  position: absolute;
  left: -10000px;
  top: -10000px;
}
.el-cascader {
  width: 360px;
  min-width: 360px;
  max-width: 450px;
}
</style>
