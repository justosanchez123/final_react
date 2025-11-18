import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../../services/products"; // Asegúrate de tener deleteProduct en tus servicios
import "./AdminProductList.css"; // Puedes crear un CSS simple para la tabla

export const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al iniciar el componente
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProduct(id);
        // Actualizamos el estado eliminando el producto de la lista visualmente
        setProducts(products.filter((prod) => prod.id !== id));
        alert("Producto eliminado");
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  if (loading) return <p>Cargando panel...</p>;

  return (
    <div className="admin-container">
      <h1>Administrar Productos</h1>

      {/* ---> AQUÍ ESTÁ EL BOTÓN QUE PEDISTE <--- */}
      <div className="actions-bar">
        <Link to="/admin/alta-productos" className="btn-primary">
          + Agregar Nuevo Producto
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>
                <img src={prod.imageURL} alt={prod.name} style={{ width: "50px" }} />
              </td>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>${prod.price}</td>
              <td>
                {/* Botón para Editar (Lo veremos en el siguiente paso) */}
                <Link to={`/admin/editar/${prod.id}`} className="btn-edit">
                  Editar
                </Link>
                
                {/* Botón para Eliminar */}
                <button onClick={() => handleDelete(prod.id)} className="btn-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};