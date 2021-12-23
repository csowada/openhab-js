type int = number;
type long = number;
type float = number;
type double = number;
type byte = number;
type char = string;

type chararray = [byte];
type bytearray = [char];

declare namespace Java {
    export function extend<T>(clazz: any, methods?: {}): T;
    export function typeName<T>(x: T): string;

    // export function type(input: any): any;
    export function isJavaObject(input: any): boolean;
    export function isType(input: any): boolean;
    // export function from(input: any): any[]

    export function type<T>(t: string): T;
    export function from<T>(list: java.util.List<T>): Array<T>;
    export function from<T>(list: java.util.Set<T>): Array<T>;

}

declare namespace java.lang {
    interface Object {
        equals(arg0: any): boolean;
        getClass(): any;
        hashCode(): number;
        toString(): string;
    }
}

declare namespace java.util {

    interface Collection<E>/* extends java.lang.Iterable<E>*/ extends java.lang.Object {

        add(arg0: E): boolean;
        addAll(arg0: Collection<E>): boolean;
        clear(): void;
        contains(arg0: any /*java.lang.Object*/): boolean;
        containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        equals(arg0: any /*java.lang.Object*/): boolean;
        // forEach<T>(arg0: Consumer<T>): void;
        isEmpty(): boolean;
        iterator(): Iterator<E>;
        // parallelStream(): java.util.stream.Stream<E>;
        remove(arg0: any /*java.lang.Object*/): boolean;
        removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        // removeIf(arg0: Predicate<E>): boolean;
        retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        size(): int;
        spliterator(): any /*java.util.Spliterator*/;
        // stream(): java.util.stream.Stream<E>;
        toArray(): [any /*java.lang.Object*/];
        toArray<T>(arg0: [T]): [T];
        toArray<T>(arg0: any /*java.util.function.IntFunction*/): [T];

    } // end Collection

    interface List<E> extends Collection<E> {

        // static copyOf<E>( arg0:Collection<E> ):List<E>;
        // static of<E>(  ):List<E>;
        // static of<E>( ...arg0:E[] ):List<E>;
        // static of<E>( arg0:E ):List<E>;
        // static of<E>( arg0:E, arg1:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E ):List<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E, arg9:E ):List<E>;
        add(arg0: E): boolean;
        add(arg0: int, arg1: E): void;
        addAll(arg0: Collection<E>): boolean;
        addAll(arg0: int, arg1: Collection<E>): boolean;
        clear(): void;
        contains(arg0: any /*java.lang.Object*/): boolean;
        containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        equals(arg0: any /*java.lang.Object*/): boolean;
        // forEach<T>(arg0: Consumer<T>): void;
        get(arg0: int): E;
        indexOf(arg0: any /*java.lang.Object*/): int;
        isEmpty(): boolean;
        iterator(): Iterator<E>;
        lastIndexOf(arg0: any /*java.lang.Object*/): int;
        listIterator(): any /*java.util.ListIterator*/;
        listIterator(arg0: int): any /*java.util.ListIterator*/;
        // parallelStream(): java.util.stream.Stream<E>;
        remove(arg0: any /*java.lang.Object*/): boolean;
        remove(arg0: int): E;
        removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        // removeIf(arg0: Predicate<E>): boolean;
        // replaceAll(arg0: UnaryOperator<E>): void;
        retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        set(arg0: int, arg1: E): E;
        size(): int;
        sort(arg0: any /*java.util.Comparator*/): void;
        spliterator(): any /*java.util.Spliterator*/;
        // stream(): java.util.stream.Stream<E>;
        subList(arg0: int, arg1: int): List<E>;
        toArray(): [any /*java.lang.Object*/];
        toArray<T>(arg0: [T]): [T];
        toArray<T>(arg0: any /*java.util.function.IntFunction*/): [T];

    } // end List

    interface Set<E> extends Collection<E> {

        // static copyOf<E>( arg0:Collection<E> ):Set<E>;
        // static of<E>(  ):Set<E>;
        // static of<E>( ...arg0:E[] ):Set<E>;
        // static of<E>( arg0:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E ):Set<E>;
        // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E, arg9:E ):Set<E>;
        add(arg0: E): boolean;
        addAll(arg0: Collection<E>): boolean;
        clear(): void;
        contains(arg0: any /*java.lang.Object*/): boolean;
        containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        equals(arg0: any /*java.lang.Object*/): boolean;
        // forEach<T>(arg0: Consumer<T>): void;
        isEmpty(): boolean;
        iterator(): Iterator<E>;
        // parallelStream(): java.util.stream.Stream<E>;
        remove(arg0: any /*java.lang.Object*/): boolean;
        removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        // removeIf(arg0: Predicate<E>): boolean;
        retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
        size(): int;
        spliterator(): any /*java.util.Spliterator*/;
        // stream(): java.util.stream.Stream<E>;
        toArray(): [any /*java.lang.Object*/];
        toArray<T>(arg0: [T]): [T];
        toArray<T>(arg0: any /*java.util.function.IntFunction*/): [T];

    } // end Set

} // end namespace java.util