/**
 * @typedef { Object } eventHTTP


 * @property { Number } eventHTTP.contentLength
 * La longitud del cuerpo de la solicitud para las solicitudes POST o -1 para las solicitudes GET
 * 
 * [Más información acerca doPost y doGet](https://developers.google.com/apps-script/guides/web?hl=es-419#requirements_for_web_apps)


 * @property { String } eventHTTP.queryString
 * La **query** de la URL, o null si no se especifica una cadena de consulta.
 * 
 * *Ejemplo:*
 * `https://script.google.com/.../exec?nombre=Alice&edad=29&edad=30`
 * ```javscript
 * "nombre=Alice&edad=29&edad=30"
 * ```


 * @property { Parameter } eventHTTP.parameter
 * Un objeto de pares clave-valor que corresponde a los **query params** de la URL. Solo se muestra el primer valor para los parámetros que tienen varios valores.
 * 
 * *Ejemplo*:
 * `https://script.google.com/.../exec?nombre=Alice&edad=29&edad=30`
 * ```javascript
 * {
 *   "nombre": "Alice",
 *   "edad": "29"
 * };
 * ```


 * @property { Parameters } eventHTTP.parameters
 * Un objeto similar a **parameter**, pero con un array de valores para cada clave.
 * 
 * *Ejemplo*:
 * `https://script.google.com/.../exec?nombre=Alice&edad=29&edad=30`
 * ```javascript
 * {
 *   "nombre": ["Alice"],
 *   "edad": ["29", "30"]
 * };
 * ```
 

 * @property { String } eventHTTP.pathInfo
 * La ruta de URL después de **\/exec** o **\/dev**. Por ejemplo, si la ruta de URL termina en **\/exec/hello**, la información de la ruta es **hello**
 * 
 * *Ejemplo*:
 * `https://script.google.com/.../exec/hello`
 * ```javascript
 * "hello"
 * ```



 * @property { Object } eventHTTP.postData
 * Contiene data relevante.
 

 * @property { String } eventHTTP.postData.type
 * El tipo de MIME del **body** de la petición **POST**
 * 
 * *Ejemplo*
 * ```text
 * "application/json"
 * "application/x-www-form-urlencoded"
 * "text/csv"
 * "text/html"
 * ```
 

 * @property { String } eventHTTP.postData.contents
 * El texto contenido en el **body** de la petición **POST**.
 * 
 * *Ejemplo*
 * ```text
 * {
 *   "usuario": "Alice"
 *   "password": "123456"
 * }
 * - - - - - - - - - - - -
 * ```
 * ```javascript
 * const bodyJson = JSON.parse( e.postData.contents );
 * console.log( bodyJson.usuario );
 * // output: Alice
 * ```
 */