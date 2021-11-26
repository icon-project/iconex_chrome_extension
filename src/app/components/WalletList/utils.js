import BigNumber from "bignumber.js";

const COPY_STATE = {
  off: "",
  on: "복사완료"
};

function randomUint32() {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn("Falling back to pseudo-random client seed");
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
}

function generateHashKey(obj) {
  let resultStrReplaced = "";
  let resultStr = objTraverse(obj);
  resultStrReplaced = resultStr.substring(1).slice(0, -1);
  const result = "icx_sendTransaction." + resultStrReplaced;
  return result;
}

function objTraverse(obj) {
  let result = "";
  result += "{";
  let keys;
  keys = Object.keys(obj);
  keys.sort();
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      switch (true) {
        case value === null: {
          result += `${key}.`;
          result += String.raw`\0`;
          break;
        }
        case typeof value === "string": {
          result += `${key}.`;
          result += escapeString(value);
          break;
        }
        case Array.isArray(value): {
          result += `${key}.`;
          result += arrTraverse(value);
          break;
        }
        case typeof value === "object": {
          result += `${key}.`;
          result += objTraverse(value);
          break;
        }
        default:
          break;
      }
      result += ".";
    }
    result = result.slice(0, -1);
    result += "}";
  } else {
    result += "}";
  }

  return result;
}

function arrTraverse(arr) {
  let result = "";
  result += "[";
  for (let j = 0; j < arr.length; j++) {
    const value = arr[j];
    switch (true) {
      case value === null: {
        result += String.raw`\0`;
        break;
      }
      case typeof value === "string": {
        result += escapeString(value);
        break;
      }
      case Array.isArray(value): {
        result += arrTraverse(value);
        break;
      }
      case typeof value === "object": {
        result += objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += ".";
  }
  result = result.slice(0, -1);
  result += "]";
  return result;
}

function escapeString(value) {
  let newString = String.raw`${value}`;
  newString = newString.split("\\").join("\\\\");
  newString = newString.split(".").join("\\.");
  newString = newString.split("{").join("\\{");
  newString = newString.split("}").join("\\}");
  newString = newString.split("[").join("\\[");
  newString = newString.split("]").join("\\]");
  return newString;
}

function removeTrailingZeros(value) {
  value = value.toString();

  if (value.indexOf(".") === -1) {
    return value;
  }

  while (
    (value.slice(-1) === "0" || value.slice(-1) === ".") &&
    value.indexOf(".") !== -1
  ) {
    value = value.substr(0, value.length - 1);
  }
  return value;
}

function numberWithCommas(x) {
  x = removeTrailingZeros(x);
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function convertNumberToText(num) {
  let amount = new BigNumber(num);
  let roundNum = 18;
  return numberWithCommas(amount.toFixed(roundNum).toString());
}

function handleCopy(selector, index, copyState, setState) {
  const key = document.querySelector(selector);
  if (copyState === COPY_STATE["on"]) {
    return false;
  } else {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(key);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      setState(
        {
          copyState: COPY_STATE["on"],
          copyIndex: index
        },
        () => {
          window.setTimeout(function() {
            setState({
              copyState: COPY_STATE["off"],
              copyIndex: -1
            });
          }, 1000);
        }
      );
    } catch (e) {
      alert(e);
    }
  }
}

export {
  convertNumberToText,
  randomUint32,
  generateHashKey,
  objTraverse,
  arrTraverse,
  escapeString,
  handleCopy
};

