import { type Abi } from "viem";
import { useContract } from "../useContract";
import abi from './abi.json'
import { getAddress } from "@/dapp/config";

export function useDonation() {
    const contract = useContract(import.meta.env.VITE_DONATION, abi as Abi)

    const readDonatedAmount = async () => await contract.read('donatedAmount', [getAddress()]) as bigint

    const readWhitelist = async () => await contract.read('whitelist', [getAddress()]) as boolean;

    const readDonatedMinAmount = async () => await contract.read('MIN_DONATION') as bigint

    const readDonatedMaxAmount = async () => await contract.read('MAX_DONATION') as bigint

    // amount 走 value，referrer 作为可选方法参数
    const writeDonated = async (amount: bigint, referrer?: `0x${string}`) => {
        if (referrer) return await contract.writeWithGas('donate', [referrer], { value: amount })
        return await contract.writeWithGas('donate', [], { value: amount })
    }

    return { writeDonated, readDonatedAmount, readWhitelist, readDonatedMinAmount, readDonatedMaxAmount }
}