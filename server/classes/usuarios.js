// {
//     id:,
//     nombre:
//     sala:
// }

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {

        let persona = this.personas.filter(per => {
            return per.id === id;
        })[0]; //filter coge un array con lo que coincida ahí dentro. Y cogemos el elemento 0

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(per => {
            return per.id != id;
        }); //Selecciono las que no tienen el id y reemplazo el array

        return personaBorrada;
    }


}

module.exports = {
    Usuarios
};