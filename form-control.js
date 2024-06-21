export class FormControl {

    #_form;
    #_submitRules = [];

    /**@param { String } selector CSS Selector of FormElement */
    constructor( selector ) {
        
        /**@type { HTMLFormElement? } */
        const _FORM = document.querySelector( selector );
        this.#_form = _FORM;
    }

    /** @param { String } selector CSS Selector of Input | TextArea */
    selectInput( selector ) {
        
        const _INPUT = this.#_form.querySelector( selector );
        return new InputRule( _INPUT, this.#_submitRules );

    }

    /** @param { String } selector CSS Selector of HTMLElement */
    selectElement( selector ) {

        const _ELEMENT = this.#_form.querySelector( selector );
        return new ElementRule( _ELEMENT, this.#_submitRules );

    }

    /**
     * "preventDefault" is actived.
     * @param { ( form: HTMLFormElement, e: SubmitEvent ) => void } callback
     * It is executed as long as all submitRules return true
     */
    setSubmitCallback( callback ) {
        
        let isSatisfy = false;
        
        this.#_form.addEventListener( 'submit', e => {
            
            e.preventDefault();
            
            for ( const cb of this.#_submitRules ) {
                isSatisfy = cb() ?? false;

                if ( !isSatisfy ) {
                    return null;
                }
            }

            if ( callback ) {
                
                callback( this.#_form, e );

            }

        });

    }

}

class InputRule {

    #_input;
    #_submitRules;

    /**
     * @param { HTMLInputElement | HTMLTextAreaElement } input
     * @param { any[] } _submitRules
    */
    constructor( input, _submitRules ) {
        this.#_input = input;
        this.#_submitRules = _submitRules;
    }

    /**
     * "data" is the pressed key, if a "callback" returns false, so "data"
     * is not entering to input | textarea and the next callbacks are not executed
     * @param {...(data:String, e:InputEvent)=>Boolean?} callbacks
     * They are executed everytime "beforeinput" event is fire
    */
    setBeforeRules( ...callbacks ) {

        this.#_input.addEventListener( 'beforeinput', e => {
            
            let isSatisfy = true;

            for ( const cb of callbacks ) {
            
                isSatisfy = cb( e.data, e ) ?? true;

                if ( !isSatisfy ) {
                    e.preventDefault();
                    break;
                }
            }
            
        });
        
        return this;
    }

    /**
     * @param  { ...( input: HTMLInputElement | HTMLTextAreaElement, e: InputEvent ) => void } callbacks
     * They are executed everytime "input" event is fire
    */
    setAfterHandlers( ...callbacks ) {
        
        this.#_input.addEventListener( 'input', e => {

            for ( const cb of callbacks ) {
                cb( this.#_input, e );
            }
        })

        return this;
    }

    /**
     * @param { ...( element: HTMLInputElement | HTMLTextAreaElement ) => Boolean? } callbacks
     * They are executed when "submit" event is fire
    */
    setSubmitRules( ...callbacks ) {
        
        for ( const cb of callbacks ) {
            this.#_submitRules.push( cb.bind( null, this.#_input ) );
        }

        return this;
    }

    
    getElement() {
        return this.#_input;
    }

}


class ElementRule {

    #_element;
    #_submitRules;

    /**
     * @param { HTMLElement } element 
     * @param { any[] } _submitRules 
     */
    constructor( element, _submitRules ) {
        this.#_element = element;
        this.#_submitRules = _submitRules;
    }

    /**
     * @param { ...( element: HTMLElement ) => Boolean? } callbacks
     * They are executed when "submit" event is fire
    */
    setSubmitRules( ...callbacks ) {
        
        for ( const cb of callbacks ) {
            this.#_submitRules.push( cb.bind( null, this.#_element ) );
        }

        return this;
    }


    getElement() {
        return this.#_element;
    }

}