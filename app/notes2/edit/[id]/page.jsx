"use client"

import { useEffect, useState } from "react";
import {getNote} from "../../actions"
import {addProduct} from "../actions"
import { useRouter } from "next/navigation";

export default function Page({params}) {
    const [note, setNote] = useState({});
    const [error, setError] = useState({});
    const router = useRouter();

    //leer la nota desde la bd al cargar
    //la vista
    useEffect(() => {
        const loadNote = async () => {
            //cargar los datos de la nota
            const noteResult = await getNote(params.id)

            //pasar los datos de la nota al estado
            setNote(noteResult.note)


            //falta mostrar la info del error en caso de que se tenga
            //notesResult.error

            if(noteResult.error){
                alert(noteResult.error.message);
            }
        }
        loadNote()
    }, [])

    //funcion para guardar para mandar a guardar o actualizar la nota
    const handleUpdate = async (form) => {
        form.preventDefault();

        //console.log(note)
        let errorList = {};

        if(!note.title){
            errorList.note = "Es obligatorio llenarlo";
        }

        setError({...errorList});

        if(Object.keys(errorList).length > 0){
            return;
        }

        addProduct({
            id: note.id, // Asegúrate de pasar la id correctamente
            title: note.title,
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
                setNote('');
                //guardar producto
             }
        })
        .catch((error) => {
            alert(error.message);
        })
    };

    const handleRedireccion = () => {
        // Redirige a la página de agregar
        redirectToAddPage();
    };

    const redirectToAddPage = () => {
        router.push('../');
    };

    //formulario para editar la nota
    return (
        <div className="space-y-4">

        <button
                className='rounded bg-slate-800 px-2 ml-3'
                onClick={handleRedireccion}
            >
                Regresar
            </button>

        <form onSubmit={handleUpdate} className="space-y-2">
            <input
            value={note?.title}
            className="text-black"
            onChange={(e) => {
                setNote({
                    ...note,
                    title: e.target.value,
                });
                setError({
                    ...error,
                    note: undefined,
                });
            }}
            />
            <p className="text-white">{error.note || ''}</p>
            <button type="submit" className='rounded bg-green-300 px-2 ml-3'>Actuzalizar</button>
        </form> 
        </div>
    );
}