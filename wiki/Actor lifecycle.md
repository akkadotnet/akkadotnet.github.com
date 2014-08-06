---
layout: wiki
title: Actor lifecycle
---
## Actor Lifecycle

The new actor’s postRestart method is invoked with the exception which caused the restart. By default the preStart is called, just as in the normal start-up case.

An actor restart replaces only the actual actor object; the contents of the mailbox is unaffected by the restart, so processing of messages will resume after the postRestart hook returns. The message that triggered the exception will not be received again. Any message sent to an actor while it is being restarted will be queued to its mailbox as usual.

>**Warning**<br/>
Be aware that the ordering of failure notifications relative to user messages is not deterministic. In particular, a parent might restart its child before it has processed the last messages sent by the child before the failure. See Discussion: Message Ordering for details.

### Stop Hook
After stopping an actor, its postStop hook is called, which may be used e.g. for deregistering this actor from other services. This hook is guaranteed to run after message queuing has been disabled for this actor, i.e. messages sent to a stopped actor will be redirected to the deadLetters of the ActorSystem.