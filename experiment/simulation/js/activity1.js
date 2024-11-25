let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Flow Through Pitot Tube</h5>
        <p>Learning Objective: Calculate the discharge rate</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate Q", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>

        <h5>A pitot tube is placed at the centre of pipe having diameter ${dia} mm. The rise of water level in the pitot tube is h = ${h} mm. Take coefficient of velocity C<sub>V</sub> = 0.98. Find the velocity at the centre of the pipe. If average velocity is ${avtimes} times the velocity at the centre, find the total discharge. </h5>

        <br>

        <div style='text-align: center;'><img style='width: 30%;' src='./images/pitot_tube.png'></div>

        <br><br>
        <h5>Velocity at the centre</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ V = C_v \\sqrt{2 g h} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal01-inp' > <span id='cal01-val-sp'></span> m/s
            <br>
            <span style='display: inline-block;' >
                    take g = 9.81 m/sec<sup>2</sup>
            </span>
        </p>

        <br>
        <h5>Average Velocity</h5>
        <p style='text-align: center;'>
            <span style='display: inline-block;' >
               $$ \\bar{V} = ${avtimes} * V $$
            </span>
             = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal02-inp' > <span id='cal02-val-sp'></span> m/s
        </p>

        <br>

        <h5>Discharge</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ Q = A * \\bar{V} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal03-inp' > <span id='cal03-val-sp'></span> m<sup>3</sup>/s x 1000
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal04-inp' > <span id='cal04-val-sp'></span> liters/sec
        </p>

        


    <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify0();'  id='temp-btn-0' >Verify</button></div>


    </div>

    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    internal_calculations();
}
function internal_calculations() {
    V = cv * Math.sqrt(2 * g * h / 1000);
    avel = avtimes * V;
    Q = (Math.PI / 4) * (Math.pow((dia / 1000), 2)) * avel;
    Q_lit = Q * 1000;
}
function verify0() {
    let btn = document.getElementById('temp-btn-0');
    console.log("V = ", V);
    console.log("v bar = ", avel);
    console.log("Q = ", Q);
    console.log("Q in litre = ", Q_lit);
    let inp1 = document.getElementById('cal01-inp');
    let sp1 = document.getElementById('cal01-val-sp');
    let inp2 = document.getElementById('cal02-inp');
    let sp2 = document.getElementById('cal02-val-sp');
    let inp3 = document.getElementById('cal03-inp');
    let sp3 = document.getElementById('cal03-val-sp');
    let inp4 = document.getElementById('cal04-inp');
    let sp4 = document.getElementById('cal04-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp1.value).toFixed(2)), parseFloat(V.toFixed(2)))) {
        alert('Volume is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(parseFloat(inp2.value).toFixed(2)), parseFloat(avel.toFixed(2)))) {
        alert('Average Velocity is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(parseFloat(inp3.value).toFixed(2)), parseFloat(Q.toFixed(2)))) {
        alert('Discharge in m<sup>3</sup>/s is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(parseFloat(inp4.value).toFixed(2)), parseFloat(Q_lit.toFixed(2)))) {
        alert('Discharge in litres is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp1.remove();
    sp1.innerText = `${(V).toFixed(4)}`;
    inp2.remove();
    sp2.innerText = `${(avel).toFixed(4)}`;
    inp3.remove();
    sp3.innerText = `${(Q).toFixed(4)}`;
    inp4.remove();
    sp4.innerText = `${(Q_lit).toFixed(4)}`;
    alert('Your entered values are correct!!');
    btn.style.display = 'none';
    activity2();
}
activity1();
//# sourceMappingURL=activity1.js.map