// ============================================================================
// SCRIPT DE SINCRONITZACIÓ DE REFERÈNCIES REALS KERNELCORE (ZERO MOCKS)
// Insereix a Supabase Cloud, dashboardMockData.js, dataStore.js i fitxers SQL
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { realSKUsCatalog, getFormattedInventory } from './build_real_skus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SUPABASE_URL = 'https://txlzgsnrhddmjainbmsj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4zdtVfNlZ5bqxhCHIduKpA_e8_biUYx';

async function main() {
  console.log('Iniciant sincronitzacio del cataleg oficial de referencies reals...');
  console.log(`Total de referencies a sincronitzar: ${realSKUsCatalog.length}`);

  const formattedInventory = getFormattedInventory();

  // ──────────────────────────────────────────────────────────────────────────
  // 1. SINCRONITZACIÓ DIRECTA AMB SUPABASE CLOUD (inventari_maquinari)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n[1/4] Connectant amb Supabase Cloud...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Comprovar connexió
  const { count: initialCount, error: countErr } = await supabase
    .from('inventari_maquinari')
    .select('*', { count: 'exact', head: true });

  if (countErr) {
    console.error('Error al connectar amb Supabase:', countErr.message);
  } else {
    console.log(`Registres actuals a Supabase: ${initialCount}`);

    // Obtenir tots els registres existents per netejar o actualitzar
    console.log('Buidant taula per carregar el cataleg real net...');
    const { error: delErr } = await supabase
      .from('inventari_maquinari')
      .delete()
      .gte('id_article', 1);

    if (delErr) {
      console.warn('Avís en buidar taula completa:', delErr.message);
    } else {
      console.log('Taula netejada correctament.');
    }

    // Inserció per blocs (chunks de 50) a Supabase
    console.log('Inserint referencies reals a inventari_maquinari de Supabase...');
    const chunkSize = 50;
    const dbRows = formattedInventory.map(item => ({
      codi_referencia: item.sku,
      nom_article: item.name,
      fabricant: item.brand,
      categoria: item.category,
      gama: item.tier,
      id_proveidor: item.supplierId,
      estoc_actual: item.stock,
      estoc_minim: item.min,
      preu_cost: item.cost,
      preu_venda: item.price,
      ubicacio_magatzem: item.location
    }));

    for (let i = 0; i < dbRows.length; i += chunkSize) {
      const chunk = dbRows.slice(i, i + chunkSize);
      const { error: insErr } = await supabase.from('inventari_maquinari').insert(chunk);
      if (insErr) {
        console.error(`Error inserint bloc ${i} - ${i + chunk.length}:`, insErr.message);
      } else {
        console.log(`Inserit bloc ${i + 1} - ${Math.min(i + chunkSize, dbRows.length)} / ${dbRows.length}`);
      }
    }

    // Verificar recompte final
    const { count: finalCount } = await supabase
      .from('inventari_maquinari')
      .select('*', { count: 'exact', head: true });
    console.log(`Total final confirmat a Supabase Cloud: ${finalCount} SKUs reals.`);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. ACTUALITZACIÓ DE src/data/dashboardMockData.js
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n[2/4] Actualitzant src/data/dashboardMockData.js...');
  const mockDataPath = path.join(rootDir, 'src', 'data', 'dashboardMockData.js');
  let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

  const formattedInventoryStr = JSON.stringify(formattedInventory, null, 2);
  mockDataContent = mockDataContent.replace(
    /export const initialInventory = \[[\s\S]*?\n\];/m,
    `export const initialInventory = ${formattedInventoryStr};`
  );

  fs.writeFileSync(mockDataPath, mockDataContent, 'utf8');
  console.log('src/data/dashboardMockData.js actualitzat amb èxit.');

  // ──────────────────────────────────────────────────────────────────────────
  // 3. ACTUALITZACIÓ DE server/dataStore.js
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n[3/4] Actualitzant server/dataStore.js...');
  const dataStorePath = path.join(rootDir, 'server', 'dataStore.js');
  let dataStoreContent = fs.readFileSync(dataStorePath, 'utf8');

  dataStoreContent = dataStoreContent.replace(
    /export const initialInventory = \[[\s\S]*?\n\];/m,
    `export const initialInventory = ${formattedInventoryStr};`
  );

  fs.writeFileSync(dataStorePath, dataStoreContent, 'utf8');
  console.log('server/dataStore.js actualitzat amb èxit.');

  // ──────────────────────────────────────────────────────────────────────────
  // 4. ACTUALITZACIÓ DE database/supabase_kernelcore.sql I kernelcore_db.sql
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n[4/4] Generant instruccions SQL INSERT per a la persistència...');
  const sqlInserts = formattedInventory.map(item => {
    const esc = str => (str || '').replace(/'/g, "''");
    return `('${esc(item.sku)}', '${esc(item.name)}', '${esc(item.brand)}', '${esc(item.category)}', '${esc(item.tier)}', ${item.supplierId || 'NULL'}, ${item.stock}, ${item.min}, ${item.cost.toFixed(2)}, ${item.price.toFixed(2)}, '${esc(item.location)}')`;
  });

  const fullSqlInsertStatement = `INSERT INTO inventari_maquinari (codi_referencia, nom_article, fabricant, categoria, gama, id_proveidor, estoc_actual, estoc_minim, preu_cost, preu_venda, ubicacio_magatzem)\nVALUES\n${sqlInserts.join(',\n')}\nON CONFLICT (codi_referencia) DO UPDATE SET\n  nom_article = EXCLUDED.nom_article,\n  fabricant = EXCLUDED.fabricant,\n  categoria = EXCLUDED.categoria,\n  gama = EXCLUDED.gama,\n  id_proveidor = EXCLUDED.id_proveidor,\n  estoc_actual = EXCLUDED.estoc_actual,\n  estoc_minim = EXCLUDED.estoc_minim,\n  preu_cost = EXCLUDED.preu_cost,\n  preu_venda = EXCLUDED.preu_venda,\n  ubicacio_magatzem = EXCLUDED.ubicacio_magatzem;`;

  const supabaseSqlPath = path.join(rootDir, 'database', 'supabase_kernelcore.sql');
  if (fs.existsSync(supabaseSqlPath)) {
    let sqlContent = fs.readFileSync(supabaseSqlPath, 'utf8');
    sqlContent = sqlContent.replace(
      /INSERT INTO inventari_maquinari[\s\S]*?;/m,
      fullSqlInsertStatement
    );
    fs.writeFileSync(supabaseSqlPath, sqlContent, 'utf8');
    console.log('database/supabase_kernelcore.sql actualitzat.');
  }

  console.log('\nSincronitzacio completa i exitosa!');
}

main().catch(err => {
  console.error('Error crític durant la sincronització:', err);
  process.exit(1);
});
