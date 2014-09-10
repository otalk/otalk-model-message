var State = require('ampersand-state');
var JIDMixin = require('ampersand-jid-datatype-mixin');


module.exports = State.extend({dataTypes: JIDMixin.dataTypes}, {
    initialize: function () {
        this.createdTime = new Date(Date.now());
    },

    props: {
        archivedID: 'string',
        body: 'string',
        errorCondition: 'string',
        errorMessage: 'string',
        isMine: 'boolean',
        mid: 'string',
        to: 'jid',
        from: 'jid',
        uris: 'array',
        type: ['string', true, 'normal'],
        ackReceived: 'boolean',
        ackRequested: 'boolean',
        createdTime: 'date',
        delayedTime: 'date',
        editedTime: 'date',
        receiptReceived: 'boolean',
        receiptRequested: 'boolean',
        subject: 'string',
        thread: 'string',
        parentThread: 'string'
    },

    derived: {
        fromFull: {
            deps: ['from'],
            fn: function () {
                return this.from && this.from.full;
            }
        },
        fromBare: {
            deps: ['from'],
            fn: function () {
                return this.from && this.from.bare;
            }
        },
        fromResource: {
            deps: ['from'],
            fn: function () {
                return this.from && this.from.resource;
            }
        },
        toFull: {
            deps: ['to'],
            fn: function () {
                return this.to && this.to.full;
            }
        },
        toBare: {
            deps: ['to'],
            fn: function () {
                return this.to && this.to.bare;
            }
        },
        toResource: {
            deps: ['to'],
            fn: function () {
                return this.to && this.to.resource;
            }
        },
        meAction: {
            deps: ['body'],
            fn: function () {
                return this.body.indexOf('/me') === 0;
            }
        },
        pendingAck: {
            deps: ['ackRequested', 'ackReceived'],
            fn: function () {
                return this.ackRequested && !this.ackReceived;
            }
        },
        pendingReceipt: {
            deps: ['receiptRequested', 'receiptReceived'],
            fn: function () {
                return this.receiptRequested && !this.receiptReceived;
            }
        },
        edited: {
            deps: ['editedTime'],
            fn: function () {
                return this.editedTime && !isNaN(this.editedTime.valueOf());
            }
        },
        delayed: {
            deps: ['delayedTime'],
            fn: function () {
                return this.delayedTime && !isNaN(this.delayedTime.valueOf());
            }
        },
        timestamp: {
            deps: ['createdTime', 'edited', 'delayed'],
            fn: function () {
                if (this.edited) {
                    return this.editedTime;
                }
                if (this.delayed) {
                    return this.delayedTime;
                }
                return this.createdTime;
            }
        },
        localeTimestamp: {
            deps: ['timestamp'],
            fn: function () {
                var stamp = this.timestamp;
                var today = new Date(Date.now());
                var isToday = today.getUTCFullYear() === stamp.getUTCFullYear() &&
                              today.getUTCMonth() === stamp.getUTCMonth() &&
                              today.getUTCDate() === stamp.getUTCDate();

                if (isToday) {
                    return stamp.toLocaleTimeString();
                } else {
                    return stamp.toLocaleDateString() + ' ' + stamp.toLocaleTimeString();
                }
            }
        }
    },

    correct: function (msg) {
        if (this.fromFull !== msg.fromFull) {
            return;
        }

        this.set({
            mid: msg.mid,
            subject: msg.subject,
            body: msg.body,
            uris: msg.uris,
            delayedTime: msg.delayedTime,
            editedTime: msg.delayedTime || new Date(Date.now()),
            receiptReceived: false
        });
    }
});
