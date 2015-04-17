# producto - restangular library

Es un api que permite usar restangular models para producto.

> Revisar sistcoop/producto para mayor informacion.

### Url rest
Puede cambiar el url de los servicios restfull con 

````javascript
// Change url restful services
app.config(function(sgProductoProvider){
    sgProductoProvider.restUrl = 'https://someweb/rest';
});
````

### Factories
* SGProductoCuentaPersonal

| Method        URL                             | Descripcion                   |
| :---------------------------------------------|:------------------------------|
| SGProductoCuentaPersonal.$new(id)             | Crea objeto con id            |
| SGProductoCuentaPersonal.$build()             | Crea objeto vacio             |
| SGProductoCuentaPersonal.$save()              | Guarda o actualiza            |
| SGProductoCuentaPersonal.$find(id)            | Buscar uno segun id           |
| SGProductoCuentaPersonal.$search(params)      | Buscar segun parametros       |
| SGProductoCuentaPersonal.$count()             | Contar size()                 |
| SGProductoCuentaPersonal.$disable()           | Deshabilitar                  |

* SGProductoCredito

| Method        URL                             | Descripcion                   |
| :---------------------------------------------|:------------------------------|
| SGProductoCuentaPersonal.$new(id)             | Crea objeto con id            |
| SGProductoCuentaPersonal.$build()             | Crea objeto vacio             |
| SGProductoCuentaPersonal.$save()              | Guarda o actualiza            |
| SGProductoCuentaPersonal.$find(id)            | Buscar uno segun id           |
| SGProductoCuentaPersonal.$search(params)      | Buscar segun parametros       |
| SGProductoCuentaPersonal.$count()             | Contar size()                 |
| SGProductoCuentaPersonal.$disable()           | Deshabilitar                  |

Los objetos ProductoCuentaPersonal tienen la siguiente estructura:
	
```json
"productoCuentaPersonal": {
   "id": "Integer",
   "codigo": "String",
   "denominacion": "String",
   "tipoPersona": "String",
   "estado": "Boolean"
}

```

```json
"productoCredito": {
   "id": "Integer",
   "codigo": "String",
   "denominacion": "String",
   "tipoPersona": "String",
   "estado": "Boolean",
   "tasas": "Array[{id: Bigdecimal, valor: Bigdecimal, tasa: String}]",
   "montoMinimo": "Bigdecimal",
   "montoMaximo": "Bigdecimal"
}
```

### Version
1.0.0

### Tecnologías

Dependences:

* [JavaEE] - javaEE

Este proyecto es mantenido por SistCoop S.A.C.

License
----

MIT