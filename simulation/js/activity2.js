function activity2() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <p>Learning Objective: Calculate c<sub>v</sub> by using given data </p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act2();' id='temp-btn-3' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML += text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function start_act2() {
    let temp_btn = document.getElementById('temp-btn-3');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Calculate table", "tb3-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb3-box'>

        <h5>A pitot tube is placed at the centre of pipe having diameter ${dia2} mm. If the pressure head is varied from 8 to 25 mm and the average discharge is noted. If average velocity is ${avtimes2} times the velocity at the centre, find the coefficient of the velocity. </h5>

        <div id='a3-2' style='display: block;'>

            <div id='a3-table' ></div>

        </div>
   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations3();
    setTimeout(() => { show_step('tb3-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function internal_calculations3() {
    //generate data for table 
    let hval = 8;
    for (let i = 0; i < 8; i++) {
        h2 = hval + i;
        H = Math.sqrt(h2 / 1000);
        let cv2 = parseFloat((Math.random() * 0.03 + 0.95).toFixed(2));
        console.log("Cv2= ", cv2);
        V2 = cv2 * Math.sqrt(2 * g * (h2 / 1000));
        console.log("avtimes 2= ", avtimes2);
        avel2 = avtimes2 * V2;
        Q2 = (Math.PI / 4) * (Math.pow((dia2 / 1000), 2)) * avel2;
        vbar = Q2 / ((Math.PI / 4) * (Math.pow((dia2 / 1000), 2)));
        newv = vbar / avtimes2;
        h2_data.push(h2);
        H_data.push(parseFloat(H.toFixed(3)));
        Q2_data.push(parseFloat(Q2.toFixed(3)));
        V2_data.push(parseFloat(vbar.toFixed(3)));
        newv_data.push(parseFloat(newv.toFixed(3)));
        table_data.push([h2_data[i], Q2_data[i], V2_data[i], newv_data[i]]);
    }
    console.log(`h2 => `, h2_data);
    console.log(`H => `, H_data);
    console.log(`Q2 => `, Q2_data);
    console.log(`V2 => `, V2_data);
    console.log(`New V => `, newv_data);
    load_a3_table();
}
function load_a3_table() {
    let ele = document.getElementById('a3-table');
    let header = ['h<br>mm', 'Q<sub>average</sub><br>m<sup>3</sup>/s', 'V<br>m/s', 'V at centre<br>m/s'];
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, table_data, [0, 1], [[2, 3], [2, 3]], '', ele, true, true, () => {
        alert('You have entered correct values');
        a3_plot();
    }, 4);
    tab.load_table();
}
function a3_plot() {
    let btn_text = get_collapse_btn_text("Plot", "plot-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='plot-box'>

        <canvas id='a3-graph' ></canvas>

        <br>
        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act3();' id='temp-btn-8' >Next</button>
   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations4();
    setTimeout(() => { show_step('plot-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    plot();
}
function internal_calculations4() {
    let slope = regression_linear_1variable(H_data, newv_data);
    console.log(`slope => ${slope}`);
    for (let x of H_data) {
        let res = slope * x;
        Y.push(res);
    }
    console.log(`Y => `, Y);
}
function plot() {
    var ctx = document.getElementById('a3-graph');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: H_data,
            datasets: [
                {
                    label: 'Velocity at centre',
                    data: newv_data,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: false
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'Regression',
                    data: Y,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Velocity at centre (m/s)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'square root of h',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Discharge vs square root of h`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
    //root.appendChild(ctx);
}
//# sourceMappingURL=activity2.js.map