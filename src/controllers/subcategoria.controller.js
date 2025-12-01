const Subcategoria = require('../models/subcategoria.model');

const obtenerSubcategorias = async (req,res) => {
    try{
        const subcategorias = await Subcategoria.find().populate('categoria');
        return res.json(subcategorias);
    }catch (error){
        console.error('Error obteniendo subcategorias:', error.message);
        return res.status(500).json({ message: 'Error obteniendo subcategorias' });
    }
};

const obtenerSubcategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoria = await Subcategoria.findById(id).populate('categoria');

    if (!subcategoria) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }

    return res.json(subcategoria);
  } catch (error) {
    console.error('Error obteniendo subcategoria:', error.message);
    return res.status(500).json({ message: 'Error obteniendo subcategoria' });
  }
};

const crearSubcategoria = async (req, res) => {
  try {
    const { nombre, descripcion, categoria } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    if (!categoria) {
      return res.status(400).json({ message: 'La categoría es obligatoria' });
    }

    const subcategoria = await Subcategoria.create({
      nombre,
      descripcion,
      categoria,
    });
       return res.status(201).json(subcategoria);
  } catch (error) {
    console.error('Error creando subcategoria:', error.message);
    return res.status(500).json({ message: 'Error creando subcategoria' });
  }
};

const actualizarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const subcategoria = await Subcategoria.findByIdAndUpdate(
      id,
      { nombre, descripcion, categoria },
      { new: true }
    );

    if (!subcategoria) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }

    return res.json(subcategoria);
  } catch (error) {
    console.error('Error actualizando subcategoria:', error.message);
    return res.status(500).json({ message: 'Error actualizando subcategoria' });
  }
};

const eliminarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoria = await Subcategoria.findByIdAndDelete(id);

    if (!subcategoria) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }

    return res.json({ message: 'Subcategoría eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando subcategoria:', error.message);
    return res.status(500).json({ message: 'Error eliminando subcategoria' });
  }
};

module.exports = {
  obtenerSubcategorias,
  obtenerSubcategoriaPorId,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria,
};
