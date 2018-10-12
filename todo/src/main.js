// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import * as storeTasks from './store'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
    state: {
        jwt: localStorage.getItem('t'),
        endpoints: {
            obtainJWT: 'http://127.0.0.1:8000/api-token-auth',
            refreshJWT: 'http://127.0.0.1:8000/api-token-refresh'
        }
    },
    mutations: {
        updateToken(state, newToken){
            localStorage.setItem('t', newToken);
            state.jwt = newToken;
        },
        removeToken(state){
            localStorage.removeItem('t');
            state.jwt = null;
        }
    },
    actions:{
        obtainToken(username, password){
            const payload = {
                username: username,
                password: password
            }
            axios.post(this.state.endpoints.obtainJWT, payload).then((response)=>{
                this.commit('updateToken', response.data.token);
            }).catch((error)=>{
                console.log(error);
            })
        },
        refreshToken(){
            const payload = {
                token: this.state.jwt
            }
            axios.post(this.state.endpoints.refreshJWT, payload).then((response)=>{
                this.commit('updateToken', response.data.token)
            }).catch((error)=>{
                console.log(error)
            })
        },
        inspectToken(){
            const token = this.state.jwt;
            if(token){
                const decoded = jwt_decode(token);
                const exp = decoded.exp;
                const orig_iat = decode.orig_iat;
                if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
                    this.dispatch('refreshToken')
                } else if (exp -(Date.now()/1000) < 1800){
                    // DO NOTHING, DO NOT REFRESH          
                } else {
                    // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
                }
            }
        }
//        -----------------------------------------
    }
})

// YOUR VUE INSTANCE

/* eslint-disable no-new */
new Vue({
    el: '#app',
    storeTasks,
    components: { App },
    template: '<App/>'
})
