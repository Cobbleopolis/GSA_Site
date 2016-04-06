package reference

import anorm.SqlParser._
import anorm._
import models.admin.HomeSectionEdit
import models.{User, HomeSection}
import play.api.libs.json.{JsString, JsNumber, JsObject}

object DBReference {

    val getTopSection = SQL("select * from homePage where section=1")
    val getContentSection = SQL("select * from homePage where section!=1 order by section asc;")
    val getSectionParser = for {
        header <- str("header")
        content <- str("content")
        section <- int("section")
        color <- str("color")
    } yield new HomeSection(header, content, section, color)

    val getUser = SQL("select * from users where username={username}")
    val getUserParser = for {
        username <- str("username")
        email <- str("email")
        password <- str("password")
    } yield new User(username, email, password)

    val getHomeSelectors = SQL("select distinct section from homePage order by section asc;")
    val getHomeSelectorsParser = for {
        section <- int("section")
    } yield section

    val getHomeSections = SQL("select * from homePage where section={section}")
    val getHomeSectionSelectionParser = for {
        id <- int("id")
        header <- str("header")
    } yield new JsObject(Seq(
        "id" -> JsNumber(id),
        "header" -> JsString(header)
        ))
    val getHomeSectionParser = for {
        id <- int("id")
        header <- str("header")
        content <- str("content")
        section <- int("section")
        color <- str("color")
    } yield new HomeSectionEdit(id, header, content, section, color)

    val getHomeSection = SQL("select * from homePage where id={id}")

    val putHomeSection = SQL("insert into homePage (header, content, section, color) values ({header}, {content}, {section}, {color})")

    val patchHomeSection = SQL("update homePage set header = {header}, content = {content}, color = {color} where id = {id}")

}
