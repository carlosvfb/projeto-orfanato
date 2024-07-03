import { initDB } from "../database/db.js";
import { saveOrphanage } from "../database/saveOrphanage.js";

export default {
  index(req, res) {
    return res.render("index");
  },

  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await initDB;
      const results = await db.all("SELECT * FROM orphanages WHERE id = ?", [
        id,
      ]);
      const orphanage = results[0];

      
      if (orphanage) {

        orphanage.open_on_weekends = orphanage.open_on_weekends === "1";
        console.log("open_on_weekends value:", orphanage.open_on_weekends);

        orphanage.images = orphanage.images ? orphanage.images.split(",") : [];
        orphanage.firstImage = orphanage.images[0];
        return res.render("orphanage", { orphanage });
      } else {
        return res.status(404).send("Orphanage not found");
      }
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await initDB;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    // validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
      return res.status(400).send('Todos os campos devem ser preenchidos!');
    }

    try {
      // salvar o orfanato
      const db = await initDB;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields['open-on-weekends'] === '1' ? 1 : 0,
      });
      // const db = await initDB;
      // await saveOrphanage(db, {
      //   lat: fields.lat,
      //   lng: fields.lng,
      //   name: fields.name,
      //   about: fields.about,
      //   whatsapp: fields.whatsapp,
      //   images: fields.images.toString(),
      //   instructions: fields.instructions,
      //   opening_hours: fields.opening_hours,
      //   open_on_weekends: fields.open_on_weekends
      // });

      // redirecionamento
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error)
      return res.status(500).send('Erro no banco de dados!');
    }

    
  }
};
