declare const _default: {
    ChannelEventTrigger: (channel: any, event: any, triggerName: any) => any;
    GenericCronTrigger: (expression: any, triggerName: any) => any;
    GroupCommandTrigger: (groupName: any, command: any, triggerName: any) => any;
    GroupStateChangeTrigger: (groupName: any, oldState: any, newState: any, triggerName: any) => any;
    GroupStateUpdateTrigger: (groupName: any, state: any, triggerName: any) => any;
    ItemCommandTrigger: (itemName: any, command: any, triggerName: any) => any;
    ItemStateChangeTrigger: (itemName: any, oldState: any, newState: any, triggerName: any) => any;
    ItemStateUpdateTrigger: (itemName: any, state: any, triggerName: any) => any;
    SystemStartlevelTrigger: (startlevel: any, triggerName: any) => any;
    ThingStatusChangeTrigger: (thingUID: any, status: any, previousStatus: any, triggerName: any) => any;
    ThingStatusUpdateTrigger: (thingUID: any, status: any, triggerName: any) => any;
    TimeOfDayTrigger: (time: any, triggerName: any) => any;
};
export = _default;
