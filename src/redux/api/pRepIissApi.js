import { icx_call, icx_sendTransaction } from "./walletIcxApi";
import { makeIcxRawTx, signRawTx, checkHxPrefix, toLoop } from "utils";
import { pRepType as P_REP_TYPE, ZERO_ADDRESS } from "constants/index";
import { ICX_CPS_SCORE } from "../../constants/config";

export async function getPRep(account) {
  try {
    const payload = await icx_call({
      contractAddress: ZERO_ADDRESS,
      methodName: "getPRep",
      inputObj: {
        address: checkHxPrefix(account),
      },
    });
    return payload[0];
  } catch (error) {
    return error;
  }
}

export async function getPReps({ options }) {
  try {
    const payload = await icx_call({
      contractAddress: ZERO_ADDRESS,
      methodName: "getPReps",
    });
    return {
      payload: payload[0],
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getStake({ account }) {
  try {
    const payload = await icx_call({
      contractAddress: ZERO_ADDRESS,
      methodName: "getStake",
      inputObj: {
        address: checkHxPrefix(account),
      },
    });

    return {
      payload: payload[0],
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function setStake({ input, privKey, ...txObj }) {
  const _txObj = Object.assign({}, txObj, {
    contractAddress: ZERO_ADDRESS,
    methodName: "setStake",
    inputObj: {
      value: window.web3.toHex(toLoop(input)),
    },
  });
  const rawTx = makeIcxRawTx(true, _txObj);
  const rawTxSigned = signRawTx(privKey, rawTx);
  const result = await icx_sendTransaction(rawTxSigned);
  return result;
}

export async function queryIScore({ account }) {
  try {
    const payload = await icx_call({
      contractAddress: ZERO_ADDRESS,
      methodName: "queryIScore",
      inputObj: {
        address: checkHxPrefix(account),
      },
    });
    return {
      payload: payload[0],
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function claimIScore({ privKey, ...txObj }) {
  const _txObj = Object.assign({}, txObj, {
    contractAddress: ZERO_ADDRESS,
    methodName: "claimIScore",
  });
  const rawTx = makeIcxRawTx(true, _txObj);
  const rawTxSigned = signRawTx(privKey, rawTx);
  const result = await icx_sendTransaction(rawTxSigned);
  return result;
}

export async function setDelegation({ input, privKey, ...txObj }) {
  const _txObj = Object.assign({}, txObj, {
    contractAddress: ZERO_ADDRESS,
    methodName: "setDelegation",
    inputObj: {
      delegations: input.map((item) => ({
        ...item,
        value: window.web3.toHex(toLoop(item.value)),
      })),
    },
  });
  const rawTx = makeIcxRawTx(true, _txObj);
  const rawTxSigned = signRawTx(privKey, rawTx);
  const result = await icx_sendTransaction(rawTxSigned);
  return result;
}

export async function getDelegation({ account }) {
  try {
    const payload = await icx_call({
      contractAddress: ZERO_ADDRESS,
      methodName: "getDelegation",
      inputObj: {
        address: checkHxPrefix(account),
      },
    });
    return {
      payload: payload[0],
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getCPSData() {
  try {
    if (ICX_CPS_SCORE()) {
      const getPRepsRes = await icx_call({
        contractAddress: ICX_CPS_SCORE(),
        methodName: "get_PReps",
        inputObj: {},
      });
      const getSponsorsRecordRes = await icx_call({
        contractAddress: ICX_CPS_SCORE(),
        methodName: "get_sponsors_record",
        inputObj: {},
      });
      return {
        governance: getPRepsRes[0].reduce((acc, cur) => {
          acc[cur.address] = cur.delegated;
          return acc;
        }, {}),
        sponsoredProjects: getSponsorsRecordRes[0],
      };
    } else {
      return {
        governance: {},
        sponsoredProjects: {},
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
}
