#!/usr/bin/env node
import { createClient } from '@sanity/client'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const patronId = process.argv[2]
if (!patronId) {
  console.error('Usage: node scripts/generate-patron-couverture.mjs <id-du-patronGratuit>')
  process.exit(1)
}

const configPath = join(process.env.HOME, '.config/sanity/config.json')
const { authToken } = JSON.parse(readFileSync(configPath, 'utf-8'))

const client = createClient({
  projectId: 'u6nnkwb0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: authToken,
  useCdn: false,
})

const patron = await client.fetch(
  `*[_id == $id][0]{ titre, pages, "revueScanUrl": revueSource->urlScanComplet.asset->url }`,
  { id: patronId },
)

if (!patron) {
  console.error(`Document ${patronId} introuvable.`)
  process.exit(1)
}
if (!patron.revueScanUrl) {
  console.error(`Le patron "${patron.titre}" n'a pas de revue source avec un scan complet.`)
  process.exit(1)
}
if (!patron.pages || patron.pages.length === 0) {
  console.error(`Le patron "${patron.titre}" n'a pas de page renseignée.`)
  process.exit(1)
}

const page = patron.pages[0]
const workDir = mkdtempSync(join(tmpdir(), 'patron-couverture-'))

try {
  const pdfPath = join(workDir, 'scan.pdf')
  const outputPrefix = join(workDir, 'page')

  console.log(`Téléchargement du scan de "${patron.titre}"…`)
  const response = await fetch(patron.revueScanUrl)
  if (!response.ok) {
    console.error(`Échec du téléchargement du PDF (${response.status}).`)
    process.exit(1)
  }
  writeFileSync(pdfPath, Buffer.from(await response.arrayBuffer()))

  console.log(`Extraction de la page ${page}…`)
  execFileSync('pdftoppm', ['-png', '-f', String(page), '-l', String(page), '-r', '150', pdfPath, outputPrefix])

  const pngName = readdirSync(workDir).find((name) => name.startsWith('page') && name.endsWith('.png'))
  if (!pngName) {
    console.error(`pdftoppm n'a produit aucune image pour la page ${page}.`)
    process.exit(1)
  }
  const pngBuffer = readFileSync(join(workDir, pngName))

  console.log('Upload de la vignette sur Sanity…')
  const asset = await client.assets.upload('image', pngBuffer, { filename: `${patronId}-couverture.png` })

  await client
    .patch(patronId)
    .set({ couverture: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    .commit()

  console.log(`Vignette générée et associée à "${patron.titre}".`)
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
