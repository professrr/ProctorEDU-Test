import api from '@/api'

const Auth = {
    namespaced: true,
    state: () => ({
        token: ''
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        sign(ctx, {login, password}) {
            api.post('/sign', {login, password})
                .then(response => {
                    ctx.commit('setToken', response.data.jwt.token)
                }) 
        }
    },
    getters: {
        getToken(state) {
            return state.token
        }
    }
}

export default Auth