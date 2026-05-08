    const API_BASE = "http://127.0.0.1:5000";

    let lanches = [];
    let carrinho = [];
    let categoriaAtual = "todos";

    const fallbackLanches = [
      {
        id: 1,
        nome: "Burger Clássico",
        descricao: "Pão brioche, carne artesanal, queijo, alface, tomate e molho especial.",
        preco: 24.9,
        categoria: "hamburguer",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 2,
        nome: "Cheddar Bacon",
        descricao: "Hambúrguer artesanal com cheddar cremoso, bacon crocante e cebola caramelizada.",
        preco: 31.9,
        categoria: "hamburguer",
        imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 3,
        nome: "Combo Duplo",
        descricao: "Dois burgers, batata grande e refrigerante de 1L.",
        preco: 59.9,
        categoria: "combo",
        imagem: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 4,
        nome: "Batata Suprema",
        descricao: "Batata frita com cheddar, bacon e molho da casa.",
        preco: 22.9,
        categoria: "combo",
        imagem: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 5,
        nome: "Refrigerante Lata",
        descricao: "Bebida gelada para acompanhar seu pedido.",
        preco: 6.5,
        categoria: "bebida",
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 6,
        nome: "Milkshake",
        descricao: "Milkshake cremoso de chocolate, morango ou baunilha.",
        preco: 17.9,
        categoria: "bebida",
        imagem: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80"
      }
    ];

    async function loadLanches() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/lanches`);

        if (!res.ok) {
          throw new Error("Erro ao carregar lanches");
        }

        const data = await res.json();

        lanches = Array.isArray(data) ? data : data.lanches;

      } catch (error) {
        console.warn("API de lanches indisponível. Usando dados locais.");
        lanches = fallbackLanches;
      }

      renderLanches();
    }

    async function loadPedidos() {
      const ordersGrid = document.getElementById("ordersGrid");

      ordersGrid.innerHTML = `
        <div class="food-card">
          <div class="food-content">
            <h3>Carregando pedidos...</h3>
            <p>Aguarde enquanto buscamos os pedidos.</p>
          </div>
        </div>
      `;

      try {
        const res = await fetch(`${API_BASE}/api/v1/pedidos`);

        if (!res.ok) {
          throw new Error("Erro ao carregar pedidos");
        }

        const data = await res.json();
        const pedidos = Array.isArray(data) ? data : data.pedidos;

        if (!pedidos || pedidos.length === 0) {
          ordersGrid.innerHTML = `
            <div class="food-card">
              <div class="food-content">
                <h3>Nenhum pedido encontrado</h3>
                <p>Quando existirem pedidos, eles aparecerão aqui.</p>
              </div>
            </div>
          `;
          return;
        }

        ordersGrid.innerHTML = pedidos.map((pedido) => `
          <div class="food-card">
            <div class="food-content">
              <h3>Pedido #${pedido.id || "novo"}</h3>
              <p><strong>Cliente:</strong> ${pedido.cliente?.nome || pedido.nome || "Não informado"}</p>
              <p><strong>Status:</strong> ${pedido.status || "Recebido"}</p>
              <p><strong>Total:</strong> R$ ${formatPrice(pedido.total || 0)}</p>
            </div>
          </div>
        `).join("");

      } catch (error) {
        ordersGrid.innerHTML = `
          <div class="food-card">
            <div class="food-content">
              <h3>API de pedidos indisponível</h3>
              <p>Conecte seu backend em /api/v1/pedidos para listar os pedidos reais.</p>
            </div>
          </div>
        `;
      }
    }

    function renderLanches() {
      const foodGrid = document.getElementById("foodGrid");

      const filtrados = categoriaAtual === "todos"
        ? lanches
        : lanches.filter(item => item.categoria === categoriaAtual);

      foodGrid.innerHTML = filtrados.map((item) => `
        <div class="food-card">
          <div
            class="food-img"
            style="background-image: url('${item.imagem || item.image || ""}')"
          ></div>

          <div class="food-content">
            <h3>${item.nome || item.name}</h3>
            <p>${item.descricao || item.description || "Sem descrição."}</p>

            <div class="food-bottom">
              <div class="price">R$ ${formatPrice(item.preco || item.price)}</div>

              <button class="add-btn" onclick="addToCart(${item.id})">
                Pedir
              </button>
            </div>
          </div>
        </div>
      `).join("");
    }

    function filterCategory(category, button) {
      categoriaAtual = category;

      document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      renderLanches();
    }

    function addToCart(id) {
      const lanche = lanches.find(item => Number(item.id) === Number(id));

      if (!lanche) return;

      const existing = carrinho.find(item => Number(item.id) === Number(id));

      if (existing) {
        existing.quantidade += 1;
      } else {
        carrinho.push({
          id: lanche.id,
          nome: lanche.nome || lanche.name,
          preco: lanche.preco || lanche.price,
          quantidade: 1
        });
      }

      renderCart();
      openCart();
    }

    function renderCart() {
      const cartItems = document.getElementById("cartItems");
      const cartCount = document.getElementById("cartCount");
      const cartTotal = document.getElementById("cartTotal");

      const quantidadeTotal = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
      const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

      cartCount.innerText = quantidadeTotal;
      cartTotal.innerText = formatPrice(total);

      if (carrinho.length === 0) {
        cartItems.innerHTML = `
          <p style="color:#aaa;">Seu carrinho está vazio.</p>
        `;
        return;
      }

      cartItems.innerHTML = carrinho.map(item => `
        <div class="cart-item">
          <div>
            <h4>${item.nome}</h4>
            <p>R$ ${formatPrice(item.preco)} cada</p>

            <div class="qty">
              <button onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.quantidade}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          </div>

          <strong>R$ ${formatPrice(item.preco * item.quantidade)}</strong>
        </div>
      `).join("");
    }

    function changeQty(id, amount) {
      const item = carrinho.find(product => Number(product.id) === Number(id));

      if (!item) return;

      item.quantidade += amount;

      if (item.quantidade <= 0) {
        carrinho = carrinho.filter(product => Number(product.id) !== Number(id));
      }

      renderCart();
    }

    async function sendOrder() {
      const status = document.getElementById("orderStatus");

      const nome = document.getElementById("customerName").value.trim();
      const telefone = document.getElementById("customerPhone").value.trim();
      const endereco = document.getElementById("customerAddress").value.trim();
      const observacao = document.getElementById("customerNote").value.trim();

      if (carrinho.length === 0) {
        status.innerText = "Adicione pelo menos um item ao carrinho.";
        return;
      }

      if (!nome || !telefone || !endereco) {
        status.innerText = "Preencha nome, WhatsApp e endereço.";
        return;
      }

      const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

      const pedido = {
        cliente: {
          nome,
          telefone,
          endereco
        },
        itens: carrinho,
        observacao,
        total,
        status: "recebido",
        criado_em: new Date().toISOString()
      };

      status.innerText = "Enviando pedido...";

      try {
        const res = await fetch(`${API_BASE}/api/v1/pedido`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pedido)
        });

        if (!res.ok) {
          throw new Error("Erro ao enviar pedido");
        }

        const data = await res.json();

        status.innerText = "Pedido enviado com sucesso!";

        carrinho = [];
        renderCart();

        document.getElementById("customerName").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("customerAddress").value = "";
        document.getElementById("customerNote").value = "";

        loadPedidos();

      } catch (error) {
        status.innerText = "Não foi possível enviar. Verifique se a API está online.";
      }
    }

    function openCart() {
      document.getElementById("cartOverlay").classList.add("active");
    }

    function closeCart() {
      document.getElementById("cartOverlay").classList.remove("active");
    }

    function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    }

    function formatPrice(value) {
      return Number(value || 0).toFixed(2).replace(".", ",");
    }

    loadLanches();
    loadPedidos();
    renderCart();
