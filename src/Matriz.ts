const miniOrderFormExpandSelector =
  "#MiniOrderForm > span.fa-chevron-circle-up";

const cantidadSelector =
  "#MiniOrderForm > form > div > span > div.ant-form-item.QuantityInputFormItem.MiniOrderFormQuantity-amount-input > div > div.ant-col.ant-form-item-control > div > div > div > div.ant-input-number-input-wrap > input";

const cantidadMostrarSelector =
  "#MiniOrderForm > form > div.MiniOrderForm_FormMiniOrdenPanel_row-bottom__div > div.ant-form-item.amount-show__div.miniOrderFormItem > div > div.ant-col.ant-form-item-control > div > div > div > div.ant-input-number-input-wrap > input";

const instrumentoSelector = "#rc_select_2";

const precioSelector =
  "#MiniOrderForm > form > div.MiniOrderForm_FormMiniOrdenPanel_row-top__div > span > div.ant-form-item.PriceInputFormItem.MiniOrderFormQuantity-price-input > div > div.ant-col.ant-form-item-control > div > div > div > div.ant-input-number-input-wrap > input";

const botonComprarSelector =
  "#MiniOrderForm > div.MiniOrderForm_buttonsBlock > button.ant-btn.ant-btn-primary.ant-btn-sm.OrderButton.ButtonComprar";

const botonVenderSelector =
  "#MiniOrderForm > div.MiniOrderForm_buttonsBlock > button.ant-btn.ant-btn-primary.ant-btn-sm.OrderButton.ButtonVender";

function setInputValue(input: HTMLInputElement, value: string) {
  Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )!.set!.call(input, value);
  // This will trigger a new render wor the component
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function clickComprar() {
  const orderButton = document.querySelector(
    botonComprarSelector
  ) as HTMLButtonElement;
  if (orderButton) {
    orderButton.click();
  } else {
    console.error("No se encontró el botón de comprar");
  }
}
function clickVender() {
  const orderButton = document.querySelector(
    botonVenderSelector
  ) as HTMLButtonElement;
  if (orderButton) {
    orderButton.click();
  } else {
    console.error("No se encontró el botón de vender");
  }
}

function getCantidadAMostrarInput(): HTMLInputElement {
  // Buscar siempre ya que puede que no este creado el elemento
  let cantidadMostrarInput = document.querySelector(
    cantidadMostrarSelector
  ) as HTMLInputElement;

  if (!cantidadMostrarInput) {
    // Si no está creado hacer click para expandir el Mini Order Form
    getMiniOrderFormExpand().click();
    cantidadMostrarInput = document.querySelector(
      cantidadMostrarSelector
    ) as HTMLInputElement;
  }

  return cantidadMostrarInput;
}

function instrumentAndPriceHasValues(): boolean {
  return getInstrumentoInput().value !== "" && getPrecioInput().value !== "";
}

function setSize(cantidad: number, cantidadMostrar: number) {
  if (instrumentAndPriceHasValues()) {
    console.log(`SetSize ${cantidad}/${cantidadMostrar}`);
    setInputValue(getCantidadInput(), cantidad.toString());
    if (Number.isInteger(cantidadMostrar) && cantidadMostrar > 0) {
      setInputValue(getCantidadAMostrarInput(), cantidadMostrar.toString());
    }
  }
}

function getTicker(): string {
  var ticker = getInstrumentoText();
  ticker = ticker
    .replace(" (CI)", "")
    .replace(" (24hs)", "")
    .split(" ")[0]
    .toUpperCase();
  return ticker;
}

function getInstrumentoText() {
  return getInstrumentoInput().value;
}

var miniOrderFormExpandSpan: HTMLSpanElement | undefined = undefined;
function getMiniOrderFormExpand(): HTMLSpanElement {
  if (!miniOrderFormExpandSpan) {
    miniOrderFormExpandSpan = document.querySelector(
      miniOrderFormExpandSelector
    ) as HTMLSpanElement;
  }
  return miniOrderFormExpandSpan;
}

var instrumentoInput: HTMLInputElement | undefined = undefined;
function getInstrumentoInput(): HTMLInputElement {
  if (!instrumentoInput) {
    instrumentoInput = document.querySelector(
      instrumentoSelector
    ) as HTMLInputElement;
  }
  return instrumentoInput;
}

var precioInput: HTMLInputElement | undefined = undefined;
function getPrecioInput(): HTMLInputElement {
  if (!precioInput) {
    return document.querySelector(precioSelector) as HTMLInputElement;
  }
  return precioInput;
}

var cantidadInput: HTMLInputElement | undefined = undefined;
function getCantidadInput(): HTMLInputElement {
  if (!cantidadInput) {
    return document.querySelector(cantidadSelector) as HTMLInputElement;
  }
  return cantidadInput;
}

export default {
  getTicker,
  getCantidadAMostrarInput,
  getInstrumentoText,
  setSize,
  instrumentAndPriceHasValues,
  getInstrumentoInput,
  getPrecioInput,
  getCantidadInput,
  clickComprar,
  clickVender,
};
