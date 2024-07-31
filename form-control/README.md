# new FormControl()
Una clase que permite de manera sencilla controlar
un formmulario (⚠ no está hecho para crear un formulario).

Cada una de los métodos de esta clase están documentadas
en el código gracias a JSDocs, sólo pon el mouse encima
de los métodos y aparecerá un bonito tooltip explicativo.

`main.js`
```javascript
import { FormControl } from "./form-control.js";

const formControl = new FormControl('#my-form');

formControl.selectInput( '[name="nombre"]' )
    .setBeforeRules(
        // Este input sólo aceptará letras y vocales tildadas
        // (mayúsculas o minúsculas)
        ( d ) => /[a-z]|null|[áéíóúñü ]/i.test( d )
    )
;

formControl.selectInput( '[name="dni"]' )
    .setBeforeRules(
        // Este input sólo aceptará números
        ( d ) => /[0-9]|null/.test( d )
    )
    .setAfterHandlers(
        // Si hay más de 8 caracteres, entonces
        // será recortado hasta su octavo caracter
        ( input ) => input.value.length > 8 &&
        ( input.value = input.value.slice( 0, 8 ) )
    )
    .setSubmitRules(
        // Si hay 8 caracteres en el input entonces
        // se ejecutará el callback pasado a
        // formControl.setSubmitEventCallback( cb );
        ( input ) => input.value.length === 8
    )
;

formControl.setSubmitEventCallback( ( form ) => {
    const formData = new FormData( form );
    const data = Object.fromEntries( formData.entries() );
    console.log( data );
});
```

`index.html`
```html
<form id="my-form" autocomplete="off">
    <label>
        Nombre:
        <input name="nombre" type="text">
    </label>
    <label>
        DNI:
        <input name="dni" type="text">
    </label>
    <button class="submit-button">
        Enviar
    </button>
</form>
```