var date = new Date(2009, 11, 5);
console.log(date.strftime("%Y"));
console.log(date.strftime("%m"));
console.log(date.strftime("%d"));
console.log(date.strftime("%y"));
console.log(date.strftime("%F"));



function assert(message, expr){
  if(!expr){
    throw new Error(message);
  }

  assert.count++;
  return true;
}
assert.count = 0;

date = new Date(2009, 9, 2);

try{
  assert("%Y should return full year",
  date.strftime("%Y") === "2009");
  assert("%m should return month",
  date.strftime("%m") === "09"); // error
  assert("%d should return date",
  date.strftime("%d") === "02");
  assert("%y should return year as two digits",
  date.strftime("%y") === "09");
  assert("%F should act as %Y-%m-%d",
  date.strftime("%F") === "2009-10-02");
}catch(e){
  console.log("test failed: " + e.message);
}



function output(text, color){
  var p = document.createElement("p");
  p.innerHTML = text;
  p.style.color = color;
  document.body.appendChild(p);
}

try{
  assert("%Y should return full year",
  date.strftime("%Y") === "2009");
  assert("%m should return month",
  date.strftime("%m") === "09"); // error
  assert("%d should return date",
  date.strftime("%d") === "02");
  assert("%y should return year as two digits",
  date.strftime("%y") === "09");
  assert("%F should act as %Y-%m-%d",
  date.strftime("%F") === "2009-10-02");
}catch(e){
  output("test failed: " + e.message, "#c00");
}



function testCase(name, tests){
  assert.count = 0;
  var successful = 0;
  var testCount = 0;
  var hasSetup = typeof tests.setUp == "function";
  var hasTeardown = typeof tests.tearDown == "function";
  for(var test in tests){
    if(!/^test/.test(test)){
      continue;
    }

    testCount++;

    try{
      if(hasSetup){
        tests.setUp();
      }
      tests[test]();
      output(test, "#0c0");
      if(hasTeardown){
        tests.tearDown();
      }
      successful++;
    }catch(e){
      output(test + " failed: " + e.message, "#c00");
    }
  }

  var color = successful == testCount ? "#0c0" : "#c00";
  output("<strong>" + name + " : " + testCount + " tests, " + (testCount - successful) + " failures</strong>", color);
}

testCase("strftime test", {
  setUp: function(){
    this.date = new Date(2009, 9, 2, 22, 14, 45);
  },
  "test format specifier %Y": function(){
    assert("%Y should return full year", date.strftime("%Y") === "2009");
  },
  "test format specifier %m": function(){
    assert("%m should return month", date.strftime("%m") === "09"); // error
  },
  "test format specifier %d": function(){
    assert("%d should return date", date.strftime("%d") === "02");
  },
  "test format specifier %y": function(){
    assert("%y should return year as two digits", date.strftime("%y") === "09");
  },
  "test format specifier %F": function(){
    assert("%F should act as %Y-%m-%d", date.strftime("%F") === "2009-10-02");
  },
});
