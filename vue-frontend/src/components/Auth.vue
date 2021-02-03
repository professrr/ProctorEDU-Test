<template>
    <h2 class="auth-head2">Авторизация</h2>
    <form>
        <input v-model="login" type="text" placeholder="Логин">
        <input v-model="password" type="password" placeholder="Пароль">
        <p @click="auth_via_test">Или авторизоваться тестовым пользователем (без регистрации)</p>
        <div class="form_btns">
            <button @click.prevent="auth" class="auth-login-btn">Войти</button>
            <button @click.prevent="register" class="auth-register-btn">Регистрация</button>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue'
import { useStore } from 'vuex';

export default {
    name: 'Auth',
    setup() {
        const login = ref('');
        const password = ref('');
        const store = useStore();

        const auth = () => {
            if(login.value && password.value) {
                store.dispatch('Auth/sign', {login: login.value, password: password.value})
            }
        }

        const auth_via_test = () => {
            store.dispatch('Auth/sign_via_test')
        }
        
        return {login, password, auth, auth_via_test}
    }
}
</script>

<style lang="css">
    .auth-head2 {
        color: #111111;
    }

    form {
        margin-top: 15px;
        background: #263C65;
        padding: 15px;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        box-sizing: border-box;
    }

    form p {
        font-size: 14px;
        color: #CCCCCC;
    }

    form p:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    form input {
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        box-sizing: border-box;
    }

    form input::placeholder {
        font-size: 14px;
    }

    form p {
        text-align: center;
        margin-bottom: 15px;
    }

    .form_btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    form .auth-login-btn {
        background: rgb(49, 160, 8);
        color: #FFFFFF;
        border-radius: 5px;
        padding: 7px 15px;
        font-size: 14px;
        border: none;
    }

    form .auth-login-btn:hover {
        background: rgb(55, 206, 0);
        cursor: pointer;
    }

    form .auth-register-btn {
        background: #8A8A8A;
        color: #FFFFFF;
        border-radius: 5px;
        padding: 7px 15px;
        font-size: 14px;
        border: none;
        margin-left: 15px;
    }

    form .auth-register-btn:hover {
        background: rgb(177, 176, 176);
        cursor: pointer;
    }

</style>