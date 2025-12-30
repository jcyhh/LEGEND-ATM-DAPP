import { type Abi } from "viem";
import { useContract } from "../useContract";
import abi from './abi.json'

export function useUniswapV2Router () {
    const contract = useContract(import.meta.env.VITE_UNISWAP_V2_ROUTER, abi as Abi)

    // 读根用户地址
    const readGetAmountsOut = async (amountIn:any, address:string[]) => await contract.read('getAmountsOut', [amountIn, address]);

    return { readGetAmountsOut }
}