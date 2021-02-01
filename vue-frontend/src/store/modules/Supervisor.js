import {getCurrentInstance} from 'vue'

const Supervisor = {
    namespaced: true,
    state: () => ({
        sdkStatus: false,
        supervisor: null,
        initStatus: false,
        startStatus: false,
        stopStatus: false,
        logoutStatus: false
    }),
    mutations: {
        setSdkStatus(state, injected=false) {
            state.sdkStatus = injected
        },
        setSupervisor(state, supervisor=null) {
            state.supervisor = supervisor
        },
        setInitStatus(state, status) {
            state.initStatus = status;
        },
        setStartStatus(state, status) {
            state.startStatus = status;
        },
        setStopStatus(state, status) {
            state.stopStatus = status;
        },
        setLogoutStatus(state, status) {
            state.logoutStatus = status;
        },
    },
    actions: {
        initSDK(ctx) {
            const app = getCurrentInstance();
            const loadScript = app.appContext.config.globalProperties.$loadScript;
            loadScript("https://demo.proctoring.online/sdk/supervisor.js").then(() => {
                ctx.commit('setSdkStatus', true);
                console.log('creatingSupervisor')
                const supervisor = new window.Supervisor({url: 'https://demo.proctoring.online'});
                ctx.commit('setSupervisor', supervisor);
            });
        },
        initSupervisor(ctx, token) {
            console.log('init')
            const {supervisor} = ctx.state;
            if(supervisor) {
                supervisor.init({
                    provider: 'jwt',
                    token,
                }).then(() => {
                    console.log('initing')
                    ctx.commit('setInitStatus', true);
                })
            }
        },
        startSession(ctx) {
            const {supervisor, initStatus} = ctx.state;
            if(supervisor && initStatus) {
                console.log('starting...')
                supervisor.start().then(() => {
                    ctx.commit('setStartStatus', true);
                })
            }
        },
        stopSession(ctx) {
            const {supervisor, initStatus, startStatus} = ctx.state;
            if(supervisor && initStatus && startStatus) {
                supervisor.stop().then(() => {
                    ctx.commit('setStartStatus', false);
                    ctx.commit('setStopStatus', true);
                })
            }
        },
    },
    getters: {
        getSdk(state) {
            return state.sdkStatus;
        },
        getSupervisor(state) {
            return state.supervisor;
        },
        getInitStatus(state) {
            return state.initStatus;
        },
        getStartStatus(state) {
            return state.startStatus;
        },
        getStopStatus(state) {
            return state.stopStatus;            
        },
        getLogoutStatus(state) {
            return state.logoutStatus;
        },
    }
}

export default Supervisor;