var NEWWORLD;


function iterate(){
  NEWWORLD=JSON.parse(JSON.stringify(WORLD));//Copy Array
  var SUBSTITUTED=JSON.parse(JSON.stringify(WORLD)).map(x=>x.map(y=>false));//Copy Array
  
  //For every Rule
  RULES.map(function(x){
    for(var i=0;i<WORLD.length;i++){
      for(var j=0;j<WORLD[i].length;j++){
        if(checkRule(x,i,j)&&!hasBeenSubstituted(x[0],i,j,SUBSTITUTED)){//Found Match, replace
          //Pick a random replacement;
          var rnd=x[1][Math.floor(Math.random()*x[1].length)];
          replaceWorld(rnd,i,j,SUBSTITUTED);
        }
      }
    }
  })

  WORLD=JSON.parse(JSON.stringify(NEWWORLD));//Replace


  // RULES.map(function(x){
  //   var match=x[0];
  //   var repl=x[1];
  //   //console.log(match);
  //   for(var i=0;i<WORLD.length;i++){
  //     var index=WORLD[i].indexOf(match[0]);
  //     var patterns=[];
  //     var strs=[];
  //     for(var j=0;j<match.length;j++){//For all lines of pattern
  //       patterns.push(match[j]);
  //       strs.push(WORLD[i+j]);
  //       var replaceIts=getIndices(patterns,strs);
  //     //  console.log(replaceIts);
  //     }
  //
  //     // if(index!=-1){//Found Match
  //     //   var rnd=Math.floor(Math.random()*repl.length);
  //     //   WORLD[i]=WORLD[i].replace(match,repl[rnd]);
  //     // }
  //   }
  // })

  //Shuffle rules to ensure fairness
  RULES=shuffle(RULES);
}

function replaceWorld(pattern,i,j,SUBSTITUTED){
  var dimX=pattern[0].length;
  var dimY=pattern.length;
  for(var a=0;a<dimX;a++){
    for(var b=0;b<dimY;b++){
      NEWWORLD[i+a][j+b]=pattern[b][a];
      //Mark Substituted
      if(WORLD[i+a][j+b]!=NEWWORLD[i+a][j+b]){
        SUBSTITUTED[i+a][j+b]=true;
      }
    }
  }
}

function hasBeenSubstituted(pattern,i,j,SUBSTITUTED){
  var dimX=pattern[0].length;
  var dimY=pattern.length;
  for(var a=0;a<dimX;a++){
    for(var b=0;b<dimY;b++){
      if(SUBSTITUTED[i+a][j+b]==true){//At least one tile has already been substituted
        return true;
      }
    }
  }
  return false;
}

function getIndices(patterns,strs){
  var out=[];
  var temps=[];
  for(var i=0;i<patterns.length;i++){//Find all matching indices
    var temp=[];
    var offset=0;
    while(strs[i].indexOf(patterns[i],offset)!=-1){
      var to=strs[i].indexOf(patterns[i],offset);
      temp.push(to);
      offset=to+1;
    }
    temps.push(temp)
  }

  if(temps.length==1){
    return temps;
  }

  for(var i=0;i<temps[0].length;i++){//Check all indices in first
    var bool=true;
    for(var j=0;j<temps.length;j++){//Check all others
      if(!temps[j].includes(temps[0][i])){
        bool=false;
      }
    }
    if(bool){
      out.push(temps[0][i]);
    }
  }

  return out;
}



function checkRule(rule,i,j){
  var match=rule[0];
  var dimX=rule[0][0].length;
  var dimY=rule[0].length;
  var extract=[];
  for(var a=0;a<dimY;a++){
    var temp=[];
    for(var b=0;b<dimX;b++){
      var tile=WORLD[i+b][j+a];
      if(!tile){
        return false;
      }
      temp.push(tile);
    }
    extract.push(temp);
  }
  if(checkArr(match,extract)){
    return true;
  }else{
    return false;
  }



}
function checkArr(a1,a2){
    return JSON.stringify(a1)==JSON.stringify(a2);
    if(a1.length!=a2.length){
      return false;
    }
    for(var i=0;i<a1.length;i++){
      if(typeof a1[i] == "object"){
        if(typeof a2[i] == "object"){
          if(checkArr(a1[i],a2[i])==false){
            return false;
          }
        }else{
          return false;
        }
      }else{
        if(a1!=a2){
          return false;
        }
      }
    }
    return true;
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}