// indecx-sdk-js/src/index.js
class IndecxSDK {
  constructor() {
    this.companyId = null;
    this.companyKey = null;
    this.actionId = null;
    this.baseUrl = 'https://indecx.com/v2'; // default
    this.isInitialized = false;
  }

  /**
   * Inicializa o SDK com as credenciais necessárias
   * @param {Object} config - Configurações do SDK
   * @param {string} config.companyId - ID da empresa
   * @param {string} config.companyKey - Chave da API
   * @param {string} config.actionId - Identificador da ação
   * @param {string} [config.baseUrl] - URL base da API (opcional)
   */
  init({ companyId, companyKey, actionId, baseUrl }) {
    if (!companyId || !companyKey || !actionId) {
      throw new Error('companyId, companyKey e actionId são obrigatórios');
    }

    this.companyId = companyId;
    this.companyKey = companyKey;
    this.actionId = actionId;
    if (baseUrl) this.baseUrl = baseUrl;
    this.isInitialized = true;

    console.log('Indecx SDK inicializado com sucesso');
  }

  /**
   * Verifica se o SDK foi inicializado
   * @private
   */
  _checkInitialization() {
    if (!this.isInitialized) {
      throw new Error('SDK não foi inicializado. Chame init() primeiro.');
    }
  }

  /**
   * Gera um link fazendo chamada para a API
   * @param {Object} params - Parâmetros para gerar o link
   * @returns {Promise<string>} Link gerado
   */
  async generateLink(params = {}) {
    this._checkInitialization();

    try {
      const response = await fetch(`${this.baseUrl}/actions/${this.actionId}/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'include-realurl': 'true',
          'company-key': this.companyKey,
          'origin': 'app-totem',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          customers: [
            { ...params }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if(data.customers && data.customers.length > 0) {
        return data.customers[0].realUrl;
      } else {
        throw new Error('Nenhum link gerado');
      }

    } catch (error) {
      console.error('Erro ao gerar link:', error);
      throw new Error(`Falha ao gerar link: ${error.message}`);
    }
  }

  /**
   * Exibe um modal com o link renderizado
   * @param {string} link - Link para ser exibido no modal
   * @param {Object} options - Opções do modal
   * @param {string} [options.title] - Título do modal
   * @param {string} [options.width] - Largura do modal
   * @param {string} [options.height] - Altura do modal
   */
  showModal(link, options = {}) {
    this._checkInitialization();

    if (!link) {
      throw new Error('Link é obrigatório para exibir o modal');
    }

    const modalOptions = {
      title: 'Indecx',
      width: '90%',
      height: '80%',
      ...options
    };

    // Criar modal
    const modal = this._createModal(link, modalOptions);
    document.body.appendChild(modal);

    // Adicionar eventos
    this._addModalEvents(modal);

    // Mostrar modal
    setTimeout(() => {
      modal.classList.add('indecx-modal-show');
    }, 10);
  }

  /**
   * Cria o elemento modal
   * @private
   */
  _createModal(link, options) {
    const modal = document.createElement('div');
    modal.className = 'indecx-modal';
    modal.innerHTML = `
      <div class="indecx-modal-backdrop"></div>
      <div class="indecx-modal-container" style="width: ${options.width}; height: ${options.height};">
        <div class="indecx-modal-header">
          <h3 class="indecx-modal-title">${options.title ? options.title : ''}</h3>
          <button class="indecx-modal-close">&times;</button>
        </div>
        <div class="indecx-modal-body">
          <iframe 
            src="${link}" 
            width="100%" 
            height="100%" 
            frameborder="0"
            style="border: none;"
          ></iframe>
        </div>
      </div>
    `;

    // Adicionar estilos se não existirem
    this._addModalStyles();

    return modal;
  }

  /**
   * Adiciona os estilos do modal
   * @private
   */
  _addModalStyles() {
    if (document.getElementById('indecx-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'indecx-modal-styles';
    styles.textContent = `
      .indecx-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .indecx-modal-show {
        opacity: 1;
        visibility: visible;
      }

      .indecx-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .indecx-modal-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        max-width: 95vw;
        max-height: 95vh;
      }

      .indecx-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        flex-shrink: 0;
      }

      .indecx-modal-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .indecx-modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }

      .indecx-modal-close:hover {
        background-color: #f0f0f0;
      }

      .indecx-modal-body {
        flex: 1;
        padding: 0;
        overflow: hidden;
      }

      @media (max-width: 768px) {
        .indecx-modal-container {
          width: 95% !important;
          height: 90% !important;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * Adiciona eventos do modal
   * @private
   */
  _addModalEvents(modal) {
    const closeBtn = modal.querySelector('.indecx-modal-close');
    const backdrop = modal.querySelector('.indecx-modal-backdrop');

    const closeModal = () => {
      modal.classList.remove('indecx-modal-show');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Fechar com ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }

  /**
   * Método de conveniência que gera o link e abre o modal
   * @param {Object} params - Parâmetros para gerar o link
   * @param {Object} modalOptions - Opções do modal
   */
  async generateAndShow(params = {}, modalOptions = {}) {
    try {
      const link = await this.generateLink(params);
      this.showModal(link, modalOptions);
    } catch (error) {
      console.error('Erro ao gerar e exibir modal:', error);
      throw error;
    }
  }
}

// Criar instância única (singleton)
const indecx = new IndecxSDK();

// Export para diferentes ambientes
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS (Node.js)
  module.exports = indecx;
  module.exports.IndecxSDK = IndecxSDK;
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define(() => indecx);
} else {
  // Browser globals
  window.IndecxSDK = IndecxSDK;
  window.indecx = indecx;
}

export default indecx;
export { IndecxSDK };