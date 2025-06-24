// scripts/generate-static-translations.ts

import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs/promises'
import path from 'path'
import { translateWithCache } from '@/lib/translations/translateWithCache'
import { ALL_TEXTS } from '../i18n/messages'
import locales from '@/i18n/locales'

const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'translations')

async function generate() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  for (const locale of locales) {
    const { data } = await translateWithCache({
      locale: locale.value,
      content: ALL_TEXTS,
      doNotTranslate: ['icon'],
    })

    const filePath = path.join(OUTPUT_DIR, `${locale.value}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`✅ Traducción lista: ${filePath}`)
  }

  // ✅ Finaliza solo cuando todo termina bien
  process.exit(0)
}

generate().catch((err) => {
  console.error('❌ Error al generar traducciones:', err)
  process.exit(1)
})
