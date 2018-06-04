
/* SOLO PARA PROPOSITOS DE CREACION DE LA INTERFAZ */
const categoriesPublicationsAPI = {
    publications: [
        { id: 1, publications: [{id:1, title:"RetrospectiveIISoft",date:"2018-03-24",idCategory:1,whoPublishedIt:"Diego",text:"CHAMULLA ACA IVAN MANDAME EL STRING QUE QUIERAS"}] },
        { id: 2, publications: [{id:2, title:"BDDIISoft",date:"2018-02-04",idCategory:2,whoPublishedIt:"Pablo",text:"CHAMULLA ACA IVAN MANDAME EL STRING QUE QUIERAS"},
                                {id: 3, title:"TDDIISoft",date:"2018-06-04",idCategory:2,whoPublishedIt:"Diego",text:"CHAMULLA ACA IVAN MANDAME EL STRING QUE QUIERAS"}] 
        }
    ],
    all: function() { return this.publications},
    get: function(id) {
      const isCategory = p => p.id === id
      return this.publications.find(isCategory).publications
    }
  }
  
  export default categoriesPublicationsAPI

