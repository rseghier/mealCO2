let ingredientCount = 0;

// Data for ingredients and their CO2 emissions per gram
const ingredientsData = {
    "Beef": 0.027,
    "Chicken": 0.0067,
    "Pork": 0.0120,
    "Tofu": 0.0020,
    "Rice": 0.0013,
    "Potatoes": 0.0003,
    "Lentils": 0.0009,
    "Milk": 0.0030,
    "Cheese": 0.0130,
    "Eggs": 0.0045
};

function addIngredient() {
    const container = document.getElementById('ingredientsList');
    const div = document.createElement('div');
    div.classList.add('ingredient');
    div.id = 'ingredientDiv' + ingredientCount;
    div.innerHTML = `
        <div class="ingredient-row">
            <select id="ingredient${ingredientCount}">
                ${Object.keys(ingredientsData).map(ingredient => `<option value="${ingredient}">${ingredient}</option>`).join('')}
            </select>
            <input type="number" id="quantity${ingredientCount}" placeholder="Quantity in grams">
            <button type="button" class="delete-btn" onclick="deleteIngredient(${ingredientCount})">X</button>
        </div>
    `;
    container.appendChild(div);
    ingredientCount++;
}


function deleteIngredient(id) {
    const ingredientDiv = document.getElementById('ingredientDiv' + id);
    ingredientDiv.parentNode.removeChild(ingredientDiv);
}

function calculateCO2() {
    let totalCO2 = 0;
    let details = '';

    for (let i = 0; i < ingredientCount; i++) {
        if (document.getElementById(`ingredient${i}`)) {
            const ingredient = document.getElementById(`ingredient${i}`).value;
            const quantity = document.getElementById(`quantity${i}`).value;
            const co2 = ingredientsData[ingredient] * quantity;
            totalCO2 += co2;
            details += `${ingredient}: ${co2.toFixed(2)} kg CO2<br>`;
        }
    }

    document.getElementById('result').innerHTML = `
        <strong>Total CO2 for the meal:</strong> ${totalCO2.toFixed(2)} kg<br>
        <strong>Details per ingredient:</strong><br>${details}
    `;

    // Update the scale after calculation
    const scaleDiv = document.getElementById('scale');
    scaleDiv.innerHTML = `
        <div class="scale-container">
            <div class="scale-pointer" style="left: ${getScalePosition(totalCO2)}%"></div>
        </div>
        <p>CO2 Impact: ${getScaleLabel(totalCO2)}</p>
    `;
}



function getScalePosition(co2) {
    if (co2 <= 0) return 0;
    if (co2 >= 5) return 100;
    return (co2 / 5) * 100;
}

function getScaleLabel(co2) {
    if (co2 <= 0) return "A";
    if (co2 <= 1) return "B";
    if (co2 <= 2) return "C";
    if (co2 <= 4) return "D";
    if (co2 >= 5) return "E";
}


// Initialize with one ingredient field
addIngredient();

// ...existing calculateCO2 function...

const scaleDiv = document.getElementById('scale');
scaleDiv.innerHTML = `
    <div class="scale-container">
        <div class="scale-pointer" style="left: ${getScalePosition(totalCO2)}%"></div>
    </div>
    <p>CO2 Impact: ${getScaleLabel(totalCO2)}</p>
`;

// ...existing calculateCO2 function...
