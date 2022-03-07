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
      STAND:"🚶",
      WALK:"🚶",
      RUN:"🏃",
      SWIM:"🏊"
    },
    PEOPLE:{
      FARMER_MAN:"👨‍🌾",
      FARMER_WOMAN:"‍👩‍🌾",
      COOK_MAN:"👨‍🍳",
      COOK_WOMAN:"👩‍🍳",
      BLACKSMITH:"👨‍🔧‍",
      ELF_KING:"🧝",
      ELF_MAN:"🧝‍‍",
      ELF_WOMAN:"🧝",
      GUARD:"💂",
      KING:"🤴",
      QUEEN:"👸",
      GENIE:"🧞",
      WIZARD:"🧙"
    },
    MONSTER:{
      ANGEL:"👼",
      DEMON:"👿",
      ZOMBIE:"🧟",
      VAMPIRE_MAN:"🧛",
      VAMPIE_WOMAN:"🧛‍",
      DRAGON:"🐉",
      SANTA:"🎅",
      MSCLAUS:"🤶",
      OGRE:"👹",
      DINOSAUR:"🦕",
      RAPTOR:"🦖",
      DISEASE:"🦠"
    },
    ANIMAL:{
      CRAB:"🦀",
      LOBSTER:"🦞",
      MONKEY:"🐒",
      BABOON:"🦍",
      CHIMP:"🦧",
      DOG:"🐕",
      POODLE:"🐩",
      TIGER:"🐅",
      LION:"🐆",
      HORSE:"🐎",
      UNICORN:"🦄",
      ELK:"🦌",
      YAK:"🐂",
      COW:"🐄",
      OX:"🐃",
      PIG:"🐖",
      SHEEP:"🐑",
      GOAT:"🐃",
      CAMEL:"🐪",
      LLAMA:"🦙",
      ELEPHANT:"🐘",
      RHINO:"🦏",
      MOUSE:"🐁",
      RAT:"🐀",
      HEDGEHOG:"🦔",
      RABBIT:"🐇",
      BAT:"🦇",
      SLOTH:"🦥",
      OTTER:"🦦",
      SKUNK:"🦨",
      TURKEY:"🦃",
      CHICKEN:"🐓",
      CHICK:"🐣",
      BABY_CHICK:"🐤",
      ROBIN:"🐦",
      TOUCAN:"🐧",
      EAGLE:"🦅",
      DUCK:"🦆",
      SWAN:"🦢",
      OWL:"🦉",
      FLAMINGO:"🦩",
      PEACOCK:"🦚",
      PARROT:"🦜",
      CROCODILE:"🐊",
      TURTLE:"🐢",
      LIZARD:"🦎",
      SNAKE:"🐍",
      WHALE:"🐳",
      SHARK:"🦈",
      FISH:"🐠",
      PUFFERFISH:"🐡",
      OCTOPUS:"🐙",
      SNAIL:"🐌",
      CATERPILLAR:"🐛",
      BUTTERFLY:"🦋",
      ANT:"🐜",
      BEE:"🐝",
      SCORPION:"🦂"
    },
    FOOD:{
      GRAPE:"🍇",
      WATERMELON:"🍉",
      ORANGE:"🍊",
      LEMON:"🍋",
      BANANA:"🍌",
      PINEAPPLE:"🍍",
      APPLE_RED:"🍎",
      APPLE_GREEN:"🍏",
      PEAR:"🍐",
      PEACH:"🍑",
      CHERRY:"🍒",
      STRAWBERYY:"🍓",
      KIWI:"🥝",
      TOMATO:"🍅",
      PUMPKIN:"🎃",
      COCONUT:"🥥",
      AVOCADO:"🥑",
      EGGPLANT:"🍆",
      CARROT:"🥕",
      CORN:"🌽",
      CUCUMBER:"🥒",
      BROCOLLI:"🥦",
      GARLIC:"🧄",
      ONION:"🧅",
      MUSHROOM:"🍄",
      BREAD:"🍞",
      CROISSANT:"🥐",
      PRETZEL:"🥨",
      CHEESE:"🧀",
      PORK:"🍖",
      POULTRY:"🍗",
      STEAK:"🥩",
      BACON:"🥓",
      EGG:"🥚",
      SOUP:"🥣",
      BUTTER:"🧈",
      COOKED_SHRIMP:"🍤",
      MILK:"🥛",
      BEER:"🍺",
      WINE:"🍷",
      CAKE:"🍰",
      ICE:"🧊"
    },
    TOOL:{
      DAGGER:"🔪",
      HAMMER:"🔨",
      AXE:"🪓",
      PICKAXE:"⛏",
      SWORD:"⚔",
      BOW:"🏹",
      SHIELD:"🔰"
    },
    ITEM:{
      STRING:"🧵",
      YARN:"🧶",
      DIAMOND:"💎",
      KEY:"🔑",
      BOOK:"📕",
      SPELLBOOK:"📗",
      MAP:"📘",
      SCROLL:"🧾",
      MONEY:"💰",
      FLOWERS:"💐",
      SHELL:"🐚"
    },
    SCENERY:{
      DIRT:"🟤",
      GRASS:"🟢",
      ROCK:"⚪",
      BEACH:"🟡",
      WATER:"🔵",
      OIL:"⚫",
      LAVA:"🟠",
    },
    PLANTS:{
      ROSE:"🌹",
      ROSE_DEAD:"🥀",
      DAISY:"🌼",
      TULIP:"🌷",
      SUNFLOWER:"🌻",
      SEED:"🌱",
      PINE_TREE:"🌲",
      PALM_TREE:"🌴",
      CACTUS:"🌵",
      WHEAT:"🌾",
      CLOVER:"🍀",
      LEAF:"🍂",
    },
    BUILDINGS:{
        CASTLE:"🏰",
        HOUSE:"💒",
        CHURCH:"💒",
        TEMPLE:"🛕",
        FOUNTAIN:"⛲",
        TARGET:"🎯",
        DOOR:"🚪",
        TOILET:"🚽",
        CHAIR:"🪑",
        BED:"🛏",
        TOTEM:"🗿",
        PIRATE_FLAG:"🏴‍☠️",
        SNOWMAN:"⛄"
    },
    MISC:{
        FIRE:"🔥",
        MOUNTAIN:"🗻",
        VOLCANOE:"🌋",
        WAVE:"🌊",
        COBWEB:"🕸",
    },
    WEATHER:{
      CLOUD:"☁",
      RAIN:"🌨",
      LIGHTNING:"🌩",
      SNOWFLAKES:"❄",
      ZAP:"⚡",
      TORNADO:"🌪",
      RAINBOW:"🌈"
    },
    CLOTHING:{
      GLOVES:"🧤",
      COAT:"🧥",
      SOCKS:"🧦",
      KIMONO:"👘",
      CROWN:"👑",
      SHIRT:"👚",
      PANTS:"🩳",
      RING:"💍"
    },
    TRANSPORTATION:{
      SAILBOAT:"⛵",
      CANOE:"🛶",
      UFO:"🛸"
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
FOODCHAIN["🐅"]=["🦌","🐂","🐄","🐃","🐖","🐑","🐃","🦙","🐁","🐇"];
FOODCHAIN["🦈"]=["🐠","🐡","🐳","🐙"];

function generateFoodChainRules(){
    var rules = [];
    for(var key in FOODCHAIN){
        console.log(key,FOODCHAIN[key]);
        console.log(Rule([[key,"."]],[[[key,"🟢"]]],{rotation:true,substitute:{".":FOODCHAIN[key]}}))
    }
    return rules;
}


var RULES=[
    //...Rule([["🔥","🟢"]],[[["🔥","🔥"]]],{rotation:true}),
    //...Rule([["🔥","."]],[[["🔥","🔥"]]],{rotation:true,substitute:{".":TILES}}),

    //Fire Spreading
    ...Rule([["🔥","🟢"]],[[["🟢","🔥"]],[["🔥","🔥"]],[["🟤","🔥"]],[["🟤","🟢"]]],{rotation:true}),
    ...Rule([["🔥","."]],[[["🔥","."]],[["🔥","🔥"]]],{rotation:true,substitute:{".":PLANTS}}),
    
    //Fire Kills Animals
    ...Rule([["🔥","."]],[[["🔥","."]],[["🔥","🔥"]]],{rotation:true,substitute:{".":ANIMALS}}),
    

    //Animals of Same kind reproduce
    ...Rule([[".","a","."]],[[[".",".","."]],[[".","a","."]],[[".","a","."]],[[".","a","."]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    //Overcrowded animals die
    // ...Rule([[".","."],[".","."]],[[[".","."],[".","a"]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    
    //Animals and Plants have a small chance of dying out
    ...Rule([["."]],[[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["🟢"]]],{substitute:{".":LAND_ANIMALS}}),
    ...Rule([["."]],[[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["."]],[["🟢"]]],{substitute:{".":PLANTS}}),
    

    //Animal Movement
    ...Rule([["🔵","."]],[[[".","🔵"]],[["🔵","."]]],{rotation:true,substitute:{".":WATER_ANIMALS}}),
    ...Rule([["a","."]],[[[".","a"]],[["a","."]]],{rotation:true,substitute:{".":LAND_ANIMALS,"a":LAND}}),
    
    //Animal Eating
    // ...Rule([["🦈","."]],[[["🦈","🔵"]]],{rotation:true,substitute:{".":["🐠","🐡","🐳","🐙"]}}),
    ...Rule([["🐅","."]],[[["🐅","🟢"]]],{rotation:true,substitute:{".":["🦌","🐂","🐄","🐃","🐖","🐑","🐃","🦙","🐁","🐇"]}}),
    ...Rule([["🐅","🟢","."]],[[["🟢","🐅","."]]],{rotation:true,substitute:{".":["🦌","🐂","🐄","🐃","🐖","🐑","🐃","🦙","🐁","🐇"]}}),
    ...Rule([["🐅","🟢","🟢","."]],[[["🟢","🐅","🟢","."]]],{rotation:true,substitute:{".":["🦌","🐂","🐄","🐃","🐖","🐑","🐃","🦙","🐁","🐇"]}}),
    ...Rule([["🐅","🟢","🟢","🟢","."]],[[["🟢","🐅","🟢","🟢","."]]],{rotation:true,substitute:{".":["🦌","🐂","🐄","🐃","🐖","🐑","🐃","🦙","🐁","🐇"]}}),
        
    //Special Animal Properties
    //Bees pollinate flowers
    ...Rule([[".","🐝","🟢"]],[[[".","🐝","."]],[[".","🐝","🟢"]]],{rotation:true,substitute:{".":FLOWERS}}),
    //Catterpillars turn into Butterflies
    ...Rule([["🐛"]],[[["🐛"]],[["🐛"]],[["🐛"]],[["🐛"]],[["🦋"]]],{rotation:true}),

    //Special Plant Properties
    //Trees grow from samplings
    ...Rule([["🌱"]],[[["🌱"]],[["🌱"]],[["🌱"]],[["🌲"]]],{rotation:true,substitute:{".":FLOWERS}}),
    //Trees spread seeds
    // ...Rule([["🌲","🟢","🟢"]],[[["🌲","🟢","🟢"]],[["🌲","🟢","🟢"]],[["🌲","🟢","🟢"]],[["🌲","🟢","🟢"]],[["🌲","🟢","🌱"]]],{rotation:true}),
    //Plants reproduce spread seeds
    ...Rule([[".","🟢","🟢"]],[[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","🟢"]],[[".","🟢","."]]],{rotation:true,substitute:{".":PLANTS}}),

    //Special Scenery/Weather Properties
    //Volcanoe
    ...Rule([["🌋","🟢"]],[[["🌋","🟢"]],[["🌋","🔥"]]],{rotation:true}),
    
    
]


// var thingy_to_sub=["a","b"]
// console.log(substituteMultiple([thingy_to_sub],["a","b"],{'a':[1,2],b:[3,4]}))



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