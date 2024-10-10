import React, { useState } from "react";

const Login = ({setMessage}) => { // Parámetro pasado desde App.js
    const [user, setUser] = useState(''); // Inicializa user y setUser en blanco
    const [password, setPassword] = useState(''); // Inicializa password y setPasswrd en blanco

    // Funciones para cambiar el usuario y la contraseña
    const handleUserChange = (e) => setUser(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => { // Esta función se ejecuta cuando se le da click al botón
        e.preventDefault();

        try {
            const authenticatedUser = await authenticateUser(user, password); // Usuario a autentificar

            if(authenticatedUser) { // Coincide
                setMessage(`¡Bienvenido ${authenticatedUser.name}! :D`);
            } else { // No coincide
                setMessage("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            setMessage("Error al intentar autenticar. Por favor, intente de nuevo.");
        }

        
    }

    // Función async para el fetch
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error('Error accediendo al archivo JSON.');
            }

            return await response.json();
        } catch(error) {
            console.error('Error accediendo al archivo JSON.');
            throw error;
        }
    }

    async function authenticateUser(user, password) { // Función para autentificar los usuarios, asignando nombre de usuario y contraseña
        const users = await fetchUsers();
        
        return users.find(userData => 
          userData.email.toLowerCase() === user.toLowerCase() && 
          userData.username.toLowerCase() === password.toLowerCase()
        );
    }
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label for="email">Email: </label>
                <input type="email" id="email" name="email" value={user} onChange={handleUserChange} /><br /> {/* Los cambios se van actualizando aunque no se haga submit */}
                <label for="passw">Password: </label>
                <input type="password" id="password" name="passw" value={password} onChange={handlePasswordChange} /><br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Login;