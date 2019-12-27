//工厂模式
//function Person(name, age){
//    var o = new Object();
//    o.name = name;
//    o.age = age;
//    o.sayName = function(){
//        alert(this.name);
//    }
//    return o;
//}
//var person = new Person('xhdong', 25);
//person.sayName();

//构造函数模式
//function Person(name, age){
//    this.name = name;
//    this.age = age;
//    //this.sayName = function(){
//    //    alert(this.age);
//    //}
//    this.sayName = sayName;
//}
//function sayName(){
//    alert(this.name);
//}
//var person = new Person('xhdong', 25);
//person.sayName();

//原型链模式
//function Person() {
//}
//Person.prototype = {
//    //constructor: Person,
//    name: 'xhdong',
//    age: '25',
//    arr: ['zhangsan', 30, 'software engineer'],
//    sayName: function(){
//        alert(this.name);
//    }
//}
////为该对象再次添加一个方法
//Person.prototype.sayHi = function(){
//    alert('hello world')
//}
//var person = new Person();
//person.sayName();
//person.sayHi();
////用对象的实例去添加内容,而不是直接给对象添加
//person.arr.push('150000');
//alert(person.arr);