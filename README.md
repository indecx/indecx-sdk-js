# INDECX SDK JS

SDK JavaScript universal para integração com INDECX. Compatível com Ionic, Vue.js, Angular, React e JavaScript puro.

## 🚀 Instalação

```bash
npm install indecx-sdk-js
```

## 📋 Uso Básico

### Inicialização

```javascript
import indecx from 'indecx-sdk-js';

// Inicializar o SDK
indecx.init({
  companyId: 'sua-company-id',
  companyKey: 'sua-api-key',
  baseUrl: 'https://indecx.com/v2' // opcional
});
```

### Gerar Link

```javascript
// Gerar um link
try {
  const link = await indecx.generateLink({
    email: 'usuario@example.com',
    phone: '123456789099',
  });
  console.log('Link gerado:', link);
} catch (error) {
  console.error('Erro:', error);
}
```

### Exibir Modal

```javascript
// Exibir modal com um link

// opções customizadas para título, largura e altura do modal (opcional)
const options = {
  title: 'Pesquisa de satisfação',
  width: '80%', 
  height: '70%', 
};

indecx.showModal(link, options);
```

## 🔧 Exemplos de Implementação

### Ionic + Vue 3

```javascript
// main.js ou plugins/indecx.js
import { createApp } from 'vue';
import indecx from 'indecx-sdk-js';

const app = createApp(App);

// Configurar globalmente
app.config.globalProperties.$indecx = indecx;

// Inicializar
indecx.init({
  companyId: 'sua-company-id',
  companyKey: 'sua-api-key',
  actionId: 'sua-action-id'
});

// Uso em componente
export default {
  methods: {
    async abrirModal() {
      try {
        await this.$indecx.generateAndShow({
          email: 'usuario@example.com',
          phone: '123456789099',
        });
      } catch (error) {
        console.error('Erro ao abrir modal:', error);
      }
    }
  }
}
```

### Ionic + Angular

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import indecx from 'indecx-sdk-js';

@NgModule({
  // ... outras configurações
})
export class AppModule {
  constructor() {
    indecx.init({
      companyId: 'sua-company-id',
      companyKey: 'sua-api-key',
      actionId: 'sua-action-id'
    });
  }
}

// component.ts
import { Component } from '@angular/core';
import indecx from 'indecx-sdk-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  async abrirModal() {
    try {
      await indecx.generateAndShow({
        email: 'usuario@example.com',
        phone: '123456789099',
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}
```

### Ionic + React

```jsx
// App.jsx
import React, { useEffect } from 'react';
import indecx from 'indecx-sdk-js';

function App() {
  useEffect(() => {
    indecx.init({
      companyId: 'sua-company-id',
      companyKey: 'sua-api-key',
      actionId: 'sua-action-id'
    });
  }, []);

  const handleOpenModal = async () => {
    try {
      await indecx.generateAndShow({
        email: 'usuario@example.com',
        phone: '123456789099',
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal}>
        Abrir Modal
      </button>
    </div>
  );
}
```

### JavaScript Puro (HTML)

```html
<!DOCTYPE html>
<html>
<head>
    <title>INDECX SDK</title>
</head>
<body>
    <button id="openModal">Abrir Modal</button>
    
    <script src="node_modules/indecx-sdk-js/dist/index.umd.js"></script>
    <!-- ou via CDN -->
    <!-- <script src="https://unpkg.com/indecx-sdk-js/dist/index.umd.js"></script> -->
    
    <script>
        // Inicializar
        indecx.init({
            companyId: 'sua-company-id',
            companyKey: 'sua-api-key',
            actionId: 'sua-action-id'
        });

        // Usar
        document.getElementById('openModal').addEventListener('click', async () => {
            try {
                await indecx.generateAndShow({
                    email: 'usuario@example.com',
                    phone: '123456789099',
                });
            } catch (error) {
                console.error('Erro:', error);
            }
        });
    </script>
</body>
</html>
```

## 🎨 Personalização de Estilos

O modal usa classes CSS que podem ser personalizadas:

```css
/* Personalizar o modal */
.indecx-modal-container {
  border-radius: 12px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
}

.indecx-modal-header {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.indecx-modal-title {
  color: white !important;
}

.indecx-modal-close {
  color: white !important;
}

.indecx-modal-close:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
```

## 🔑 API Reference

### `init(config)`
Inicializa o SDK.

**Parâmetros:**
- `config.companyId` (string): ID da empresa
- `config.companyKey` (string): Chave da API
- `config.baseUrl` (string, opcional): URL base da API

### `generateLink(params)`
Gera um link via API.

**Parâmetros:**
- `params` (object, opcional): Parâmetros para a API

**Retorna:** Promise<string>

### `showModal(link, options)`
Exibe um modal com o link.

**Parâmetros:**
- `link` (string): URL para exibir no modal
- `options.title` (string, opcional): Título do modal
- `options.width` (string, opcional): Largura do modal
- `options.height` (string, opcional): Altura do modal

### `generateAndShow(params, modalOptions)`
Gera link e exibe modal em uma única chamada.

**Parâmetros:**
- `params` (object, opcional): Parâmetros para generateLink
- `modalOptions` (object, opcional): Opções para showModal

**Retorna:** Promise<void>

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Build
npm run build

# Desenvolvimento (watch mode)
npm run dev
```

## 📝 Licença

MIT

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para support@indecx.com ou abra uma issue no GitHub.