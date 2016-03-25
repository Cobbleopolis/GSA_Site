package reference

object Navigation {
    val navMenu: Seq[NavEntry] = Seq(
        new NavEntry(
            "Home",
            "home",
            "/"
        ),
        new NavEntry(
            "Flags",
            "flag",
            "/flags"
        )
    )
}

case class NavEntry(text: String, icon: String, link: String) {

}