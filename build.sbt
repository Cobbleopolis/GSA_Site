name := "GSA_Site"

version := "1.0"

lazy val `gsa_site` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
    jdbc,
    cache,
    ws,
    anorm,
    "mysql" % "mysql-connector-java" % "5.1.18",
    "com.typesafe.play" %% "play-mailer" % "2.4.1",
    "org.mindrot" % "jbcrypt" % "0.3m"
)

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  