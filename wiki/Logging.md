---
layout: default
title: %TITLE%
---
For more info see real Akka's documentation: http://doc.akka.io/docs/akka/2.0/scala/logging.html

Akka .NET comes with three built in loggers.
* StandardOutLogger
* BusLogging
* Slf4NetLogger

## Configuring Custom Loggers

To configure a custom logger inside your Akka.Config, you need to use a fully qualified .NET class name like this:

    akka {
    	loggers = [""NameSpace.ClassName,AssemblyName""]
    }