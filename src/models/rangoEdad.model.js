const mongoose = require('mongoose');
const RangoEdadSchema = new mongoose.Schema({
    edad_min: {
        type: Number,
        required: true
    },
    edad_max: {
        type: Number,
        required: true
    },
    etiqueta: {
        type: String,
        required: true,
        trim: true
    }
},{collection: 'rangos_edad'

});
module.exports = mongoose.model('RangoEdad', RangoEdadSchema);