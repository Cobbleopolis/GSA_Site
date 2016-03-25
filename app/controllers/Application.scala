package controllers

import play.api.mvc._
import util.DBUtil

import scala.reflect.io.{Directory, File}

object Application extends Controller {

    def index = Action {
        val sections = DBUtil.getHomeSections
        val slideshow = (for (file <- Directory("static/images/slideshow").files) yield file.name).toSeq
        Ok(views.html.index(sections._1, sections._2)(slideshow))
    }

//    def flags = Action {
//
//    }
}