---
layout: default
---
## To be considered while porting Akka to Akka.NET
- Be .NET idiomatic, e.g. do not port `Duration` or `Future`, use `Timespan` and `Task<T>`
- Stay as close as possible to the original JVM implementation, https://github.com/akka/akka
- Do not add features that does not exist in JVM Akka into the core Akka.NET framework

## Coding conventions
- Use the default Resharper guidelines for code
  - Private member fields start with `_`, i.e. _camelCased
  - PascalCased public and protected Properties and Methods.
  - TODO.. Anyone got a complete list for this?
- 4 spaces for indentation
- No protected fields. Create a private field and a protected property instead.

## Tests

- Name your tests using `DisplayName=`

e.g.

```csharp
[Fact(DisplayName=
@"If a parent receives a Terminated event for a child actor, 
the parent should no longer supervise it")]
public void ClearChildUponTerminated()
{
```