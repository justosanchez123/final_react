import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";

export const Login = () => {
    const [userForm, setUserForm] = useState({ name: "", password: "" });
    const { user, login } = useAuthContext();

    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/admin/productos" />;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserForm({...userForm, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const succes = login(userForm.name, userForm.password);

        if (succes){
            navigate("/admin/productos");            
        }   else {
            alert("Credenciales incorrectas");
            setUserForm({name: "", password: ""});
        }
    };


    return ( 
    <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div>
            <label>Usuario:</label>
            <input
                type="text"
                name="name"
                value={userForm.name}
                onChange={handleChange}
            />
        </div>
        <div>
            <label>Contraseña:</label>
            <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleChange}
            />
        </div>
        <button type="submit">Iniciar sesión</button>
    </form>
    );
};