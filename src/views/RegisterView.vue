<script setup>

</script>

<template>
    <div class="container">
        <h2>Registro de Usuario</h2>
        <form action="/api/signup" method="post">
        <input type="hidden" name="_csrf" value="<%= csrfToken %>">
        <label for="document_type">Tipo de Documento:</label>
        <select id="document_type" name="document_type" required>
            <option value="">Selecciona un tipo de documento</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="NIT">Número de identificación tributaria</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CE">Cédula de extranjería</option>
        </select>

        <label for="document_number">Número de Documento:</label>
        <input type="text" id="document_number" name="document_number" required>

        <label for="first_name">Nombres:</label>
        <input type="text" id="first_name" name="first_name" required>

        <label for="last_name">Apellidos:</label>
        <input type="text" id="last_name" name="last_name" required>

        <label for="cellphone">Celular:</label>
        <input type="tel" id="cellphone" name="cellphone" pattern="[0-9]{10}" required>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>
        <label for="validatePassword">Confirmar Contraseña:</label>
        <input type="password" id="validatePassword" name="validatePassword" required>
        <span id="mensajeError" class="error"></span>

        <input type="submit" value="Registrarse">
        </form>
        <div class="form-group">
            <a type="button" href="/">Volver</a>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #555555;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    margin-top: 20px; /* Agregado margen superior */
    margin-bottom: 20px; /* Agregado margen inferior */
}

h2 {
    text-align: center;
    color: #333;
}

form {
    text-align: left;
}

label {
    font-weight: bold;
    display: block;
    margin-top: 10px;
}

select, input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box; /* Evita que los bordes se desborden del ancho del formulario */
}

input[type="submit"] {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
}

input[type="submit"]:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    font-size: 12px;
}

@media (max-width: 600px) {
    .container {
    width: 95%;
    }
}
</style>