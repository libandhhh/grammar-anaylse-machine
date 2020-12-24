var fs = require('fs');
function control() {
    var terminator = ['+', '*', 'i', '<', '>', '#'];
    var nonterminator = ['E', 'T', 'K', 'F', 'M'];
    var FI = [['<', 'i'], ['<', 'i'], ['$', '+'], ['<', 'i'], ['$', '*']];
    var FO = [['#', '>'], ['#', '>', '+'], ['#', '>'], ['#', '>', '+', '*'], ['#', '>', '+']];
    fs.readFile('../input.txt', 'UTF-8', function (err, data) {
        var test = data.toString().split('->');
        test = test.toString().split('\n');
        // console.log(test)
        // console.log(test[0].slice(2,4))
    })
    var analyse = {
        'Ei': 'TK',
        'E<': 'TK',
        'Ti': 'FM',
        'T<': 'FM',
        'K+': '+TK',
        'Fi': 'i',
        'F<': '<E>',
        'M*': '*FM'
    }
    //定义分析表
    var analysisTable = new Array;
    for (i = 0; i < 100; i++) {
        analysisTable[i] = new Array();
    }
    for (var i = 0; i < nonterminator.length; i++) {
        if (FI[i].find(tag1=>FI[i].some(b=>b === '$'))) {
 
            var newF = (FI[i].concat(FO[i])).filter(b=>b != '$');
            for (var j = 0; j < terminator.length; j++) {
 
                if (FI[i].find(tag=>FI[i].some(b=>b === terminator[j]))) {
 
                    analysisTable[i][j] = analyse[nonterminator[i].concat(terminator[j])];
                } else if (newF.find(tag=>newF.some(b=>b === terminator[j]))) {
                    analysisTable[i][j] = '$';
                } else {
                    analysisTable[i][j] = 'error';
                }
            }
        } else {
 
            for (var j = 0; j < terminator.length; j++) {
 
                if (FI[i].find(tag=>FI[i].some(b=>b === terminator[j]))) {
                    analysisTable[i][j] = analyse[nonterminator[i].concat(terminator[j])];
                } else {
                    analysisTable[i][j] = 'error';
                }
 
            }
        }
 
 
    }
    //对字符串的分析过程
    var stack = '#E';
 
    fs.readFile('test', 'UTF-8', function (err, data) {
 
            var inputs = data.toString().split('');
            while (stack.length != 0) {
                if (inputs[0] === stack[stack.length - 1] && inputs[0] === '#') {
                    console.log('Accept');
                    return;
                } else if (inputs[0] === stack[stack.length - 1]) {
                    console.log(stack, inputs.join(''), inputs[0] + '匹配成功');
                    stack = stack.slice(0, stack.length - 1);
                    inputs = inputs.slice(1, inputs.length);
                } else {
                    var col = nonterminator.indexOf(stack[stack.length - 1]);
                    var row = terminator.indexOf(inputs[0]);
                    var tag = analysisTable[col][row];
                    if (tag === 'error') {
                        console.log('error');
                        return
                    } else if (tag === '$') {
                        console.log(stack, inputs.join(''), '$');
                        stack = stack.slice(0, stack.length - 1);
                    } else {
                        console.log(stack, inputs.join(''), tag);
                        stack = stack.slice(0, stack.length - 1);
                        for (var j = tag.length - 1; j >= 0; j--) {
                            stack += tag[j];
                        }
                    }
                }
            }
        }
    )
}
 
control();