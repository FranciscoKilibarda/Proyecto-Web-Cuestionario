const Categoria = require('../models/categoria.model');

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    return res.json(categorias);
  } catch (error) {
    console.error('Error obteniendo categorias:', error.message);
    return res.status(500).json({ message: 'Error obteniendo categorias' });
  }
};

const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    return res.json(categoria);
  } catch (error) {
    console.error('Error obteniendo categoria:', error.message);
    return res.status(500).json({ message: 'Error obteniendo categoria' });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // VALIDACIONES
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    if (nombre.length < 3) {
      return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres' });
    }

    const categoria = await Categoria.create({ nombre, descripcion });
    return res.status(201).json(categoria);
  } catch (error) {
    console.error('Error creando categoria:', error.message);
    return res.status(500).json({ message: 'Error creando categoria' });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true }
    );

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    return res.json(categoria);
  } catch (error) {
    console.error('Error actualizando categoria:', error.message);
    return res.status(500).json({ message: 'Error actualizando categoria' });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndDelete(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    return res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando categoria:', error.message);
    return res.status(500).json({ message: 'Error eliminando categoria' });
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
