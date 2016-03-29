package models

import org.mindrot.jbcrypt.BCrypt
import play.api.data.Form
import play.api.data.Forms._
import util.DBUtil

object Login {
    val form = Form(
        mapping(
            "Username" -> nonEmptyText,
            "Password" -> nonEmptyText
        ) (LoginData.apply)(LoginData.unapply)
            verifying ("Invalid username or password", f => check(f)
            ))

    def check(loginData: LoginData): Boolean = {
        val user: User = DBUtil.getUserFromUsername(loginData.username)
        if (user == null)
            false
        else
            BCrypt.checkpw(loginData.password, user.password)
    }
}

case class LoginData(username: String, password: String)