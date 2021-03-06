function Rule(i,o,settings){
    var out = [];
    if(settings&&settings.rotation){
        out = [
            [
                transpose(i),
                o.map(x=>transpose(x))
            ],
            [
                invert(transpose(i)),
                o.map(x=>invert(transpose(x)))
            ],
            [
                i,
                o.map(x=>x)
            ],
            [
                invert(i),
                o.map(x=>invert(x))
            ],

        ]
    }else{
        out = [[
            transpose(i),
            o.map(x=>transpose(x))
        ]]
    }


    if(settings&&settings.substitute){
        //Iterate over every rule substituting in characters
        var nout = [];
        for(var i=0;i<out.length;i++){//For every rule do substitutions
            nout=nout.concat(substituteMultiple([out[i]],Object.keys(settings.substitute),settings.substitute))
        }
        return nout;
    }else{
        return out;
    }
}


//Hierarchy of Configurations
var ENTITY={
    CHARACTER:{
      STAND:"๐ถ",
      WALK:"๐ถ",
      RUN:"๐",
      SWIM:"๐"
    },
    PEOPLE:{
      FARMER_MAN:"๐จโ๐พ",
      FARMER_WOMAN:"โ๐ฉโ๐พ",
      COOK_MAN:"๐จโ๐ณ",
      COOK_WOMAN:"๐ฉโ๐ณ",
      BLACKSMITH:"๐จโ๐งโ",
      ELF_KING:"๐ง",
      ELF_MAN:"๐งโโ",
      ELF_WOMAN:"๐ง",
      GUARD:"๐",
      KING:"๐คด",
      QUEEN:"๐ธ",
      GENIE:"๐ง",
      WIZARD:"๐ง"
    },
    MONSTER:{
      ANGEL:"๐ผ",
      DEMON:"๐ฟ",
      ZOMBIE:"๐ง",
      VAMPIRE_MAN:"๐ง",
      VAMPIE_WOMAN:"๐งโ",
      DRAGON:"๐",
      SANTA:"๐",
      MSCLAUS:"๐คถ",
      OGRE:"๐น",
      DINOSAUR:"๐ฆ",
      RAPTOR:"๐ฆ",
      DISEASE:"๐ฆ "
    },
    ANIMAL:{
      CRAB:"๐ฆ",
      LOBSTER:"๐ฆ",
      MONKEY:"๐",
      BABOON:"๐ฆ",
      CHIMP:"๐ฆง",
      DOG:"๐",
      POODLE:"๐ฉ",
      TIGER:"๐",
      LION:"๐",
      HORSE:"๐",
      UNICORN:"๐ฆ",
      ELK:"๐ฆ",
      YAK:"๐",
      COW:"๐",
      OX:"๐",
      PIG:"๐",
      SHEEP:"๐",
      GOAT:"๐",
      CAMEL:"๐ช",
      LLAMA:"๐ฆ",
      ELEPHANT:"๐",
      RHINO:"๐ฆ",
      MOUSE:"๐",
      RAT:"๐",
      HEDGEHOG:"๐ฆ",
      RABBIT:"๐",
      BAT:"๐ฆ",
      SLOTH:"๐ฆฅ",
      OTTER:"๐ฆฆ",
      SKUNK:"๐ฆจ",
      TURKEY:"๐ฆ",
      CHICKEN:"๐",
      CHICK:"๐ฃ",
      BABY_CHICK:"๐ค",
      ROBIN:"๐ฆ",
      TOUCAN:"๐ง",
      EAGLE:"๐ฆ",
      DUCK:"๐ฆ",
      SWAN:"๐ฆข",
      OWL:"๐ฆ",
      FLAMINGO:"๐ฆฉ",
      PEACOCK:"๐ฆ",
      PARROT:"๐ฆ",
      CROCODILE:"๐",
      TURTLE:"๐ข",
      LIZARD:"๐ฆ",
      SNAKE:"๐",
      WHALE:"๐ณ",
      SHARK:"๐ฆ",
      FISH:"๐ ",
      PUFFERFISH:"๐ก",
      OCTOPUS:"๐",
      SNAIL:"๐",
      CATERPILLAR:"๐",
      BUTTERFLY:"๐ฆ",
      ANT:"๐",
      BEE:"๐",
      SCORPION:"๐ฆ"
    },
    FOOD:{
      GRAPE:"๐",
      WATERMELON:"๐",
      ORANGE:"๐",
      LEMON:"๐",
      BANANA:"๐",
      PINEAPPLE:"๐",
      APPLE_RED:"๐",
      APPLE_GREEN:"๐",
      PEAR:"๐",
      PEACH:"๐",
      CHERRY:"๐",
      STRAWBERYY:"๐",
      KIWI:"๐ฅ",
      TOMATO:"๐",
      PUMPKIN:"๐",
      COCONUT:"๐ฅฅ",
      AVOCADO:"๐ฅ",
      EGGPLANT:"๐",
      CARROT:"๐ฅ",
      CORN:"๐ฝ",
      CUCUMBER:"๐ฅ",
      BROCOLLI:"๐ฅฆ",
      GARLIC:"๐ง",
      ONION:"๐ง",
      MUSHROOM:"๐",
      BREAD:"๐",
      CROISSANT:"๐ฅ",
      PRETZEL:"๐ฅจ",
      CHEESE:"๐ง",
      PORK:"๐",
      POULTRY:"๐",
      STEAK:"๐ฅฉ",
      BACON:"๐ฅ",
      EGG:"๐ฅ",
      SOUP:"๐ฅฃ",
      BUTTER:"๐ง",
      COOKED_SHRIMP:"๐ค",
      MILK:"๐ฅ",
      BEER:"๐บ",
      WINE:"๐ท",
      CAKE:"๐ฐ",
      ICE:"๐ง"
    },
    TOOL:{
      DAGGER:"๐ช",
      HAMMER:"๐จ",
      AXE:"๐ช",
      PICKAXE:"โ",
      SWORD:"โ",
      BOW:"๐น",
      SHIELD:"๐ฐ"
    },
    ITEM:{
      STRING:"๐งต",
      YARN:"๐งถ",
      DIAMOND:"๐",
      KEY:"๐",
      BOOK:"๐",
      SPELLBOOK:"๐",
      MAP:"๐",
      SCROLL:"๐งพ",
      MONEY:"๐ฐ",
      FLOWERS:"๐",
      SHELL:"๐"
    },
    SCENERY:{
      DIRT:"๐ค",
      GRASS:"๐ข",
      ROCK:"โช",
      BEACH:"๐ก",
      WATER:"๐ต",
      OIL:"โซ",
      LAVA:"๐ ",
    },
    PLANTS:{
      ROSE:"๐น",
      ROSE_DEAD:"๐ฅ",
      DAISY:"๐ผ",
      TULIP:"๐ท",
      SUNFLOWER:"๐ป",
      SEED:"๐ฑ",
      PINE_TREE:"๐ฒ",
      PALM_TREE:"๐ด",
      CACTUS:"๐ต",
      WHEAT:"๐พ",
      CLOVER:"๐",
      LEAF:"๐",
    },
    BUILDINGS:{
        CASTLE:"๐ฐ",
        HOUSE:"๐",
        CHURCH:"๐",
        TEMPLE:"๐",
        FOUNTAIN:"โฒ",
        TARGET:"๐ฏ",
        DOOR:"๐ช",
        TOILET:"๐ฝ",
        CHAIR:"๐ช",
        BED:"๐",
        TOTEM:"๐ฟ",
        PIRATE_FLAG:"๐ดโโ ๏ธ",
        SNOWMAN:"โ"
    },
    MISC:{
        FIRE:"๐ฅ",
        MOUNTAIN:"๐ป",
        VOLCANOE:"๐",
        WAVE:"๐",
        COBWEB:"๐ธ",
    },
    WEATHER:{
      CLOUD:"โ",
      RAIN:"๐จ",
      LIGHTNING:"๐ฉ",
      SNOWFLAKES:"โ",
      ZAP:"โก",
      TORNADO:"๐ช",
      RAINBOW:"๐"
    },
    CLOTHING:{
      GLOVES:"๐งค",
      COAT:"๐งฅ",
      SOCKS:"๐งฆ",
      KIMONO:"๐",
      CROWN:"๐",
      SHIRT:"๐",
      PANTS:"๐ฉณ",
      RING:"๐"
    },
    TRANSPORTATION:{
      SAILBOAT:"โต",
      CANOE:"๐ถ",
      UFO:"๐ธ"
    }
}
  

var TILES = Object.values(ENTITY.SCENERY)
var ANIMALS = Object.values(ENTITY.ANIMAL);
var LAND_ANIMALS = [
    ENTITY.ANIMAL.CRAB,
ENTITY.ANIMAL.LOBSTER,
ENTITY.ANIMAL.MONKEY,
ENTITY.ANIMAL.BABOON,
ENTITY.ANIMAL.CHIMP,
ENTITY.ANIMAL.DOG,
ENTITY.ANIMAL.POODLE,
ENTITY.ANIMAL.TIGER,
ENTITY.ANIMAL.LION,
ENTITY.ANIMAL.HORSE,
ENTITY.ANIMAL.UNICORN,
ENTITY.ANIMAL.ELK,
ENTITY.ANIMAL.YAK,
ENTITY.ANIMAL.COW,
ENTITY.ANIMAL.OX,
ENTITY.ANIMAL.PIG,
ENTITY.ANIMAL.SHEEP,
ENTITY.ANIMAL.GOAT,
ENTITY.ANIMAL.CAMEL,
ENTITY.ANIMAL.LLAMA,
ENTITY.ANIMAL.ELEPHANT,
ENTITY.ANIMAL.RHINO,
ENTITY.ANIMAL.MOUSE,
ENTITY.ANIMAL.RAT,
ENTITY.ANIMAL.HEDGEHOG,
ENTITY.ANIMAL.RABBIT,
ENTITY.ANIMAL.BAT,
ENTITY.ANIMAL.SLOTH,
ENTITY.ANIMAL.OTTER,
ENTITY.ANIMAL.SKUNK,
ENTITY.ANIMAL.TURKEY,
ENTITY.ANIMAL.CHICKEN,
ENTITY.ANIMAL.CHICK,
ENTITY.ANIMAL.ROBIN,
ENTITY.ANIMAL.TOUCAN,
ENTITY.ANIMAL.EAGLE,
ENTITY.ANIMAL.DUCK,
ENTITY.ANIMAL.SWAN,
ENTITY.ANIMAL.OWL,
ENTITY.ANIMAL.PEACOCK,
ENTITY.ANIMAL.PARROT,
ENTITY.ANIMAL.LIZARD,
ENTITY.ANIMAL.SNAKE,
ENTITY.ANIMAL.SNAIL,
ENTITY.ANIMAL.CATERPILLAR,
ENTITY.ANIMAL.BUTTERFLY,
ENTITY.ANIMAL.ANT,
ENTITY.ANIMAL.BEE,
ENTITY.ANIMAL.SCORPION
]
var WATER_ANIMALS = [ENTITY.ANIMAL.WHALE,ENTITY.ANIMAL.SHARK,ENTITY.ANIMAL.FISH,ENTITY.ANIMAL.PUFFERFISH,ENTITY.ANIMAL.OCTOPUS,ENTITY.ANIMAL.DUCK,ENTITY.ANIMAL.CROCODILE,ENTITY.ANIMAL.TURTLE]
var PEOPLE = Object.values(ENTITY.PEOPLE);
var LIVING = [...PEOPLE,...ANIMALS]

var LAND = [ENTITY.SCENERY.DIRT,ENTITY.SCENERY.GRASS,ENTITY.SCENERY.ROCK,ENTITY.SCENERY.BEACH]
var PLANTS = Object.values(ENTITY.PLANTS);
var FLOWERS = [ 
    ENTITY.PLANTS.ROSE,
    ENTITY.PLANTS.DAISY,
    ENTITY.PLANTS.TULIP,
    ENTITY.PLANTS.SUNFLOWER
]

var FOODCHAIN = {}
FOODCHAIN["๐"]=["๐ฆ","๐","๐","๐","๐","๐","๐","๐ฆ","๐","๐"];
FOODCHAIN["๐ฆ"]=["๐ ","๐ก","๐ณ","๐"];

function generateFoodChainRules(){
    var rules = [];
    for(var key in FOODCHAIN){
        console.log(key,FOODCHAIN[key]);
        console.log(Rule([[key,"."]],[[[key,"๐ข"]]],{rotation:true,substitute:{".":FOODCHAIN[key]}}))
    }
    return rules;
}


var RULES=[
    //...Rule([["๐ฅ","๐ข"]],[[["๐ฅ","๐ฅ"]]],{rotation:true}),
    //...Rule([["๐ฅ","."]],[[["๐ฅ","๐ฅ"]]],{rotation:true,substitute:{".":TILES}}),

    //Fire Spreading
    ...Rule([["๐ฅ","๐ข"]],[[["๐ข","๐ฅ"]],[["๐ฅ","๐ฅ"]],[["๐ค","๐ฅ"]],[["๐ค","๐ข"]]],{rotation:true}),
    ...Rule([["๐ฅ","."]],[[["๐ฅ","."]],[["๐ฅ","๐ฅ"]]],{rotation:true,substitute:{".":PLANTS}}),
    
    //Fire Kills Animals
    ...Rule([["๐ฅ","."]],[[["๐ฅ","."]],[["๐ฅ","๐ฅ"]]],{rotation:true,substitute:{".":ANIMALS}}),
    

    //Animals of Same kind reproduce
    ...Rule([[".","a","."]],[[[".",".","."]],[[".","a","."]],[[".","a","."]],[[".","a","."]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    //Overcrowded animals die
    // ...Rule([[".","."],[".","."]],[[[".","."],[".","a"]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    
    //Animals and Plants have a small chance of dying out
    ...Rule([["."]],[[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["๐ข"]]],{substitute:{".":LAND_ANIMALS}}),
    ...Rule([["."]],[[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["๐ข"]]],{substitute:{".":PLANTS}}),
    

    //Animal Movement
    ...Rule([["๐ต","."]],[[[".","๐ต"]],[["๐ต","."]]],{rotation:true,substitute:{".":WATER_ANIMALS}}),
    ...Rule([["a","."]],[[[".","a"]],[["a","."]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    
    //Animal Eating
    // ...Rule([["๐ฆ","."]],[[["๐ฆ","๐ต"]]],{rotation:true,substitute:{".":["๐ ","๐ก","๐ณ","๐"]}}),
    ...Rule([["๐","."]],[[["๐","๐ข"]]],{rotation:true,substitute:{".":["๐ฆ","๐","๐","๐","๐","๐","๐","๐ฆ","๐","๐"]}}),
    ...Rule([["๐","๐ข","."]],[[["๐ข","๐","."]]],{rotation:true,substitute:{".":["๐ฆ","๐","๐","๐","๐","๐","๐","๐ฆ","๐","๐"]}}),
    ...Rule([["๐","๐ข","๐ข","."]],[[["๐ข","๐","๐ข","."]]],{rotation:true,substitute:{".":["๐ฆ","๐","๐","๐","๐","๐","๐","๐ฆ","๐","๐"]}}),
    ...Rule([["๐","๐ข","๐ข","๐ข","."]],[[["๐ข","๐","๐ข","๐ข","."]]],{rotation:true,substitute:{".":["๐ฆ","๐","๐","๐","๐","๐","๐","๐ฆ","๐","๐"]}}),

    ...Rule([["๐ฆ","."]],[[["๐ฆ","๐ต"]]],{rotation:true,substitute:{".":["๐ ","๐ก","๐ณ","๐"]}}),
    ...Rule([["๐ฆ","๐ต","."]],[[["๐ต","๐ฆ","."]]],{rotation:true,substitute:{".":["๐ ","๐ก","๐ณ","๐"]}}),
    ...Rule([["๐ฆ","๐ต","๐ต","."]],[[["๐ต","๐ฆ","๐ต","."]]],{rotation:true,substitute:{".":["๐ ","๐ก","๐ณ","๐"]}}),
    ...Rule([["๐ฆ","๐ต","๐ต","๐ต","."]],[[["๐ต","๐ฆ","๐ต","๐ต","."]]],{rotation:true,substitute:{".":["๐ ","๐ก","๐ณ","๐"]}}),


    // ...Rule([["๐ฆ","."]],[[["๐ฆ","๐ข"]]],{rotation:true,substitute:{".":PLANTS}}),
    // ...Rule([["๐ฆ","๐ข","."]],[[["๐ข","๐ฆ","."]]],{rotation:true,substitute:{".":PLANTS}}),
    // ...Rule([["๐ฆ","๐ข","๐ข","."]],[[["๐ข","๐ฆ","๐ข","."]]],{rotation:true,substitute:{".":PLANTS}}),
        
    //Special Animal Properties
    //Bees pollinate flowers
    ...Rule([[".","๐","๐ข"]],[[[".","๐","."]],[[".","๐","๐ข"]]],{rotation:true,substitute:{".":FLOWERS}}),
    //Catterpillars turn into Butterflies
    ...Rule([["๐"]],[[["๐"]],[["๐"]],[["๐"]],[["๐"]],[["๐ฆ"]]],{rotation:true}),

    //Special Plant Properties
    //Trees grow from samplings
    ...Rule([["๐ฑ"]],[[["๐ฑ"]],[["๐ฑ"]],[["๐ฑ"]],[["๐ฒ"]]],{rotation:true,substitute:{".":FLOWERS}}),
    //Trees spread seeds
    // ...Rule([["๐ฒ","๐ข","๐ข"]],[[["๐ฒ","๐ข","๐ข"]],[["๐ฒ","๐ข","๐ข"]],[["๐ฒ","๐ข","๐ข"]],[["๐ฒ","๐ข","๐ข"]],[["๐ฒ","๐ข","๐ฑ"]]],{rotation:true}),
    //Plants reproduce spread seeds
    ...Rule([[".","๐ข","๐ข"]],[[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","๐ข"]],[[".","๐ข","."]]],{rotation:true,substitute:{".":PLANTS}}),

    //Special Scenery/Weather Properties
    //Volcanoe
    ...Rule([["๐","๐ข"]],[[["๐","๐ข"]],[["๐","๐ฅ"]]],{rotation:true}),
    // ...Rule([["๐ต","๐ต","๐ต"],["๐ข","๐ข","๐ข"]],[[["๐ต","๐ต","๐ต"],["๐ข","๐ต","๐ข"]]]),
    //Grass Grows back
    ...Rule([["๐ข","๐ข"],["๐ข","๐ค"]],[[["๐ข","๐ข"],["๐ข","๐ข"]]],{rotation:true}),
    
    
]



function transpose(arr){
    var narr=[];
    //Transposed Dimensions
    for(var i=0;i<arr[0].length;i++){
        narr.push([]);
    }
    //Transpose Values
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[0].length;j++){
            narr[j][i]=arr[i][j];
        }   
    }
    return narr;
}

function invert(arr){
    narr=[]
    for(var i=arr.length-1;i>=0;i--){
        narr.push(arr[i].reverse())
    }
    return narr;
}

function substitute(arr,p,r){
    if(Array.isArray(arr)){
        return arr.map(x=>substitute(x,p,r));
    }else{
        if(arr==p){
            return r;
        }else{
            return arr;
        }
    }
}



function substituteMultiple(arr,keys,lookup){
    if(keys.length==0){
        return arr;
    }else{
        var out = [];
        for(var i=0;i<arr.length;i++){//All prev generated rules
            var arr_sub = lookup[keys[0]];
            for(var j=0;j<arr_sub.length;j++){//All Substitutions for current key
                out.push(substitute(arr[i],keys[0],arr_sub[j]));
            }
        }
        //Return recursive combinations
        return substituteMultiple(out,keys.slice(1),lookup);
    }
}