"use strict";

/* Knowing & Going — master calculator engine */

const $ = (id) => document.getElementById(id);

function num(id) {
  const el = $(id);
  return el ? Number(el.value) : NaN;
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function show(id, text) {
  const el = $(id);
  if (el) el.innerHTML = text;
}

/* ---------------- MONEY & FINANCE ---------------- */

function calcDiscount() {
  const price = num("discP");
  const rate = num("discR");

  if (!Number.isFinite(price) || !Number.isFinite(rate) ||
      price < 0 || rate < 0 || rate > 100) {
    return show("discOut", "Enter a valid price and discount.");
  }

  const savings = price * rate / 100;
  const sale = price - savings;

  show(
    "discOut",
    `You save <b>${money(savings)}</b><br>
     Sale price: <b>${money(sale)}</b>`
  );
}

function calcTip() {
  const bill = num("tipP");
  const rate = num("tipR");
  const people = num("tipPeople");

  if (!Number.isFinite(bill) || !Number.isFinite(rate) ||
      !Number.isFinite(people) || bill < 0 || rate < 0 || people < 1) {
    return show("tipOut", "Enter valid values.");
  }

  const tip = bill * rate / 100;
  const total = bill + tip;

  show(
    "tipOut",
    `Tip: <b>${money(tip)}</b><br>
     Total: <b>${money(total)}</b><br>
     Per person: <b>${money(total / people)}</b>`
  );
}

function calcPercentage() {
  const part = num("pctA");
  const total = num("pctB");

  if (!Number.isFinite(part) || !Number.isFinite(total) || total === 0) {
    return show("pctOut", "Enter valid numbers. Total cannot be zero.");
  }

  show("pctOut", `<b>${((part / total) * 100).toFixed(2)}%</b>`);
}

function calcTax() {
  const price = num("taxP");
  const rate = num("taxR");

  if (!Number.isFinite(price) || !Number.isFinite(rate) ||
      price < 0 || rate < 0) {
    return show("taxOut", "Enter a valid price and tax rate.");
  }

  const tax = price * rate / 100;
  const total = price + tax;

  show(
    "taxOut",
    `Tax: <b>${money(tax)}</b><br>
     Total: <b>${money(total)}</b>`
  );
}

function calcMarkup() {
  const cost = num("markP");
  const rate = num("markR");

  if (!Number.isFinite(cost) || !Number.isFinite(rate) ||
      cost < 0 || rate < 0) {
    return show("markOut", "Enter a valid cost and markup.");
  }

  const markup = cost * rate / 100;
  const selling = cost + markup;

  show(
    "markOut",
    `Markup: <b>${money(markup)}</b><br>
     Selling price: <b>${money(selling)}</b>`
  );
}

function calcRatio() {
  const a = num("ratioA");
  const b = num("ratioB");
  const c = num("ratioC");

  if (![a, b, c].every(Number.isFinite) || b === 0) {
    return show("ratioOut", "Enter valid numbers. B cannot be zero.");
  }

  const result = c * a / b;

  show(
    "ratioOut",
    `If <b>${a}</b> : <b>${b}</b>, then<br>
     <b>${c}</b> corresponds to <b>${result.toFixed(4)}</b>.`
  );
}

function calcLoan() {
  const principal = num("loanP");
  const rate = num("loanR");
  const years = num("loanY");

  if (![principal, rate, years].every(Number.isFinite) ||
      principal < 0 || rate < 0 || years <= 0) {
    return show("loanOut", "Enter a valid loan amount, rate, and term.");
  }

  const months = years * 12;
  const monthlyRate = rate / 1200;

  const payment =
    monthlyRate === 0
      ? principal / months
      : principal * monthlyRate /
        (1 - Math.pow(1 + monthlyRate, -months));

  show(
    "loanOut",
    `Monthly payment: <b>${money(payment)}</b><br>
     Total paid: <b>${money(payment * months)}</b><br>
     Total interest: <b>${money(payment * months - principal)}</b>`
  );
}

function calcMortgage() {
  const price = num("mortP");
  const down = num("mortD");
  const rate = num("mortR");
  const years = num("mortY");

  if (![price, down, rate, years].every(Number.isFinite) ||
      price < 0 || down < 0 || down > price ||
      rate < 0 || years <= 0) {
    return show("mortOut", "Enter valid mortgage values.");
  }

  const principal = price - down;
  const months = years * 12;
  const monthlyRate = rate / 1200;

  const payment =
    monthlyRate === 0
      ? principal / months
      : principal * monthlyRate /
        (1 - Math.pow(1 + monthlyRate, -months));

  show(
    "mortOut",
    `Loan amount: <b>${money(principal)}</b><br>
     Monthly payment: <b>${money(payment)}</b><br>
     Total paid: <b>${money(payment * months)}</b>`
  );
}

function calcCompound() {
  const principal = num("ciP");
  const rate = num("ciR");
  const years = num("ciY");
  const compounds = num("ciN");

  if (![principal, rate, years, compounds].every(Number.isFinite) ||
      principal < 0 || rate < 0 || years < 0 || compounds <= 0) {
    return show("ciOut", "Enter valid values.");
  }

  const amount =
    principal *
    Math.pow(
      1 + rate / 100 / compounds,
      compounds * years
    );

  show(
    "ciOut",
    `Future value: <b>${money(amount)}</b><br>
     Interest earned: <b>${money(amount - principal)}</b>`
  );
}

function calcPaycheck() {
  const rate = num("payRate");
  const regular = num("payHours");
  const overtime = num("payOT");
  const deductions = num("payDed");

  if (![rate, regular, overtime, deductions].every(Number.isFinite) ||
      rate < 0 || regular < 0 || overtime < 0 || deductions < 0) {
    return show("payOut", "Enter valid paycheck values.");
  }

  const regularPay = rate * regular;
  const overtimePay = rate * 1.5 * overtime;
  const gross = regularPay + overtimePay;
  const net = gross - deductions;

  show(
    "payOut",
    `Regular pay: <b>${money(regularPay)}</b><br>
     Overtime pay: <b>${money(overtimePay)}</b><br>
     Gross pay: <b>${money(gross)}</b><br>
     Estimated after deductions: <b>${money(net)}</b>`
  );
}

function calcGas() {
  const miles = num("gasMiles");
  const gallons = num("gasGal");
  const price = num("gasPrice");

  if (![miles, gallons, price].every(Number.isFinite) ||
      miles < 0 || gallons <= 0 || price < 0) {
    return show("gasOut", "Enter valid gas mileage values.");
  }

  const mpg = miles / gallons;
  const tripCost = gallons * price;

  show(
    "gasOut",
    `Fuel economy: <b>${mpg.toFixed(2)} MPG</b><br>
     Fuel cost: <b>${money(tripCost)}</b>`
  );
}

/* ---------------- FRACTIONS ---------------- */

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }

  return a || 1;
}

function calcFraction() {
  const a = num("fA");
  const b = num("fB");
  const c = num("fC");
  const d = num("fD");
  const op = $("fOp")?.value;

  if (![a, b, c, d].every(Number.isInteger) ||
      b === 0 || d === 0) {
    return show("fOut", "Enter valid fractions. Denominators cannot be zero.");
  }

  let numerator;
  let denominator;

  if (op === "+") {
    numerator = a * d + c * b;
    denominator = b * d;
  } else if (op === "-") {
    numerator = a * d - c * b;
    denominator = b * d;
  } else if (op === "*") {
    numerator = a * c;
    denominator = b * d;
  } else {
    if (c === 0) {
      return show("fOut", "Cannot divide by zero.");
    }

    numerator = a * d;
    denominator = b * c;
  }

  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  show(
    "fOut",
    `Result: <b>${numerator}/${denominator}</b><br>
     Decimal: <b>${(numerator / denominator).toFixed(4)}</b>`
  );
}

/* ---------------- DATES ---------------- */

function calcAge() {
  const birthValue = $("ageBirth")?.value;
  const asValue = $("ageAs")?.value;

  if (!birthValue) {
    return show("ageOut", "Choose a birth date.");
  }

  const birth = new Date(birthValue + "T00:00:00");
  const asOf = asValue
    ? new Date(asValue + "T00:00:00")
    : new Date();

  if (birth > asOf) {
    return show("ageOut", "Birth date cannot be after the calculation date.");
  }

  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(
      asOf.getFullYear(),
      asOf.getMonth(),
      0
    );
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  show(
    "ageOut",
    `<b>${years}</b> years, <b>${months}</b> months, <b>${days}</b> days`
  );
}

function calcDays() {
  const start = $("daysStart")?.value;
  const end = $("daysEnd")?.value;

  if (!start || !end) {
    return show("daysOut", "Choose both dates.");
  }

  const a = new Date(start + "T00:00:00");
  const b = new Date(end + "T00:00:00");

  const days = Math.round(Math.abs(b - a) / 86400000);

  show(
    "daysOut",
    `<b>${days}</b> day${days === 1 ? "" : "s"} between the dates.`
  );
}

function calcBusinessDays() {
  const start = $("bizStart")?.value;
  const end = $("bizEnd")?.value;

  if (!start || !end) {
    return show("bizOut", "Choose both dates.");
  }

  let a = new Date(start + "T00:00:00");
  const b = new Date(end + "T00:00:00");

  if (a > b) {
    const temp = a;
    a = b;
    b = temp;
  }

  let count = 0;

  while (a <= b) {
    const day = a.getDay();

    if (day !== 0 && day !== 6) {
      count++;
    }

    a.setDate(a.getDate() + 1);
  }

  show(
    "bizOut",
    `<b>${count}</b> business day${count === 1 ? "" : "s"}`
  );
}

/* ---------------- CONVERSIONS ---------------- */

function calcTemp() {
  const value = num("tempV");
  const from = $("tempFrom")?.value;
  const to = $("tempTo")?.value;

  if (!Number.isFinite(value)) {
    return show("tempOut", "Enter a valid temperature.");
  }

  let celsius;

  if (from === "Celsius") {
    celsius = value;
  } else if (from === "Fahrenheit") {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  let result;

  if (to === "Celsius") {
    result = celsius;
  } else if (to === "Fahrenheit") {
    result = celsius * 9 / 5 + 32;
  } else {
    result = celsius + 273.15;
  }

  show(
    "tempOut",
    `<b>${result.toFixed(4)}</b> °${to === "Celsius" ? "C" :
      to === "Fahrenheit" ? "F" : "K"}`
  );
}

function calcMiles() {
  const miles = num("milesV");

  if (!Number.isFinite(miles)) {
    return show("milesOut", "Enter a valid number.");
  }

  show(
    "milesOut",
    `${miles} miles = <b>${(miles * 1.609344).toFixed(4)} km</b>`
  );
}

function calcPounds() {
  const pounds = num("poundsV");

  if (!Number.isFinite(pounds)) {
    return show("poundsOut", "Enter a valid number.");
  }

  show(
    "poundsOut",
    `${pounds} lb = <b>${(pounds * 0.45359237).toFixed(4)} kg</b>`
  );
}

function calcKg() {
  const kg = num("kgV");

  if (!Number.isFinite(kg)) {
    return show("kgOut", "Enter a valid number.");
  }

  show(
    "kgOut",
    `${kg} kg = <b>${(kg * 2.2046226218).toFixed(4)} lb</b>`
  );
}

function calcFeet() {
  const feet = num("feetV");

  if (!Number.isFinite(feet)) {
    return show("feetOut", "Enter a valid number.");
  }

  show(
    "feetOut",
    `${feet} feet = <b>${(feet * 12).toFixed(2)} inches</b>`
  );
}

/* ---------------- TIRE COMPARISON ---------------- */

function tireDiameter(width, aspect, wheel) {
  const sidewall = width * (aspect / 100);
  return (2 * sidewall / 25.4) + wheel;
}

function calcTires() {
  const oldWidth = num("t1w");
  const oldAspect = num("t1a");
  const oldWheel = num("t1r");

  const newWidth = num("t2w");
  const newAspect = num("t2a");
  const newWheel = num("t2r");

  const values = [
    oldWidth,
    oldAspect,
    oldWheel,
    newWidth,
    newAspect,
    newWheel
  ];

  if (
    !values.every(Number.isFinite) ||
    values.some(v => v <= 0)
  ) {
    return show("tireOut", "Enter valid tire sizes.");
  }

  const oldDiameter =
    tireDiameter(oldWidth, oldAspect, oldWheel);

  const newDiameter =
    tireDiameter(newWidth, newAspect, newWheel);

  const difference =
    newDiameter - oldDiameter;

  const percent =
    difference / oldDiameter * 100;

  const circumferenceOld =
    oldDiameter * Math.PI;

  const circumferenceNew =
    newDiameter * Math.PI;

  show(
    "tireOut",
    `Original diameter: <b>${oldDiameter.toFixed(2)}"</b><br>
     New diameter: <b>${newDiameter.toFixed(2)}"</b><br>
     Difference: <b>${difference >= 0 ? "+" : ""}${difference.toFixed(2)}"</b><br>
     Diameter change: <b>${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%</b><br>
     Original circumference: <b>${circumferenceOld.toFixed(2)}"</b><br>
     New circumference: <b>${circumferenceNew.toFixed(2)}"</b>`
  );
}

/* ---------------- SEARCH ---------------- */

function setupSearch() {
  const search = $("search");

  if (!search) return;

  search.addEventListener("input", function () {
    const query = search.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".card");
    let visible = 0;

    cards.forEach(card => {
      const name =
        (card.dataset.name || card.textContent).toLowerCase();

      const match =
        !query || name.includes(query);

      card.style.display =
        match ? "" : "none";

      if (match) visible++;
    });

    document.querySelectorAll(".category").forEach(category => {
      const hasVisible =
        [...category.querySelectorAll(".card")]
          .some(card => card.style.display !== "none");

      category.style.display =
        hasVisible ? "" : "none";
    });

    const noResults = $("noResults");

    if (noResults) {
      noResults.hidden = visible !== 0;
    }
  });
}

/* ---------------- STARTUP ---------------- */

document.addEventListener("DOMContentLoaded", function () {
  setupSearch();

  const year = $("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
