const trimZeroLeft = function () {
    while (this[0] === 0) {
        this.shift();
    }
    console.log(this);
};

const trimOuterLeft = function () {
    while (this[0] <= this[1]) {
        this.shift();
    }
    console.log(...this);
};

const volOut = function () {
    //############START GET BORDERS AND VALLEYS#################################
    let arr = [...this];
    let border = [];
    let valley = [];
    let visual = [];
    isFound = false;
    visual.push('T');
    let i = 0;
    for (let j = 0; j < this.length; j++) {
        console.log('*****************');
        console.log(...this);
        while (this[0] >= this[0 + 1] && this[0 + 1] < this[0 + 1 + j]) {
            //ITERATE THROUG ALL VALLEY ELEMENTS REGARDING A BOARDER
            console.log(`i:${i}, j:${j}`);
            console.log(`this[1]: ${this[1]}`);
            console.log(`this[0]: ${this[0]}`);
            valley.push(this.splice(0 + 1, 1));
            visual.push('V');
            isFound = true;
            console.log(isFound);
            while (this[0] <= this[1]) {
                //IN CASE OF EQUAL OR HEIGHER BORDERS IN THE NEIGHBORHOOD
                border.push(this.shift()); //REMOVING LEFT BORDER AND NEIGHBOR BORDERS
                visual.push('T');
            }
        }

        if (isFound) {
            j = 0; //AFTER ONE VALLEY WITH NEGATIVE SLOPE ITERATION, START AGAIN WITH NEXT BORDER
        }
        isFound = false;
        console.log(...this);
        console.log('*****************');
        console.log(`border: ${border}`);
        console.log(`valley: ${valley}`);
        console.log(`thi: ${this}`);
        console.log(`arr: ${arr}`);
        console.log(`vis: ${visual}`);
    }
    console.log('*****************');
    console.log(`border: ${border}`);
    console.log(`valley: ${valley}`);
    console.log(`this: ${this}`);
    console.log(`arr: ${arr}`);
    console.log(`vis: ${visual}`);

    console.log('*****************');
    //CHECKING FOR LAST BORDERS
    if (arr.length !== visual.length) {
        console.log(`last Border not found yet`);
        border.push(this.shift()); //LEFT BORDER OF LAST VALLEY
        visual.push('T'); //SYMBOL OF RIGHT BORDER
        if (this.length > 2) {
            border.push(this.shift()); //PUSH LEFT BORDER, ITS ALREADY MARKED IN VISUAL
            for (let i = 0; i < this.length; i++) {
                valley.push(this.shift()); //PUSH LAST VALLEY
                visual.push('V'); //SYMBOL OF RIGHT BORDER
            }
        }
        border.push(this.pop()); //RIGHT BORDER OF LAST VALLEY
        visual.push('T'); //SYMBOL OF RIGHT BORDER
    } else {
        border.push(this.pop()); //REIGHT BORDER OF LAST VALLEY
    }
    console.log('*****************');
    console.log(`border: ${border}`);
    console.log(`valley: ${valley}`);
    console.log(`this: ${this}`);
    console.log(`arr: ${arr}`);
    console.log(`vis: ${visual}`);
    console.log(`###############`);

    //############END GET BORDERS AND VALLEYS#################################

    //############START FILL VALLEYS################################################
    let valleyHeight = border.map((el, id) =>
        Math.min(border[id], border[id + 1])
    );
    valleyHeight.pop();
    let counter = 0;
    let volumen = 0;
    console.log(`valleyHeight: ${valleyHeight}`);
    for (let [id, type] of visual.entries()) {
        if (type === 'T') { //IF BORDER
        counter += 1;
        console.log(`#####${counter}.VALLEY####`)
        } else { //IF VALLEY
            volumen += valleyHeight[counter - 1] - arr[id];
            console.log(valleyHeight[counter - 1] - arr[id])

        }
    }
    console.log(`VOLUMEN: ${volumen}`)

    //############END FILL VALLEYS################################################
};

Array.prototype.trimZeroLeft = trimZeroLeft;
Array.prototype.trimOuterLeft = trimOuterLeft;
Array.prototype.volOut = volOut;

// let arr = [3, 2, 1, 2, 4, 3, 1, 1, 4, 3, 1, 1, 3];
let arr = [];
arr = [3, 2, 1, 2, 3, 4, 1, 1, 3];
// arr = [3, 2, 1, 2, 4, 2, 1, 1, 2];
// arr = [3, 2, 1, 2,  4,3, 1, 1, 4];
// arr = [3, 2, 1, 2,  4,4, 1, 1, 3];

arr.trimOuterLeft();
arr.reverse();
arr.trimOuterLeft();
arr.reverse();
console.log(...arr);
// arr.findMin();
arr.volOut();
