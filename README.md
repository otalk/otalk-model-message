# otalk-model-message

An Ampersand state model representing the content and life-cyle of an XMPP message.

## Installing

```sh
$ npm install otalk-model-message
```

## Reference

```javascript
var Message = require('otalk-model-message');
var msg = new Message();
```

### Properties

#### `.ackReceived` - `{Boolean}`

Set this flag to `true` when an ack from the server is received for this message.

#### `.ackRequested` - `{Boolean}`

Set this flag to `true` if an ack from the server was requested when sending the message.

#### `.archivedID` - `{Boolean}`

A peristent and unique ID for this message used for message archive history.

#### `.body` - `{String}`

The textual content of the message.

#### `.comparator` - `{Date}`

Either the `.createdTime` or `.delayedTime` value. We generally want this value for sorting messages instead of using the `.timestamp` directly, because we don't want messages that have been edited to suddenly jump around.

#### `.createdTime` - `{Date}`

The timestamp of when the `Message` object was created, which in normal use cases will be when the message was sent.

#### `.delayedTime` - `{Date}`

The timestamp for when a message was originally sent, if its delivery was delayed (such as delivering after having been offline).

#### `.delayed` - `{Boolean}(Derived)`

This flag will turn `true` if the message has `.delayedTime` set.

#### `.editedTime` - `{Date}`

The timestamp for when a message was edited.

#### `.edited` - `{Boolean}(Derived)`

This flag will turn `true` when a `.editedTime` is set, which is also handled by using the `.correct()` method.

#### `.errorCondition` - `{String}`

If an error reply is received for a message, set `.errorCondition` to the error name.

#### `.errorMessage` - `{String}`

If an error reply is received for a message, set `.errorMessage` to the explanatory text of the error.

#### `.fromBare` - `{String}(Derived)`

The XMPP account of the sender of the message.

#### `.fromFull` - `{String}(Derived)`

The complete XMPP address of the sender of the message.

#### `.fromResource` - `{String}(Derived)`

The XMPP resource of the sender of the message.

#### `.from` - `{JID}`

The XMPP address of the sender of the message, as a [JID](https://npmjs.org/package/xmpp-jid) object.

#### `.isMine` - `{Boolean}`

Set this flag to `true` if this message was from you.

#### `.localeTimestamp` - `{String}(Derived)`

A locale-based formatted version of `.timestamp`, which will include the date if the timestamp is not for "today".

#### `.meAction` - `{Boolean}(Derived)`

This flag will turn to `true` if the `.body` field starts with four characters `/me `.

#### `.mid` - `{String}`

The XMPP stanza ID for the message. This is only intended for short-term tracking, not a globally unique or persistent ID.

#### `.parentThread` - `{String}`

An opaque reference to the parent thread of conversation, if this message started a new thread.

#### `.pendingAck` - `{Boolean}(Derived)`

This flag will turn to `true` when `.ackRequested` is `true`, but `.ackReceived` is `false`.

#### `.pendingReceipt` - `{Boolean}(Derived)`

This flag will turn to `true` when `.receiptRequested` is `true`, but `.receiptReceived` is `false`.

#### `.receiptReceived` - `{Boolean}`

Set this flag to `true` if a delivery receipt is later received for this message.

#### `.receiptRequested` - `{Boolean}`

Set this flag to `true` if a request for a delivery receipt was included with this message when it was sent.

#### `.subject` - `{String}`

A user supplied subject for the message.

#### `.thread` - `{String}`

An opaque value for associating the message with a conversation thread.

#### `.timestamp` - `{Date}(Derived)`

The best-known time of the creation of the message, based on when the message was received, if the message was delayed, and if the message has been subsequently edited.

#### `.toBare` - `{String}(Derived)`

The XMPP account of the recipient of the message.

#### `.toFull` - `{String}(Derived)`

The complete XMPP address of the recipient of the message.

#### `.toResource` - `{String}(Derived)`

The XMPP resource of the recipient of the message.

#### `.to` - `{JID}`

The XMPP address of the recipient of the message, as a [JID](https://npmjs.org/package/xmpp-jid) object.

#### `.type` - `{String}`

Intended (but not restricted) to be one of: `normal`, `chat`, `groupchat`, `headline`, `error`

#### `.uris` - `{Array<String>}`

A list of URIs contained in the message. How this set of URIs is determined is left to the user, but it can be done by extracting them from the `body` text, or via dedicated protocol support such as [Out of Band Data](http://xmpp.org/extensions/xep-0066.html).

### Methods

#### `.correct(updatedMsg)`

* `updatedMsg` - `{Message}`

The `.correct()` method is used to support message correction, where a newly received message needs to edit an existing message. The results of calling `.correct()` are to set the `.editedTime` field, along with updating various fields such as `body` and `subject`.

## License

MIT
