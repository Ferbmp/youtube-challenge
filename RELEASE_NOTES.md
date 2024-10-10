# Release Notes - Playlist Viewer

## Funcionalidades

- **Adicionar URLs de vídeos do YouTube**: Os usuários podem inserir URLs de vídeos do YouTube no campo de busca.
- **Listagem de vídeos**: Exibe uma lista de vídeos adicionados pelo usuário.
- **Assistir vídeos**: Os vídeos podem ser assistidos diretamente no site.
- **Remover vídeos**: Opção para remover vídeos da lista.
- **Persistência de dados**: Os vídeos adicionados são persistidos no banco de dados e também armazenados em cache para otimizar o desempenho.

## Bugs ou Observações

- Nenhum bug encontrado até o momento.

## Pontos de Melhoria ou Evolução

- **Funcionalidade de Login**: Implementar sistema de autenticação para que os usuários possam se registrar, fazer login e salvar suas playlists de maneira personalizada.
- **Múltiplas Playlists**: Atualmente, o usuário pode criar apenas uma playlist. Futuramente, a aplicação pode evoluir para permitir a criação e gerenciamento de múltiplas playlists.
- **Aprimoramento da Interface**: Adicionar opções de organização, como ordenação e busca dentro das playlists.
- **Melhoria dos Logs**: Implementar um sistema de logging mais completo e confiável usando bibliotecas como logging do proprio Flask ou integrar com ferramentas externas como Fluentd ou Graylog para centralização e visualização de logs.
- **Monitoramento e Observabilidade**: Integrar a aplicação com ferramentas de observabilidade como Prometheus + Grafana ou Sentry para monitoramento de métricas, performance e erros em tempo real
