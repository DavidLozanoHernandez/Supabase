"use client"

import { useState } from "react"
import {addNote} from "./actions";
import {useRouter} from "next/navigation";

export default function AddProduct() {

    const [title,setTitle] = useState('')
    const router = useRouter();

    // estado donde conservar los mensajes de error
    const [error, setError] = useState({});

    function onSave(form){
        //evitar el submit
        form.preventDefault();

        //Validar los campos obligatorios
        //name, description y price

        let errorList = {};

        if(!title){
            errorList.title = "El titulo es obligatorio.";
        }

        //pasar lista de errores al estado
        setError({...errorList});

        //Si hay mensajes de error interrumpir el flujo
        if(Object.keys(errorList).length > 0){
            return;
        }

        //alert("se guardaron los datos");
        //mandar a guardar el producto

         addNote({
            title,
        })
        .then((result) => {
            //cuando la funcion se ejecute correctamente
            //y retorne una respuesta
            console.log(result)

            //hacer algo con el resultado
            if (!result.success){
                alert(result.message)
                setError({...result.errors})
             }else{
                alert(result.message);
                setTitle('');

                //guardar producto
             }
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    const handleRedireccion = () => {
        // Redirige a la página de agregar
        redirectToAddPage();
    };

    const redirectToAddPage = () => {
        router.push('./');
    };

    return(
        <div className="m-8" onSubmit={onSave}>
            
            <div className="flex flex-row">
            <h1>Agregar notas</h1>

            <button
                className='rounded bg-slate-800 px-2 ml-3'
                onClick={handleRedireccion}
            >
                Regresar
            </button>
            </div>

            <form method="POST" className="flex flex-col space-y-4 text-black p-8 bg-slate-800 rounded-md">
                
                <input type="text" name="name" placeholder="Ingresa el titulo" value={title} className="rounded-md"
                onChange={(e) => {
                    setTitle(e.target.value);
                    setError({
                        ...error,
                        title: undefined,
                    })
                }}/>
                <p className="text-white">{error.title || ''}</p>

                <button type="submit" className="rounded-full bg-blue-300">Registrar producto</button>

            </form>
        </div>
    )
}