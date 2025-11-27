const Categoria = require("../models/categoria.model");
const Subcategoria = require("../models/subcategoria.model");
const RangoEdad = require("../models/rangoEdad.model");
const Dificultad = require("../models/dificultad.model");
const Pregunta = require("../models/pregunta.model");

async function seedDatabase() {
  console.log(" Ejecutando seed inicial...");

  const categoriasData = [
    { nombre: "Matemática", descripcion: "Operaciones y números" },
    { nombre: "Lengua y Literatura", descripcion: "Lectura y escritura" },
    { nombre: "Ciencias Naturales", descripcion: "Biología, química y física" }
  ];

  let categorias = await Categoria.find();
  if (categorias.length === 0) {
    categorias = await Categoria.insertMany(categoriasData);
    console.log("Categorías creadas");
  } else {
    console.log("Categorías ya existen, usando existentes");
  }

  const subcategoriasData = [
    { nombre: "Aritmética", categoria: categorias[0]._id },
    { nombre: "Álgebra", categoria: categorias[0]._id },
    { nombre: "Geometría", categoria: categorias[0]._id },

    { nombre: "Ortografía", categoria: categorias[1]._id },
    { nombre: "Redacción", categoria: categorias[1]._id },
    { nombre: "Comprensión Lectora", categoria: categorias[1]._id },

    { nombre: "Biología", categoria: categorias[2]._id },
    { nombre: "Física", categoria: categorias[2]._id },
    { nombre: "Química", categoria: categorias[2]._id }
  ];

  let subcategorias = await Subcategoria.find();
  if (subcategorias.length === 0) {
    subcategorias = await Subcategoria.insertMany(subcategoriasData);
    console.log("Subcategorías creadas");
  } else {
    console.log("Subcategorías ya existen, usando existentes");
  }

  const rangosData = [
    { edad_min: 6, edad_max: 8, etiqueta: "Niños pequeños" },
    { edad_min: 9, edad_max: 11, etiqueta: "Niños mayores" },
    { edad_min: 12, edad_max: 14, etiqueta: "Adolescentes" },
    { edad_min: 15, edad_max: 17, etiqueta: "Jóvenes" },
    { edad_min: 18, edad_max: 25, etiqueta: "Universitarios" }
  ];

  let rangos = await RangoEdad.find();
  if (rangos.length === 0) {
    rangos = await RangoEdad.insertMany(rangosData);
    console.log("Rangos de edad creados");
  } else {
    console.log("Rangos ya existen, usando existentes");
  }

  const dificultadesData = [
    { nombre: "Fácil" },
    { nombre: "Medio" },
    { nombre: "Difícil" }
  ];

  let dificultades = await Dificultad.find();
  if (dificultades.length === 0) {
    dificultades = await Dificultad.insertMany(dificultadesData);
    console.log(" Dificultades creadas");
  } else {
    console.log(" Dificultades ya existen, usando existentes");
  }

  const preguntasData = [
    {
      texto: "¿Cuánto es 8 + 5?",
      dificultad: dificultades[0]._id,
      rangoEdad: rangos[1]._id,
      categoria: categorias[0]._id,
      subcategoria: subcategorias[0]._id,
      estado: "publicada"
    },
    {
      texto: "Identifica el sujeto de la oración: 'El gato negro corría rápido'.",
      dificultad: dificultades[1]._id,
      rangoEdad: rangos[2]._id,
      categoria: categorias[1]._id,
      subcategoria: subcategorias[3]._id,
      estado: "publicada"
    },
    {
      texto: "¿Cuál es la función básica de la mitocondria?",
      dificultad: dificultades[2]._id,
      rangoEdad: rangos[4]._id,
      categoria: categorias[2]._id,
      subcategoria: subcategorias[6]._id,
      estado: "publicada"
    }
  ];

  const preguntas = await Pregunta.find();
  if (preguntas.length === 0) {
    await Pregunta.insertMany(preguntasData);
    console.log("Preguntas creadas");
  } else {
    console.log("Preguntas ya existen, usando existentes");
  }

  console.log(" SEED COMPLETO — TODO CARGADO CORRECTAMENTE");
}

module.exports = seedDatabase;
