function pivoting(a, c) {
    for (let i = 0; i < c.length; i++) {
        for (let k = i + 1; k < c.length; k++) {
            let temp = c[i][i];
            if (Math.abs(a[i][i]) < Math.abs(a[k][i])) {
                for (let j = 0; j < c.length; j++) {
                    temp = a[i][j];
                    a[i][j] = a[k][j];
                    a[k][j] = temp;
                }
                temp = c[i];
                c[i] = c[k];
                c[k] = temp;
            }
        }
    }
}
function upper(a, c) {
    let n = c.length;
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            let m = a[k][i] / a[i][i];
            for (let j = 0; j < n; j++) {
                a[k][j] = a[k][j] - m * a[i][j];
            }
            c[k] = c[k] - m * c[i];
        }
    }
}
function back_sub(a, c) {
    let n = c.length;
    let x = [];
    for (let i = n - 1; i >= 0; i--) {
        let sum = c[i];
        for (let j = i + 1; j < n; j++) {
            sum = sum - x[j] * a[i][j];
        }
        x[i] = sum / a[i][i];
    }
    return (x);
}
function gauss_ele(a, c) {
    pivoting(a, c);
    console.log(a, c);
    upper(a, c);
    console.log(a, c);
    let x = back_sub(a, c);
    console.log(x);
}
// let a = [[0.1, 7.0, -0.3], [0.3, -0.2, 10.0], [3.0, -0.1, -0.2]];
// let c = [-19.3, 71.4, 7.85];
// gauss_ele(a, c);
//# sourceMappingURL=gauss_ele.js.map