"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Funcion para registrar un nuevo producto
 * @param {*} product datos del producto
 */
export async function addNote(note) {
    
    //validar los datos

    let errorList = {};

        if(!note.title){
            errorList.title = "El titulo es obligatorio.";
        }

        if(Object.keys(errorList).length > 0){
            return{
                success: false,
                message: 'Ingresar los datos correctamente.',
                errors: errorList,
            };
        }

        // si no hay errores en los datos
        //Mandar a insertar
        // manejar error al insertar

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        
        const { data, error } = await supabase
        .from('notes')
        .insert([
            note,
        ])
        .select()
        
        //si hay un error al insertar, retornar aviso al cliente
        if(error){
            return{
                success: false,
                message: `ocurrio un error al guardar el producto. 
                    Error: ${error.message}`,
                errors: null,
            }
        }

        //si todo esta OK
        return{
            success: true,
            message: 'La nota se ha registrado correctamente',
            errors: null,
        };
}