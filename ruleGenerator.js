var RULESTXT="";

RULESTXT+=new Rule(`š„š¢\nš„š¢`,`š„š„\nš„š„`).rotations().render();




function Rule(i,o,template){
  this.input=i;
  this.output=o;
  this.rotations=function(){

  }
  this.render()=function{
    return this.txt;
  }
}
