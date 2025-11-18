import { useState, useEffect } from "react"; // NUEVO: Agregamos useEffect
import { useParams, useNavigate } from "react-router-dom"; // NUEVO: Importamos hooks de rutas
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadToImgbb } from "../../../services/uploadImage";
// NUEVO: Importamos getProductById y updateProduct
import { createProduct, getProductById, updateProduct } from "../../../services/products";

import "../ProductFormContainer/ProductFormContainer.css";

export const ProductFormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Inicializado como objeto vacío
  const [file, setFile] = useState(null);
  
  // Estado inicial del producto
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageURL: "", // Agregamos imageURL al estado inicial
  });

  // NUEVO: Hooks para detectar modo edición
  const { id } = useParams(); // Captura el ID de la URL (si existe)
  const navigate = useNavigate(); // Para redirigir al terminar

  // NUEVO: Efecto para cargar datos si estamos EDITANDO
  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(id)
        .then((data) => {
          // Rellenamos el estado con lo que vino de la API
          setProduct(data);
          // Nota: No seteamos 'file' porque la imagen ya es una URL (string) en 'data.imageURL'
        })
        .catch((err) => setErrors({ general: "Error al cargar el producto" }))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validamos. Ojo: 'file' es opcional si estamos editando y ya hay imagen
    const fileRequired = !id; 
    const newErrors = validateProduct({ ...product, file }, fileRequired);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let imageUrl = product.imageURL; // Por defecto usamos la que ya tiene

      // Solo subimos a Imgbb si el usuario seleccionó un archivo NUEVO
      if (file) {
        imageUrl = await uploadToImgbb(file);
      }

      const productData = {
        ...product,
        price: Number(product.price),
        category: product.category.toLowerCase(), // Aseguramos minúsculas
        imageURL: imageUrl, // Usamos la nueva o la vieja
      };

      if (id) {
        // NUEVO: Lógica de ACTUALIZACIÓN (PUT)
        await updateProduct(id, productData);
        alert("Producto actualizado con éxito");
      } else {
        // Lógica de CREACIÓN (POST)
        await createProduct(productData);
        alert("Producto creado con éxito");
      }
      
      // Redirigir al panel al terminar
      navigate("/admin/productos");

    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Título dinámico según si edita o crea
  const title = id ? "Editar Producto" : "Agregar Producto";

  return (
    <ProductFormUI
      title={title} // Pasamos el título dinámico
      product={product}
      errors={errors}
      onChange={handleChange}
      onFileChange={setFile}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};