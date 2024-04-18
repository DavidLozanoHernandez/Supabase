"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Funcion para registrar un nuevo producto
 * @param {*} product datos del producto
 */
export async function addPassword(password, confpassword) {
    
    console.log(password, confpassword)
    //validar los datos
    
    let errorList = {};

        if(!password){
            errorList.password = "La contraseña es obligatoria.";
        }

        if(!confpassword){
            errorList.confpassword = "Es obligatorio este campo.";
        }

        if(password !== confpassword){
            errorList.password = "Los datos no coinciden."
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
        
        const {error} = await supabase
        .auth.updateUser({ password: password })


        //si hay un error al insertar, retornar aviso al cliente
        if(error){
            return{
                success: false,
                message: `ocurrio un error al actualizar la contraseña. 
                    Error: ${error.message}`,
                errors: null,
            }
        }

        //si todo esta OK
        return{
            success: true,
            message: 'La contraseña se a actualizado correctamente.',
            errors: null,
        };
}