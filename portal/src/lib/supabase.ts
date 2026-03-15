import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://supa.techstorebrasil.com',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE4NzI4MTcyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs'
)
