import { type Abi } from "viem";
import { useContract } from "../useContract";
import abi from './abi.json'

export function useGameProject() {
    const contract = useContract(import.meta.env.VITE_GAME_PROJECT, abi as Abi)

    // 
    const writeRecharge = async (...args: any[]) => await contract.writeWithGas('recharge', args)

    const writeWithdraw = async (...args: any[]) => await contract.writeWithGas('withdraw', args)

    return { writeRecharge, writeWithdraw }
}