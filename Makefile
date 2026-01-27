.DEFAULT_GOAL := help

install: package.json yarn.lock ## Install or update the required dependencies
	yarn install

run: install ## Start the development server
	yarn dev

build: install ## Build the static website
	yarn build

lint: ## Run linters
	yarn eslint

help: ## Display available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: install run build lint help
