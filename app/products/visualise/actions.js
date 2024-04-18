"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient(){
    const cookieStore = cookies();
    return createClient(cookieStore);
}

export async function getproducts (id){{

    const {data, error} = await supabaseClient()
    .from('products')
    .select()
    .eq('id', id)
    .single();

    return({
        products: data,
        error,
    })
}}