// Import stylesheets
import './style.css';

document.body.addEventListener('pointerup', (ev) => {
  console.log('pointerup', ev);
});

const fractionDigits = 2;
const commaSeparator = '.';
const groupingSeparator = ',';

const input: HTMLInputElement = document.getElementById(
  'fname'
) as HTMLInputElement;

const numinput: HTMLInputElement = document.getElementById(
  'fname2'
) as HTMLInputElement;

input.onchange = onChange;
input.oninput = onInput;
input.onpaste = onPaste;
input.pattern = '-?\\d+'; // `-?\\d*${commaSeparator}?\\d{0,${fractionDigits}}`;
input.required = false;
input.placeholder = 'Type a value';
input.oninvalid = (ev: Event) => {
  console.log('INVALID');
  input.setCustomValidity(' ');
};
input.className = 'my-super-input number-style nix-wasda';

numinput.oninput = (ev: Event) => {
  console.log('numinput', ev);
};
numinput.oninvalid = (ev: Event) => {
  console.log('num INVALID', ev);
};

const cl1 = input.classList;
console.log('classes', cl1, input.className);
// const cl2 = (target as SVGElement).className

numinput.onchange = (ev: Event) => {
  console.log('num change', numinput.valueAsNumber, ev);
};

numinput.enterKeyHint = 'Press';

let lastGoodValue = input.value;
export function onInput(event: Partial<InputEvent>) {
  console.log('input', event);
  let strval = (event.target as HTMLInputElement)?.value;

  if (event.inputType === 'insertFromPaste') {
    console.log(`Ignored paste`, input.value);
    return;
  }

  const fmtg: Intl.NumberFormatPartTypes = 'decimal';

  const caret = input.selectionStart;
  const valid =
    !input.validity.patternMismatch ||
    input.value === '-' ||
    input.value === '.' ||
    input.value == '-.';
  console.log(
    `on input ${event.inputType}`,
    input.value,
    valid,
    input.validity
  );
  if (valid) {
    lastGoodValue = input.value;
  } else {
    input.value = lastGoodValue;
  }
}

export function onChange(event: Event) {
  const strval = input.value;
  const fmt = Intl.NumberFormat(['en-US'], {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    useGrouping: true,
  });
  console.log('fmt parts', fmt.formatToParts(-1000.123));
  console.log(
    'on Change',
    fmt.format(Number(strval.replaceAll(commaSeparator, '.'))),
    event
  );
  // input.reportValidity();
}

export function onPaste(event: ClipboardEvent) {
  console.log(
    'on Paste',
    input.value,
    event.clipboardData,
    event.clipboardData.getData('')
  );

  setTimeout(() => {
    const data = input.value.replaceAll(groupingSeparator, '');
    console.log('deferred paste:', data);
    input.value = data;
    onInput({
      target: event.target,
      data: data,
      inputType: 'deferredPaste',
    });
  }, 1);
  /*if(event.inputType==='insertFromPaste') {
    input.value = input.value.replaceAll(groupingSeparator,'');
  }*/
}
