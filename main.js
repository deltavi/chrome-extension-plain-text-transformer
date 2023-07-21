
import { formatFileName, toCamelCase, toSnakeCase, toKebabCase, toConstantCase, toDotCase, toWords, toPascalCase, toTitleCase} from "./utils.js";

// DOWNLOAD TEXT
function downloadText(filename, text) {
  if (isWindows()) {
    text = text.replace(/\r?\n/g, "\r\n");
  }
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//OS
function isWindows() {
  if (window && window.navigator && window.navigator.userAgent) {
    return window.navigator.userAgent.toLowerCase().indexOf("windows") != -1;
  }
  return false;
}

// EVENTS
function addOnClick(id, fn) {
  let el = document.getElementById(id);
  el.onclick = fn;
}

let params = (new URL(document.location)).searchParams;
let txt = params.get("text") || '';

let header = document.getElementById('header');
let body = document.getElementById('body');
let actionBtns = document.getElementById('action-btns');
let output = document.getElementById('output');
let infoBox = document.getElementById('info-box');
let inputTextArea = document.getElementById('input-text-area');
inputTextArea.value = txt;
let zoomValue = 1;

function addActionButton(name, fn){
  let b = document.createElement("a");
  b.innerText = name;
  b.onclick = fn;
  actionBtns.appendChild(b);
}

function addOutputLine(text) {
  if(!text || !text.trim()){
    return;
  }
  let o = document.createElement("div");
  o.classList.add("out-line");
  o.innerText = text;

  let bd = document.createElement("button");
  bd.innerText="Delete";
  bd.classList.add("out-btn");
  bd.onclick = function () {
    o.remove();
  };
  o.appendChild(bd);

  let bc = document.createElement("button");
  bc.innerText="Copy";
  bc.classList.add("out-btn");
  bc.onclick = function () {
    navigator.clipboard.writeText(text)
  };
  o.appendChild(bc);
 
  output.prepend(o);
}


addOnClick('zoom-in', function () {
  zoomValue *= 1.1
  inputTextArea.style.setProperty('zoom', zoomValue);
  output.style.setProperty('zoom', zoomValue);
});

addOnClick('zoom-out', function () {
  zoomValue *= 0.9
  inputTextArea.style.setProperty('zoom', zoomValue);
  output.style.setProperty('zoom', zoomValue);
});

addOnClick('copy', function (e) {
  navigator.clipboard.writeText(inputTextArea.value)
});

addOnClick('clean', function (e) {
  output.innerHTML = '';
});

addOnClick('download', function () {
  downloadText(formatFileName(inputTextArea.value.trim()), inputTextArea.value);
});

// ----

addActionButton('UPPER CASE', function (e) {
  addOutputLine(inputTextArea.value.toUpperCase());
});

addActionButton('lower case', function (e) {
  addOutputLine(inputTextArea.value.toLowerCase());
});

addActionButton('words', function (e) {
  addOutputLine(toWords(inputTextArea.value));
});

addActionButton('dot.case', function (e) {
  addOutputLine(toDotCase(inputTextArea.value));
});

addActionButton('camelCase', function (e) {
  addOutputLine(toCamelCase(inputTextArea.value));
});

addActionButton('PascalCase', function (e) {
  addOutputLine(toPascalCase(inputTextArea.value));
});

addActionButton('Title Case', function (e) {
  addOutputLine(toTitleCase(inputTextArea.value));
});

addActionButton('snake_case', function (e) {
  addOutputLine(toSnakeCase(inputTextArea.value));
});

addActionButton('kebab-case', function (e) {
  addOutputLine(toKebabCase(inputTextArea.value));
});

addActionButton('CONSTANT_CASE', function (e) {
  addOutputLine(toConstantCase(inputTextArea.value));
});

// ----

function onTextAreaResize() {
  console.log("onTextAreaResize",  header.offsetHeight)
  body.style.setProperty('margin-top', (header.offsetHeight) + 'px');
}
 onTextAreaResize()
 
 new ResizeObserver(onTextAreaResize).observe(inputTextArea)