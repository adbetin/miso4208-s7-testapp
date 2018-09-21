var numberOfColors = 5;
var totalGrades = 360;
var stepValue = 72; //se utiliza 72 para generar 5 colores equidistantes
function randomPalette(hue, saturation, value) {
    //se inicializa el generador
    var outColors = [];

    var currentGrade = hue;
    var count = 0;
    do {
        //se calcula el valor a pasar a la funcion;
        var passValue = currentGrade / totalGrades;

        //se calcula el color.
        var rgbValue = hsvToRgb(passValue, saturation, value);
        outColors.push(rgbValue);

        currentGrade += stepValue;
        if (currentGrade > (totalGrades - 1)) {
            currentGrade -= totalGrades;
        }
        count++;
    } while (count < numberOfColors);

    return outColors;
}



function generateRules(colors) {
    var rgbColors = [];
    for (var i = 0; i < numberOfColors; i++) {
        color = rgbToHex(colors[i]);
        rgbColors.push(color);

        //se actualiza el valor de la paleta
        $("#color" + (i + 1)).css('background', color);
    }

    var outputRules = ".website-background{ color: " + rgbColors[0] + ";}\n\n";
    outputRules += ".element-text{ color: " + rgbColors[1] + ";}\n\n";
    outputRules += ".element-border{ border-color: " + rgbColors[2] + ";}\n\n";
    outputRules += ".element-background{ background-color: " + rgbColors[3] + ";}\n\n";
    outputRules += ".header{ color: " + rgbColors[4] + ";}\n\n";
    $("#css-rules").val(outputRules);
}

function unitRGBToHex(color) {
    var hex = Number(color).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function rgbToHex(color) {
    var r = color[0];
    var g = color[1];
    var b = color[2];
    return "#" + unitRGBToHex(Math.round(r)) + unitRGBToHex(Math.round(g)) + unitRGBToHex(Math.round(b))
};

function refreshPalette(random) {
    var initialValue = 0;
    if (random) {
        initialValue = Math.round(Math.random() * totalGrades);
        $("#slider-color").slider("value", initialValue);
        $("#value-color").text(initialValue);
    } else {
        initialValue = $("#slider-color").slider("value");
    }
    var saturation = $("#slider-saturation").slider("value") / 100;
    var value = $("#slider-value").slider("value") / 100;
    var rgbPallete = randomPalette(initialValue, saturation, value);
    generateRules(rgbPallete);
}


function cleanPalette() {
    //se inicializan los sliders
    $("#slider-color").slider("value", 0);
    $("#value-color").text(0);

    $("#slider-saturation").slider("value", 100);
    $("#value-saturation").text(100);

    $("#slider-value").slider("value", 100);
    $("#value-value").text(100);

    //se generan las reglas con los colores en blanco
    var whiteColors = [
        [255, 255, 255],
        [255, 255, 255],
        [255, 255, 255],
        [255, 255, 255],
        [255, 255, 255]
    ]
    generateRules(whiteColors);
}

$(function () {
    var handleColor = $("#value-color");
    $("#slider-color").slider({
        min: 0,
        max: 359,
        value: 0,
        create: function () {
            handleColor.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handleColor.text(ui.value);
        }
    });

    var handleSaturation = $("#value-saturation");
    $("#slider-saturation").slider({
        min: 0,
        max: 100,
        value: 100,
        create: function () {
            handleSaturation.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handleSaturation.text(ui.value);
        }
    });

    var handlevalue = $("#value-value");
    $("#slider-value").slider({
        min: 0,
        max: 100,
        value: 100,
        create: function () {
            handlevalue.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handlevalue.text(ui.value);
        }
    });
});