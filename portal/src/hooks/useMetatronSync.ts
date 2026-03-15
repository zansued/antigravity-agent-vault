import { useEffect } from 'react'
import { Editor, createShapeId } from 'tldraw'
import { supabase } from '../lib/supabase'

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
