package reference

import anorm.SqlParser._
import anorm._
import models.HomeSection

object DBReference {

    val getTopSection = SQL("select * from homePage where section=1")
    val getContentSection = SQL("select * from homePage where section!=1 order by section asc;")
    val getSectionParser = for {
        header <- str("header")
        content <- str("content")
        section <- int("section")
        color <- str("color")
    } yield new HomeSection(header, content, section, color)
    
}
