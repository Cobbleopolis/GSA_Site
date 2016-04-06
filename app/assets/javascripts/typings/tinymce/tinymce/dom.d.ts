/**
 * Utility class for various DOM manipulation and retrival functions.
 */
interface TinyMCEDOMUtils {

    /**
     * Constructs a new DOMUtils instance. Consult the Wiki for more details on settings etc for this class.
     * @param doc Document reference to bind the utility class to.
     * @param settings Optional settings collection.
     */
    new (doc: Document, settings?: any)

    /**
     * Adds the specified element to another element or elements.
     * @param mount id string, DOM node element or array of id's or elements to add to.
     * @param name Name of new element to add or existing element to add.
     * @param arguments Optional object collection with arguments to add to the new element(s).
     * @param innerHTML Optional inner HTML contents to add for each element.
     * @param operation Optional internal state to indicate if it should create or add.
     * @returns Element that got created or array with elements if multiple elements where passed.
     */
    add: (mount: string | Element | any[], name: any, arguments?: Object, innerHTML?: string, operation?: boolean) => Element | Element[]

    /**
     * Adds a class to the specified element or elements.
     * @param element ID string or DOM element or array with elements or IDs.
     * @param className Class name to add to each element.
     * @returns String with new class value or array with new class values for all elements.
     */
    addClass: (element: string | Element | any[], className: string) => string | string[]

    /**
     * Adds a style element at the top of the document with the specified cssText content.
     * @param cssText CSS Text style to add to top of head of document.
     */
    addStyle: (cssText: string) => void

    /**
     * Adds an event handler to the specified object.
     * @param object Object or element id string to add event handler to or an array of elements/ids/documents
     * @param name Name of event handler to add for example: click.
     * @param callback Function to execute when the event occurs.
     * @param scope Optional scope to execute the function in.
     * @returns Function callback handler the same as the one passed in.
     */
    bind: (object: Element | Document | Window | any[] | String, name: string, callback: Function, scope: Object) => Function

    /**
     * Creates a new element.
     * @param name Name of new element.
     * @param attributes Optional object name/value collection with element attributes.
     * @param innerHTML Optional HTML string to set as inner HTML of the element.
     * @returns HTML DOM node element that got created.
     */
    create: (name: string, attributes?: Object, innerHTML?: string) => Element

    /**
     * Create HTML string for element. The element will be closed unless an empty inner HTML string is passed.
     * @param name Name of new element.
     * @param attributes Optional object name/value collection with element attributes.
     * @param innerHTML Optional HTML string to set as inner HTML of the element.
     * @returns String with new HTML element like for example: <a href="#">test</a>.
     */
    createHTML: (name: string, attributes?: Object, innerHTML?: string) => string

    /**
     * Created a new DOM Range object. This will use the native DOM Range API if it's available if it's not it will fallback to the custom TinyMCE implementation.
     * @returns DOM Range object.
     */
    createRng: () => Range

    /**
     * Entity decode a string, resolves any HTML entities like å.
     * @param string String to decode entities on.
     * @returns Entity decoded string.
     */
    decode: (string: string) => string

    /**
     * Destroys all internal references to the DOM to solve IE leak issues.
     */
    destroy: () => void

    /**
     * Entity encodes a string, encodes the most common entities <>"& into entities.
     * @param text String to encode with entities.
     * @returns Entity encoded string.
     */
    encode: (text: string) => string

    /**
     * Find the common ancestor of two elements. This is a shorter method than using the DOM Range logic.
     * @param a Element to find common ancestor of.
     * @param b Element to find common ancestor of.
     * @returns Common ancestor element of the two input elements.
     */
    findCommonAncestor: (a: Element, b: Element) => Element

    /**
     * Fires the specified event name with object on target.
     * @param target Target element or object to fire event on.
     * @param name Name of the event to fire.
     * @param evt Event object to send.
     * @returns Event object.
     */
    fire: (target: Node | Document | Window, name: string, evt: Object) => Event

    /**
     * Returns the specified element by ID or the input element if it isn't a string.
     * @param n Element id to look for or element to just pass though.
     * @returns Element matching the specified id or null if it wasn't found.
     */
    get: (n: string | Element) => Element

    /**
     * Returns the specified attribute by name.
     * @param e Element string id or DOM element to get attribute from.
     * @param name Name of attribute to get.
     * @param dv Optional default value to return if the attribute didn't exist.
     * @returns Attribute value string, default value or null if the attribute wasn't found.
     */
    getAttrib: (e: string | Element, name: string, dv?: string) => string

    /**
     * Returns an NodeList with attributes for the element.
     * @param node Element node or string id to get attributes from.
     * @returns NodeList with attributes.
     */
    getAttribs: (node: HTMLElement | string) => NodeList

    /**
     * Returns a array of all single CSS classes in the document. A single CSS class is a simple rule like ".class" complex ones like "div td.class" will not be added to output.
     * @returns Array with class objects each object has a class field might be other fields in the future.
     */
    getClasses: () => any[]

    /**
     * Returns the next node that matches selector or function.
     * @param node Node to find siblings from.
     * @param selector Selector CSS expression or function.
     * @returns Next node item matching the selector or null if it wasn't found.
     */
    getNext: (node: Node, selector: string | Node) => Node

    /**
     * Returns the outer HTML of an element.
     * @param elm Element ID or element object to get outer HTML from.
     * @returns Outer HTML string.
     */
    getOuterHTML: (elm: string | Element) => String

    /**
     * Returns a node by the specified selector function. This function will loop through all parent nodes and call the specified function for each node. If the function then returns true indicating that it has found what it was looking for, the loop execution will then end and the node it found will be returned.
     * @param node DOM node to search parents on or ID string.
     * @param func Selection function to execute on each node or CSS pattern.
     * @param root Optional root element, never go below this point.
     * @returns Array of nodes or null if it wasn't found.
     */
    getParents: (node: Node | String, func: Function, root?: Node) => Node[]

    /**
     * Returns the absolute x, y position of a node. The position will be returned in a object with x, y fields.
     * @param n HTML element or element id to get x, y position from.
     * @param root Optional root element to stop calculations at.
     * @returns Absolute position of the specified element object with x, y fields.
     */
    getPos: (n: Element | string, root?: Element) => Object

    /**
     * Returns the previous node that matches selector or function
     * @param node Node to find siblings from.
     * @param selector Selector CSS expression or function.
     * @returns Previous node item matching the selector or null if it wasn't found.
     */
    getPrev: (node: Node, selector: string | Function) => Node
}

declare module TinyMCEDom {
    var DOMUtils: TinyMCEDOMUtils
}
