import connection from "../helpers/postgresConnection";

const postCtrl = {};

postCtrl.register = (req, res) => {
  try {
    const { name, description } = req.body;
    connection
      .one(
        'INSERT INTO posts (name, description) VALUES ($1, $2) RETURNING id',
        [name, description]
      )
      .then((data) => {
        res.status(200).json({
          msg: 'Post registrado exitosamente.',
          id: data.id
        });
      })
      .catch((error) => {
        res.status(400).json({
          msg: 'Ocurrió un error al registrar el post.',
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error en el servidor.",
    });
  }
};

postCtrl.getPosts = (req, res) => {
  try {
    connection
      .any("SELECT * FROM posts ORDER BY id ASC")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({
          msg: "Ocurrió un error al obtener los posts.",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error en el servidor.",
      error: "Problemas al obtener los posts.",
    });
  }
};

postCtrl.editPost = (req, res) => {
  try {
    const { name, description, id } = req.body;
    connection
      .none(
        'UPDATE posts SET name = $1, description = $2 WHERE id = $3',
        [name, description, id]
      )
      .then(() => {
        res.status(200).json({
          msg: 'Post actualizado exitosamente.',
        });
      })
      .catch((error) => {
        res.status(400).json({
          msg: 'Ocurrió un error al actualizar el post.',
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error en el servidor.",
    });
  }
};

postCtrl.deletePost = (req, res) => {
  try {
    const { id } = req.params;
    connection
      .none(
        'DELETE FROM posts WHERE id = $1',
        [id]
      )
      .then(() => {
        res.status(200).json({
          msg: 'Post eliminado exitosamente.'
        });
      })
      .catch((error) => {
        res.status(400).json({
          msg: 'Ocurrió un error al eliminar el post.',
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error en el servidor.",
    });
  }
};

export default postCtrl;
