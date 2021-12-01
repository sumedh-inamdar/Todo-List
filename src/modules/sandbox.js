const obj = {
    a: () => {
        console.log('a');
    },
    b: () => {
        console.log('b');
    },
    c: () => {
        obj.a();
    }
}

obj.c();