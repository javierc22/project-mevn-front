<template>
  <div class="container">
    <h1>Notas</h1>
    <!-- Alerta -->
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{mensaje.texto}}
    </b-alert>

    <!-- Formulario Agregar Nota -->
    <form @submit.prevent="agregarNota()">
      <h3>Agregar nueva nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="nota.nombre">
      <input type="text" class="form-control my-2" placeholder="Descripción" v-model="nota.descripcion">
      <b-button class="btn-success my-2 btn-block" type="submit">Agregar</b-button>
    </form>
    
    <!-- Tabla -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.date }}</td>
          <td>
            <b-button @click="alerta()">Acción</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notas: [],
      mensaje: {color: '', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,
      nota: { nombre: '', descripcion: ''}
    }
  },
  created() {
    this.listarNotas();
  },
  methods: {
    listarNotas(){
      this.axios.get('/notas')
        .then(res => {
          // console.log(res.data);
          this.notas = res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    agregarNota(){
      this.axios.post('/nueva-nota', this.nota)
        .then(res => {
          this.notas.push(res.data);
          this.nota.nombre = '';
          this.nota.descripcion = '';
          this.mensaje.color = 'success';
          this.mensaje.texto = 'Nota agregada!';
          this.showAlert();
        })
        .catch(e => {
          console.log(e.response);
          if (e.response.data.error.errors.nombre.message) {
            this.mensaje.texto = e.response.data.error.errors.nombre.message;
          } else {
            this.mensaje.texto = 'Error de sistema';
          }
          this.mensaje.color = 'danger';
          this.showAlert();
        })
    },
    alerta(){
      this.mensaje.color = 'success';
      this.mensaje.texto = 'Probando alerta...';
      this.showAlert();
    }
  },
}
</script>
