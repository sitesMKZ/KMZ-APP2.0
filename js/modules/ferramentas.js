export function initFerramentas() {
    // Apenas expõe as variáveis de escopo se necessário, as lógicas ficam globais
}

let calcStr = "";

window.calcNum = (n) => { 
    calcStr += n; 
    document.getElementById('calcDisplay').value = calcStr; 
};

window.calcOp = (op) => {
    const calcDisp = document.getElementById('calcDisplay');
    if(['sin','cos','tan','log','sqrt'].includes(op)) {
        if(calcStr === "") return;
        const val = parseFloat(calcStr);
        let res = 0;
        switch(op) {
            case 'sin': res = Math.sin(val * Math.PI / 180); break;
            case 'cos': res = Math.cos(val * Math.PI / 180); break;
            case 'tan': res = Math.tan(val * Math.PI / 180); break;
            case 'log': res = Math.log10(val); break;
            case 'sqrt': res = Math.sqrt(val); break;
        }
        calcStr = res.toString();
        calcDisp.value = calcStr;
    } else if (op === '^') {
        calcStr += '**';
        calcDisp.value = calcStr.replace('**','^');
    } else {
        calcStr += op;
        calcDisp.value = calcStr;
    }
};

window.calcClear = () => { calcStr = ""; document.getElementById('calcDisplay').value = ""; };
window.calcDel = () => { calcStr = calcStr.slice(0,-1); document.getElementById('calcDisplay').value = calcStr; };
window.calcEval = () => {
    const calcDisp = document.getElementById('calcDisplay');
    try {
        calcStr = eval(calcStr).toString();
        calcDisp.value = calcStr;
    } catch { calcDisp.value = "Erro"; calcStr = ""; }
};

window.calcOhm = () => {
    let v = parseFloat(document.getElementById('ohmV').value);
    let i = parseFloat(document.getElementById('ohmI').value);
    let r = parseFloat(document.getElementById('ohmR').value);

    if(!isNaN(v) && !isNaN(r) && isNaN(i)) document.getElementById('ohmI').value = (v / r).toFixed(2);
    else if(!isNaN(v) && !isNaN(i) && isNaN(r)) document.getElementById('ohmR').value = (v / i).toFixed(2);
    else if(!isNaN(r) && !isNaN(i) && isNaN(v)) document.getElementById('ohmV').value = (r * i).toFixed(2);
};

window.calcConv = () => {
    const val = parseFloat(document.getElementById('convVal').value) || 0;
    const de = document.getElementById('convDe').value;
    const para = document.getElementById('convPara').value;
    
    let emMetros = val;
    if(de === 'cm') emMetros = val / 100;
    if(de === 'mm') emMetros = val / 1000;

    let resultado = emMetros;
    if(para === 'cm') resultado = emMetros * 100;
    if(para === 'mm') resultado = emMetros * 1000;

    document.getElementById('convResult').textContent = resultado + ' ' + para;
};

