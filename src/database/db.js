import { Database } from 'sqlite-async';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Converte import.meta.url para caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `);
}

const initDB = Database.open(join(__dirname, 'database.sqlite')).then(execute);

export { initDB };
