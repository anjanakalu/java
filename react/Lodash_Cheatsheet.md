# Lodash Cheatsheet

A streamlined cheatsheet for Lodash methods, organized by category: Array, Collection, Date, Function, Lang, Math, Number, Object, String, and Util.

## Array

| Method | Description | Example |
| --- | --- | --- |
| `_.chunk(array, [size=1])` | Splits array into chunks of size. | `_.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]` |
| `_.compact(array)` | Removes falsy values. | `_.compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]` |
| `_.concat(array, [values])` | Concatenates arrays/values. | `_.concat([1], 2, [3], [[4]]) // => [1, 2, 3, [4]]` |
| `_.difference(array, [values])` | Values not in other arrays. | `_.difference([2, 1], [2, 3]) // => [1]` |
| `_.differenceBy(array, [values], [iteratee])` | Like `difference`, with iteratee. | `_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [1.2]` |
| `_.differenceWith(array, [values], [comparator])` | Like `difference`, with comparator. | `_.differenceWith([{ x: 1 }, { x: 2 }], [{ x: 2 }], _.isEqual) // => [{ x: 1 }]` |
| `_.drop(array, [n=1])` | Drops first `n` elements. | `_.drop([1, 2, 3], 2) // => [3]` |
| `_.dropRight(array, [n=1])` | Drops last `n` elements. | `_.dropRight([1, 2, 3], 2) // => [1]` |
| `_.dropRightWhile(array, [predicate])` | Drops from end while predicate is true. | `_.dropRightWhile([1, 2, 3, 4], n => n > 2) // => [1, 2]` |
| `_.dropWhile(array, [predicate])` | Drops from start while predicate is true. | `_.dropWhile([1, 2, 3, 4], n => n < 3) // => [3, 4]` |
| `_.fill(array, value, [start=0], [end])` | Fills array with value. | `_.fill([1, 2, 3], '*', 1, 2) // => [1, '*', 3]` |
| `_.findIndex(array, [predicate], [fromIndex=0])` | Index of first matching element. | `_.findIndex([{ id: 1 }, { id: 2 }], o => o.id === 2) // => 1` |
| `_.findLastIndex(array, [predicate], [fromIndex])` | Index of last matching element. | `_.findLastIndex([{ id: 1 }, { id: 2```javascript
| `_.head(array) / _.first(array)` | First element of array. | `_.head([1, 2, 3]) // => 1` |
| `_.flatten(array)` | Flattens array one level. | `_.flatten([1, [2, [3, [4]], 5]]) // => [1, 2, [3, [4]], 5]` |
| `_.flattenDeep(array)` | Flattens array recursively. | `_.flattenDeep([1, [2, [3, [4]], 5]]) // => [1, 2, 3, 4, 5]` |
| `_.flattenDepth(array, [depth=1])` | Flattens array to specified depth. | `_.flattenDepth([1, [2, [3, [4]], 5]], 2) // => [1, 2, 3, [4], 5]` |
| `_.fromPairs(pairs)` | Object from key-value pairs. | `_.fromPairs([['a', 1], ['b', 2]]) // => { a: 1, b: 2 }` |
| `_.indexOf(array, value, [fromIndex=0])` | Index of first value occurrence. | `_.indexOf([1, 2, 1, 2], 2) // => 1` |
| `_.initial(array)` | All but last element. | `_.initial([1, 2, 3]) // => [1, 2]` |
| `_.intersection([arrays])` | Values in all arrays. | `_.intersection([2, 1], [2, 3]) // => [2]` |
| `_.intersectionBy([arrays], [iteratee])` | Like `intersection`, with iteratee. | `_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [2.1]` |
| `_.intersectionWith([arrays], [comparator])` | Like `intersection`, with comparator. | `_.intersectionWith([{ x: 1 }, { x: 2 }], [{ x: 2 }], _.isEqual) // => [{ x: 2 }]` |
| `_.join(array, [separator=','])` | Joins array into string. | `_.join(['a', 'b', 'c'], '~') // => 'a~b~c'` |
| `_.last(array)` | Last element of array. | `_.last([1, 2, 3]) // => 3` |
| `_.lastIndexOf(array, value, [fromIndex])` | Index of last value occurrence. | `_.lastIndexOf([1, 2, 1, 2], 1) // => 2` |
| `_.nth(array, [n=0])` | Element at index `n`. | `_.nth([1, 2, 3], -1) // => 3` |
| `_.pull(array, [values])` | Removes given values (mutates). | `let array = [1, 2, 3, 1, 2]; _.pull(array, 2, 3) // => [1, 1]` |
| `_.pullAll(array, values)` | Like `pull`, with array of values. | `let array = [1, 2, 3, 1, 2]; _.pullAll(array, [2, 3]) // => [1, 1]` |
| `_.pullAllBy(array, values, [iteratee])` | Like `pullAll`, with iteratee. | `let array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }]; _.pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x') // => [{ x: 2 }]` |
| `_.pullAllWith(array, values, [comparator])` | Like `pullAll`, with comparator. | `let array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }]; _.pullAllWith(array, [{ x: 1 }], _.isEqual) // => [{ x: 2 }, { x: 3 }]` |
| `_.pullAt(array, [indexes])` | Removes elements at indexes. | `let array = [1, 2, 3, 4]; _.pullAt(array, [0, 2]) // => [1, 3]` |
| `_.remove(array, [predicate])` | Removes matching elements (mutates). | `let array = [1, 2, 3, 4]; _.remove(array, n => n % 2 === 0) // => [2, 4]` |
| `_.reverse(array)` | Reverses array in place. | `let array = [1, 2, 3]; _.reverse(array) // => [3, 2, 1]` |
| `_.slice(array, [start=0], [end])` | Returns array slice. | `_.slice([1, 2, 3, 4], 1, 3) // => [2, 3]` |
| `_.sortedIndex(array, value)` | Index to insert value in sorted array. | `_.sortedIndex([30, 50], 40) // => 1` |
| `_.sortedIndexBy(array, value, [iteratee])` | Like `sortedIndex`, with iteratee. | `_.sortedIndexBy([{ x: 30 }, { x: 50 }], { x: 40 }, 'x') // => 1` |
| `_.sortedIndexOf(array, value)` | Index of value in sorted array. | `_.sortedIndexOf([1, 2, 2, 3], 2) // => 1` |
| `_.sortedLastIndex(array, value)` | Highest index to insert in sorted array. | `_.sortedLastIndex([4, 5, 5, 6], 5) // => 3` |
| `_.sortedLastIndexBy(array, value, [iteratee])` | Like `sortedLastIndex`, with iteratee. | `_.sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 5 }, 'x') // => 2` |
| `_.sortedLastIndexOf(array, value)` | Last index of value in sorted array. | `_.sortedLastIndexOf([1, 2, 2, 3], 2) // => 2` |
| `_.sortedUniq(array)` | Removes duplicates from sorted array. | `_.sortedUniq([1, 1, 2, 2, 3]) // => [1, 2, 3]` |
| `_.sortedUniqBy(array, [iteratee])` | Like `sortedUniq`, with iteratee. | `_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor) // => [1.1, 2.3]` |
| `_.tail(array)` | All but first element. | `_.tail([1, 2, 3]) // => [2, 3]` |
| `_.take(array, [n=1])` | First `n` elements. | `_.take([1, 2, 3], 2) // => [1, 2]` |
| `_.takeRight(array, [n=1])` | Last `n` elements. | `_.takeRight([1, 2, 3], 2) // => [2, 3]` |
| `_.takeRightWhile(array, [predicate])` | Takes from end while predicate is true. | `_.takeRightWhile([1, 2, 3, 4], n => n > 2) // => [3, 4]` |
| `_.takeWhile(array, [predicate])` | Takes from start while predicate is true. | `_.takeWhile([1, 2, 3, 4], n => n < 3) // => [1, 2]` |
| `_.union([arrays])` | Unique values from all arrays. | `_.union([2], [1, 2]) // => [2, 1]` |
| `_.unionBy([arrays], [iteratee])` | Like `union`, with iteratee. | `_.unionBy([2.1], [1.2, 2.3], Math.floor) // => [2.1, 1.2]` |
| `_.unionWith([arrays], [comparator])` | Like `union`, with comparator. | `_.unionWith([{ x: 1 }, { x: 2 }], [{ x: 2 }], _.isEqual) // => [{ x: 1 }, { x: 2 }]` |
| `_.uniq(array)` | Unique values from array. | `_.uniq([2, 1, 2]) // => [2, 1]` |
| `_.uniqBy(array, [iteratee])` | Like `uniq`, with iteratee. | `_.uniqBy([2.1, 1.2, 2.3], Math.floor) // => [2.1, 1.2]` |
| `_.uniqWith(array, [comparator])` | Like `uniq`, with comparator. | `_.uniqWith([{ x: 1 }, { x: 2 }, { x: 1 }], _.isEqual) // => [{ x: 1 }, { x: 2 }]` |
| `_.unzip(array)` | Unzips grouped elements. | `_.unzip([['a', 1, true], ['b', 2, false]]) // => [['a', 'b'], [1, 2], [true, false]]` |
| `_.unzipWith(array, [iteratee])` | Like `unzip`, with iteratee. | `_.unzipWith([[1, 10], [2, 20]], _.add) // => [3, 30]` |
| `_.without(array, [values])` | Excludes specified values. | `_.without([2, 1, 2, 3], 1, 2) // => [3]` |
| `_.xor([arrays])` | Unique values in only one array. | `_.xor([2, 1], [2, 3]) // => [1, 3]` |
| `_.xorBy([arrays], [iteratee])` | Like `xor`, with iteratee. | `_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [1.2, 3.4]` |
| `_.xorWith([arrays], [comparator])` | Like `xor`, with comparator. | `_.xorWith([{ x: 1 }, { x: 2 }], [{ x: 2 }], _.isEqual) // => [{ x: 1 }]` |
| `_.zip([arrays])` | Groups elements from arrays. | `_.zip(['a', 'b'], [1, 2], [true, false]) // => [['a', 1, true], ['b', 2, false]]` |
| `_.zipObject([props], [values])` | Object from keys and values. | `_.zipObject(['a', 'b'], [1, 2]) // => { a: 1, b: 2 }` |
| `_.zipObjectDeep([props], [values])` | Like `zipObject`, with nested props. | `_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]) // => { a: { b: [{ c: 1 }, { d: 2 }] } }` |
| `_.zipWith([arrays], [iteratee])` | Like `zip`, with iteratee. | `_.zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c) // => [111, 222]` |

## Collection

| Method | Description | Example |
| --- | --- | --- |
| `_.countBy(collection, [iteratee])` | Counts by iteratee result. | `_.countBy([6.1, 4.2, 6.3], Math.floor) // => { '4': 1, '6': 2 }` |
| `_.forEach(collection, [iteratee])` | Iterates over elements. | `_.forEach([1, 2], value => console.log(value)) // => Logs: 1, 2` |
| `_.forEachRight(collection, [iteratee])` | Iterates from right to left. | `_.forEachRight([1, 2], value => console.log(value)) // => Logs: 2, 1` |
| `_.every(collection, [predicate])` | Checks if all pass predicate. | `_.every([true, 1, 'yes'], _.isBoolean) // => false` |
| `_.filter(collection, [predicate])` | Elements passing predicate. | `_.filter([1, 2, 3, 4], n => n % 2 === 0) // => [2, 4]` |
| `_.find(collection, [predicate], [fromIndex=0])` | First matching element. | `_.find([{ id: 1 }, { id: 2 }], o => o.id === 2) // => { id: 2 }` |
| `_.findLast(collection, [predicate], [fromIndex])` | Last matching element. | `_.findLast([{ id: 1 }, { id: 2 }, { id: 1 }], o => o.id === 1) // => { id: 1 }` |
| `_.flatMap(collection, [iteratee])` | Maps and flattens one level. | `_.flatMap([1, 2], n => [n, n]) // => [1, 1, 2, 2]` |
| `_.flatMapDeep(collection, [iteratee])` | Maps and flattens recursively. | `_.flatMapDeep([1, 2], n => [[n, n]]) // => [1, 1, 2, 2]` |
| `_.flatMapDepth(collection, [iteratee], [depth=1])` | Maps and flattens to depth. | `_.flatMapDepth([1, 2], n => [[[n, n]]], 2) // => [[1, 1], [2, 2]]` |
| `_.groupBy(collection, [iteratee])` | Groups by iteratee result. | `_.groupBy([6.1, 4.2, 6.3], Math.floor) // => { '4': [4.2], '6': [6.1, 6.3] }` |
| `_.includes(collection, value, [fromIndex=0])` | Checks if value is in collection. | `_.includes([1, 2, 3], 2) // => true` |
| `_.invokeMap(collection, path, [args])` | Invokes method on elements. | `_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort') // => [[1, 5, 7], [1, 2, 3]]` |
| `_.keyBy(collection, [iteratee])` | Object with keys from iteratee. | `_.keyBy([{ id: 1 }, { id: 2 }], 'id') // => { '1': { id: 1 }, '2': { id: 2 } }` |
| `_.map(collection, [iteratee])` | Maps to new array. | `_.map([4, 8], n => n * n) // => [16, 64]` |
| `_.orderBy(collection, [iteratees], [orders])` | Sorts by iteratees and orders. | `_.orderBy([{ n: 1 }, { n: 3 }, { n: 2 }], ['n'], ['desc']) // => [{ n: 3 }, { n: 2 }, { n: 1 }]` |
| `_.partition(collection, [predicate])` | Splits into two groups. | `_.partition([1, 2, 3, 4], n => n % 2) // => [[1, 3], [2, 4]]` |
| `_.reduce(collection, [iteratee], [accumulator])` | Reduces to single value. | `_.reduce([1, 2, 3], (sum, n) => sum + n, 0) // => 6` |
| `_.reduceRight(collection, [iteratee], [accumulator])` | Reduces from right to left. | `_.reduceRight(['a', 'b', 'c'], (result, value) => result + value, '') // => 'cba'` |
| `_.reject(collection, [predicate])` | Elements not matching predicate. | `_.reject([1, 2, 3, 4], n => n % 2 === 0) // => [1, 3]` |
| `_.sample(collection)` | Random element. | `_.sample([1, 2, 3, 4]) // => e.g., 3` |
| `_.sampleSize(collection, [n=1])` | `n` random elements. | `_.sampleSize([1, 2, 3, 4], 2) // => e.g., [3, 1]` |
| `_.shuffle(collection)` | Shuffled copy. | `_.shuffle([1, 2, 3, 4]) // => e.g., [4, 1, 3, 2]` |
| `_.size(collection)` | Collection size. | `_.size([1, 2, 3]) // => 3` |
| `_.some(collection, [predicate])` | Checks if any pass predicate. | `_.some([null, 0, 'yes', false], _.isBoolean) // => true` |
| `_.sortBy(collection, [iteratees])` | Sorts by iteratees. | `_.sortBy([{ n: 3 }, { n: 1 }, { n: 2 }], 'n') // => [{ n: 1 }, { n: 2 }, { n: 3 }]` |

## Date

| Method | Description | Example |
| --- | --- | --- |
| `_.now()` | Current timestamp. | `_.now() // => e.g., 1623456789012` |

## Function

| Method | Description | Example |
| --- | --- | --- |
| `_.after(n, func)` | Invokes after `n` calls. | `let afterTwo = _.after(2, () => 'done'); afterTwo(); afterTwo() // => 'done'` |
| `_.ary(func, [n=func.length])` | Caps arguments to `n`. | `let capped = _.ary(parseInt, 1); capped('10', 2) // => 10` |
| `_.before(n, func)` | Invokes until `n` calls. | `let beforeThree = _.before(3, () => 'done'); beforeThree(); beforeThree() // => 'done'` |
| `_.bind(func, thisArg, [partials])` | Binds func to thisArg. | `let greet = (greeting, name) => \`${greeting}, ${name}\`; let bound = _.bind(greet, null, 'Hello'); bound('World') // => 'Hello, World'` |
| `_.bindKey(object, key, [partials])` | Binds method to object. | `let obj = { greet: (name) => \`Hello, ${name}\` }; let bound = _.bindKey(obj, 'greet', 'World'); bound() // => 'Hello, World'` |
| `_.curry(func, [arity=func.length])` | Curries arguments. | `let add = _.curry((a, b, c) => a + b + c); add(1)(2)(3) // => 6` |
| `_.curryRight(func, [arity=func.length])` | Curries from right. | `let add = _.curryRight((a, b, c) => a + b + c); add(3)(2)(1) // => 6` |
| `_.debounce(func, [wait=0], [options])` | Delays invocation. | `let debounced = _.debounce(() => console.log('called'), 1000); debounced(); debounced() // => Logs 'called' once after 1s` |
| `_.defer(func, [args])` | Defers until stack clears. | `_.defer(() => console.log('deferred')) // => Logs 'deferred' after stack clears` |
| `_.delay(func, wait, [args])` | Invokes after wait ms. | `_.delay(() => console.log('delayed'), 1000) // => Logs 'delayed' after 1s` |
| `_.flip(func)` | Reverses argument order. | `let flipped = _.flip((a, b) => [a, b]); flipped(1, 2) // => [2, 1]` |
| `_.memoize(func, [resolver])` | Caches results. | `let memoized = _.memoize(n => n * n); memoized(5); memoized(5) // => 25 (cached)` |
| `_.negate(predicate)` | Negates predicate result. | `let isOdd = n => n % 2 === 1; let isEven = _.negate(isOdd); isEven(2) // => true` |
| `_.once(func)` | Invokes func once. | `let once = _.once(() => 'done'); once(); once() // => 'done' (first call)` |
| `_.overArgs(func, [transforms])` | Transforms arguments. | `let doubled = _.overArgs((a, b) => [a, b], [x => x * 2, x => x * 3]); doubled(1, 2) // => [2, 6]` |
| `_.partial(func, [partials])` | Partially applies arguments. | `let greet = (greeting, name) => \`${greeting}, ${name}\`; let sayHello = _.partial(greet, 'Hello'); sayHello('World') // => 'Hello, World'` |
| `_.partialRight(func, [partials])` | Partially applies from right. | `let greet = (greeting, name) => \`${greeting}, ${name}\`; let greetWorld = _.partialRight(greet, 'World'); greetWorld('Hello') // => 'Hello, World'` |
| `_.rearg(func, indexes)` | Reorders arguments. | `let reordered = _.rearg((a, b, c) => [a, b, c], [2, 0, 1]); reordered(1, 2, 3) // => [3, 1, 2]` |
| `_.rest(func, [start=func.length-1])` | Trailing args as array. | `let rest = _.rest((first, ...rest) => [first, rest]); rest(1, 2, 3) // => [1, [2, 3]]` |
| `_.spread(func, [start=0])` | Spreads args into func. | `let spread = _.spread((array) => array.join('')); spread(['a', 'b', 'c']) // => 'abc'` |
| `_.throttle(func, [wait=0], [options])` | Limits invocation rate. | `let throttled = _.throttle(() => console.log('called'), 1000); throttled(); throttled() // => Logs 'called' once per second` |
| `_.unary(func)` | Accepts one argument. | `let unary = _.unary(parseInt); unary('10', 2) // => 10` |
| `_.wrap(value, [wrapper])` | Wraps value with wrapper. | `let wrapped = _.wrap(_.escape, str => \`<p>${str}</p>\`); wrapped('Hello & World') // => '<p>Hello & World</p>'` |

## Lang

| Method | Description | Example |
| --- | --- | --- |
| `_.castArray(value)` | Casts to array if not one. | `_.castArray(1) // => [1]` |
| `_.clone(value)` | Shallow clone. | `let obj = { a: 1 }; let clone = _.clone(obj); clone.a = 2 // => obj.a is 1` |
| `_.cloneDeep(value)` | Deep clone. | `let obj = { a: { b: 1 } }; let deepClone = _.cloneDeep(obj); deepClone.a.b = 2 // => obj.a.b is 1` |
| `_.cloneDeepWith(value, [customizer])` | Deep clone with customizer. | `let obj = { a: 1 }; let clone = _.cloneDeepWith(obj, val => val === 1 ? 42 : undefined) // => { a: 42 }` |
| `_.cloneWith(value, [customizer])` | Shallow clone with customizer. | `let obj = { a: 1 }; let clone = _.cloneWith(obj, val => val === 1 ? 42 : undefined) // => { a: 42 }` |
| `_.conformsTo(object, source)` | Checks if object conforms to predicates. | `let obj = { a: 1, b: 2 }; _.conformsTo(obj, { b: n => n > 1 }) // => true` |
| `_.eq(value, other)` | SameValueZero comparison. | `_.eq(NaN, NaN) // => true` |
| `_.gt(value, other)` | Checks if value > other. | `_.gt(3, 1) // => true` |
| `_.gte(value, other)` | Checks if value >= other. | `_.gte(3, 3) // => true` |
| `_.isArguments(value)` | Checks if arguments object. | `_.isArguments((function() { return arguments; })()) // => true` |
| `_.isArray(value)` | Checks if array. | `_.isArray([1, 2, 3]) // => true` |
| `_.isArrayBuffer(value)` | Checks if ArrayBuffer. | `_.isArrayBuffer(new ArrayBuffer(2)) // => true` |
| `_.isArrayLike(value)` | Checks if array-like. | `_.isArrayLike([1, 2, 3]) // => true` |
| `_.isArrayLikeObject(value)` | Checks if array-like object. | `_.isArrayLikeObject([1, 2, 3]) // => true` |
| `_.isBoolean(value)` | Checks if boolean. | `_.isBoolean(false) // => true` |
| `_.isBuffer(value)` | Checks if Buffer. | `_.isBuffer(Buffer.from('abc')) // => true` |
| `_.isDate(value)` | Checks if Date. | `_.isDate(new Date()) // => true` |
| `_.isElement(value)` | Checks if DOM element. | `_.isElement(document.body) // => true` |
| `_.isEmpty(value)` | Checks if empty. | `_.isEmpty({}) // => true` |
| `_.isEqual(value, other)` | Deep equality comparison. | `_.isEqual({ a: 1 }, { a: 1 }) // => true` |
| `_.isEqualWith(value, other, [customizer])` | Deep equality with customizer. | `_.isEqualWith({ a: 1 }, { a: 2 }, (v1, v2) => v1 === v2) // => false` |
| `_.isError(value)` | Checks if Error. | `_.isError(new Error()) // => true` |
| `_.isFinite(value)` | Checks if finite number. | `_.isFinite(3) // => true` |
| `_.isFunction(value)` | Checks if function. | `_.isFunction(() => {}) // => true` |
| `_.isInteger(value)` | Checks if integer. | `_.isInteger(3) // => true` |
| `_.isLength(value)` | Checks if valid array length. | `_.isLength(3) // => true` |
| `_.isMap(value)` | Checks if Map. | `_.isMap(new Map()) // => true` |
| `_.isMatch(object, source)` | Checks if object matches source. | `_.isMatch({ a: 1, b: 2 }, { a: 1 }) // => true` |
| `_.isMatchWith(object, source, [customizer])` | Like `isMatch`, with customizer. | `_.isMatchWith({ a: 1 }, { a: 2 }, (v1, v2) => v1 === v2) // => false` |
| `_.isNaN(value)` | Checks if NaN. | `_.isNaN(NaN) // => true` |
| `_.isNative(value)` | Checks if native function. | `_.isNative(Array.prototype.push) // => true` |
| `_.isNil(value)` | Checks if null or undefined. | `_.isNil(null) // => true` |
| `_.isNull(value)` | Checks if null. | `_.isNull(null) // => true` |
| `_.isNumber(value)` | Checks if number. | `_.isNumber(3) // => true` |
| `_.isObject(value)` | Checks if object. | `_.isObject({}) // => true` |
| `_.isObjectLike(value)` | Checks if object-like. | `_.isObjectLike({}) // => true` |
| `_.isPlainObject(value)` | Checks if plain object. | `_.isPlainObject({ a: 1 }) // => true` |
| `_.isRegExp(value)` | Checks if RegExp. | `_.isRegExp(/abc/) // => true` |
| `_.isSafeInteger(value)` | Checks if safe integer. | `_.isSafeInteger(3) // => true` |
| `_.isSet(value)` | Checks if Set. | `_.isSet(new Set()) // => true` |
| `_.isString(value)` | Checks if string. | `_.isString('abc') // => true` |
| `_.isSymbol(value)` | Checks if Symbol. | `_.isSymbol(Symbol('x')) // => true` |
| `_.isTypedArray(value)` | Checks if TypedArray. | `_.isTypedArray(new Uint8Array()) // => true` |
| `_.isUndefined(value)` | Checks if undefined. | `_.isUndefined(undefined) // => true` |
| `_.isWeakMap(value)` | Checks if WeakMap. | `_.isWeakMap(new WeakMap()) // => true` |
| `_.isWeakSet(value)` | Checks if WeakSet. | `_.isWeakSet(new WeakSet()) // => true` |
| `_.lt(value, other)` | Checks if value < other. | `_.lt(1, 3) // => true` |
| `_.lte(value, other)` | Checks if value <= other. | `_.lte(3, 3) // => true` |
| `_.toArray(value)` | Converts to array. | `_.toArray({ a: 1, b: 2 }) // => [1, 2]` |
| `_.toFinite(value)` | Converts to finite number. | `_.toFinite('3.2') // => 3.2` |
| `_.toInteger(value)` | Converts to integer. | `_.toInteger('3.2') // => 3` |
| `_.toLength(value)` | Converts to valid array length. | `_.toLength('3.2') // => 3` |
| `_.toNumber(value)` | Converts to number. | `_.toNumber('3.2') // => 3.2` |
| `_.toPlainObject(value)` | Converts to plain object. | `_.toPlainObject(new Map([['a', 1]])) // => { a: 1 }` |
| `_.toSafeInteger(value)` | Converts to safe integer. | `_.toSafeInteger('3.2') // => 3` |
| `_.toString(value)` | Converts to string. | `_.toString(null) // => ''` |

## Math

| Method | Description | Example |
| --- | --- | --- |
| `_.add(augend, addend)` | Adds two numbers. | `_.add(6, 4) // => 10` |
| `_.ceil(number, [precision=0])` | Rounds up to precision. | `_.ceil(4.006, 2) // => 4.01` |
| `_.divide(dividend, divisor)` | Divides two numbers. | `_.divide(6, 4) // => 1.5` |
| `_.floor(number, [precision=0])` | Rounds down to precision. | `_.floor(4.006, 2) // => 4` |
| `_.max(array)` | Maximum value. | `_.max([4, 2, 8, 6]) // => 8` |
| `_.maxBy(array, [iteratee])` | Maximum with iteratee. | `_.maxBy([{ n: 1 }, { n: 2 }], 'n') // => { n: 2 }` |
| `_.mean(array)` | Mean of array. | `_.mean([4, 2, 8, 6]) // => 5` |
| `_.meanBy(array, [iteratee])` | Mean with iteratee. | `_.meanBy([{ n: 4 }, { n: 2 }, { n: 8 }], 'n') // => 4.666...` |
| `_.min(array)` | Minimum value. | `_.min([4, 2, 8, 6]) // => 2` |
| `_.minBy(array, [iteratee])` | Minimum with iteratee. | `_.minBy([{ n: 1 }, { n: 2 }], 'n') // => { n: 1 }` |
| `_.multiply(multiplier, multiplicand)` | Multiplies two numbers. | `_.multiply(6, 4) // => 24` |
| `_.round(number, [precision=0])` | Rounds to precision. | `_.round(4.006, 2) // => 4.01` |
| `_.subtract(minuend, subtrahend)` | Subtracts two numbers. | `_.subtract(6, 4) // => 2` |
| `_.sum(array)` | Sum of array. | `_.sum([4, 2, 8, 6]) // => 20` |
| `_.sumBy(array, [iteratee])` | Sum with iteratee. | `_.sumBy([{ n: 4 }, { n: 2 }, { n: 8 }], 'n') // => 14` |

## Number

| Method | Description | Example |
| --- | --- | --- |
| `_.clamp(number, [lower], upper)` | Clamps number in bounds. | `_.clamp(-10, -5, 5) // => -5` |
| `_.inRange(number, [start=0], end)` | Checks if in range. | `_.inRange(3, 2, 4) // => true` |
| `_.random([lower=0], [upper=1], [floating])` | Random number in bounds. | `_.random(0, 5) // => e.g., 4` |

## Object

| Method | Description | Example |
| --- | --- | --- |
| `_.assign(object, [sources])` | Assigns source properties. | `_.assign({ a: 1 }, { b: 2 }, { a: 3 }) // => { a: 3, b: 2 }` |
| `_.assignIn(object, [sources])` | Assigns including inherited. | `function Foo() { this.c = 3; } Foo.prototype.d = 4; _.assignIn({ a: 1 }, new Foo()) // => { a: 1, c: 3, d: 4 }` |
| `_.assignInWith(object, [sources], [customizer])` | Like `assignIn`, with customizer. | `_.assignInWith({ a: 1 }, { b: 2 }, (objVal, srcVal) => objVal || srcVal) // => { a: 1, b: 2 }` |
| `_.assignWith(object, [sources], [customizer])` | Like `assign`, with customizer. | `_.assignWith({ a: 1 }, { b: 2 }, (objVal, srcVal) => objVal || srcVal) // => { a: 1, b: 2 }` |
| `_.at(object, [paths])` | Values at paths. | `_.at({ 'a': [{ 'b': { 'c': 3 } }] }, ['a[0].b.c', 'a[0]']) // => [3, { b: { c: 3 } }]` |
| `_.create(prototype, [properties])` | Object with prototype. | `let proto = { greet: () => 'hello' }; let obj = _.create(proto, { a: 1 }) // => { a: 1 }, with proto` |
| `_.defaults(object, [sources])` | Assigns defaults if undefined. | `_.defaults({ a: 1 }, { a: 2, b: 3 }) // => { a: 1, b: 3 }` |
| `_.defaultsDeep(object, [sources])` | Deep defaults. | `_.defaultsDeep({ a: { b: 1 } }, { a: { b: 2, c: 3 } }) // => { a: { b: 1, c: 3 } }` |
| `_.toPairs(object)` | Key-value pairs (alias: `entries`). | `_.toPairs({ a: 1, b: 2 }) // => [['a', 1], ['b', 2]]` |
| `_.toPairsIn(object)` | Key-value pairs, inherited (alias: `entriesIn`). | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.toPairsIn(new Foo()) // => [['a', 1], ['b', 2]]` |
| `_.findKey(object, [predicate])` | Key of first matching element. | `_.findKey({ a: 1, b: 2, c: 3 }, n => n > 1) // => 'b'` |
| `_.findLastKey(object, [predicate])` | Key of last matching element. | `_.findLastKey({ a: 1, b: 2, c: 3 }, n => n > 1) // => 'c'` |
| `_.forIn(object, [iteratee])` | Iterates own and inherited. | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.forIn(new Foo(), (value, key) => console.log(key)) // => Logs: 'a', 'b'` |
| `_.forInRight(object, [iteratee])` | Like `forIn`, right to left. | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.forInRight(new Foo(), (value, key) => console.log(key)) // => Logs: 'b', 'a'` |
| `_.forOwn(object, [iteratee])` | Iterates own properties. | `_.forOwn({ a: 1, b: 2 }, (value, key) => console.log(key)) // => Logs: 'a', 'b'` |
| `_.forOwnRight(object, [iteratee])` | Like `forOwn`, right to left. | `_.forOwnRight({ a: 1, b: 2 }, (value, key) => console.log(key)) // => Logs: 'b', 'a'` |
| `_.functions(object)` | Own method names. | `_.functions({ a: 1, b: () => {}, c: () => {} }) // => ['b', 'c']` |
| `_.functionsIn(object)` | Own and inherited method names. | `function Foo() { this.a = () => {}; } Foo.prototype.b = () => {}; _.functionsIn(new Foo()) // => ['a', 'b']` |
| `_.get(object, path, [defaultValue])` | Value at path, with default. | `_.get({ a: [{ b: 2 }] }, 'a[0].b', 0) // => 2` |
| `_.has(object, path)` | Checks if path exists. | `_.has({ a: { b: 2 } }, 'a.b') // => true` |
| `_.hasIn(object, path)` | Checks if path exists, inherited. | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.hasIn(new Foo(), 'b') // => true` |
| `_.invert(object)` | Inverts keys and values. | `_.invert({ a: '1', b: '2' }) // => { '1': 'a', '2': 'b' }` |
| `_.invertBy(object, [iteratee])` | Inverts with iteratee grouping. | `_.invertBy({ a: 1, b: 1, c: 3 }, v => v) // => { '1': ['a', 'b'], '3': ['c'] }` |
| `_.invoke(object, path, [args])` | Invokes method at path. | `_.invoke({ a: [{ b: () => 42 }] }, 'a[0].b') // => 42` |
| `_.keys(object)` | Own property names. | `_.keys({ a: 1, b: 2 }) // => ['a', 'b']` |
| `_.keysIn(object)` | Own and inherited property names. | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.keysIn(new Foo()) // => ['a', 'b']` |
| `_.mapKeys(object, [iteratee])` | Maps keys. | `_.mapKeys({ a: 1, b: 2 }, (value, key) => key + value) // => { a1: 1, b2: 2 }` |
| `_.mapValues(object, [iteratee])` | Maps values. | `_.mapValues({ a: 1, b: 2 }, v => v * 2) // => { a: 2, b: 4 }` |
| `_.merge(object, [sources])` | Merges sources recursively. | `_.merge({ a: { b: 1 } }, { a: { c: 2 } }) // => { a: { b: 1, c: 2 } }` |
| `_.mergeWith(object, [sources], [customizer])` | Merges with customizer. | `_.mergeWith({ a: 1 }, { a: 2 }, (objVal, srcVal) => objVal + srcVal) // => { a: 3 }` |
| `_.omit(object, [paths])` | Omits specified properties. | `_.omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // => { b: 2 }` |
| `_.omitBy(object, [predicate])` | Omits where predicate is true. | `_.omitBy({ a: 1, b: 2, c: 3 }, v => v % 2) // => { b: 2 }` |
| `_.pick(object, [paths])` | Picks specified properties. | `_.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // => { a: 1, c: 3 }` |
| `_.pickBy(object, [predicate])` | Picks where predicate is true. | `_.pickBy({ a: 1, b: 2, c: 3 }, v => v % 2) // => { a: 1, c: 3 }` |
| `_.result(object, path, [defaultValue])` | Resolves value at path. | `_.result({ a: () => 42 }, 'a', 0) // => 42` |
| `_.set(object, path, value)` | Sets value at path. | `_.set({ a: [{ b: 0 }] }, 'a[0].b', 1) // => { a: [{ b: 1 }] }` |
| `_.setWith(object, path, value, [customizer])` | Like `set`, with customizer. | `_.setWith({}, '[0][1]', 'a', Object) // => { '0': { '1': 'a' } }` |
| `_.transform(object, [iteratee], [accumulator])` | Transforms to accumulator. | `_.transform({ a: 1, b: 2 }, (result, value, key) => { result[key] = value * 2; }, {}) // => { a: 2, b: 4 }` |
| `_.unset(object, path)` | Removes property at path. | `_.unset({ a: [{ b: 1 }] }, 'a[0].b') // => { a: [{}] }` |
| `_.update(object, path, updater)` | Updates value at path. | `_.update({ a: 1 }, 'a', n => n * 2) // => { a: 2 }` |
| `_.updateWith(object, path, updater, [customizer])` | Like `update`, with customizer. | `_.updateWith({}, '[0][1]', () => 'a', Object) // => { '0': { '1': 'a' } }` |
| `_.values(object)` | Own property values. | `_.values({ a: 1, b: 2 }) // => [1, 2]` |
| `_.valuesIn(object)` | Own and inherited values. | `function Foo() { this.a = 1; } Foo.prototype.b = 2; _.valuesIn(new Foo()) // => [1, 2]` |

## String

| Method | Description | Example |
| --- | --- | --- |
| `_.camelCase([string=''])` | Converts to camelCase. | `_.camelCase('Foo Bar') // => 'fooBar'` |
| `_.capitalize([string=''])` | Capitalizes first character. | `_.capitalize('fred') // => 'Fred'` |
| `_.deburr([string=''])` | Removes diacritical marks. | `_.deburr('déjà vu') // => 'deja vu'` |
| `_.endsWith([string=''], target, [position])` | Checks if ends with target. | `_.endsWith('abc', 'c') // => true` |
| `_.escape([string=''])` | Escapes HTML characters. | `_.escape('Fred & Barney') // => 'Fred &amp; Barney'` |
| `_.escapeRegExp([string=''])` | Escapes RegExp characters. | `_.escapeRegExp('[lodash](https://lodash.com/)') // => '\[lodash\]\(https://lodash\.com/\)'` |
| `_.kebabCase([string=''])` | Converts to kebab-case. | `_.kebabCase('Foo Bar') // => 'foo-bar'` |
| `_.lowerCase([string=''])` | Converts to lowercase with spaces. | `_.lowerCase('FooBar') // => 'foo bar'` |
| `_.lowerFirst([string=''])` | Lowercases first character. | `_.lowerFirst('Fred') // => 'fred'` |
| `_.pad([string=''], [length=0], [chars=' '])` | Pads to length. | `_.pad('abc', 8, '_') // => '__abc___'` |
| `_.padEnd([string=''], [length=0], [chars=' '])` | Pads end to length. | `_.padEnd('abc', 6, '_') // => 'abc___'` |
| `_.padStart([string=''], [length=0], [chars=' '])` | Pads start to length. | `_.padStart('abc', 6, '_') // => '___abc'` |
| `_.parseInt(string, [radix=10])` | Parses to integer. | `_.parseInt('08') // => 8` |
| `_.repeat([string=''], [n=1])` | Repeats string `n` times. | `_.repeat('abc', 2) // => 'abcabc'` |
| `_.replace([string=''], pattern, replacement)` | Replaces pattern. | `_.replace('Hi Fred', 'Fred', 'Barney') // => 'Hi Barney'` |
| `_.snakeCase([string=''])` | Converts to snake_case. | `_.snakeCase('Foo Bar') // => 'foo_bar'` |
| `_.split([string=''], separator, [limit])` | Splits by separator. | `_.split('a-b-c', '-', 2) // => ['a', 'b']` |
| `_.startCase([string=''])` | Converts to Start Case. | `_.startCase('fooBar') // => 'Foo Bar'` |
| `_.startsWith([string=''], target, [position=0])` | Checks if starts with target. | `_.startsWith('abc', 'a') // => true` |
| `_.template([string=''], [options])` | Compiles template string. | `let compiled = _.template('hello <%= user %>!'); compiled({ user: 'fred' }) // => 'hello fred!'` |
| `_.toLower([string=''])` | Converts to lowercase. | `_.toLower('Foo') // => 'foo'` |
| `_.toUpper([string=''])` | Converts to uppercase. | `_.toUpper('foo') // => 'FOO'` |
| `_.trim([string=''], [chars])` | Trims chars from ends. | `_.trim('  abc  ') // => 'abc'` |
| `_.trimEnd([string=''], [chars])` | Trims chars from end. | `_.trimEnd('  abc  ') // => '  abc'` |
| `_.trimStart([string=''], [chars])` | Trims chars from start. | `_.trimStart('  abc  ') // => 'abc  '` |
| `_.truncate([string=''], [options])` | Truncates if over length. | `_.truncate('hi there', { length: 5 }) // => 'hi...'` |
| `_.unescape([string=''])` | Unescapes HTML characters. | `_.unescape('Fred &amp; Barney') // => 'Fred & Barney'` |
| `_.upperCase([string=''])` | UppercaseWITH spaces. | `_.upperCase('fooBar') // => 'FOO BAR'` |
| `_.upperFirst([string=''])` | Uppercases first character. | `_.upperFirst('fred') // => 'Fred'` |
| `_.words([string=''], [pattern])` | Splits into words. | `_.words('fred, barney, & pebbles') // => ['fred', 'barney', 'pebbles']` |

## Util

| Method | Description | Example |
| --- | --- | --- |
| `_.attempt(func, [args])` | Attempts func, returns result or error. | `_.attempt(() => JSON.parse('a')) // => SyntaxError` |
| `_.bindAll(object, methodNames)` | Binds methods to object. | `let obj = { name: 'fred', greet: function() { return this.name; } }; _.bindAll(obj, ['greet']); obj.greet() // => 'fred'` |
| `_.cond(pairs)` | Applies conditional predicates. | `let func = _.cond([[_.matches({ a: 1 }), () => 'matches A'], [_.matches({ b: 2 }), () => 'matches B']]); func({ a: 1 }) // => 'matches A'` |
| `_.conforms(source)` | Checks if conforms to source. | `let conforms = _.conforms({ a: n => n > 1 }); conforms({ a: 2 }) // => true` |
| `_.constant(value)` | Returns value. | `let alwaysFive = _.constant(5); alwaysFive() // => 5` |
| `_.defaultTo(value, defaultValue)` | Returns value or default. | `_.defaultTo(undefined, 42) // => 42` |
| `_.flow([funcs])` | Composes functions left to right. | `let squareThenAdd = _.flow([n => n * n, n => n + 1]); squareThenAdd(2) // => 5` |
| `_.flowRight([funcs])` | Composes right to left. | `let addThenSquare = _.flowRight([n => n * n, n => n + 1]); addThenSquare(2) // => 9` |
| `_.identity(value)` | Returns first argument. | `_.identity(42) // => 42` |
| `_.iteratee([value])` | Creates function from value. | `let func = _.iteratee('a'); func({ a: 1, b: 2 }) // => 1` |
| `_.matches(source)` | Partial deep comparison. | `let isAMatch = _.matches({ a: 1 }); isAMatch({ a: 1, b: 2 }) // => true` |
| `_.matchesProperty(path, srcValue)` | Checks if path matches value. | `let hasA1 = _.matchesProperty('a', 1); hasA1({ a: 1, b: 2 }) // => true` |
| `_.method(path, [args])` | Invokes method at path. | `let invokeB = _.method('b'); invokeB({ b: () => 42 }) // => 42` |
| `_.methodOf(object, [args])` | Invokes method on object. | `let callGreet = _.methodOf({ greet: name => \`hi ${name}\` }, 'fred'); callGreet() // => 'hi fred'` |
| `_.mixin([object=lodash], source, [options])` | Mixes methods into Lodash. | `_.mixin({ myFunc: () => 42 }); _.myFunc() // => 42` |
| `_.noConflict()` | Reverts `_` to original. | `let lodash = _.noConflict() // => Restores original `_`` |
| `_.noop()` | No-operation function. | `_.noop() // => undefined` |
| `_.nthArg([n=0])` | Returns nth argument. | `let second = _.nthArg(1); second('a', 'b', 'c') // => 'b'` |
| `_.over([iteratees])` | Applies multiple iteratees. | `let func = _.over([Math.max, Math.min]); func(1, 2, 3, 4) // => [4, 1]` |
| `_.overEvery([predicates])` | Checks if all predicates pass. | `let isBigEnough = _.overEvery([n => n > 0, n => n < 10]); isBigEnough(5) // => true` |
| `_.overSome([predicates])` | Checks if any predicate passes. | `let isValid = _.overSome([_.isNumber, _.isString]); isValid(42) // => true` |
| `_.property(path)` | Returns value at path. | `let getA = _.property('a'); getA({ a: 1 }) // => 1` |
| `_.propertyOf(object)` | Returns value at path on object. | `let getProp = _.propertyOf({ a: { b: 2 } }); getProp('a.b') // => 2` |
| `_.range([start=0], end, [step=1])` | Array of numbers in range. | `_.range(1, 5) // => [1, 2, 3, 4]` |
| `_.rangeRight([start=0], end, [step=1])` | Like `range`, right to left. | `_.rangeRight(1, 5) // => [4, 3, 2, 1]` |
| `_.runInContext([context])` | Lodash in custom context. | `let custom = _.runInContext(); custom([1, 2, 3]).map(n => n * 2).value() // => [2, 4, 6]` |
| `_.stubArray()` | Empty array. | `_.stubArray() // => []` |
| `_.stubFalse()` | Returns false. | `_.stubFalse() // => false` |
| `_.stubObject()` | Empty object. | `_.stubObject() // => {}` |
| `_.stubString()` | Empty string. | `_.stubString() // => ''` |
| `_.stubTrue()` | Returns true. | `_.stubTrue() // => true` |
| `_.times(n, [iteratee])` | Invokes iteratee `n` times. | `_.times(3, i => i * 2) // => [0, 2, 4]` |
| `_.toPath(value)` | Converts to property path. | `_.toPath('a.b.c') // => ['a', 'b', 'c']` |
| `_.uniqueId([prefix=''])` | Generates unique ID. | `_.uniqueId('id_') // => 'id_1'` |
