import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios.refresh';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        
        addStarCount({ getters , commit }, postId){
            if(getters.uid){
                firebase.firestore().collection("posts").where('post_id', '==', postId)
                .get().then(doc => {
                    var data = doc.docs[0].id;

                    firebase.firestore().collection("posts").doc(data).update({
                        starCount: firebase.firestore.FieldValue.increment(1)
                    })
                })
                firebase.firestore().collection(`users/${getters.uid}/starCount`).doc("starCount")
                .set({
                    star_post_id: firebase.firestore.FieldValue.arrayUnion(postId)
                },{ merge: true})
                commit('addStarCount')
            }
        },

        deleteStarCount({ getters, commit }, postId){
            if(getters.uid){
                firebase.firestore().collection("posts").where('post_id', '==', postId)
                .get().then(doc => {
                    var data = doc.docs[0].id;

                    firebase.firestore().collection("posts").doc(data).update({
                        starCount: firebase.firestore.FieldValue.increment(-1)
                    })
                })
                firebase.firestore().collection('users/${getters.uid}/starCount').doc("starCount")
                .set({
                    star_post_id: firebase.firestore.FieldValue.arrayRemove(postId)
                },{ merge: true})
                commit('deleteStarCount')
            }
        },

        autoLogin({ commit, dispatch }) {

            // LocalStorageにあったらTokenを持ってくる
            const idToken = localStorage.getItem('idToken');
            // なかったらそのまま
            if(!idToken) return;

            // 有効期限が切れているかを確かめる
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimesMs');
            const isExpired = now.getTime() >= expiryTimeMs;
            const refreshToken = localStorage.getItem('refreshToken');

            // 有効期限が切れていたら
            if (isExpired){
                dispatch('refreshIdToken', refreshToken);

            // 有効期限が切れていなければ
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', refreshToken);
                }, expiresInMs);
                commit('updatteIdToken', idToken); /* 更新する */
            }
        },

        // login

        login({ dispatch }, authData) {
            axios.post(
                '/accounts:signInWithPassword?key=AIzaSyCqORZML65x9Ymn4EwzIL7p8RdueI-IHMk',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }
            )
            .then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                router.push('/ideas');
            });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshToken');
            router.replace('/');
        },
        refreshIdToken({ dispatch}, refreshToken) {
            axiosRefresh
                .post('/token?key=AIzaSyCqORZML65x9Ymn4EwzIL7p8RdueI-IHMk',
                {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then(response => {
                    dispatch('setAuthData', {
                        idToken: response.data.id_token,
                        expiresIn: response.data.expires_in,
                        refreshToken: response.data.refresh_token
                    });
                });
        },
        
        // register 

        register({ dispatch }, authData) {

            axios.post(
                '/accounts:signUp?key=AIzaSyCqORZML65x9Ymn4EwzIL7p8RdueI-IHMk',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }
            )
            .then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                })
                router.push('/ideas');
            });
        },
        setAuthData({ commit, dispatch }, authData) {
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000; 
            commit('updateIdToken', authData.idToken);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);
            setTimeout(() => {
                dispatch('refreshIdToken',authData.refreshToken)
            }, authData.expiresIn * 1000);
        }
    }
});