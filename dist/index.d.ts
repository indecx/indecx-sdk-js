/**
 * indecx-sdk-js v1.0.0
 * SDK universal para integração com Indecx - compatível com Ionic, Vue, Angular, React e JavaScript puro
 * 
 * @author INDECX <suporte@indecx.com.br>
 * @license MIT
 * @homepage https://github.com/indecx/indecx-sdk-js#readme
 */

/**
 * Configuração para inicialização do SDK
 */
export interface InitConfig {
  /** ID da empresa */
  companyId: string;
  /** Identificador da ação */
  actionId: string;
  /** Chave da API */
  companyKey: string;
  /** URL base da API (opcional) */
  baseUrl?: string;
}

/**
 * Opções para personalização do modal
 */
export interface ModalOptions {
  /** Título do modal */
  title?: string;
  /** Largura do modal (ex: '90%', '800px') */
  width?: string;
  /** Altura do modal (ex: '80%', '600px') */
  height?: string;
}

/**
 * Parâmetros para geração de link
 */
export interface GenerateLinkParams {
  /** Parâmetros personalizados para a API */
  [key: string]: any;
}

/**
 * Classe principal do SDK Indecx
 */
export declare class IndecxSDK {
  /** ID da empresa */
  public readonly companyId: string | null;
  /** Identificador da ação */
  public readonly actionId: string | null;
  /** URL base da API */
  public readonly baseUrl: string;
  /** Status de inicialização */
  public readonly isInitialized: boolean;

  /**
   * Cria uma nova instância do SDK
   */
  constructor();
  
  /**
   * Inicializa o SDK com as credenciais necessárias
   * @param config Configurações do SDK
   * @throws {Error} Se companyId, actionId ou companyKey não forem fornecidos
   */
  init(config: InitConfig): void;
  
  /**
   * Gera um link fazendo chamada para a API
   * @param params Parâmetros para a geração do link
   * @returns Promise que resolve com o link gerado
   * @throws {Error} Se o SDK não estiver inicializado ou se houver erro na API
   */
  generateLink(params?: GenerateLinkParams): Promise<string>;
  
  /**
   * Exibe um modal com o link renderizado
   * @param link URL para ser exibida no modal
   * @param options Opções de personalização do modal
   * @throws {Error} Se o SDK não estiver inicializado ou se o link não for fornecido
   */
  showModal(link: string, options?: ModalOptions): void;
  
  /**
   * Método de conveniência que gera o link e abre o modal em uma única chamada
   * @param params Parâmetros para generateLink
   * @param modalOptions Opções para showModal
   * @returns Promise que resolve quando o modal for exibido
   * @throws {Error} Se houver erro na geração do link ou exibição do modal
   */
  generateAndShow(params?: GenerateLinkParams, modalOptions?: ModalOptions): Promise<void>;

  /**
   * Verifica se o SDK foi inicializado (método privado)
   * @private
   */
  private _checkInitialization(): void;

  /**
   * Cria o elemento modal (método privado)
   * @private
   */
  private _createModal(link: string, options: ModalOptions): HTMLElement;

  /**
   * Adiciona os estilos do modal (método privado)
   * @private
   */
  private _addModalStyles(): void;

  /**
   * Adiciona eventos do modal (método privado)
   * @private
   */
  private _addModalEvents(modal: HTMLElement): void;
}

/**
 * Instância singleton do SDK
 */
declare const indecx: IndecxSDK;

/**
 * Export padrão da instância singleton
 */
export default indecx;

/**
 * Export nomeado da instância singleton
 */
export { indecx };

/**
 * Declarações globais para uso via <script> tag
 */
declare global {
  interface Window {
    /** Classe IndecxSDK disponível globalmente */
    IndecxSDK: typeof IndecxSDK;
    /** Instância singleton disponível globalmente */
    indecx: IndecxSDK;
  }
}