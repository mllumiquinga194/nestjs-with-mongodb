import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    tlf: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    sobre_mi: {
        type: String,
        default: "Sobre Mi"
    },
    state: {
        type: String,
        default: "Bolivar"
    },
    ciudad: {
        type: String,
        default: "San Félix"
    },
    google: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.methods.toJSON = function (){
    let user = this; // user es igual a lo que sea que tenga en ese momento
    let userObject = user.toObject();//tomo el objeto de ese usuario. de esta manera ya tengo todas las propiedades y metodos
    delete userObject.password;// borro la password. OJO, esto es para imprimir pero en la base de datos si esta

    return userObject;
}