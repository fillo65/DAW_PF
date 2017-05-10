var pages = {
  index:{
    name: "Panel de Gestión",
    description: "Página principal",
    path: "/"
  },
  users:{
    names:{
      main:"Usuarios",
      new:"Editar Usuario",
      edit:"Añadir Usuario"
    },
    description: "Lista de Usuarios",
    path: "/users"
  },
  classrooms:{
    names:{
      main:"Aulas",
      new:"Editar Aula",
      edit:"Añadir Aula"
    },
    description: "Lista de Aulas",
    path: "/classrooms"
  },
  conferences:{
    names:{
      main:"Videoconferencias",
      new:"Editar Videoconferencia",
      edit:"Añadir Videoconferencia"
    },
    description: "Lista de Videoconferencias",
    path: "/classrooms/conferences"
  },
  logs:{
    names:{
      main:"Registro",
      new:"Editar Registro",
      edit:"Añadir Registro"
    },
    description: "Lista de Registros",
    path: "/logs"
  }
}
module.exports = pages;
