logLevel := Level.Warn

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.8")

addSbtPlugin("default" % "sbt-sass" % "0.1.9")

//addSbtPlugin("com.typesafe.sbt" % "sbt-coffeescript" % "1.0.0")

addSbtPlugin("com.arpnetworking" % "sbt-typescript" % "0.2.1")

addSbtPlugin("com.github.mpeltonen" % "sbt-idea" % "1.6.0")