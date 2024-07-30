# createState( )
Función que devuelve un objeto basado en el **Patrón Observador**.
El objeto devuelto tiene 2 propiedades: **effect** y **value**

`main.js`
```javascript
import { createState } from "./create-state.js";

const count = createState( 0 );
const eResult = document.querySelector(".result");
const eIncrement = document.querySelector(".increment");
const eDecrement = document.querySelector(".decrement");

// A effect se le pasa un callback que recibirá dos valores.
// Los callbacks se ejecutarán en el orden que los pasaste
// a effect.
count.effect( (newValue) => {
  eResult.textContent = newValue;
});
// Si un callback retorna un falsy, los demás callbacks en
// la cola no se ejecutarán.
count.effect( (newValue) => {
  eResult.classList.toggle("red", newValue < 0);
  eResult.classList.toggle("green", 0 < newValue);
});

// Cada vez que se le haga una asignación a
// la propiedad 'value' se ejecutarán los callbacks
// (asignación: establecer un valor usando 'el operador igual =')
eIncrement.onclick = () => count.value++;
// count.value++ es equivalente a:
// count.value = count.value + 1
eDecrement.onclick = () => count.value--;
// count.value-- es equivalente a:
// count.value = count.value - 1
```

`inde.html`
```html
<p>
    Contador:
    <span class="result">0</span>
</p>
<div>
    <button class="increment">+</button>
    <button class="decrement">-</button>
</div>

<style>
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>
```