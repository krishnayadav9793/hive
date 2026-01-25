import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export async function getMenuByDate(date=null){
  const targetDate = date || new Date().toISOString().split('T')[0];//if date not available use today's date
  const { data, error } = await supabase//sql query to fetch menu for the given date
    .from('mess_menu')
    .select('*')
    .eq('date', targetDate)
    .single();// single record is expected
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching menu:', error);
    return null;
  }
  if(error )throw error;
  return data;
}
  export async function getWeeklyMenu(){
    const today=new Date();
    const weekLater=new Date();
    weekLater.setDate(today.getDate()+7);
    const { data, error } = await supabase
      .from('mess_menu')
      .select('*')
      .gte('date', today.toISOString().split('T')[0])
      .lte('date', weekLater.toISOString().split('T')[0])
      .order('date', { ascending: true });
    if (error) throw error;
    return data || [];
  }
export async function upsertMenu(menuData) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Authentication required');
    
    // Prepare the data
    const formattedData = {
        date: menuData.date,
        breakfast: {
            items: menuData.breakfast?.items || [],
            time: menuData.breakfast?.time || "7:30 AM - 9:00 AM"
        },
        lunch: {
            items: menuData.lunch?.items || [],
            time: menuData.lunch?.time || "12:30 PM - 2:00 PM"
        },
        snacks: {
            items: menuData.snacks?.items || [],
            time: menuData.snacks?.time || "4:30 PM - 5:30 PM"
        },
        dinner: {
            items: menuData.dinner?.items || [],
            time: menuData.dinner?.time || "7:30 PM - 9:30 PM"
        },
        special_note: menuData.special_note || null,
        is_holiday: menuData.is_holiday || false,
        updated_by: user.id
    };
    
    const { data, error } = await supabase
        .from('mess_menu')
        .upsert(formattedData, { 
            onConflict: 'date',
            ignoreDuplicates: false 
        })
        .select();
    
    if (error) throw error;
    return data[0];
}

/**
 * Delete menu for a specific date (Admin only)
 */
export async function deleteMenu(date) {
    const { error } = await supabase
        .from('mess_menu')
        .delete()
        .eq('date', date);
    
    if (error) throw error;
    return true;
}

/**
 * Subscribe to real-time menu updates
 * @param {function} callback - Function to call when menu changes
 */
export function subscribeToMenuUpdates(callback) {
    const subscription = supabase
        .channel('mess_menu_changes')
        .on(
            'postgres_changes',
            { 
                event: '*', 
                schema: 'public', 
                table: 'mess_menu' 
            },
            (payload) => {
                callback(payload);
            }
        )
        .subscribe();
    
    return subscription;
}
  
