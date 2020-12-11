import axios from "@/axios-common";

const state = {
  users: []
};

const getters = {
  allUsers: (state) => {
    return state.users
  }
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get("/users");
    commit('setUsers', response.data);
  },
  async addUser({commit}, obj){
    const response = await axios.post(`/users`, obj)
    commit('addUser', response.data)
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`/users/${id}`);
    commit('removeUser', id);
  },
  async updateUser({ commit }, obj) {
    await axios.put(`/users/${obj.id}`, obj);
    commit('updateUser', obj);
  }

}

const mutations = {
  setUsers: (state, users) => state.users = users,
  addUser: (state, newUser) => state.users.unshift(newUser),
  removeUser:(state, id) => state.users = state.users.filter((user) => user.id !== id),
  updateUser: (state, updatedUser) => {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
