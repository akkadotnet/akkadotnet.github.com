---
layout: default
title: %TITLE%
---
## Host your `ActorSystem` using:

### Console Application

```csharp
namespace Foo.Bar
{
    class Program
    {
        static void Main(string[] args)
        {
            //configure remoting for localhost:8081
            var fluentConfig = FluentConfig.Begin()
                .StartRemotingOn("localhost", 8081)
                .Build();

            using (var system = ActorSystem.Create("my-actor-server", fluentConfig))
            {
                //start two services 
                var service1= system.ActorOf<Service1>("service1");
                var service2 = system.ActorOf<Service2>("service2");
                Console.ReadKey();
            }
        }
    }
}
```

### Windows Service

### Asp.NET