export class FormControl {

    /**@type { HTMLFormElement } */
    #_form;
    
    /**
     * @type { ( ( ) => Boolean )[][] }
     * Array of PageForm ( each page is an array of submit rules )
     */
    submitRules = [];

    /**
     * @param { String } selector
     * CSS selector of a FormElement
     * @param { HTMLElement | Document | ShadowRoot } context
     * by default is `document`
     */
    constructor( selector, context = document ) {

        this.#_form = context.querySelector( selector );

    }


    /**Creates a new PageForm */
    createPage( ) {

        return new PageForm( this.#_form , this.submitRules );

    }

    /**
     * Sets the submit `callback`, executed after all submitRules return `true`.
     * 
     * `preventDefault` is applied even if the callback is null.]
     * 
     * @param { null | ( form: HTMLFormElement, e: SubmitEvent ) => void } callback
     */
    setSubmitCallback( callback ) {
        
        this.#_form.addEventListener( 'submit', event => {
            
            event.preventDefault();

            const isSatisfy = this.submitRules.every( rules => rules.every( cb => cb() ) );

            if ( isSatisfy && callback ) {

                callback( this.#_form, event );

            }

        });

    }


    getElement() {

        return this.#_form;

    }

}

class PageForm {

    /**@type {HTMLFormElement} */
    #_form;
    
    #_submitRules = [ ];

    constructor( _form , _submiteRules ) {
        this.#_form = _form;
        _submiteRules.push( this.#_submitRules );
    }

    /**
     * @param { String } selector
     * CSS selector of a Field Form
     */
    appendInput( selector ) {
        
        const _input = this.#_form.querySelector( selector );
        return new InputRule( _input , this.#_submitRules );

    }

}

class InputRule {

    /**@type { HTMLElement } */
    #_input;

    #_submitRules;

    constructor( input, _submitRules ) {

        this.#_input = input;
        this.#_submitRules = _submitRules;

    }

    /**
     * Adds rules to be executed on the `beforeinput` event.
     * @param { ...( data: String, e: InputEvent ) => Boolean? } callbacks
    */
    setBeforeinputRules( ...callbacks ) {

        this.#_input.addEventListener( 'beforeinput', e => {

            const isSatisfy = callbacks.every( cb => cb( e.data , e ) );
    
            if ( !isSatisfy ) {

                e.preventDefault();

            }

        });
        
        return this;
    }

    /**
     * Adds handlers for the `input` event.
     * @param  { ...( input: FieldElement , e: InputEvent ) => void } callbacks
     */
    setInputHandlers( ...callbacks ) {
        
        this.#_input.addEventListener( 'input', e => {

            callbacks.forEach( cb => cb( this.#_input , e ) );

        })

        return this;
    }

    /**
     * Adds handlers for the `change` event.
     * @param  { ...( input: FieldElement , e: InputEvent ) => void } callbacks
     */
    setChangeHandlers( ...callbacks ) {

        this.#_input.addEventListener( 'change', e => {

            callbacks.forEach( cb => cb( this.#_input , e ) );

        });

        return this;
    }

    /**
     * Adds submit validation rules.
     * @param { ...(input: FieldElement , event: SubmitEvent ) => Boolean? } callbacks
     */
    setSubmitRules( ...callbacks ) {
        
        for ( const cb of callbacks ) {

            this.#_submitRules.push( cb.bind( null , this.#_input ) );

        }

        return this;
    }

    
    getElement() {

        return this.#_input;

    }

}


/**
 * @typedef { HTMLElement | HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement } FieldElement
 * HTMLElement | HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
 */