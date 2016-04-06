// incomplete definitions for http://www.tinymce.com

interface TinyMCEObservable {
    off: (name?:string, callback?:Function) => Object
    on: (name:string, callback:Function) => Object
    fire: (name:string, args?:Object, bubble?:Boolean) => Event
}

/**
 * This class contains the core logic for a TinyMCE editor.
 */
interface TinyMCEEditor extends TinyMCEObservable {

    /**
     * URI object to current document that holds the TinyMCE editor instance.
     */
    baseURI: TinyMCEURI

    /**
     * Array with CSS files to load into the iframe.
     */
    contentCSS: string[]

    /**
     * Array of CSS styles to add to head of document when the editor loads.
     */
    contentStyles: string[]

    /**
     * Control manager instance for the editor. Will enables you to create new UI elements and change their states etc.
     */
    controlManager: TinyMCEControlManager

    /**
     * URI object to document configured for the TinyMCE instance.
     */
    documentBaseURI: TinyMCEURI
    destroy: (automatic:boolean) => void
    remove: () => void
    hide: () => void
    show: () => void
    getContent: (args?:Object) => string
    setContent: (content:string, args?:Object) => string
    focus: (skip_focus?:Boolean) => void
    undoManager: TinyMCEUndoManager
    settings: Object
}

interface TinyMCEUndoManager {
    undo: () => Object
    clear: () => void
    hasUndo: () => Boolean
}

interface TinyMceEvent {

}

/**
 * This class is responsible for managing UI control instances. It's both a factory and a collection for the controls.
 */
interface TinyMCEControlManager {

    /**
     * Constructs a new control manager instance. Consult the Wiki for more details on this class.
     * @param editor TinyMCE editor instance to add the control to.
     * @param settings Optional settings object for the control manager.
     */
    new (editor: TinyMCEEditor, settings?: any)

    /**
     * Adds a control to the control collection inside the manager.
     * @param control instance to add to collection.
     * @returns Control instance that got passed in.
     */
    add: (control: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a button control instance by id.
     * @param id Unique id for the new button instance. For example "bold".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a color split button control instance by id.
     * @param id Unique id for the new color split button instance. For example "forecolor".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createColorSplitButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a control by name, when a control is created it will automatically add it to the control collection. It first ask all plugins for the specified control if the plugins didn't return a control then the default behavior will be used.
     * @param name Control name to create for example "separator".
     * @returns Control instance that got created and added.
     */
    createControl: (name: string) => TinyMCEControl

    /**
     * Creates a drop menu control instance by id.
     * @param id Unique id for the new dropdown instance. For example "some menu".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createDropMenu: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a list box control instance by id. A list box is either a native select element or a DOM/JS based list box control. This depends on the use_native_selects settings state.
     * @param id Unique id for the new listbox instance. For example "styles".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createListBox: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a menu button control instance by id.
     * @param id Unique id for the new menu button instance. For example "menu1".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createMenuButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a separator control instance.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createSeparator: (control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a split button control instance by id.
     * @param id Unique id for the new split button instance. For example "spellchecker".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createSplitButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Creates a toolbar container control instance by id.
     * @param id Unique id for the new toolbar container control instance. For example "toolbar1".
     * @param settings Optional settings object for the control.
     * @param control Optional control class to use instead of the default one.
     * @returns Control instance that got created and added.
     */
    createToolbar: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    /**
     * Destroy.
     */
    destroy: () => void

    /**
     * Returns a control by id or undefined it it wasn't found.
     * @param id Control instance name.
     * @returns Control instance or undefined.
     */
    get: (id: string) => void

    /**
     * Sets the active state of a control by id.
     * @param id Control id to set state on.
     * @param state Active state true/false.
     * @returns Control instance that got activated or null if it wasn't found.
     */
    setActive: (id: string, state: boolean) => TinyMCEControl

    /**
     * Overrides a specific control type with a custom class.
     * @param name Name of the control to override for example button or dropmenu.
     * @param callback Class reference to use instead of the default one.
     * @returns Same as the class reference.
     */
    setControlType: (name: string, callback: Function) => Function

    /**
     * Sets the dsiabled state of a control by id.
     * @param id Control id to set state on.
     * @param state Active state true/false.
     * @returns Control instance that got disabled or null if it wasn't found.
     */
    setDisabled: (id: string, state: boolean) => TinyMCEControl
}

interface TinyMCEStatic extends TinyMCEObservable {
    init: (settings:Object) => void;
    execCommand: (c:string, u:Boolean, v:string) => Boolean;
    activeEditor: TinyMCEEditor;
    get: (id:String) => TinyMCEEditor;
    util: TinyMCEUtil
}


declare var tinymce: TinyMCEStatic;
