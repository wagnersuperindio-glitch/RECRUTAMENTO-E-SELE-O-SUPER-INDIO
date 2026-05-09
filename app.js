const cities = [
  { name: "Guaiba", note: "Cidade-base da operacao e ponto natural para cargos de loja, atendimento e lideranca operacional.", tag: "Operacao forte" },
  { name: "Eldorado do Sul", note: "Cidade estrategica para expansao regional e para recrutamento com conexao metropolitana.", tag: "Expansao" },
  { name: "Sao Jeronimo", note: "Canal importante para mao de obra operacional e proximidade com a regiao carbonifera.", tag: "Regional" },
  { name: "Arroio dos Ratos", note: "Boa para captacao local em operacional, servicos gerais e apoio de loja.", tag: "Operacional" },
  { name: "Charqueadas", note: "Cidade-chave para recrutamento de base e liderancas de loja da rede.", tag: "Loja e equipe" },
  { name: "Tapes", note: "Ajuda a construir reserva regional de talentos e amplia a captacao fora do eixo mais obvio da rede.", tag: "Reserva regional" },
  { name: "Canoas", note: "Amplia a captacao metropolitana para cargos operacionais, administrativos e liderancas com maior base de profissionais.", tag: "Metropolitana" },
  { name: "Porto Alegre", note: "Fortalece captacao de cargos tecnicos, administrativos, marketing, pricing e financeiro.", tag: "Qualificacao" },
];

const careers = [
  { title: "Gerente de Loja", group: "lideranca", note: "Perfil de gestao, indicador, margem e operacao de ponta." },
  { title: "Subgerente", group: "lideranca", note: "Apoio direto da lideranca com foco em disciplina operacional." },
  { title: "Encarregado de Loja", group: "lideranca", note: "Lideranca de equipe, rotina e acompanhamento de execucao." },
  { title: "Repositor", group: "operacional", note: "Abastecimento, organizacao de gondola e cuidado com ruptura." },
  { title: "Caixa Operadora", group: "operacional", note: "Atendimento, agilidade e confianca no fechamento de caixa." },
  { title: "Fiscal de Caixa", group: "operacional", note: "Controle da frente de caixa, escala e suporte operacional." },
  { title: "Padeiro", group: "operacional", note: "Producao, forno e consistencia de padaria." },
  { title: "Auxiliar de Padeiro", group: "operacional", note: "Apoio a producao e rotina de setor." },
  { title: "Confeiteiro", group: "operacional", note: "Confeitaria, acabamento e qualidade visual de produtos." },
  { title: "Auxiliar de Confeitaria", group: "operacional", note: "Suporte a producao, organizacao e padrao de setor." },
  { title: "Servicos Gerais", group: "operacional", note: "Limpeza, conservacao e ambiente de loja." },
  { title: "Administrativo", group: "administrativo", note: "Rotinas, controle e apoio administrativo da rede." },
  { title: "Marketing Junior", group: "administrativo", note: "Conteudo, campanhas e apoio digital da marca." },
  { title: "Marketing Pleno", group: "administrativo", note: "Planejamento, branding e campanhas mais estruturadas." },
  { title: "Pricing", group: "administrativo", note: "Preco, margem, competitividade e leitura comercial." },
  { title: "Financeiro", group: "administrativo", note: "Fluxo, controle e disciplina financeira da operacao." },
];

const stores = [
  { name: "Loja Guaiba", note: "Base operacional forte e referencia para padrao de atendimento, loja e abastecimento.", tags: ["Guaiba", "Operacao forte", "Equipe"] },
  { name: "Loja Charqueadas", note: "Ponto importante para captacao regional e consolidacao de liderancas de loja.", tags: ["Charqueadas", "Lideranca", "Regional"] },
  { name: "Rede Regional", note: "Estrutura pronta para crescer com comunicacao unificada entre lojas, RH e marca.", tags: ["Rede", "Expansao", "Marca"] },
];

const promos = [
  { title: "Bloco de ofertas da semana", note: "Espaco para encarte, itens de imagem, preco forte e comunicacao comercial de alto giro.", tags: ["Encarte", "Preco", "Giro"], tone: "highlight" },
  { title: "Categoria destaque", note: "Setores como acougue, padaria e hortifruti podem ganhar chamadas proprias para reforcar percepcao de qualidade.", tags: ["Acougue", "Padaria", "FLV"], tone: "green" },
  { title: "Campanha institucional", note: "Bloco para sazonalidade, aniversario de loja, acoes locais e reforco de marca na comunidade.", tags: ["Campanha", "Marca", "Comunidade"], tone: "blue" },
];

const state = {
  activeCareerFilter: "todos",
  siteConfig: null,
  configMode: "static",
};

function setSiteNotice(message = "", type = "info") {
  const node = document.getElementById("siteNotice");
  if (!node) return;
  node.hidden = !message;
  node.textContent = message;
  node.classList.toggle("is-error", type === "error");
}

function labelForGroup(group) {
  if (group === "lideranca") return "Lideranca";
  if (group === "operacional") return "Operacional";
  return "Administrativo";
}

function renderCities() {
  const grid = document.getElementById("cityGrid");
  const cityItems = state.siteConfig?.focus_cities
    ? state.siteConfig.focus_cities.map((city) => cities.find((item) => item.name === city) || { name: city, note: "Cidade ativa na estrategia regional da rede.", tag: "Regional" })
    : cities;
  grid.innerHTML = cityItems.map((city) => `
    <article class="city-card">
      <h4>${city.name}</h4>
      <p>${city.note}</p>
      <span>${city.tag}</span>
    </article>
  `).join("");
}

function renderStores() {
  const grid = document.getElementById("storeGrid");
  grid.innerHTML = stores.map((store) => `
    <article class="store-card">
      <h4>${store.name}</h4>
      <p>${store.note}</p>
      <div class="store-meta">${store.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderPromos() {
  const grid = document.getElementById("promoGrid");
  grid.innerHTML = promos.map((promo) => `
    <article class="promo-card ${promo.tone}">
      <h4>${promo.title}</h4>
      <p>${promo.note}</p>
      <div class="promo-meta">${promo.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderVacancies() {
  const grid = document.getElementById("vacancyGrid");
  const vacancies = state.siteConfig?.vacancies || [];
  if (!vacancies.length) {
    grid.innerHTML = `
      <article class="career-card">
        <h4>Novas vagas em breve</h4>
        <p>O RH esta organizando a proxima rodada de oportunidades da rede.</p>
        <span>Atualizacao em andamento</span>
      </article>
    `;
    return;
  }
  grid.innerHTML = vacancies.map((vacancy) => `
    <article class="career-card">
      <h4>${vacancy.title}</h4>
      <p>${vacancy.summary || "Vaga ativa da rede para captacao regional."}</p>
      <span>${vacancy.city} | ${vacancy.employment_type || "CLT"}</span>
    </article>
  `).join("");
}

function renderCareers() {
  const grid = document.getElementById("careerGrid");
  const careerItems = state.siteConfig?.role_options
    ? state.siteConfig.role_options.map((role) => {
        const local = careers.find((item) => item.title === role.label);
        const mappedGroup = role.group === "leadership" ? "lideranca" : role.group === "operational" ? "operacional" : "administrativo";
        return local || { title: role.label, group: mappedGroup, note: "Cargo ativo na base do RH." };
      })
    : careers;
  grid.innerHTML = careerItems.map((career) => `
    <article class="career-card" data-group="${career.group}">
      <h4>${career.title}</h4>
      <p>${career.note}</p>
      <span>${labelForGroup(career.group)}</span>
    </article>
  `).join("");
  applyCareerFilters();
}

function renderCareerSelect() {
  const select = document.getElementById("careerSelect");
  const options = state.siteConfig?.role_options ? state.siteConfig.role_options.map((role) => ({ title: role.label })) : careers;
  select.innerHTML = options.map((career) => `<option value="${career.title}">${career.title}</option>`).join("");
}

function renderCitySelect() {
  const select = document.getElementById("citySelect");
  const options = state.siteConfig?.focus_cities ? state.siteConfig.focus_cities.map((city) => ({ name: city })) : cities;
  select.innerHTML = options.map((city) => `<option value="${city.name}">${city.name}</option>`).join("");
}

function applyCareerFilters() {
  const input = document.getElementById("careerSearchInput");
  const query = input ? input.value.trim().toLowerCase() : "";
  document.querySelectorAll(".career-card").forEach((card) => {
    const matchesFilter = state.activeCareerFilter === "todos" || card.dataset.group === state.activeCareerFilter;
    const matchesSearch = !query || card.innerText.toLowerCase().includes(query);
    card.classList.toggle("hidden", !matchesFilter || !matchesSearch);
  });
}

function bindCareerFilter() {
  document.querySelectorAll(".pill").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.activeCareerFilter = button.dataset.filter;
      applyCareerFilters();
    });
  });
}

function bindSearch() {
  const input = document.getElementById("careerSearchInput");
  input?.addEventListener("input", () => applyCareerFilters());
}

function syncStats() {
  if (!state.siteConfig) return;
  document.getElementById("statCities").textContent = String(state.siteConfig.stats?.city_count || cities.length);
  document.getElementById("statRoles").textContent = String(state.siteConfig.stats?.role_count || careers.length);
  document.getElementById("statFronts").textContent = String(state.siteConfig.stats?.digital_fronts || 3);
  document.getElementById("heroVacancyCount").textContent = String((state.siteConfig.vacancies || []).length || 0);
}

function buildMailtoLink(payload) {
  const subject = encodeURIComponent(`Cadastro de candidato | ${payload.nome} | ${payload.cargo || "Sem cargo definido"}`);
  const body = encodeURIComponent(
    [
      "Novo cadastro recebido pela pagina publica da rede.",
      "",
      `Nome: ${payload.nome}`,
      `Cidade: ${payload.cidade}`,
      `WhatsApp: ${payload.whatsapp || "-"}`,
      `E-mail: ${payload.email || "-"}`,
      `Interesse: ${payload.interesse}`,
      `Cargo: ${payload.cargo || "-"}`,
      `Mensagem: ${payload.mensagem || "-"}`,
    ].join("\n")
  );
  return `mailto:rh@supermercadoindio.com.br?subject=${subject}&body=${body}`;
}

async function submitLead(payload) {
  const response = await fetch("/api/site-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Falha ao enviar o contato.");
  }
  return result;
}

function bindForm() {
  const form = document.getElementById("leadForm");
  const feedback = document.getElementById("formFeedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") || "").trim(),
      cidade: String(data.get("cidade") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      email: String(data.get("email") || "").trim(),
      interesse: String(data.get("interesse") || "").trim(),
      cargo: String(data.get("cargo") || "").trim(),
      mensagem: String(data.get("mensagem") || "").trim(),
    };

    if (!payload.nome || !payload.cidade || !payload.interesse) {
      feedback.textContent = "Preencha nome, cidade e interesse principal antes de enviar.";
      setSiteNotice("O cadastro nao foi enviado porque faltam campos obrigatorios.", "error");
      return;
    }

    if (state.configMode === "api") {
      feedback.textContent = "Enviando para o RH...";
      setSiteNotice("Enviando seu cadastro para a fila do RH da rede.");
      try {
        const result = await submitLead(payload);
        feedback.textContent = result.message || "Contato recebido com sucesso.";
        setSiteNotice("Cadastro recebido com sucesso. O RH pode analisar seu interesse nas proximas rodadas.");
        form.reset();
        renderCitySelect();
        renderCareerSelect();
        return;
      } catch (error) {
        feedback.textContent = error.message || "Nao foi possivel enviar agora.";
        setSiteNotice("O cadastro nao foi concluido agora. Revise os dados e tente novamente sem sair da pagina.", "error");
        return;
      }
    }

    const mailtoLink = buildMailtoLink(payload);
    feedback.textContent = "Abrindo seu e-mail para encaminhar o cadastro ao RH.";
    setSiteNotice("Esta versao publica usa encaminhamento direto por e-mail para o RH.");
    window.location.href = mailtoLink;
  });
}

async function loadSiteConfig() {
  const candidates = [
    { url: "/api/site-config", mode: "api" },
    { url: "./data/site-config.json", mode: "static" },
  ];

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate.url, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      state.siteConfig = await response.json();
      state.configMode = candidate.mode;
      syncStats();
      renderCities();
      renderVacancies();
      renderCareers();
      renderCareerSelect();
      renderCitySelect();
      setSiteNotice("");
      return;
    } catch (error) {
      console.error(error);
    }
  }

  setSiteNotice("O site nao conseguiu carregar a configuracao agora, mas a pagina foi mantida aberta para preservar a navegacao.", "error");
}

renderStores();
renderPromos();
renderCities();
renderVacancies();
renderCareers();
bindCareerFilter();
bindSearch();
bindForm();
renderCareerSelect();
renderCitySelect();
loadSiteConfig();
                                                                                                                                                                                         