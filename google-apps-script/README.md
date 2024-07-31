# Tipado de event http de google apps script

He utilizado JSDocs + MarkDown para tipar el evento http que es 
recibido por las funciones: **doPost( event )** y **doGet( event )**

Sólo copia y pega el JSDoc que está en el archivo `doPost-doGet.type.js`. (Te aconsejo ponerlo en un archivo aparte)

A mí me gusta tipar usando la regla **@type**

```javascript
/**@type { (event: eventHTTP) } */
function doPost( e ) {
	e. // tendremos autocompletado
}
```
(pero también puedes usar la regla **@param**)

Este evento tiene dos propiedades: parameter y parameters;
si revisas el JSDocs en `doPost-doGet.type.js`,
te darás cuenta que coloque como tipo: Parameter y Parameters,
respectivamente, los cuales te aconsejo definir usando 
la regla **@typedef** para que tengas autocompletado en caso
hagas uso de los query sting de la URL 👍.

Por ejemplo: `https://script.google.com/.../exec?u=alice&u=3&u=7`
lo he tipado de la siguiente manera:

```js
/**@type { (event: eventHTTP) } */
function doGet( e ) {
    console.log( e.parameter ); // { u: "alice"}
    // es un objeto con la propiedad u cuyo valor
    // es el primero que se declaró en la queryString

    console.log( e.parameters ); // { u: [ "alice", "3", "7" ]}
    // es un objeto con la propiedad u cuyo valor
    // es un array que contiene todos los valores
    // declarados en la queryString
}

/**
 * @typedef { Object } Parameter
 * @property { String } u
 * 
 */


/**
 * @typedef { Object } Parameters
 * @property { String[] } u
 * 
 * Contiene un array de Strings:
 * ```text
 * [ usuario, goles_local, goles_visitante ]
 * - - - - - - - - - -
 * ```
 * 
 * **Ejemplo:**
 * ```javascript
 * [ "dhardysd", "4", "9" ]
 * ```
 */
```
(Te aconsejo también lo pongas en un archivo aparte)