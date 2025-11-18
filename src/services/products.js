const BASE_URL = "https://6900bc50ff8d792314bb38d4.mockapi.io/products";

export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }

  const result = await res.json();
  return result;
};

export const getProducts = async (category) => {
  let url = BASE_URL;
  if (category) {
    url = `${BASE_URL}?category=${category}`;
  }

  const res =await fetch(url);
  if (!res.ok) {
    throw new Error("Error al listar productos");
  }

  const results =await res.json();
  return results;
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }
  return await res.json();
};



// En services/products.js

// ... (tus funciones existentes: createProduct, getProducts, getProductById) ...

// 1. Función para ACTUALIZAR (PUT)
export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT", // PUT reemplaza todo el objeto
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  return await res.json();
};

// 2. Función para ELIMINAR (DELETE)
export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar el producto");
  }

  return await res.json(); // Mockapi devuelve el objeto borrado
};