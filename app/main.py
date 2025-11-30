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
          Live read-only data from Aave v3 on Avalanche. Enter a wallet address to load positions.
        </p>
      </div>
      <div>
        <form id=\"address-form\" style=\"display:flex;gap:0.5rem;align-items:center;\">
          <input id=\"address-input\" name=\"address\" type=\"text\" placeholder=\"0x... wallet\" required style=\"min-width:260px;\" />
          <button type=\"submit\">Load positions</button>
        </form>
      </div>
    </header>

    <section class=\"grid-3\">
      <article class=\"card\" id=\"deposits-card\">
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
          Supplied assets for the entered wallet.
        </p>
        <ul id=\"deposits-list\">
          <li style=\"color:#6b7280;font-size:0.85rem;\">No deposits yet</li>
        </ul>
      </article>

      <article class=\"card\" id=\"borrows-card\">
        <div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;\">
          <h2 style=\"font-size:1rem;margin:0;\">Your borrows</h2>
          <span class=\"tag\">Risk overview</span>
        </div>
        <p style=\"color:#9ca3af;font-size:0.85rem;\">
          Borrowed positions for the entered wallet.
        </p>
        <ul id=\"borrows-list\">
          <li style=\"color:#6b7280;font-size:0.85rem;\">No borrows yet</li>
        </ul>
      </article>
    </section>
  </main>
  <script>
    const form = document.getElementById("address-form");
    const input = document.getElementById("address-input");
    const depositsList = document.getElementById("deposits-list");
    const borrowsList = document.getElementById("borrows-list");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const address = input.value.trim();
      if (!address) return;

      depositsList.innerHTML = "<li style='color:#6b7280;font-size:0.85rem;'>Loading...</li>";
      borrowsList.innerHTML = "<li style='color:#6b7280;font-size:0.85rem;'>Loading...</li>";

      try {
        const res = await fetch(`/api/aave/v3/user-position?address=${encodeURIComponent(address)}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = await res.json();
        const positions = Array.isArray(data.positions) ? data.positions : [];

        const deposits = positions.filter((p) => p.deposit && p.deposit > 0);
        const borrows = positions.filter((p) => p.variableBorrow && p.variableBorrow > 0);

        depositsList.innerHTML = deposits.length
          ? deposits
              .map(
                (p) =>
                  `<li style='font-size:0.85rem;'>${p.symbol}: <strong>${p.deposit}</strong></li>`,
              )
              .join("")
          : "<li style='color:#6b7280;font-size:0.85rem;'>No deposits found</li>";

        borrowsList.innerHTML = borrows.length
          ? borrows
              .map(
                (p) =>
                  `<li style='font-size:0.85rem;'>${p.symbol}: <strong>${p.variableBorrow}</strong></li>`,
              )
              .join("")
          : "<li style='color:#6b7280;font-size:0.85rem;'>No borrows found</li>";
      } catch (err) {
        const msg = (err && err.message) || "Failed to load positions";
        depositsList.innerHTML = `<li style='color:#ef4444;font-size:0.85rem;'>${msg}</li>`;
        borrowsList.innerHTML = `<li style='color:#ef4444;font-size:0.85rem;'>${msg}</li>`;
      }
    });
  </script>
</body>
</html>
    """


@app.get("/health")
async def health():
    return {"status": "healthy"}
