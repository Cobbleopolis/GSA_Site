package auth

import models.User
import play.api.mvc._
import util.DBUtil

trait Secured {

    def username(request: RequestHeader): Option[String] = request.session.get(Security.username)

    def onUnauthorized(request: RequestHeader) = Results.Redirect(controllers.routes.Auth.login())

    def withAuth(f: => String => Request[AnyContent] => Result) = {
        Security.Authenticated(username, onUnauthorized) { user =>
            Action(request => f(user)(request))
        }
    }

    /**
     * This method shows how you could wrap the withAuth method to also fetch your user
     * You will need to implement UserDAO.findOneByUsername
     */
    def withUser(f: User => Request[AnyContent] => Result) = withAuth { username => implicit request =>
        val user: User = DBUtil.getUserFromUsername(username)
        if (user != null)
            f(user)(request)
        else
            onUnauthorized(request)
    }

    def loginAware(loggedIn: => User => Request[AnyContent] => Result,
                   notLoggedIn: => Request[AnyContent] => Result) = {
        withAuth { username => implicit request =>
            val user: User = DBUtil.getUserFromUsername(username)
            if (user != null)
                loggedIn(user)(request)
            else
                notLoggedIn(request)
        }
    }
}
