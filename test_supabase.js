import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log("Checking database...");
  const { data: messages, error } = await supabase.from('messages').select('*');
  if (error) {
    console.error("Error fetching messages:", error.message);
  } else {
    console.log("Total messages in DB:", messages.length);
    console.log("Messages:", JSON.stringify(messages, null, 2));
  }
}

checkDatabase();
