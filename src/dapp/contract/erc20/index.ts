import type { Abi } from 'viem'
import { useContract } from "../useContract";
import abi from './abi.json'
import { approveAmount, getAddress } from '@/dapp/config';
import { t } from '@/locale';
import { message } from '@/utils/message';
import { useDappStore } from '@/dapp/store';

export function useErc20 () {
    const contract = useContract(import.meta.env.VITE_USDT, abi as Abi)
    
    // 读余额
    const readBalanceOf = async () => await contract.read('balanceOf', [getAddress()]) as bigint

    // 读授权额度
    const readAllowance = async (spender: string) => await contract.read('allowance', [getAddress(), spender]) as bigint

    // 检查余额 
    const checkBalance = async (amount: bigint) => {
        const balance = await readBalanceOf()
        if (balance < amount) {
            const dappStore = useDappStore()
            dappStore.dappLoading = false
            message(t('余额不足'))
            throw new Error('余额不足')
        }
    }

    // 检查授权余额，不足则授权
    const checkAllowance = async (spender: string, amount: bigint) => {
        const allowance = await readAllowance(spender)
        if (allowance < amount){
            try {
                await contract.write('approve', [spender, approveAmount])
            } catch (error) {
                const dappStore = useDappStore()
                dappStore.dappLoading = false
                message(t('授权失败'))
                throw error
            }
        }
    }

    // 转账
    const writeTransfer = async (to: string, amount: bigint) => {
        checkBalance(amount)
        return await contract.write('transfer', [to, amount])
    }

    // 授权
    const writeApprove = async (spender: string, amount: bigint) => {
        const dappStore = useDappStore()
        dappStore.dappLoading = true
        
        await checkBalance(amount)
        await checkAllowance(spender, amount)
    }

    return { readBalanceOf, readAllowance, checkBalance, checkAllowance, writeTransfer, writeApprove }
}