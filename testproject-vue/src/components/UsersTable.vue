<template>
  <v-container >
    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="allUsers"
        :search="search"
        :sort-by="['birthday', 'salary']"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-0 mt-5"
            />
            <v-spacer/>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          type="text"
                          v-model="editedItem.fio"
                          @keypress="noNumber($event)"
                          label="ФИО"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          type="text"
                          v-model="editedItem.post"
                          @keypress="noNumber($event)"
                          label="Должность"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          type="number"
                          v-model="editedItem.salary"
                          label="Оклад"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-menu
                          v-model="dateDialog"
                          :close-on-content-click="false"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="dateFormat(editedItem.birthday)"
                              clearable
                              label="Дата рождения"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            :value="dateFormat(editedItem.birthday)"
                            @input="editedItem.birthday = dateFormat($event)"
                            @change="dateDialog = false"
                          />
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :disabled="valid"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.birthday="{ item }">
          {{dateFormat(item.birthday)}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment'

export default {
  data: () => ({
    dialog: false,
    dateDialog: false,
    search: '',
    headers: [
      {
        text: 'ФИО',
        align: 'start',
        sortable: false,
        value: 'fio',
      },
      { text: 'Дата рождение', value: 'birthday' },
      { text: 'Должности', value: 'post', sortable: false},
      { text: 'Оклад', value: 'salary' },
      { text: '', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      fio: '',
      post: '',
      birthday: new Date().toISOString().substr(0, 10),
      salary: null
    },
    defaultItem: {
      fio: '',
      post: '',
      birthday: new Date().toISOString().substr(0, 10),
      salary: null
    },
  }),
  computed: {
    ...mapGetters(["allUsers"]),
    valid () {
      return !this.editedItem.fio
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  methods: {
    ...mapActions(["fetchUsers", "addUser", "deleteUser", "updateUser"]),

    noNumber(evt) {
      const regex = new RegExp("^[a-zA-Z ]+$");
      const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
      if (!regex.test(key)) {
        evt.preventDefault();
        return false;
      }
    },

    dateFormat (value) {
      return moment(value).format('YYYY-MM-DD')
    },

    editItem (item) {
      this.editedIndex = this.allUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (id) {
      this.deleteUser(id)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.updateUser(this.editedItem);
      } else {
        this.addUser(this.editedItem);
      }
      this.close()
    },
  },

  created () {
    this.fetchUsers()
  },
}
</script>
