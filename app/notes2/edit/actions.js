"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Funcion para editar un nuevo producto
 * @param {*} note datos de la nota
 */
export async function addProduct(note) {
    try {
        console.log(note);

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
            .from('notes')
            .upsert([
                {
                    id: note.id,
                    title: note.title,
                },
            ]);

        if (error) {
            return {
                success: false,
                message: `Ocurrió un error al actualizar. Error: ${error.message}`,
                errors: null,
            };
        }

        return {
            success: true,
            message: 'La nota se ha actualizado/inserado correctamente',
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error interno al procesar la solicitud. Error: ${error.message}`,
            errors: null,
        };
    }
}