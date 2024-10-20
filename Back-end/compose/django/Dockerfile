# Use uma imagem base do Python
FROM python:3.10-alpine

# Defina variáveis de ambiente
ENV PYTHONUNBUFFERED 1
ENV C_FORCE_ROOT true

# Crie diretórios para o código-fonte e arquivos estáticos
RUN mkdir /src
RUN mkdir /static

# Defina o diretório de trabalho
WORKDIR /src

# Atualize os pacotes e instale dependências obrigatórias
RUN apk update && apk add --no-cache \
    postgresql \
    zlib \
    jpeg

# Instale pacotes temporários necessários para instalar as dependências do Python
RUN apk add --no-cache --virtual build-deps \
    gcc \
    python3-dev \
    musl-dev \
    postgresql-dev \
    zlib-dev \
    jpeg-dev

# Atualize o pip
RUN pip install --upgrade pip

# Copie o arquivo de requisitos para o contêiner
COPY ./src/requirements.pip /scripts/

# Instale as dependências do Python
RUN pip install --no-cache-dir -r /scripts/requirements.pip

# Remova pacotes temporários para reduzir o tamanho da imagem
RUN apk del build-deps && \
    find -type d -name __pycache__ -prune -exec rm -rf {} \; && \
    rm -rf ~/.cache/pip

# Adicione um usuário e grupo para o Django
RUN addgroup --system django && adduser --system django --ingroup django

# Defina o usuário para rodar o contêiner
USER django

# Comando para rodar o servidor Django
CMD ["sh", "-c", "python manage.py collectstatic --no-input; python manage.py migrate; gunicorn mydjango.wsgi -b 0.0.0.0:8000 & celery --app myapp.tasks worker --loglevel=INFO"]