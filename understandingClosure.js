//----CLOSURE ex.

var greet = function(whattosay){

  return function(name){
    console.log(whattosay + ' ' +name);
  };

}

var sayHi = greet('Hi'); // sayHi Returned function and then popped its execution context out of the stack.
                          // But the variable env of the greet function which contains 'whattosay' var still is alive in the memory space

sayHi('Pratik'); // Still

// -------------------------------------------------------------------------------------------------
//----CLOSURE ex 2

function buildFunctions(){

  var arr = [];

  for(var i = 0; i<3; i++){
    arr.push(function(){
      console.log(i);
    }(i));
  }

  return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();

// -------------------------------------------------------------------------------------------------

// functions Factory

function makeGreeting(language) {

  return function(firstname, lastname){

    if(language === 'en'){
      console.log('Hi ' + firstname + ' ' + lastname);
    }

    if(language === 'es'){
      console.log('Hola '+ firstname + ' ' + lastname);
    }

  }

}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Pratik', 'Makune');
greetSpanish('Pratik', 'Makune');

// -------------------------------------------------------------------------------------------------


// call(), apply(), bind()

// functionObject.bind(object which can be referred by 'this' keyword)
var person = {
  firstname: 'Pratik',
  lastname: 'Makune',
  getFullname: function(){
    return this.firstname + ' ' + this.lastname;
  }
}

var logName = function(language1, language2){
  return this.getFullname();
};               // bind(object) method on the function object creates the copy of that function object and
                                //attaches/binds that particular function with the parameter 'object'
                                  // this == parameter object
                                    // bind does not executes the function.
                                     // You have to explicitly call the function, in this case logPersonName();
var logPersonName = logName.bind(person);   // logPersonName is the copy of function object 'logName'
console.log(logPersonName());

  // ==========

//functionObject.call(object, args)

console.log(logName.call(person, 'en', 'es'));   //call Does the same thing as bind except --> 1. Doesn't make copy  2.Directly executes the functionObject
                                      // person object can be referred by 'this' and the arguments can be passed like 'en', 'es'

//functionObject.call(object, [args])

console.log(logName.apply(person, ['en', 'es']));  // Exactly same as call except --> accepts array of parameters. Can be useful in mathematical circumstances


// Usecases of call, apply, bind

// function borrowing
var person2 = {
  firstname: 'Anna',
  lastname: 'Doe'
}

console.log(person.getFullname.apply(person2));   // borrowing the function from person object and using it on person2. This works as long as
                                                    //person2 object also has the same set of args

// 2. function currying ==> Creating a copy of a function but with some preset parameters : Useful in mathematical situations.

function multiply(a, b){
  return a*b;
}

var multiplyByTwo = multiply.bind(this, 2)      // Makes the copy of multiply function object. Sets the first parameter a = 2 permanently
console.log(multiplyByTwo(4));                  // Passing the second parameter as b=4, hence returns 8

var multiplyByThree = multiply.bind(this, 3)
console.log(multiplyByThree(4));                  // Passing the second parameter as b=4, hence returns 12

