package util

object FormHelpers {
    import views.html.helper.FieldConstructor
    implicit val formFields = FieldConstructor(views.html.fieldConstructorTemplate.render)
}
