function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let res = expr.trim().split(' ').join('');
    let num = [];

    if (res.includes(')') || res.includes('(')) {
        let l = res.split('').filter(item => item == '(').length;
        let r = res.split('').filter(item => item == ')').length;
        if (l !== r) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
    }

    let d = /\/0/.test(res);
    if (d) {
        throw new Error('TypeError: Division by zero.');
    }

    function calc(str) {
        num = str.split(/[()\/*+-]+/);
        let oper = str.match(/[\/*+-]/g);
    do { 
        function mult() {
            let i = oper.indexOf('*');
            let prev = [];
            prev = num.slice(0, i);
            prev.push(`${Number(num[i])*Number(num[i+1])}`);
            num = prev.concat(num.slice(i+2));
            oper = oper.slice(0, i).concat(oper.slice(i+1));
        }
        function div() {
            let i = oper.indexOf('/');
            let prev = [];
            prev = num.slice(0, i);
            prev.push(`${Number(num[i])/Number(num[i+1])}`);
            num = prev.concat(num.slice(i+2));
            oper = oper.slice(0, i).concat(oper.slice(i+1));
        }
      if (oper.indexOf('*')>= 0 && oper.indexOf('*') < oper.indexOf('/')) {
          mult();
      } else if (oper.indexOf('/')>= 0 && oper.indexOf('/') < oper.indexOf('*')) {
          div();
      } else if (oper.indexOf('*')>= 0 && oper.indexOf('/') < 0) {
          mult();
      } else if (oper.indexOf('/')>= 0 && oper.indexOf('*') < 0) {
          div();
      }	
    } while (oper.includes('*') || oper.includes('/'));
    do {
        if (oper.indexOf('-') >= 0) {
            let i = oper.indexOf('-');
            let prev = [];
            prev = num.slice(0, i);
            prev.push(`${Number(num[i])-Number(num[i+1])}`);
            num = prev.concat(num.slice(i+2));
            oper = oper.slice(0, i).concat(oper.slice(i+1));
        }
    } while (oper.includes('-'));
    do {
        if (oper.indexOf('+') >= 0) {
            let i = oper.indexOf('+');
            let prev = [];
            prev = num.slice(0, i);
            prev.push(`${Number(num[i])+Number(num[i+1])}`);
            num = prev.concat(num.slice(i+2));
            oper = oper.slice(0, i).concat(oper.slice(i+1));
        }
    } while (oper.includes('+'));
    }

    let m = 0;
    let k = 0;
    let substr = '';
    while (res.includes('(')) {
        function getExpr(str) {
            k = str.lastIndexOf('(');
            for (let j=k; j<str.length; j++) {
                if (str.slice(j, j+1) === ')') {
                    m = j;
                    j = str.length;
                }
            substr = str.slice(k+1, m);
            } return substr;
        }
        getExpr(res);
        calc(substr);
        res = res.slice(0, k) + num[0] + res.slice(m+1);
    }
    calc(res);
    return Number(num[0]);
}

module.exports = {
    expressionCalculator
}