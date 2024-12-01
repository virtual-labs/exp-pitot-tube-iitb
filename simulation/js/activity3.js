function start_act3() {
    let temp_btn = document.getElementById('temp-btn-8');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("calculate cv", "tb4-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb4-box'>

        <h5>Note: You can calculate slope by observing (hovering or clicking on points) respective x and y points on the plot. </h5>


        <p style='text-align: center;'> 
            Slope (from above plot)
            <span style='display: inline-block;' >
                $$  = \\frac{y_1 - y_2}{x_1 - x_2} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal41-inp' > <span id='cal41-val-sp'></span> 
            <br>
            <span style='display: inline-block;' >
                $$ c_v \\ = \\ \\frac{Slope}{\\sqrt{2*g}} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal42-inp' > <span id='cal42-val-sp'></span>

            <br>


            <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify5();'  id='temp-btn-400' >Verify</button></div>
        </p>

   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations5();
    setTimeout(() => { show_step('tb4-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    plot();
}
function internal_calculations5() {
    // slope  = (Y[Y.length - 1] - Y[0]) / (sqrt_h[sqrt_h.length - 1] - sqrt_h[0]);
    // calculated_cd = (slope/(a1*a2)) * Math.sqrt(((a1**2) - (a2**2)) / (2*g))
    slope = (Y[Y.length - 1] - Y[0]) / (H_data[H_data.length - 1] - H_data[0]);
    calculated_cv = slope / Math.sqrt(2 * g);
}
function verify5() {
    let btn = document.getElementById('temp-btn-400');
    console.log(`slope => ${slope}, cv => ${calculated_cv}`);
    let inp = document.getElementById('cal41-inp');
    let sp = document.getElementById('cal41-val-sp');
    let inp1 = document.getElementById('cal42-inp');
    let sp1 = document.getElementById('cal42-val-sp');
    if (!verify_values(parseFloat(inp.value), slope)) {
        alert('slope is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp1.value), calculated_cv)) {
        alert('cd is incorrect, calculate again.');
        return;
    }
    alert('You have entered correct values');
    btn.remove();
    inp.remove();
    sp.innerText = `${slope.toFixed(3)}`;
    inp1.remove();
    sp1.innerText = `${calculated_cv.toFixed(3)}`;
    maindiv.innerHTML = `<br><br><h3 style='text-align: center;'>Experiment Completed Successfully!!</h3>`;
}
//# sourceMappingURL=activity3.js.map