package controllers.admin

import auth.Secured
import models.HomeSection
import models.admin.HomeSectionEdit
import play.api.libs.functional.syntax._
import play.api.mvc.Controller
import util.DBUtil
import play.api.libs.json.{JsError, JsObject, JsString, _}

object Edit extends Controller with Secured {

    implicit val rds = (
        (__ \ 'header).read[String] and
            (__ \ 'content).read[String] and
            (__ \ 'color).read[String]
        ) tupled

    implicit val rdsNew = (
        (__ \ 'header).read[String] and
            (__ \ 'content).read[String] and
            (__ \ 'section).read[String] and
            (__ \ 'color).read[String]
        ) tupled

    def getHomeSection(id: String) = withUser { user => implicit request =>
        val section = DBUtil.getHomeSection(id.toInt)
        Ok(new JsObject(Seq(
            "header" -> JsString(section.header),
            "content" -> JsString(section.content),
            "color" -> JsString(section.color)
        )))
    }

    def putHomeSection = withUser { user => implicit request =>
        request.body.asJson.map { json =>
            json.validate[(String, String, String, String)].map {
                case (header, content, section, color) => {
                    DBUtil.putHomeSection(new HomeSection(header, content, section.toInt, color))
                    Ok(new JsObject(Seq(
                        "message" -> JsString("Done")
                    )))
                }
            }.recoverTotal {
                e => BadRequest("Detected error:" + JsError.toFlatJson(e))
            }
        }.getOrElse {
            BadRequest("Expecting Json data")
        }
    }

    def patchHomeSection(id: String) = withUser { user => implicit request =>
        request.body.asJson.map { json =>
            json.validate[(String, String, String)].map {
                case (header, content, color) => {
                    DBUtil.patchHomeSection(new HomeSectionEdit(id.toInt, header, content, -1, color))
                    Ok(new JsObject(Seq(
                        "message" -> JsString("Done")
                    )))
                }
            }.recoverTotal {
                e => BadRequest("Detected error:" + JsError.toFlatJson(e))
            }
        }.getOrElse {
            BadRequest("Expecting Json data")
        }
    }

    def deleteHomeSection(id: String) = withUser { user => implicit request =>
        Ok("Done")
    }

    def getHomeSelectors = withUser { user => implicit request =>
        Ok(DBUtil.getHomeEditSelectors)
    }
}
