// resources/js/bootstrap.js
import axios from 'axios';

// Si tenés otras inicializaciones (p. ej. Pusher, Echo, Lodash) las mantenés aquí arriba.

// Axios: headers por defecto para peticiones AJAX y CSRF
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

// Habilitar envío de cookies (útil cuando el backend está en distinto puerto/origen)
axios.defaults.withCredentials = true;

// Exportar axios para usarlo desde cualquier módulo
export default axios;