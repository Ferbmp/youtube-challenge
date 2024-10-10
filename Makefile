DOCKER_COMPOSE = docker-compose

 
build:
	@echo "Building Docker images..."
	$(DOCKER_COMPOSE) build

 
up:
	@echo "Starting the application without running seed..."
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down
 
seed:
	sqlite3 server/instance/videos.db < server/infrastructure/scripts/seed_videos.sql
