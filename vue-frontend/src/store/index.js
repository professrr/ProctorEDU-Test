import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import Supervisor from './modules/Supervisor'
import Auth from './modules/Auth'

export default createStore({
    modules: {
        Supervisor, Auth
    },
    plugins: [createPersistedState()],
})