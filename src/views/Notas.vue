<template>
  <div class="container">
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

    <!-- Tabla -->
    <h1>Notas</h1>
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
    alerta(){
      this.mensaje.color = 'success';
      this.mensaje.texto = 'Probando alerta...';
      this.showAlert();
    }
  },
}
</script>
