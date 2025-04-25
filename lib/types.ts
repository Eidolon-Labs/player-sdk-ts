export type SupportedChains = "nebula" | "nebula-testnet";

export type BaseResponse = {
    message: string;
};

export type CreatePlayerResponse = {
    note: string;
    accountId: string;
    player: {
        id: string;
        addresses: {
            evm: `0x${string}`;
        }
    }
} & BaseResponse;

export type EstimateGasResponse = {
    data: {
        amount: string;
    }
} & BaseResponse;

export type SendTransactionResponse = {
    data: {
        transactionHash: string;
    }
} & BaseResponse;

export type GetPlayerResponse = {
    player: {
        id: string;
        address: string;
        status: string;
    }
} & BaseResponse;

export type ApiError = {
    error: string;
}