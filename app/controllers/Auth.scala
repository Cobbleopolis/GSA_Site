package controllers

import models.Login
import play.api.mvc._

object Auth extends Controller {

    def login = Action { implicit request =>
        Ok(views.html.admin.login(Login.form))
    }

    def submitLogin = Action(implicit request => {
        Login.form.bindFromRequest.fold(
            formWithErrors => {
                // binding failure, you retrieve the form containing errors:
                BadRequest(views.html.admin.login(formWithErrors))
            },
            userData => {
                /* binding success, you get the actual value. */
                Redirect(routes.Admin.index()).withSession(Security.username -> userData.username)
            }
        )
    })

    def logout = Action {
        Redirect(routes.Auth.login()).withNewSession
    }
    
}
