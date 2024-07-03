import { initDB } from "./db.js";
import { saveOrphanage } from "./saveOrphanage.js";

initDB.then(async (db) => {
    // incerir dados na tabela
    await saveOrphanage(db, {
        lat: "-27.222633", 
        lng: "-49.6555874",
        name: 'Lar dos meninos',
        about: 'Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.',
        whatsapp: '999999999',
        images: [
            'https://imgs.search.brave.com/8ipNDBcD3o3Fvzba4ZgLDMsDgvopD2hkLa7h2LbgM0I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGVjaHdl/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMTIvYW5p/bWFpcy1hbmRhbmRv/ZGUtc2thdGUuanBn/P3Jlc2l6ZT02MjUs/NDE1JnNzbD0x',
            'https://imgs.search.brave.com/JiZwkG9tSz_OvyJa-_fFz-3bru-8ibETsuAnimSgODw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGVjaHdl/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMTIvYmVt/LWVuZ3JhY2Fkby4u/anBnP3Jlc2l6ZT02/MDAsNTI5JnNzbD0x',
            'https://source.unsplash.com/random?id=3',
            'https://source.unsplash.com/random?id=4',
            'https://source.unsplash.com/random?id=5',
            'https://source.unsplash.com/random?id=6',
        ].toString(),
        instructions: 'Venha como se sentir a vontade e traga muito amor e paciência para dar.',
        opening_hours: 'Horário de visitas Das 18h até 8h',
        open_on_weekends: '1'
    }) 

    // consultar dados da tabela
    const selectOrphanages = await db.all("SELECT * FROM orphanages")
    console.log('Orphanages:',selectOrphanages)

    // consultar somente 1 orphanato, pelo id
    // const orphanages = await db.all('SELECT * FROM orphanages WHERE id = "2"')
    // console.log(orphanages)
    

    // deleter um dado da tabela
    // console.log(await db.run('DELETE FROM orphanages WHERE id = "4"'))
    // console.log(await db.run('DELETE FROM orphanages WHERE id = "5"'))
})