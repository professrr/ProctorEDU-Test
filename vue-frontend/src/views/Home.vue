<template>
    <div>
        <p>/ Home</p>
    </div>
</template>

<script>
import {getCurrentInstance} from 'vue'

export default {
    name: "Home",
    setup() {
        const app = getCurrentInstance();
        const loadScript = app.appContext.config.globalProperties.$loadScript;
        loadScript("https://demo.proctoring.online/sdk/supervisor.js").then(() => {
            const supervisor = new window.Supervisor({url: 'https://demo.proctoring.online'});
            supervisor.init({
                provider: 'jwt',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIxMzIwNjcsImV4cCI6MTYxMjE3NTI2NywidXNlcm5hbWUiOiI2ZWVkMjlmMi05OGJjLTQxZmQtYTUwMy1jMjY5Zjc2MDI1N2IiLCJuaWNrbmFtZSI6IkR3YXluZSBKb2huc29uIiwidGVtcGxhdGUiOiJkZWZhdWx0IiwiaWQiOiI4YWYxMzQxOS04NmM2LTRmMTgtOGNmYy1iZjJlNDQ5ZWY5ODkiLCJzdWJqZWN0IjoiSlNEb2M6IFR1dG9yaWFsOiBwcm9jdG9yaW5nIiwidGFncyI6WyJEd2F5bmUgSm9obnNvbiJdfQ.jvZTAa3QUTTZ14JK7hHoKyRw0Z63sybM0EbOs4-7HlY',
            })
            .then(() => {
                return supervisor.stop();
            })
            .catch(err => {
                alert(err.toString());
            })
        })
    }
}
</script>

<style lang="css">
    
</style>