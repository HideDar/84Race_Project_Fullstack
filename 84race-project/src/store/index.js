import { createStore } from 'vuex';

const store = createStore({
    state: {
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    mutations: {
        setLogin(state, status) {
            state.isLoggedIn = status;
            localStorage.setItem('isLoggedIn', status);
        },
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setLogin', true);
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('setLogin', false);
            commit('setUser', null);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
        }
    }
}); 
// 
export default store;