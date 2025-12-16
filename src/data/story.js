import page01 from '../assets/pages/page_01.png';
import page02 from '../assets/pages/page_02.png';
import page03 from '../assets/pages/page_03.png';
import page04 from '../assets/pages/page_04.png';
import page06 from '../assets/pages/page_06.png';
import page07 from '../assets/pages/page_07.png';
import page08 from '../assets/pages/page_08.png';
import page09 from '../assets/pages/page_09.png';
import page10 from '../assets/pages/page_10.png';
import page11 from '../assets/pages/page_11.png';
import page12 from '../assets/pages/page_12.png';
import page13 from '../assets/pages/page_13.png';
import page14 from '../assets/pages/page_14.png';
import page15 from '../assets/pages/page_15.png';

export const story = [
    {
        id: 1,
        title: "O Portal do Guardião da Qualidade",
        text: "O SQP Web é o centro de comando onde a governança e os cadastros fundamentais acontecem. Aqui, o técnico Guardião estabelece as regras que garantem a integridade dos dados coletados em campo pelo App Mobile.",
        image: page01,
        alt: "Capa com o técnico Guardião em frente a um computador, logado no SQP Web."
    },
    {
        id: 2,
        title: "Tela de Login Web",
        text: "O acesso é direto pelo navegador. O Guardião insere seu 'Email de rede' e 'Senha' na interface limpa do SQP Web. Esta é a porta de entrada para todas as configurações, cadastros e validações de dados.",
        image: page02,
        alt: "Tela de Login do SQP Web com campos para Email e Senha."
    },
    {
        id: 3,
        title: "O Menu de Navegação Central",
        text: "Após o login, o Guardião acessa o Menu Lateral. As três grandes áreas de controle são evidentes: 'ADMINISTRAÇÃO' (para configurações do sistema), 'CADASTROS' (para itens base como produtos e locais) e 'DADOS' (para análises e validações).",
        image: page03,
        alt: "Menu lateral do SQP Web mostrando Administração, Cadastros e Dados."
    },
    {
        id: 4,
        title: "Administração: Configurar Unidade",
        text: "A primeira tarefa é a configuração das Estações de Tratamento de Água (ETAs). Em 'ADMINISTRAÇÃO' > 'CONFIGURAR UNIDADE', o Guardião acessa o painel de 'CONFIGURAÇÃO UNIDADE OPERACIONAL'.",
        image: page04,
        alt: "Tela de Configuração de Unidade Operacional com a lista de tipos de coleta."
    },

    {
        id: 5,
        title: "Ativando o Tipo de Coleta",
        text: "Aqui, o Guardião define quais tipos de coleta são relevantes para a unidade em questão (ex: ETA ALTO DO CÉU). Ele visualiza a lista de 'TIPO DE COLETA' disponíveis (ÁGUA BRUTA, ÁGUA DECANTADA, etc.).Para um tipo de coleta aparecer no App Mobile de campo, ele deve ser marcado como 'EM USO'. O Guardião seleciona o tipo (ex: ÁGUA BRUTA II) e clica no campo para ativá-lo com a marca de seleção.",
        image: page06,
        alt: "Tela mostrando a seleção de um Tipo de Coleta (ÁGUA BRUTA II) para ser marcado como EM USO."
    },
    {
        id: 6,
        title: "Localizando Unidades Cadastradas",
        text: "No mesmo módulo, é possível localizar ou editar outras unidades. O Guardião pode usar a função 'Localizar' e a lista exibe todas as 'UNIDADE OPERACIONAL' cadastradas, como ETA BOTAFOGO, ETA CASTELO BRANCO, facilitando a gestão do sistema.",
        image: page07,
        alt: "Tela de localizar unidades cadastradas, mostrando a lista de ETAs por Nome e Sigla."
    },
    {
        id: 7,
        title: "Administração: UNIDADE x USUÁRIO",
        text: "Para controlar o acesso, o Guardião navega para 'ADMINISTRAÇÃO' > 'UNIDADE x USUÁRIO'. Nesta tela, ele configura quais Unidades Operacionais um determinado usuário (ex: Willie Grimaldi) pode acessar.",
        image: page08,
        alt: "Tela de Configuração do Usuário x Unidade Operacional, mostrando a lista de unidades que Willie Grimaldi tem acesso."
    },
    {
        id: 8,
        title: "Localizando Usuários",
        text: "Para adicionar ou editar o acesso, o Guardião utiliza a ferramenta 'Localizar Usuários'. Uma pesquisa simples por 'NOME' ou 'email' (ex: severinoj@compesa.com.br) traz o registro correto para que as permissões possam ser atualizadas.",
        image: page09,
        alt: "Tela de Localizar Usuários com a lista de nomes e e-mails para configuração de acesso."
    },
    {
        id: 9,
        title: "CADASTROS: O Menu Base",
        text: "O módulo 'CADASTROS' é onde o Guardião define os elementos estruturais do sistema. Inclui 'HORÁRIOS DE COLETA', 'CADASTRO DE LOTAÇÕES', 'PONTO DE COLETA', 'PRODUTO QUÍMICO' e 'TIPOS DE OCORRÊNCIA'.",
        image: page10,
        alt: "Menu expandido de CADASTROS no SQP Web."
    },
    {
        id: 10,
        title: "DADOS: Lançamento Bacteriológico",
        text: "O módulo 'DADOS' gerencia as informações de qualidade. Em 'ANÁLISES BACTERIOLÓGICAS' > 'CADASTRO DA COLETA', o Guardião lança os resultados dos testes de laboratório.",
        image: page11,
        alt: "Tela de Lançamento de Análises Bacteriológicas com campos para Coliformes Totais, E. Coli e parâmetros físicos."
    },
    {
        id: 11,
        title: "Inserção de Resultados Bacteriológicos",
        text: "Neste formulário, o Guardião informa a 'UNIDADE OPERACIONAL', e os resultados para 'COLIFORMES TOTAIS' e 'ESCHERICHIA COLI', selecionando 'AUSENTE' ou 'PRESENTE' em menus suspensos. O Guardião insere a 'DT COLETA' e a 'DT RESULTADO' usando o seletor de calendário, garantindo o registro temporal exato da amostra e sua análise laboratorial. Além da bacteriologia, os parâmetros físico-químicos são essenciais. O Guardião insere os dados de 'COR', 'PH', 'TURBIDEZ' e 'CLORO', e seleciona o 'TIPO DE COLETA' (ex: ÁGUA TRATADA) para finalizar o registro.",
        image: page12,
        alt: "Detalhamento da inserção de Coliformes Totais e Escherichia Coli (PRESENTE ou AUSENTE)."
    },
    {
        id: 12,
        title: "Validação das Análises Bacteriológicas",
        text: "Em 'DADOS' > 'VALIDAÇÃO DAS ANÁLISES BACTERIOLÓGICAS', o Guardião inspeciona a tabela de resultados. Ele pode filtrar por Unidade ou Data, revisando os dados de Coliformes, E. Coli e parâmetros antes de validar o lote.",
        image: page13,
        alt: "Tela de Validação das Análises Bacteriológicas com uma tabela de resultados de várias unidades."
    },
    {
        id: 13,
        title: "Validação de Dados: ETAS",
        text: "No módulo 'VALIDAÇÕES ETAS', o Guardião verifica os registros de campo (coletados via App Mobile) contra os parâmetros de qualidade. A tabela mostra os dados reportados, permitindo a validação dos registros dentro ou fora da curva.",
        image: page14,
        alt: "Tela de Validação de Dados de Monitoramento (ETAS) com tabela de registros de campo."
    },
    {
        id: 14,
        title: "Validação de Dados: GQL (Governança da Qualidade)",
        text: "A camada final de governança é no módulo 'VALIDAÇÕES GQL'. Aqui, o Guardião compara os dados de monitoramento com as referências e padrões de qualidade definidos. A validação final garante que os dados estejam em conformidade com as exigências da Compesa.",
        image: page15,
        alt: "Tela de Validação de Dados de Monitoramento GQL com comparação entre valores Previstos e Realizados."
    }
];
