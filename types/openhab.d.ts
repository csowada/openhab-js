declare namespace org.openhab.core.types {

    interface State/* extends Type*/ extends java.lang.Object {
      as<T>(arg0: T): T;
      format(arg0: string): string;
      toFullString(): string;
  
    } // end State
  
  } // end namespace org.openhab.core.types

declare namespace org.openhab.core.items {

    interface Item/* extends org.openhab.core.common.registry.Identifiable<any>*/ extends java.lang.Object {
  
    //   getAcceptedCommandTypes(): java.util.List<java.lang.Class<org.openhab.core.types.Command>>;
    //   getAcceptedDataTypes(): java.util.List<java.lang.Class<org.openhab.core.types.State>>;
      getCategory(): string;
    //   getCommandDescription(): org.openhab.core.types.CommandDescription;
    //   getCommandDescription(arg0: java.util.Locale): org.openhab.core.types.CommandDescription;
      getGroupNames(): java.util.List<string>;
      getLabel(): string;
      getName(): string;
      getState(): org.openhab.core.types.State;
      state: org.openhab.core.types.State;
      getStateAs<T>(arg0: T): T;
    //   getStateDescription(): org.openhab.core.types.StateDescription;
    //   getStateDescription(arg0: java.util.Locale): org.openhab.core.types.StateDescription;
      getTags(): java.util.Set<string>;
      getType(): string;
      getUID<T>(): T;
      hasTag(arg0: string): boolean;
  
    } // end Item

    class GenericItem implements Item {
        getCategory(): string;
        getGroupNames(): java.util.List<string>;
        getLabel(): string;
        getName(): string;
        getState(): types.State;
        state: types.State;
        getStateAs<T>(arg0: T): T;
        getTags(): java.util.Set<string>;
        getType(): string;
        getUID<T>(): T;
        hasTag(arg0: string): boolean;
        equals(arg0: any): boolean;
        getClass();
        hashCode(): number;
        toString(): string;
    }

    class GroupItem extends GenericItem /*implements StateChangeListener*/ {

        addGroupName(arg0: string): void;
        addGroupNames(...arg0: string[]): void;
        addGroupNames(arg0: java.util.List<string>): void;
        addMember(arg0: org.openhab.core.items.Item): void;
        // addStateChangeListener(arg0: StateChangeListener): void;
        addTag(arg0: string): void;
        addTags(...arg0: string[]): void;
        addTags(arg0: java.util.Collection<string>): void;
        // dispose(): void;
        // equals(arg0: any /*java.lang.Object*/): boolean;
        // getAcceptedCommandTypes(): java.util.List<java.lang.Class<org.openhab.core.types.Command>>;
        // getAcceptedDataTypes(): java.util.List<java.lang.Class<org.openhab.core.types.State>>;
        getAllMembers(): java.util.Set<org.openhab.core.items.Item>;
        getAllMembers(): org.openhab.core.items.Item[];
        getBaseItem(): org.openhab.core.items.Item;
        // getCategory(): string;
        // getCommandDescription(): org.openhab.core.types.CommandDescription;
        // getCommandDescription(arg0: java.util.Locale): org.openhab.core.types.CommandDescription;
        getFunction(): any /*org.openhab.core.items.GroupFunction*/;
        // getGroupNames(): java.util.List<string>;
        // getLabel(): string;
        getMembers(): java.util.Set<org.openhab.core.items.Item>;
        // getMembers(arg0: Predicate<org.openhab.core.items.Item>): java.util.Set<org.openhab.core.items.Item>;
        // getName(): string;
        // getState(): org.openhab.core.types.State;
        // getStateAs<T>(arg0: java.lang.Class<T>): T;
        // getStateDescription(): org.openhab.core.types.StateDescription;
        // getStateDescription(arg0: java.util.Locale): org.openhab.core.types.StateDescription;
        // getTags(): java.util.Set<string>;
        // getType(): string;
        // getUID<T>(): T;
        // hasTag(arg0: string): boolean;
        // isAcceptedState(arg0: java.util.List<java.lang.Class<org.openhab.core.types.State>>, arg1: org.openhab.core.types.State): boolean;
        removeAllMembers(): void;
        removeAllTags(): void;
        removeGroupName(arg0: string): void;
        removeMember(arg0: org.openhab.core.items.Item): void;
        // removeStateChangeListener(arg0: StateChangeListener): void;
        removeTag(arg0: string): void;
        replaceMember(arg0: org.openhab.core.items.Item, arg1: org.openhab.core.items.Item): void;
        // send(arg0: org.openhab.core.types.Command): void;
        // send(arg0: org.openhab.core.types.RefreshType): void;
        setCategory(arg0: string): void;
        // setCommandDescriptionService(arg0: any /*org.openhab.core.service.CommandDescriptionService*/): void;
        // setEventPublisher(arg0: any /*org.openhab.core.events.EventPublisher*/): void;
        // setItemStateConverter(arg0: ItemStateConverter): void;
        setLabel(arg0: string): void;
        setState(arg0: org.openhab.core.types.State): void;
        // setStateDescriptionService(arg0: org.openhab.core.service.StateDescriptionService): void;
        setUnitProvider(arg0: any /*org.openhab.core.i18n.UnitProvider*/): void;
        // stateChanged(arg0: org.openhab.core.items.Item, arg1: org.openhab.core.types.State, arg2: org.openhab.core.types.State): void;
        // stateUpdated(arg0: org.openhab.core.items.Item, arg1: org.openhab.core.types.State): void;
        // toString(): string;
    
      } // end GroupItem
}