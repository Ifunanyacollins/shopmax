const add = (a,b) => a + b

test('should add two numbers',() => {
const result = add(3,4);

if(result !== 3 + 4){
    throw new Error('didnt work')
}
});