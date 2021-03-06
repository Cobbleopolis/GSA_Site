package controllers

import auth.Secured
import play.api.mvc._
import util.DBUtil

object Admin extends Controller with Secured {

    def index = withUser { user => implicit request =>
        Ok(views.html.admin.index())
    }

    def edit = withUser { user => implicit request =>
        Ok(views.html.admin.edit())
    }
}
