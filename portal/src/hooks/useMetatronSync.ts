import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Editor, createShapeId } from 'tldraw'

const SUPABASE_URL = 'https://supa.techstorebrasil.com'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE4NzI4MTcyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export function useMetatronSync(editor: Editor | null) {
  useEffect(() => {
    if (!editor) return

    const loadData = async () => {
      console.log('[Metatron] Buscando Runas no Livro Celestial...')
      
      const { data, error } = await supabase
        .from('geminicli_knowledge_nodes')
        .select('*')

      if (error) {
        console.error('[Metatron] Erro de Acesso:', error.message)
        return
      }

      console.log(`[Metatron] ${data?.length} Runas reveladas. Tecendo no Canvas...`)

      if (data) {
        data.forEach((node, index) => {
          const shapeId = createShapeId(`node-${node.id}`)
          
          // Se já existir, remove para forçar a atualização (Hard Load)
          if (editor.getShape(shapeId)) {
            editor.deleteShape(shapeId)
          }

          editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 300 + (index * 220) % 800,
            y: 200 + Math.floor(index / 4) * 220,
            props: {
              geo: 'hexagon',
              text: node.name,
              color: 'blue',
              fill: 'solid',
              size: 'm',
            },
          })
        })
        editor.zoomToFit()
      }
    }

    // Delay para estabilidade
    const timer = setTimeout(loadData, 1500)
    return () => clearTimeout(timer)
  }, [editor])
}
