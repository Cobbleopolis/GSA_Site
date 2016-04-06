package util

import models.admin.HomeSectionEdit
import models.{User, HomeSection}
import play.api.db.DB
import play.api.libs.json.{JsString, JsNumber, JsArray, JsObject}
import reference.DBReference
import play.api.Play.current

import scala.collection.mutable.ArrayBuffer

object DBUtil {

    def getHomeSections: (HomeSection, Seq[Seq[HomeSection]]) = {
        DB.withConnection("gsa_site")( implicit conn => {
            val topSection: HomeSection = DBReference.getTopSection.as(DBReference.getSectionParser.singleOpt).orNull
            val rawContent: Seq[HomeSection] = DBReference.getContentSection.as(DBReference.getSectionParser.*)
            val contentBuffer: ArrayBuffer[Seq[HomeSection]] = new ArrayBuffer[Seq[HomeSection]]
//            val largestSection = rawContent.last.section
            for (i <- 0 until rawContent.last.section) {
                contentBuffer += rawContent.filter(homeSection => homeSection.section == i)
            }
            (topSection, contentBuffer.toSeq)
        })
    }

    def getHomeContentSections: Seq[HomeSection] = {
        DB.withConnection("gsa_site")(implicit conn => {
            DBReference.getContentSection.as(DBReference.getSectionParser.*)
        })
    }

    def getUserFromUsername(username: String): User = {
        DB.withConnection("admin_gsa_site")(implicit conn => {
            DBReference.getUser.on("username" -> username).as(DBReference.getUserParser.singleOpt)
        }.orNull)
    }

    def getHomeEditSelectors: JsObject = {
        var rows = new JsArray
        var sections = new JsArray
        DB.withConnection("gsa_site")(implicit conn => {
            val dbRows: List[Int] = DBReference.getHomeSelectors.as(DBReference.getHomeSelectorsParser.*)
            dbRows.foreach(i => {
                rows :+= new JsNumber(i)
                sections :+= new JsArray(DBReference.getHomeSections.on("section" -> i).as(DBReference.getHomeSectionSelectionParser.*))
            })
            new JsObject(Seq(
                "rows" -> rows,
                "sections" -> sections
            ))
        })
    }

    def getHomeSection(id: Int): HomeSectionEdit = {
        DB.withConnection("gsa_site")(implicit conn => {
            DBReference.getHomeSection.on("id" -> id).as(DBReference.getHomeSectionParser.single)
        })
    }

    def putHomeSection(homeSection: HomeSection): Unit = {
        DB.withConnection("gsa_site")(implicit conn => {
            DBReference.putHomeSection.on(
                "header" -> homeSection.header,
                "content" -> homeSection.content,
                "section" -> homeSection.section,
                "color" -> homeSection.color
            ).executeInsert()
        })
    }

    def patchHomeSection(homeSection: HomeSectionEdit): Unit = {
        DB.withConnection("gsa_site")(implicit conn => {
            DBReference.patchHomeSection.on(
                "header" -> homeSection.header,
                "content" -> homeSection.content,
                "color" -> homeSection.color,
                "id" -> homeSection.id
            ).executeUpdate()
        })
    }
    
}
