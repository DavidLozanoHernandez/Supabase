"use client"

import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from "next/navigation";
import {getproducts} from "../actions";


export default function Index({params}) {
    const [products, setProduts] = useState({})
    const router = useRouter();

    useEffect(() => {
        const loadproduct = async () => {
            //cargar los datos de la nota
            const productResult = await getproducts(params.id)
            //pasar los datos de la nota al estado
            setProduts(productResult.products)


            //falta mostrar la info del error en caso de que se tenga
            //notesResult.error

            if(productResult.error){
                alert(productResult.error.message);
            }
        }
        loadproduct()
    }, [])

    const handleRedireccion = () => {
        // Redirige a la página de agregar
        redirectToAddPage();
    };

    const redirectToAddPage = () => {
        router.push('../');
    };

    return(
        <div className="max-w-[500px] m-20 space-y-4">
            <button
                className='rounded bg-slate-800 px-2 ml-3'
                onClick={handleRedireccion}
            >
                Regresar
            </button>

            <ImageGallery items={products?.gallery || []} />
        </div>
    )
}