var tab = [3,1,2];
/* console.log(list.sort()); // [2,1,3] */
tabMixing = function(tab){
    for ( let i = 0; i<tab.length; i++){
        let j = Math.floor(Math.random()*tab.length);
        tempElement = tab[i];
        tab[i] = tab[j];
        tab[j] = tempElement;
    }
    console.log(tab);
    return tab;
}

const i =1;
console.log('ala'+i);

/* console.log(tabMixing(tab)); */