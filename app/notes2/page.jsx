"use client"
// vista para  mostrar datos 

import { useEffect, useState } from "react";
import {getNotes, searchNotes} from "./actions";
import { useRouter } from "next/navigation";


import { createClient } from "@/utils/supabase/client";

export default function Page() {
    
    const [notes, setNotes] = useState(null);
  
    const [search, setSearch] = useState('');

    const supabase = createClient()

    const router = useRouter();

    function handleSearch(e){
        e.preventDefault(); // impidir que se envie el form
        // para poder ejecutar una funcion sin recargar la página

        const getData = async () => {

            const notesResult = await searchNotes(search)
            setNotes(notesResult.notes);
            if(notesResult.error) {
                alert(notesResult.error.message);
            }
        }
        getData()

    }

    //al cargar la lista, leer la lista de notas o mostrar error si ocurre
    useEffect(() => {
        const getData = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if (!session){
                router.push("/login")
            }
            //console.log(session)

            const notesResult = await getNotes()
            setNotes(notesResult.notes)
            //falta mostrar la info del error en caso de que se tenga
            //notesResult.error

            if(notesResult.error){
                alert(notesResult.error.message);
            }
        }
        getData()
    }, [])
      
    const handleRedireccion = () => {
        // Redirige a la página de agregar
        redirectToAddPage();
    };

    const redirectToAddPage = () => {
        router.push('./notes2/add');
    };

    const handleEdit = (id) => {
        // Redirige a la página de edición con la ID como parámetro
        router.push(`/notes2/edit/${id}`);
    };

    return (
        <div className='flex my-auto items-center justify-center flex-col space-y-4'>
        
        <form action=""
            className='text-black'
            onSubmit={handleSearch}
        >
                <input 
                    type="text"
                    placeholder='Buscar...' 
                    className='border rounded px-2'
                    defaultValue={search}
                    onChange={(e) => {
                        setSearch(e.target.value); 
                    }}
                />
                <button 
                    type='sumit'
                    className='rounded bg-blue-300 px-2 ml-3'
                >
                        Buscar
                </button>
                
                <button
                    className='rounded bg-green-300 px-2 ml-3'
                    onClick={handleRedireccion}
                >
                    Agregar
                </button>
            </form>

            

            {!notes || notes?.length == 0
                ? <p>Ninguna nota para mostrar.</p>
                :null
            }

    <ul>
        {notes?.map((note) => 
            <li className='border m-2 p-2' key={note.id}>
                {note.title}
                {<button className="grid justify-items-end rounded bg-blue-300 px-2 ml-3" onClick={() => handleEdit(note.id)}>Editar</button>}
            </li>)}
    </ul>

        
    </div>
  );
}