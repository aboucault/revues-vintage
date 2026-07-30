#!/usr/bin/env node
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const configPath = `${process.env.HOME}/.config/sanity/config.json`
const { authToken } = JSON.parse(readFileSync(configPath, 'utf-8'))

const client = createClient({
  projectId: 'u6nnkwb0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: authToken,
  useCdn: false,
})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function ref(id) {
  return { _type: 'reference', _ref: id, _key: key() }
}

const ROBES_ID = 'c23bbcb0-7561-437e-b320-5d462cbf9d3d'
const GARCONS_ID = '075e3eab-95e2-4d40-8da2-e7cf9529a08c'
const HOMMES_ID = '07037c0e-e4a1-4444-b634-b70e66d33da1'

const patches = [
  { id: '179kh736VLd2XUiRq0tFdO', label: 'Le Petit Écho de la Mode n°3', categories: [], typeActivite: ['mode', 'couture', 'tricot', 'broderie'] },
  { id: 'c22a1b8a-5dbe-468f-a423-8b11402599e0', label: 'Le Petit Écho de la Mode n°5', categories: [], typeActivite: ['mode', 'couture', 'tricot', 'broderie'] },
  { id: 'iDneq7i7OtjTndYyXoPzwI', label: 'La Coquette n°280', categories: [], typeActivite: ['mode'] },
  { id: 'iDneq7i7OtjTndYyXoSThU', label: 'La Coquette n°276', categories: [], typeActivite: ['mode'] },
  { id: 'nX4UJtN64XhPlovUgYdxup', label: 'La Coquette n°202', categories: [], typeActivite: ['mode'] },
  { id: 'ebf65ccb-872a-4067-92fa-4c76a851d5a6', label: 'Vogue 1234 — Robe fourreau', categories: [], typeActivite: ['couture'] },
  { id: '4718ca59-f28c-4f4d-bc18-771099d890c5', label: 'Pull pour garçon de 7 ans', categories: [ref(GARCONS_ID)], typeActivite: ['tricot'] },
  { id: 'ef6a8851-7545-43a3-92a1-962f082d9d09', label: 'Gilet tailleur pour homme', categories: [ref(HOMMES_ID)], typeActivite: ['tricot'] },
  { id: 'f2e180f4-1949-4b67-98d6-1c4ce8f2ad70', label: "L'Écho de la Mode 170005 — Coquette Robe", categories: [ref(ROBES_ID)], typeActivite: [] },
  { id: 'mY9rvoN0Z2fh3pZAEbZmvx', label: "Chic et Pratique 9179 — Robe d'après-midi", categories: [ref(ROBES_ID)], typeActivite: [] },
]

const ORPHAN_CATEGORIE_IDS = [
  '1aa02edb-9463-4664-a594-3a7f5535be2f', // couture
  '7aac692c-6cd8-4e57-9a9a-3c1016e45184', // tricot
  '2f0a386e-1db2-401c-8ee3-a6ff06f51184', // broderie
  '017272f8-5b6c-4fd6-aa0d-fb1c46477a42', // mode
  '070da523-c882-46bd-bbd1-e52113fb25ef', // crochet (orphelin)
  '620496ff-f2aa-4397-a448-db363ceb4ce2', // robe (doublon minuscule de Robes)
]

for (const p of patches) {
  await client.patch(p.id).set({ categories: p.categories, typeActivite: p.typeActivite }).commit()
  console.log(`✓ ${p.label} (${p.id})`)
}

for (const id of ORPHAN_CATEGORIE_IDS) {
  await client.delete(id)
  console.log(`✓ categorie supprimée (${id})`)
}

console.log('Migration terminée.')
