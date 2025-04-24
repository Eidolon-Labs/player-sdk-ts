import { SupportedRegions } from "./regions"
import { urls } from "./urls";

type SupportedChains = 
	| "nebula"
	| "nebula-testnet";

class PlayerApi {

	#apiKey: string;
	#region: SupportedRegions = "us-east-2";
	#url: string;

	constructor({
		region,
		apiKey
	}: {
		region: SupportedRegions
		apiKey: string;
	}) {
		this.#apiKey = apiKey;
		this.#region = region;
		this.#url = urls[region];
	}

	public changeRegion(region: SupportedRegions) {
		this.#region = region;
		this.#url = urls[region];
	}

	public setApiKey(apiKey: string) {
		this.#apiKey = apiKey;
	}

	public async createPlayer({
		chainName,
		suppliedId
	  }: {
		chainName: SupportedChains,
		suppliedId: string
	  }) {
		const response = await fetch(`${this.#url}/v1/players`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.#apiKey
			},
			body: JSON.stringify({
				chainName,
				suppliedId
			})
		});

		return await response.json();
	  }

	  public async sendTransaction({
		chainName,
		data,
		playerId,
		value,
		to
	  }: {
		chainName: SupportedChains,
		playerId: string,
		data: `0x${string}`,
		value: number | string,
		to: `0x${string}`
	  }) {
		const response = await fetch(`${this.#url}/v1/transactions`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.#apiKey
			},
			body: JSON.stringify({
				chainName,
				data,
				playerId,
				value,
				to
			})
		});

		return await response.json();
	  }

	  public async estimateGas({
		chainName,
		data,
		playerId,
		value,
		to
	  }: {
		chainName: SupportedChains,
		playerId: string,
		data: `0x${string}`,
		value: number | string,
		to: `0x${string}`
	  }) {
		const response = await fetch(`${this.#url}/v1/transactions/estimate`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.#apiKey
			},
			body: JSON.stringify({
				chainName,
				data,
				playerId,
				value,
				to
			})
		});

		return await response.json();
	  }

	  public async getPlayer({
		playerId,
	  }: {
		playerId: string
	  }) {
		const response = await fetch(`${this.#url}/v1/players/${playerId}`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.#apiKey
			}
		});
		return await response.json();
	  }
}

export { PlayerApi }