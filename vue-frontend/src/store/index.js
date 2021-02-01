import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import Supervisor from './modules/Supervisor'

export default createStore({
    modules: {
        Supervisor
    },
    plugins: [createPersistedState()],
})