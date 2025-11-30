from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from .aave import router as aave_router


app = FastAPI()
app.include_router(aave_router)


@app.get("/", response_class=HTMLResponse)
async def dashboard():
    return """
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <title>Stackbank · Aave Dashboard</title>
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <link
    rel=\"stylesheet\"
    href=\"https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css\"
  />
  <style>
    body {
      background: radial-gradient(circle at top, #111827, #020617);
      color: #e5e7eb;
    }
    main {
      max-width: 1200px;
      margin: 2rem auto;
    }
    .card {
      background: rgba(15, 23, 42, 0.9);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(148, 163, 184, 0.2);
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border: 1px solid rgba(148, 163, 184, 0.5);
      color: #9ca3af;
    }
    .metric {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .metric-label {
      font-size: 0.8rem;
      color: #9ca3af;
    }
    .tag {
      display: inline-block;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      background: rgba(55, 65, 81, 0.8);
      color: #e5e7eb;
    }
    .health-good {
      color: #22c55e;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    header h1 {
      font-size: 1.4rem;
      margin: 0;
    }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <span class=\"pill\">Stackbank · Prototype</span>
        <h1>Aave Avalanche Dashboard</h1>
        <p style=\"color:#9ca3af;font-size:0.9rem;\">
          Static shell UI — on-chain and Aave APIs will be wired in next.
        </p>
      </div>
      <div>
        <button>Connect Wallet</button>
      </div>
    </header>

    <section class=\"grid-3\">
      <article class=\"card\">
        <p class=\"metric\">$0.00</p>
        <p class=\"metric-label\">Net worth</p>
        <p style=\"color:#9ca3af;font-size:0.8rem;margin-top:0.5rem;\">
          Sum of deposits minus borrows, priced in USD.
        </p>
      </article>

      <article class=\"card\">
        <p class=\"metric health-good\">0.00</p>
        <p class=\"metric-label\">Health factor</p>
        <p style=\"color:#9ca3af;font-size:0.8rem;margin-top:0.5rem;\">
          Above 1.0 is safe. Below 1.0 is subject to liquidation.
        </p>
      </article>

      <article class=\"card\">
        <p class=\"metric\">0.00%</p>
        <p class=\"metric-label\">Borrow utilization</p>
        <p style=\"color:#9ca3af;font-size:0.8rem;margin-top:0.5rem;\">
          Current borrow vs. maximum borrowable collateral.
        </p>
      </article>
    </section>

    <section style=\"margin-top:2rem;\" class=\"grid-3\">
      <article class=\"card\">
        <div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;\">
          <h2 style=\"font-size:1rem;margin:0;\">Markets</h2>
          <span class=\"tag\">Avalanche · Aave V2</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Deposit APY</th>
              <th>Variable APY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AVAX</td>
              <td>–</td>
              <td>–</td>
            </tr>
            <tr>
              <td>USDC</td>
              <td>–</td>
              <td>–</td>
            </tr>
            <tr>
              <td>WETH</td>
              <td>–</td>
              <td>–</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article class=\"card\">
        <div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;\">
          <h2 style=\"font-size:1rem;margin:0;\">Your deposits</h2>
          <span class=\"tag\">Wallet: not connected</span>
        </div>
        <p style=\"color:#9ca3af;font-size:0.85rem;\">
          Once we connect a wallet and Aave API, your supplied assets will appear here.
        </p>
        <ul>
          <li style=\"color:#6b7280;font-size:0.85rem;\">No deposits yet</li>
        </ul>
      </article>

      <article class=\"card\">
        <div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;\">
          <h2 style=\"font-size:1rem;margin:0;\">Your borrows</h2>
          <span class=\"tag\">Risk overview</span>
        </div>
        <p style=\"color:#9ca3af;font-size:0.85rem;\">
          Borrowed positions, interest rates and collateralization will show here.
        </p>
        <ul>
          <li style=\"color:#6b7280;font-size:0.85rem;\">No borrows yet</li>
        </ul>
      </article>
    </section>
  </main>
</body>
</html>
    """


@app.get("/health")
async def health():
    return {"status": "healthy"}
