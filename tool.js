(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const M = (x) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(Number(x));

  const F = (x) => {
    const n = Number(x);
    return Number.isFinite(n)
      ? n.toLocaleString("en-US", { maximumFractionDigits: 4 })
      : "—";
  };

  function LOAN(p, r, y) {
    if (!Number.isFinite(p) || !Number.isFinite(r) || !Number.isFinite(y) ||
        p < 0 || r < 0 || y <= 0) {
      return "Enter a valid loan amount, interest rate, and term.";
    }

    const monthlyRate = r / 1200;
    const months = y * 12;

    const payment =
      monthlyRate === 0
        ? p / months
        : p * monthlyRate /
          (1 - Math.pow(1 + monthlyRate, -months));

    return `
      Monthly payment: <b>${M(payment)}</b><br>
      Total paid: ${M(payment * months)}
    `;
  }

  function compound(p, r, y, c) {
    if (![p, r, y, c].every(Number.isFinite) ||
        p < 0 || r < 0 || y < 0 || c < 0) {
      return "Enter valid values.";
    }

    const rate = r / 100;
    let total;

    if (rate === 0) {
      total = p + c * y;
    } else {
      total =
        p * Math.pow(1 + rate, y) +
        c * ((Math.pow(1 + rate, y) - 1) / rate);
    }

    const contributions = c * y;
    const growth = total - p - contributions;

    return `
      Future value: <b>${M(total)}</b><br>
      Interest/growth: ${M(growth)}
    `;
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b) {
      const t = a % b;
      a = b;
      b = t;
    }

    return a || 1;
  }

  function parseFraction(value) {
    const parts = String(value).trim().split("/");

    if (parts.length !== 2) return null;

    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);

    if (
      !Number.isInteger(numerator) ||
      !Number.isInteger(denominator) ||
      denominator === 0
    ) {
      return null;
    }

    return [numerator, denominator];
  }

  function FR(a, operation, b) {
    const first = parseFraction(a);
    const second = parseFraction(b);

    if (!first || !second) {
      return "Enter fractions like 1/2 and 3/4.";
    }

    let numerator;
    let denominator;

    if (operation === "+") {
      numerator =
        first[0] * second[1] +
        second[0] * first[1];

      denominator =
        first[1] * second[1];

    } else if (operation === "-") {
      numerator =
        first[0] * second[1] -
        second[0] * first[1];

      denominator =
        first[1] * second[1];

    } else if (operation === "×" || operation === "*") {
      numerator = first[0] * second[0];
      denominator = first[1] * second[1];

    } else {
      if (second[0] === 0) {
        return "Cannot divide by zero.";
      }

      numerator = first[0] * second[1];
      denominator = first[1] * second[0];
    }

    if (denominator < 0) {
      numerator *= -1;
      denominator *= -1;
    }

    const divisor = gcd(numerator, denominator);

    const reducedNumerator = numerator / divisor;
    const reducedDenominator = denominator / divisor;

    return `
      Result:
      <b>${reducedNumerator}/${reducedDenominator}</b>
      (${F(numerator / denominator)})
    `;
  }

  function initCalculator() {
    const form = $("calculator-form");
    const result = $("result");

    if (!form || !result || !window.TOOL) {
      return;
    }

    form.innerHTML = (TOOL.fields || [])
      .map(([key, label, type]) => {

        if (type && type.startsWith("select:")) {
          const options = type
            .slice(7)
            .split("|");

          return `
            <label>
              ${label}
              <select id="field-${key}">
                ${options
                  .map(
                    (option) =>
                      `<option value="${option}">${option}</option>`
                  )
                  .join("")}
              </select>
            </label>
          `;
        }

        const inputType =
          type === "text" ? "text" : "number";

        return `
          <label>
            ${label}
            <input
              id="field-${key}"
              type="${inputType}"
              ${inputType === "number" ? 'step="any"' : ""}
            >
          </label>
        `;
      })
      .join("") +
      `
        <button type="submit">Calculate</button>
      `;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const values = {};

      for (const [key, , type] of TOOL.fields) {
        const element = $("field-" + key);

        if (!element) {
          result.hidden = false;
          result.textContent = "Calculator setup error.";
          return;
        }

        if (type && type.startsWith("select:")) {
          values[key] = element.value;
        } else if (type === "number") {

          if (element.value === "") {
            result.hidden = false;
            result.textContent =
              "Please complete all fields.";
            return;
          }

          values[key] = Number(element.value);

          if (!Number.isFinite(values[key])) {
            result.hidden = false;
            result.textContent =
              "Please enter valid numbers.";
            return;
          }

        } else {
          values[key] = element.value;
        }
      }

      try {
        const calculation = Function(
          "v",
          "M",
          "F",
          "LOAN",
          "compound",
          "FR",
          `"use strict"; return (${TOOL.fn});`
        )(
          values,
          M,
          F,
          LOAN,
          compound,
          FR
        );

        result.innerHTML = String(calculation);
        result.hidden = false;

      } catch (error) {
        console.error(error);

        result.hidden = false;
        result.textContent =
          "Please check your entries and try again.";
      }
    });

    const year = $("year");

    if (year) {
      year.textContent =
        new Date().getFullYear();
    }
  }

  document.addEventListener(
    "DOMContentLoaded",
    initCalculator
  );
})();
