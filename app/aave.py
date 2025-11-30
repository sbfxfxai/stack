from fastapi import APIRouter, HTTPException, Query
from web3 import Web3
from web3.middleware import geth_poa_middleware


router = APIRouter(prefix="/api/aave/v3", tags=["aave-v3"])


# Avalanche mainnet RPC and Aave v3 PoolAddressesProvider
AVALANCHE_RPC = "https://api.avax.network/ext/bc/C/rpc"
POOL_ADDRESSES_PROVIDER = "0xa97684eaa5dE4a7aBfCf184CbA52aD15a9DE3270"


# Minimal ABIs for the contracts we need
POOL_ADDRESSES_PROVIDER_ABI = [
    {
        "inputs": [],
        "name": "getPool",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    }
]

POOL_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "user", "type": "address"},
        ],
        "name": "getUserAccountData",
        "outputs": [
            {"internalType": "uint256", "name": "totalCollateralBase", "type": "uint256"},
            {"internalType": "uint256", "name": "totalDebtBase", "type": "uint256"},
            {"internalType": "uint256", "name": "availableBorrowsBase", "type": "uint256"},
            {
                "internalType": "uint256",
                "name": "currentLiquidationThreshold",
                "type": "uint256",
            },
            {"internalType": "uint256", "name": "ltv", "type": "uint256"},
            {"internalType": "uint256", "name": "healthFactor", "type": "uint256"},
        ],
        "stateMutability": "view",
        "type": "function",
    }
]


_web3 = None
_pool_contract = None


def get_pool_contract():
    """Lazily construct Web3 and Aave v3 pool contract.

    Avoid doing network calls at import time so that cold starts on Vercel do not crash
    the Serverless Function if Avalanche RPC is temporarily unavailable.
    """

    global _web3, _pool_contract

    if _web3 is None:
        _web3 = Web3(Web3.HTTPProvider(AVALANCHE_RPC))
        _web3.middleware_onion.inject(geth_poa_middleware, layer=0)

    if _pool_contract is None:
        provider = _web3.eth.contract(
            address=Web3.to_checksum_address(POOL_ADDRESSES_PROVIDER),
            abi=POOL_ADDRESSES_PROVIDER_ABI,
        )
        try:
            pool_address = provider.functions.getPool().call()
        except Exception as exc:  # pragma: no cover - defensive
            raise HTTPException(
                status_code=502,
                detail="Failed to load Aave pool from PoolAddressesProvider",
            ) from exc

        _pool_contract = _web3.eth.contract(address=pool_address, abi=POOL_ABI)

    return _pool_contract


@router.get("/user-position")
def user_position(address: str = Query(..., description="User wallet address")):
    """Return live Aave v3 account data for a user on Avalanche mainnet."""

    try:
        checksum_address = Web3.to_checksum_address(address)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid address")

    pool_contract = get_pool_contract()

    try:
        (
            total_collateral_base,
            total_debt_base,
            available_borrows_base,
            current_liquidation_threshold,
            ltv,
            health_factor,
        ) = pool_contract.functions.getUserAccountData(checksum_address).call()
    except Exception as exc:  # pragma: no cover - defensive
        raise HTTPException(
            status_code=502,
            detail="Failed to query Aave pool for user data",
        ) from exc

    return {
        "address": address,
        "summary": {
            "totalCollateralBase": str(total_collateral_base),
            "totalDebtBase": str(total_debt_base),
            "availableBorrowsBase": str(available_borrows_base),
            "currentLiquidationThreshold": str(current_liquidation_threshold),
            "ltv": str(ltv),
            "healthFactor": str(health_factor),
        },
    }
