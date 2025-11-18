import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({});
    const { id } = useParams();

    useEffect(()  => {
       fetch("https://6900bc50ff8d792314bb38d4.mockapi.io/products")       
        .then((res) => {
        if (!res.ok){
            throw new Error("No se encontró el producto");
        }
        return res.json();

       })
       .then((data) => {
        const found = data.find((prod) => prod.id === id)
        if(found){
            setDetail(found);
        }else{
             throw new Error("No se encontró el producto");
        }        
       })
       .catch(() => {        
       })
    }, [id]);
    return (
      <main>
        {Object.keys(detail).length ?(
            <ItemDetail detail={detail} />
        ):(
            <p>Cargando...</p>
        )}
      </main>  
    );
};