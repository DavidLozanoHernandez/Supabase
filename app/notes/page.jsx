import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  //Query que lee todos los registros de la tabla notes y los renvia como json
  const { data: notes } = await supabase.from('notes').select()

  return (
    <ul>
        {notes.map((note) => <li className='border m-2 p-2' key={note.id}>{note.title}</li>)}
    </ul>
  );
}