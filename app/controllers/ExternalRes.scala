package controllers


import play.api._
import play.api.mvc._
import play.api.libs._
import play.api.libs.iteratee._

import Play.current

import java.io._

object ExternalRes extends Controller {

    val AbsolutePath = """^(/|[a-zA-Z]:\\).*""".r

    /**
     * Generates an `Action` that serves a static resource from an external folder
     *
     * @param rootPath the root folder for searching the static resource files such as `"/home/peter/public"`, `C:\external` or `relativeToYourApp`
     * @param file the file part extracted from the URL
     */
    def at(rootPath: String, file: String): Action[AnyContent] = Action { request =>
        println(file)
        Play.mode match {
            case Mode.Prod => NotFound
            case _ => {

                val fileToServe = rootPath match {
                    case AbsolutePath(_) => new File(rootPath, file)
                    case _ => new File(Play.application.getFile(rootPath), file)
                }

                if (fileToServe.exists) {
                    Ok.sendFile(fileToServe, inline = true).withHeaders(CACHE_CONTROL -> "max-age=3600")
                } else {
                    NotFound
                }

            }
        }
    }

}
