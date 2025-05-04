import { chainIds } from "./chains";
import { SupportedRegions } from "./regions";
import { type SupportedChains, type CreatePlayerResponse, type ApiError, type SendTransactionResponse, type EstimateGasResponse, type GetPlayerResponse } from "./types";
import { urls } from "./urls";

class PlayerApi {
    #apiKey: string;
    #url: string;

    constructor({
        region,
        apiKey,
    }: {
        region: SupportedRegions;
        apiKey: string;
    }) {
        this.#apiKey = apiKey;
        this.#url = urls[region];
    }

    public changeRegion(region: SupportedRegions) : void {
        this.#url = urls[region];
    }

    public setApiKey(apiKey: string) : void {
        this.#apiKey = apiKey;
    }

    public async createPlayer({
        chainName,
        suppliedId,
    }: {
        chainName: SupportedChains;
        suppliedId: string;
    }) : Promise<CreatePlayerResponse> {
        const response = await fetch(`${this.#url}/v1/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.#apiKey,
            },
            body: JSON.stringify({
                chainName,
                suppliedId,
            }),
        });

        return await response.json() as CreatePlayerResponse;
    }

    public async sendTransaction({
        chainName,
        data,
        playerId,
        value,
        to,
    }: {
        chainName: SupportedChains;
        playerId: string;
        data?: `0x${string}`;
        value?: number | string;
        to: `0x${string}`;
    }) : Promise<SendTransactionResponse> {
        const response = await fetch(`${this.#url}/v1/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.#apiKey,
            },
            body: JSON.stringify({
                chainId: chainIds[chainName],
                data,
                playerId,
                value,
                to,
            }),
        });

        return await response.json() as SendTransactionResponse;
    }

    public async estimateGas({
        chainName,
        data,
        playerId,
        value,
        to,
    }: {
        chainName: SupportedChains;
        playerId: string;
        data?: `0x${string}`;
        value?: number | string;
        to: `0x${string}`;
    }) : Promise<EstimateGasResponse> {
        const response = await fetch(`${this.#url}/v1/transactions/estimate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.#apiKey,
            },
            body: JSON.stringify({
                chainId: chainIds[chainName],
                data,
                playerId,
                value,
                to,
            }),
        });

        return await response.json() as EstimateGasResponse;
    }

    public async getPlayer({ playerId }: { playerId: string }) : Promise<GetPlayerResponse> {
        const response = await fetch(`${this.#url}/v1/players/${playerId}`, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.#apiKey,
            },
        });
        return await response.json() as GetPlayerResponse;
    }

    public async getPlayerBySuppliedId({ suppliedId }: { suppliedId: string }) : Promise<GetPlayerResponse> {
        const response = await fetch(`${this.#url}/v1/players/recover/${suppliedId}`, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.#apiKey,
            },
        });
        return await response.json() as GetPlayerResponse;
    }
}

export { PlayerApi };

export * from "./regions";
export * from "./types";
export * from "./urls";