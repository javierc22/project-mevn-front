<template>
  <div class="container">
     <h2>Login</h2>
     <form @submit.prevent="login">
       <input type="email" placeholder="Email" class="form-control my-2" v-model="usuario.email">
       <input type="text" placeholder="Contraseña" class="form-control my-2" v-model="usuario.pass">
       <b-button type="submit" class="btn-block">Acceder</b-button>
     </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        email: '',
        pass: ''
      }
    }
  },
  methods: {
    login() {
      console.log(this.usuario);
    }
  },
}
</script>