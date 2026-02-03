import { type Abi } from "viem";
import { useContract } from "../useContract";
import abi from './abi.json'

export function useProject() {
    const contract = useContract(import.meta.env.VITE_PROJECT, abi as Abi)

    // 
    const writeClaim = async (...args: any[]) => await contract.writeWithGas('claim', args)

    return { writeClaim }
}