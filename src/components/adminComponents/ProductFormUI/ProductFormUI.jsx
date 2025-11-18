export const ProductFormUI = ({
  title = "Agregar producto", // Valor por defecto por seguridad
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        {/* Usamos la prop title dinámica */}
        <h2>{title}</h2>
        
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Categoría</label>
          <select
            name="category"
            value={product.category}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="local">Nacional (local)</option>
            <option value="extranjero">Internacional (extranjero)</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            required
          ></textarea>
          {errors.description && (
            <p className="error">{errors.description}</p>
          )}
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          
          {/* MEJORA: Mostrar vista previa si ya existe imagen (Modo Editar) */}
          {product.imageURL && (
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "0.8rem" }}>Imagen actual:</p>
              <img 
                src={product.imageURL} 
                alt="Vista previa" 
                style={{ maxWidth: "100px", borderRadius: "4px", border: "1px solid #ccc" }} 
              />
            </div>
          )}

          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};