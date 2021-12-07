a = [ { a: 5, b: 2}, { c: 8, d: 6}];
b = a;

console.table({a, b});

b[0] = { d: 4, e: 9 };

console.table({a, b});