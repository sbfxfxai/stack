from typing import List

from fastapi import APIRouter, HTTPException, Query
from web3 import Web3
from eth_defi.aave_v3.constants import aave_v3_get_network_by_chain_id
from eth_defi.aave_v3.balances import (
    aave_v3_get_deposit_balance,
    aave_v3_get_variable_borrow_balance,
)

# TODO: move to environment/config later
AVALANCHE_RPC = "https://api.avax.network/ext/bc/C/rpc"
AVALANCHE_CHAIN_ID = 43114

web3 = Web3(Web3.HTTPProvider(AVALANCHE_RPC))
network = aave_v3_get_network_by_chain_id(AVALANCHE_CHAIN_ID)
pool_address = network.pool_address

router = APIRouter(prefix="/api/aave/v3", tags=["aave-v3"])


@router.get("/user-position")
def user_position(address: str = Query(..., description="User wallet address")):
    if not web3.is_address(address):
        raise HTTPException(status_code=400, detail="Invalid address")

    positions: List[dict] = []

    for symbol, token in network.token_contracts.items():
        deposit = aave_v3_get_deposit_balance(
            web3,
            pool_address,
            token.deposit_address,
            address,
        )
        variable_borrow = aave_v3_get_variable_borrow_balance(
            web3,
            pool_address,
            token.variable_borrow_address,
            address,
        )

        if deposit or variable_borrow:
            positions.append(
                {
                    "symbol": symbol,
                    "deposit": float(deposit) if deposit is not None else 0.0,
                    "variableBorrow": float(variable_borrow)
                    if variable_borrow is not None
                    else 0.0,
                }
            )

    return {"address": address, "positions": positions}
