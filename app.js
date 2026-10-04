const T = [
  ['discount','Discount Calculator','🏷️','Money','Find sale price and savings.',[['p','Original price','number'],['d','Discount %','number']],v=>`Sale price: ${M(v.p*(1-v.d/100))}<br>Savings: ${M(v.p*v.d/100)}`],
  ['tip','Tip Calculator','🍽️','Money','Calculate tip and total.',[['b','Bill amount','number'],['t','Tip %','number']],v=>`Tip: ${M(v.b*v.t/100)}<br>Total: ${M(v.b*(1+v.t/100))}`],
  ['percentage','Percentage Calculator','%','Money','Find a percentage of a number.',[['n','Number','number'],['p','Percent','number']],v=>`${v.p}% of ${v.n} = <b>${F(v.n*v.p/100)}</b>`],
  ['temperature','Temperature Converter','🌡️','Everyday','Convert Fahrenheit and Celsius.',[['v','Temperature','number'],['f','From','select:Fahrenheit|Celsius|Kelvin'],['t','To','select:Celsius|Fahrenheit|Kelvin']],v=>{const from=v.f,to=v.t;let c;if(from==='Celsius')c=v.v;else if(from==='Fahrenheit')c=(v.v-32)*5/9;else c=v.v-273.15;let result;if(to==='Celsius')result=c;else if(to==='Fahrenheit')result=c*9/5+32;else result=c+273.15;return `${F(result)}° ${to}`;}],
  ['tax','Sales Tax Calculator','🧾','Money','Calculate tax and final price.',[['p','Price','number'],['t','Tax %','number']],v=>`Tax: ${M(v.p*v.t/100)}<br>Total: ${M(v.p*(1+v.t/100))}`],
  ['markup','Markup Calculator','📦','Business','Price an item using markup.',[['c','Cost','number'],['m','Markup %','number']],v=>`Markup: ${M(v.c*v.m/100)}<br>Selling price: ${M(v.c*(1+v.m/100))}`],
  ['age','Age Calculator','🎂','Everyday','Calculate age from a birth date.',[['b','Birth date','date'],['a','As of','date']],v=>{let b=new Date(v.b+'T00:00:00'),a=new Date(v.a||new Date().toISOString().slice(0,10)+'T00:00:00');if(Number.isNaN(b.getTime()))return 'Please enter a valid birth date.';if(Number.isNaN(a.getTime()))return 'Please enter a valid date.';let years=a.getFullYear()-b.getFullYear(),months=a.getMonth()-b.getMonth(),days=a.getDate()-b.getDate();if(days<0){months--;const prev=new Date(a.getFullYear(),a.getMonth(),0);days+=prev.getDate();}if(months<0){years--;months+=12;}return `<b>${years}</b> years, <b>${months}</b> months, <b>${days}</b> days`; }],
  ['days','Days Between Dates','📅','Everyday','Count days between two dates.',[['a','Start','date'],['b','End','date']],v=>{const a=new Date(v.a+'T00:00:00'),b=new Date(v.b+'T00:00:00');if(Number.isNaN(a.getTime())||Number.isNaN(b.getTime()))return 'Please enter valid dates.';const days=Math.round(Math.abs(b-a)/86400000);return `Days: <b>${days}</b>`;}],
  ['miles','Miles Converter','🛣️','Everyday','Convert miles and kilometers.',[['v','Distance','number'],['f','From','select:Miles|Kilometers']],v=>v.f==='Miles'?`${F(v.v*1.609344)} km`:`${F(v.v/1.609344)} miles`],
  ['pounds','Pounds Converter','⚖️','Everyday','Convert pounds and kilograms.',[['v','Weight','number'],['f','From','select:Pounds|Kilograms']],v=>v.f==='Pounds'?`${F(v.v*.45359237)} kg`:`${F(v.v/0.45359237)} lb`],
  ['fraction','Fraction Calculator','➗','Business','Add, subtract, multiply or divide fractions.',[['a','First fraction','text'],['o','Operation','select:+|-|×|÷'],['b','Second fraction','text']],v=>FR(v.a,v.o,v.b)],
  ['loan','Loan Payment Calculator','💳','Money','Estimate monthly loan payments.',[['p','Loan amount','number'],['r','Annual interest %','number'],['y','Term in years','number']],v=>LOAN(v.p,v.r,v.y)],
  ['mortgage','Mortgage Calculator','🏠','Money','Estimate principal and interest payment.',[['p','Loan amount','number'],['r','Annual interest %','number'],['y','Term in years','number']],v=>LOAN(v.p,v.r,v.y)],
  ['gas','Gas Mileage Calculator','⛽','Savings','Calculate MPG.',[['m','Miles driven','number'],['g','Gallons used','number']],v=>`Fuel economy: <b>${F(v.m/v.g)} MPG</b>`],
  ['paycheck','Paycheck Calculator','💵','Money','Estimate take-home pay.',[['g','Gross pay','number'],['d','Deductions %','number']],v=>`Estimated take-home: <b>${M(v.g*(1-v.d/100))}</b>`],
  ['interest','Compound Interest Calculator','📈','Money','Estimate growth with compound interest.',[['p','Starting amount','number'],['r','Annual rate %','number'],['y','Years','number'],['c','Contribution per year','number']],v=>{const P=v.p,r=v.r/100,Y=v.y,C=v.c||0;const total=P*Math.pow(1+r,Y)+C*((Math.pow(1+r,Y)-1)/r||Y);return `Future value: <b>${M(total)}</b><br>Growth: <b>${M(total-P)}</b>`;}],
  ['ratio','Ratio Calculator','🔢','Business','Scale a ratio to a new quantity.',[['a','Ratio A','number'],['b','Ratio B','number'],['c','Known new value','number']],v=>`Other value: <b>${F(v.c*v.a/v.b)}</b>`],
  ['businessdays','Business Days Calculator','💼','Business','Count weekdays between dates.',[['a','Start','date'],['b','End','date']],v=>{let a=new Date(v.a+'T00:00:00'),b=new Date(v.b+'T00:00:00');if(a>b)[a,b]=[b,a];let count=0;for(let d=new Date(a);d<=b;d.setDate(d.getDate()+1)){const day=d.getDay();if(day!==0&&day!==6)count++;}return `<b>${count}</b> business day${count===1?'':'s'}`;}],
  ['kg','Kilograms ↔ Pounds','⚖️','Everyday','Convert kilograms and pounds.',[['v','Weight','number'],['f','From','select:Kilograms|Pounds']],v=>v.f==='Kilograms'?`${F(v.v*2.20462)} lb`:`${F(v.v/2.20462)} kg`],
  ['length','Feet/Inches ↔ Centimeters','📏','Everyday','Convert common length measurements.',[['v','Value','number'],['f','From','select:Feet|Inches|Centimeters']],v=>{if(v.f==='Feet')return `${F(v.v*30.48)} cm`;if(v.f==='Inches')return `${F(v.v*2.54)} cm`;return `${F(v.v/2.54)} in`; }],
  ['mileage','Fuel Cost Calculator','⛽','Money','Estimate fuel cost based on trip distance and efficiency.',[['d','Distance (miles)','number'],['e','MPG','number'],['p','Gas price per gallon','number']],v=>`Fuel needed: <b>${F(v.d/v.e)} gallons</b><br>Trip cost: <b>${M((v.d/v.e)*v.p)}</b>`],
  ['savings','Savings Goal Calculator','💸','Money','Estimate how much you need to save monthly.',[['g','Goal amount','number'],['r','Annual rate %','number'],['y','Years','number']],v=>{const goal=v.g,rate=v.r/100,years=v.y;const monthly = goal / (((Math.pow(1+rate/12,years*12)-1)/(rate/12))||1);return `Monthly savings: <b>${M(monthly)}</b>`;}],
  ['taxrefund','Tax Refund Estimator','💼','Money','Estimate refund based on tax withheld and owed.',[['w','Tax withheld','number'],['o','Tax owed','number']],v=>`Estimated refund: <b>${M(Math.max(v.w-v.o,0))}</b><br>Balance due: <b>${M(Math.max(v.o-v.w,0))}</b>`],
  ['profit','Profit Margin Calculator','📊','Business','Calculate profit margin percentage.',[['r','Revenue','number'],['c','Costs','number']],v=>{const profit=v.r-v.c;const margin=(profit/v.r)*100;return `Profit: <b>${M(profit)}</b><br>Profit margin: <b>${F(margin)}%</b>`;}],
  ['salary','Salary Converter','🧮','Money','Convert annual salary to hourly and monthly rates.',[['s','Annual salary','number'],['h','Hours per week','number'],['w','Weeks per year','number']],v=>{const annual=v.s,hours=v.h,wks=v.w;const hourly=annual/(hours*wks);const monthly=annual/12;return `Hourly: <b>${M(hourly)}</b><br>Monthly: <b>${M(monthly)}</b>`;}],
  ['time','Time to Double Calculator','⏱️','Money','Estimate how long it will take to double your money.',[['p','Starting amount','number'],['r','Annual rate %','number']],v=>{const p=v.p,r=v.r/100;const t = Math.log(2)/Math.log(1+r);return `Years to double: <b>${F(t)}</b>`;}]
];

const M = (x) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(x));
const F = (n) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 4 });

function Q(s) {
  const raw = String(s || '').trim();
  if (!raw) return [0, 1];
  const parts = raw.split('/').map(Number);
  return [parts[0] || 0, parts[1] || 1];
}

function LOAN(p, r, y) {
  if (!Number.isFinite(p) || !Number.isFinite(r) || !Number.isFinite(y) || p < 0 || r < 0 || y <= 0) {
    return 'Enter a valid loan amount, interest rate, and term.';
  }
  const monthlyRate = r / 1200;
  const months = y * 12;
  const payment = monthlyRate === 0 ? p / months : p * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  return `Monthly payment: <b>${M(payment)}</b><br>Total paid: <b>${M(payment * months)}</b>`;
}

function FR(a, operation, b) {
  const [x, y] = [Q(a), Q(b)];
  let n, d;
  if (operation === '+') {
    n = x[0] * y[1] + y[0] * x[1];
    d = x[1] * y[1];
  } else if (operation === '-') {
    n = x[0] * y[1] - y[0] * x[1];
    d = x[1] * y[1];
  } else if (operation === '×' || operation === '*') {
    n = x[0] * y[0];
    d = x[1] * y[1];
  } else if (operation === '÷' || operation === '/') {
    if (y[0] === 0) return 'Cannot divide by zero.';
    n = x[0] * y[1];
    d = x[1] * y[0];
  } else {
    return 'Choose a valid operation.';
  }

  if (d < 0) {
    n *= -1;
    d *= -1;
  }
  const divisor = Math.abs((function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a || 1; })(n, d));
  const reducedN = n / divisor;
  const reducedD = d / divisor;
  return `<b>${reducedN}/${reducedD}</b> (${F(n / d)})`;
}

const featuredNames = ['loan', 'mortgage', 'discount', 'tax', 'age', 'miles'];
let currentCategory = '';

function getToolBySlug(slug) {
  return T.find((tool) => tool[0] === slug);
}

function renderFeatured() {
  const featured = document.querySelector('#featured');
  if (!featured) return;
  featured.innerHTML = featuredNames
    .map((slug) => {
      const tool = getToolBySlug(slug);
      if (!tool) return '';
      return `
        <article class="tool-card featured-card" data-tool="${tool[0]}">
          <div class="tool-icon">${tool[2]}</div>
          <h3>${tool[1]}</h3>
          <p>${tool[4]}</p>
          <button type="button" class="tool-button">Use Tool</button>
        </article>
      `;
    })
    .join('');

  featured.querySelectorAll('.tool-card').forEach((card) => {
    card.addEventListener('click', () => openTool(getToolBySlug(card.dataset.tool)));
  });
}

function renderGrid(query = '', category = '') {
  const grid = document.querySelector('#grid');
  const noResults = document.querySelector('#noResults');
  if (!grid) return;

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = T.filter((tool) => {
    const matchesQuery = !normalizedQuery || `${tool[1]} ${tool[3]} ${tool[4]}`.toLowerCase().includes(normalizedQuery);
    const matchesCategory = !category || tool[3] === category;
    return matchesQuery && matchesCategory;
  });

  grid.innerHTML = filtered
    .map((tool) => `
      <article class="tool-card" data-tool="${tool[0]}">
        <div class="tool-icon">${tool[2]}</div>
        <div class="tool-topline">
          <span class="tool-category">${tool[3]}</span>
        </div>
        <h3>${tool[1]}</h3>
        <p>${tool[4]}</p>
        <button type="button" class="tool-button">Open</button>
      </article>
    `)
    .join('');

  grid.querySelectorAll('.tool-card').forEach((card) => {
    card.addEventListener('click', () => openTool(getToolBySlug(card.dataset.tool)));
  });

  if (noResults) noResults.hidden = filtered.length !== 0;
}

function openTool(tool) {
  if (!tool || !modal || !form || !result) return;
  document.querySelector('#title').textContent = tool[1];
  document.querySelector('#cat').textContent = tool[3];
  result.hidden = true;
  result.innerHTML = '';

  const fields = tool[5] || [];
  form.innerHTML = fields
    .map(([key, label, type]) => {
      if (type && type.startsWith('select:')) {
        const options = type.slice(7).split('|');
        return `
          <label class="field">
            <span>${label}</span>
            <select id="field-${key}">
              ${options.map((option) => `<option value="${option}">${option}</option>`).join('')}
            </select>
          </label>
        `;
      }

      const inputType = type === 'date' ? 'date' : type === 'text' ? 'text' : 'number';
      const step = type === 'number' ? 'step="any"' : '';
      return `
        <label class="field">
          <span>${label}</span>
          <input id="field-${key}" type="${inputType}" ${step}>
        </label>
      `;
    })
    .join('') + '<button type="submit" class="calc-button">Calculate</button>';

  form.onsubmit = (event) => {
    event.preventDefault();
    const values = {};
    for (const [key, , type] of fields) {
      const input = document.querySelector(`#field-${key}`);
      if (!input) {
        result.hidden = false;
        result.innerHTML = 'Calculator setup error.';
        return;
      }

      if (type && type.startsWith('select:')) {
        values[key] = input.value;
      } else if (input.value === '') {
        result.hidden = false;
        result.innerHTML = 'Please complete all fields.';
        return;
      } else if (type === 'number') {
        values[key] = Number(input.value);
        if (!Number.isFinite(values[key])) {
          result.hidden = false;
          result.innerHTML = 'Please enter valid numbers.';
          return;
        }
      } else {
        values[key] = input.value;
      }
    }

    try {
      const output = tool[6](values);
      result.innerHTML = output;
      result.hidden = false;
    } catch (error) {
      result.hidden = false;
      result.innerHTML = 'Please check your entries and try again.';
      console.error(error);
    }
  };

  modal.hidden = false;
}

function filterByCategory(category) {
  currentCategory = category || '';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const active = link.dataset.filter === currentCategory;
    link.classList.toggle('active', active);
  });
  renderGrid(document.querySelector('#search')?.value || '', currentCategory);
}

function searchByKeyword(keyword) {
  const search = document.querySelector('#search');
  if (search) {
    search.value = keyword;
    renderGrid(keyword, currentCategory);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#search');
  if (search) {
    search.addEventListener('input', (event) => renderGrid(event.target.value, currentCategory));
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      filterByCategory(link.dataset.filter || '');
    });
  });

  const closeButton = document.querySelector('#close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.hidden = true;
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.hidden = true;
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  renderFeatured();
  renderGrid();
});

window.searchByKeyword = searchByKeyword;
window.filterByCategory = filterByCategory;
