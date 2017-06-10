# [Graphql](http://graphql.org)

[Graphql](http://graphql.org) es un lenguaje de consulta para nuestra API y un runtime del lado del servidor que sirve para ejecutar consultas usando un sistema de tipos que nosotros definimos para nuestros datos.

En otras palabras desde nuestro cliente definimos mediante este lenguaje los datos que queremos obtener y gracias al runtime del lado del servidor podemos procesar esa consulta, buscar los datos necesarios, construir la respuesta y devolverla de la forma que el cliente está esperando.

Esto significa que [Graphql](http://graphql.org) vendría a ser un reemplazo de nuestra API REST, por lo que antes de seguir repasemos un poco que beneficios nos daban este tipo de APIS y por qué quisiéramos reemplazarlas.

### Limitaciones de una API REST

Utilizar REST no solo nos resuelve la capa física, al estar montado sobre el protocolo HTTP, sino que nos ofrece una serie de reglas las cuales estandarizan la forma en el cual los datos deben ser consultados y devueltos.

__Pero aunque nos trajo soluciones también nos trajo algunos problemas:__

#### Cantidad de peticiones

Uno de los problemas que surge a la hora de trabajar con este tipo de APIS son la cantidad de peticiones que debemos realizar para obtener algo y esto esta intrínsicamete relacionado con los __Recursos Web__ o __Web Resources__.

##### Orientado a Recursos Web (Web Resources)

*(El aspecto positivo terminó en muchos casos siendo algo negativo)*

Que una URL determinada (endpoint) represente un recurso y que acceder al mismo, modificarlo, editarlo o eliminarlo esté dictado por los verbos HTTP nos ofrece previsibilidad y una forma estándar de realizar las operaciones. El problema radica que al separar todas nuestras entidades en distintos endpoints nos obliga a separar la lógica de acceso a los datos y para lo que antes sólo necesitábamos una petición ahora son varias.

__Es así que por ejemplo podríamos necesitar realizar 4 peticiones sólo para mostrar la home de nuestro sitio:__

* Obtener los post https://domain.com/api/v1/posts
* Obtener las noticias https://domain.com/api/v1/news
* Obtener los últimos comentarios https://domain.com/api/v1/comments
* Obtener los últimos tweets https://domain.com/api/v1/social/twitter/last

Esto podría ser resuelto creando un nuevo endpoint, __por ejemplo: https://domain.com/api/v1/site/startup__ Pero no sólo nos estaríamos desviando un poco del protocolo, ya que /site/startup no representa un "Web Resource", sino que sólo resolvió el problema para esta única query y en caso de necesitar exactamente esa petición pero ahora sin los comentarios tendríamos que nuevamente crear un nuevo endpoint.

### Respuestas muy grandes

Otro gran problema que enfrentan las API REST y es el excesivo payload enviado en cada una de nuestras respuestas, algunas veces requerido pero otras completamente innecesario.

Para visualizar este problema imaginemos que la respuesta de usuarios de nuestra API es la siguiente:

```json
{
  id: 1,
  name: "Pablo",
  lastname: "Gambetta",
  fullname: "Pablo Gambetta",
	email: "gambeita@gmail.com",
  type: "admin",
  lastLogin: "2017-06-16 17:07:04",
  movies: [{
    id: 1,
    title: "Back to the future I"
  }, {
    id:2,
    title: "2001, Space Odyssey"
  }],
  books: [{
    id: 1,
    title:"Fundation and Earth"
    author: {
      id: 1,
      name: "Issac",
      lastname: "Assimov",
      fullname: "Issac Assimov"
    }
  }]
}
```

En nuestro perfil esta respuesta es perfecta ya que necesitábamos todos esos datos, pero en nuestra home, solo necesitabamos el nombre, el apelido y el tipo.

Al igual que el ejemplo anterior, podriamos separar la query en varias:

* __/users/1__ Obtener los datos del usuario
* __/users/1/books__ Obtener sus libros
* __/users/1/movies__ Obtener sus peliculas
* __/books/1/author__ Obtener los datos del autor del libre

Resolvimos el problema del payload pero ahora necesitamos 4 peticiones para mostrar nuestro perfil.

### Lenguaje de consultas

Gracias al lenguaje de consutlas de [Graphql](http://graphql.org) podemos no solo pedir que entidades necesitamos sino también qué atributos de cada una de ellas, y todo en un mismo endpoint.

Por ejemplo para pedir solo el nombre, apellido y tipo de nuestros usuarios, podríamos hacer:

__/graphql__ 
```
{
  users {
    name
    lastname
    type
  }
}
```