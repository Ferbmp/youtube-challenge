DOCKER_COMPOSE = docker-compose
RUN_SEED_FLAG = RUN_SEED
 
build:
	@echo "Building Docker images..."
	$(DOCKER_COMPOSE) build

 
up:
	@echo "Starting the application without running seed..."
	$(DOCKER_COMPOSE) up 

down:
	$(DOCKER_COMPOSE) down
 
up-seed:
	@echo "Starting the application and running seed..."
	$(DOCKER_COMPOSE) up 
	$(DOCKER_COMPOSE) exec backend sh -c "export RUN_SEED=true && flask seed"
	$(DOCKER_COMPOSE) restart backend