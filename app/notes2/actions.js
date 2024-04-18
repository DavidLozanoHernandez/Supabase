"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient(){
    const cookieStore = cookies();
    return createClient(cookieStore);
}

export async function getNotes(){

    const { data: notes, error} = await supabaseClient()
    .from('notes')
    .select()

    return{
        notes,
        error,
    };
}

//funcion para buscar / filtrar
export async function  searchNotes(search){

    //conservar instancia de supabase
    const supabase = supabaseClient();

        const {data: notes, error} = await supabase
        .from('notes')
        .select()
        .like('title', `%${search}%`)

        return{
            notes,
            error,
        };
}

//Funcion para leer una nota por id
export async function getNote (id){{
    const supabase = supabaseClient();

    const {data, error} = await supabase
    .from('notes')
    .select()
    .eq('id', id)
    .single();

    return({
        note: data,
        error,
    })
}}