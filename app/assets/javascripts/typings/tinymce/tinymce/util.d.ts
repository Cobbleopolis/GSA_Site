/**
 * This class handles parsing, modification and serialization of URI/URL strings.
 */
interface TinyMCEURI {

    /**
     * Constructs a new URI instance.
     * @param uri URI string to parse.
     * @param settings Optional settings object.
     */
    new (uri: string, settings?: any)

    /**
     * Returns the full URI of the internal structure.
     * @param noHost Optional no host and protocol part. Defaults to false.
     */
    getURI: (noHost?: boolean) => void

    /**
     * Sets the internal path part of the URI.
     * @param path Path string to set.
     */
    setPath: (path: string) => void

    /**
     * Converts the specified URI into a absolute URI based on the current URI instance location.
     * @param uri URI to convert into a relative path/URI.
     * @param noHost No host and protocol prefix.
     * @returns Absolute URI from the point specified in the current URI instance.
     */
    toAbsolute: (uri: string, noHost: boolean) => string

    /**
     * Converts a relative path into a absolute path.
     * @param base Base point to convert the path from.
     * @param path Relative path to convert into an absolute path.
     */
    toAbsPath: (base: string, path: string) => void

    /**
     * Converts the specified URI into a relative URI based on the current URI instance location.
     * @param uri URI to convert into a relative path/URI.
     * @returns Relative URI from the point specified in the current URI instance.
     */
    toRelative: (uri: string) => string

    /**
     * Converts a absolute path into a relative path.
     * @param base Base point to convert the path from.
     * @param path Absolute path to convert into a relative path.
     */
    toRelPath: (base: string, path: string) => void

}

interface TinyMCEUtil {
    URI: TinyMCEURI;
}