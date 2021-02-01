<template>
    <div>
        <p>/ Home</p>
        <button @click.prevent="init">Init</button>
        <button @click.prevent="start">Start</button>
        <button @click.prevent="stop">Stop</button>
        <p>Inject: {{injectStatus}}</p>
        <p>Init: {{initStatus}}</p>
        <p>Start: {{startStatus}}</p>
        <p>Stop: {{stopStatus}}</p>
    </div>
</template>

<script>
// import {watch} from 'vue'
import {useStore} from 'vuex'

export default {
    name: "Home",
    setup() {
        const store = useStore();
        const injectStatus = store.getters['Supervisor/getSdk'];
        const initStatus = store.getters['Supervisor/getInitStatus'];
        const startStatus = store.getters['Supervisor/getStartStatus'];
        const stopStatus = store.getters['Supervisor/getStopStatus'];

        store.dispatch('Supervisor/initSDK')

        const init = () => {
            store.dispatch('Supervisor/initSupervisor', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIxNzQ3MjYsImV4cCI6MTYzMzMyMDAwMCwidXNlcm5hbWUiOiJmMDhjZTBhMC1iYjQwLTQ0NTQtOTBhOS0wMjhjOTIxM2Q0NzEiLCJuaWNrbmFtZSI6IkR3YXluZSBKb2huc29uIiwidGVtcGxhdGUiOiJkZWZhdWx0IiwiaWQiOiJkZjlkYmViYy01MGE5LTQ5NjctYWNjMi1iMGFjYjJkN2E1NDUiLCJzdWJqZWN0IjoiSlNEb2M6IFR1dG9yaWFsOiBwcm9jdG9yaW5nIiwidGFncyI6WyJEd2F5bmUgSm9obnNvbiJdfQ.zWGk6oRfu0CjKFFySsmYDb2TBiIYamGdf4TDb2D6HHI')
        }

        const stop = () => {
            store.dispatch('Supervisor/stopSession')
        }

        const start = () => {
            store.dispatch('Supervisor/startSession')
        }

        return {init, start, stop, injectStatus, initStatus, startStatus, stopStatus}

    }
}
</script>

<style lang="css">
    
</style>