import BigNumber from "bignumber.js";

export const approveAmount: string = '115792089237316195423570985008687907853269984665640564039457584007913129639935' // 授权额度

export const numRule: number = 1e18 // 普通数字转大数字规则

export const minGas: number = 0.0004 // 最低eth余额

export const gasMul: number = 1.5 // Gas费倍率

export type SignMessage = 'Login' | 'Transfer' | 'Withdraw' | 'Order' | 'Node' | 'Pledge' | 'Claim' | 'Saving' | 'TokenOrder'; // 签名前缀

// 估算Gas
export const getGasLimit = (estimatedGas:any) => new BigNumber(estimatedGas.toString()).times(gasMul).toFixed(0)

// 大数字转小数字
export const bigToSmall = (bigNum:number|string):number => bigNum ? new BigNumber(bigNum).div(numRule).dp(4).toNumber() : 0

// 小数字转大数字
export const smallToBig = (smallNum:number|string):string => smallNum ? new BigNumber(smallNum).times(numRule).toFixed(0) : '0'

// 大数字之间比较大小
export const compareBigNumber = (a:BigNumber, b:BigNumber):number|null => a&&b ? a.comparedTo(b) : -1