/**
 * This class is the base class for all controls like buttons, toolbars, containers. This class should not be instantiated directly other controls should inherit from this one.
 */
interface TinyMCEControl {

    /**
     * Constructs a new control instance.
     * @param id Control id.
     * @param settings Optional name/value settings object.
     */
    new (id: String, settings?: any);

    /**
     * Destroys the control will free any memory by removing event listeners etc.
     */
    destroy: () => void;

    /**
     * Returns true/false if the control is disabled or not. This is a method since you can then choose to check some class or some internal bool state in subclasses.
     * @returns true/false if the control is disabled or not.
     */
    isActive: () => boolean;

    /**
     * Returns true/false if the control is disabled or not. This is a method since you can then choose to check some class or some internal bool state in subclasses.
     * @returns true/false if the control is disabled or not.
     */
    isDisabled: () => boolean;

    /**
     * Returns true/false if the control has been rendered or not.
     * @returns State if the control has been rendered or not.
     */
    isRendered: () => boolean;

    /**
     * Post render event. This will be executed after the control has been rendered and can be used to set states, add events to the control etc. It's recommended for subclasses of the control to call this method by using this.parent().
     */
    postRender: () => void;

    /**
     * Removes the control. This means it will be removed from the DOM and any events tied to it will also be removed.
     */
    remove: () => void;

    /**
     * Renders the control as a HTML string. This method is much faster than using the DOM and when creating a whole toolbar with buttons it does make a lot of difference.
     * @returns HTML for the button control element.
     */
    renderHTML: () => string;

    /**
     * Renders the control to the specified container element.
     * @param mount HTML DOM element to add control to.
     */
    renderTo: (mount: Element) => void;

    /**
     * Sets the activated state for the control. This will add CSS classes to the element that contains the control. So that it can be activated visually.
     * @param isActive Boolean state if the control should be activated or not.
     */
    setActive: (isActive: boolean) => void;

    /**
     * Sets the disabled state for the control. This will add CSS classes to the element that contains the control. So that it can be disabled visually.
     * @param isDisabled Boolean state if the control should be disabled or not.
     */
    setDisabled: (isDisabled: boolean) => void;

    /**
     * Sets the specified class state for the control.
     * @param className Class name to add/remove depending on state.
     * @param state True/false state if the class should be removed or added.
     */
    setState: (className: string, state: boolean) => void
}

declare module TinyMCEUI {
    var control: TinyMCEControl;
}
