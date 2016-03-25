package util

import models.HomeSection
import play.api.db.DB
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
    
}
