await db.all("SELECT * FROM orphanages")
    console.log('Orphanages:',selectOrphanages)